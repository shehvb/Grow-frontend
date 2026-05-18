import { type FC, useState, useRef, useEffect } from 'react';
import { RiParentLine } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { PiChalkboardTeacherFill } from "react-icons/pi";

export type AuthRole = 'student' | 'parent' | 'teacher';

interface AuthTabsProps {
  currentRole: AuthRole;
  onRoleChange: (role: AuthRole) => void;
}

const AuthTabs: FC<AuthTabsProps> = ({ currentRole, onRoleChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);

  const roles: AuthRole[] = ['student', 'parent', 'teacher'];
  const currentIndex = roles.indexOf(currentRole);

  // Cross-page reload animation support: Check if we transitioned from another tab
  const [fromIndex, setFromIndex] = useState<number | null>(() => {
    const stored = sessionStorage.getItem('grow_prev_role_index');
    if (stored !== null) {
      const parsed = Number(stored);
      if (!isNaN(parsed) && parsed >= 0 && parsed <= 2 && parsed !== currentIndex) {
        return parsed;
      }
    }
    return null;
  });

  useEffect(() => {
    // Clear storage once we have initialized the transition
    sessionStorage.removeItem('grow_prev_role_index');

    if (fromIndex !== null) {
      // Allow browser to render the initial frame at the OLD index,
      // then immediately update to null to slide to the NEW index!
      const raf = requestAnimationFrame(() => {
        const nextRaf = requestAnimationFrame(() => {
          setFromIndex(null);
        });
        return () => cancelAnimationFrame(nextRaf);
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [fromIndex, currentIndex]);

  const handleRoleChange = (role: AuthRole) => {
    const targetIndex = roles.indexOf(role);
    if (targetIndex !== currentIndex) {
      // Store the current index so the new page knows where the sliding pill starts from!
      sessionStorage.setItem('grow_prev_role_index', String(currentIndex));
      onRoleChange(role);
    }
  };

  const handleStart = (clientX: number) => {
    setIsDragging(true);
    startXRef.current = clientX;
    setDragOffset(0);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    const deltaX = clientX - startXRef.current;
    
    // Clamping the drag movement visually to prevent pulling too far out of bounds
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const maxDragRight = (2 - currentIndex) * (rect.width / 3);
      const maxDragLeft = -currentIndex * (rect.width / 3);
      const rubberBandFactor = 0.4; // rubber-band effect beyond bounds
      
      let clampedDelta = deltaX;
      if (deltaX > maxDragRight) {
        clampedDelta = maxDragRight + (deltaX - maxDragRight) * rubberBandFactor;
      } else if (deltaX < maxDragLeft) {
        clampedDelta = maxDragLeft + (deltaX - maxDragLeft) * rubberBandFactor;
      }
      setDragOffset(clampedDelta);
    } else {
      setDragOffset(deltaX);
    }
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const tabWidth = rect.width / 3;
      const currentPos = currentIndex * tabWidth;
      const newPos = currentPos + dragOffset;
      
      const nearestIndex = Math.max(0, Math.min(2, Math.round(newPos / tabWidth)));
      if (nearestIndex !== currentIndex) {
        handleRoleChange(roles[nearestIndex]);
      }
    }
    setDragOffset(0);
  };

  useEffect(() => {
    if (!isDragging) return;

    const onGlobalMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX);
    };
    const onGlobalMouseUp = () => {
      handleEnd();
    };
    const onGlobalTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX);
      }
    };
    const onGlobalTouchEnd = () => {
      handleEnd();
    };

    window.addEventListener('mousemove', onGlobalMouseMove);
    window.addEventListener('mouseup', onGlobalMouseUp);
    window.addEventListener('touchmove', onGlobalTouchMove, { passive: true });
    window.addEventListener('touchend', onGlobalTouchEnd);

    return () => {
      window.removeEventListener('mousemove', onGlobalMouseMove);
      window.removeEventListener('mouseup', onGlobalMouseUp);
      window.removeEventListener('touchmove', onGlobalTouchMove);
      window.removeEventListener('touchend', onGlobalTouchEnd);
    };
  }, [isDragging, dragOffset]);

  // If we are currently transitioning from a page load, use fromIndex for the initial render position.
  const showIndex = fromIndex !== null ? fromIndex : currentIndex;
  const activeLeft = showIndex * 33.333;

  const slidingPillStyle = isDragging
    ? {
        left: `${activeLeft}%`,
        transform: `translateX(${dragOffset}px)`,
        transition: 'none',
      }
    : {
        left: `${activeLeft}%`,
        transform: 'translateX(0)',
        // Avoid animating during the initial frame if we are setting the start position
        transition: fromIndex !== null 
          ? 'none'
          : 'left 350ms cubic-bezier(0.16, 1, 0.3, 1), transform 350ms cubic-bezier(0.16, 1, 0.3, 1)',
      };

  return (
    <div className="mb-7 select-none">
      <label className="block text-slate-700 font-black text-sm mb-2" style={{ fontFamily: "'Nunito', sans-serif" }}>
        Select your role
      </label>
      
      <div 
        ref={containerRef}
        onMouseDown={(e) => handleStart(e.clientX)}
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        className="relative flex items-center bg-slate-100 rounded-2xl p-1 cursor-grab active:cursor-grabbing touch-none"
      >
        {/* Sliding active pill indicator */}
        <div 
          className="absolute top-1 bottom-1 bg-white rounded-xl shadow-md pointer-events-none"
          style={{
            width: 'calc(33.333% - 8px)',
            margin: '0 4px',
            ...slidingPillStyle
          }}
        />

        {/* Tab buttons */}
        <button
          type="button"
          onClick={() => handleRoleChange('student')}
          className={`relative z-10 flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl font-black text-xs md:text-sm transition-colors duration-300 ${
            currentRole === 'student'
              ? 'text-sky-500'
              : 'text-slate-400 hover:text-slate-600'
          }`}
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          <span className="text-lg"><FaUser /></span> Student
        </button>

        <button
          type="button"
          onClick={() => handleRoleChange('parent')}
          className={`relative z-10 flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl font-black text-xs md:text-sm transition-colors duration-300 ${
            currentRole === 'parent'
              ? 'text-blue-900'
              : 'text-slate-400 hover:text-slate-600'
          }`}
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          <span className="text-lg"><RiParentLine /></span> Parent
        </button>

        <button
          type="button"
          onClick={() => handleRoleChange('teacher')}
          className={`relative z-10 flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl font-black text-xs md:text-sm transition-colors duration-300 ${
            currentRole === 'teacher'
              ? 'text-indigo-600'
              : 'text-slate-400 hover:text-slate-600'
          }`}
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          <span className="text-lg"><PiChalkboardTeacherFill /></span> Teacher
        </button>
      </div>
    </div>
  );
};

export default AuthTabs;
