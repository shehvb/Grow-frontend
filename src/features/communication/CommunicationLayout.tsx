import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useChatStore } from '../../store/useChatStore';
import { useChannelStore } from '../../store/useChannelStore';
import { FiMessageCircle, FiHash, FiChevronLeft } from 'react-icons/fi';
import logo from '../../assets/Logo.png';

const CommunicationLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const { 
    teachers, 
    isLoadingTeachers, 
    fetchTeachers, 
    activeTeacherId,
    setActiveTeacher 
  } = useChatStore();

  const { 
    channels, 
    isLoadingChannels, 
    fetchChannels, 
    activeChannelId,
    setActiveChannel 
  } = useChannelStore();

  useEffect(() => {
    fetchTeachers();
    fetchChannels();
  }, [fetchTeachers, fetchChannels]);

  const handleTeacherClick = (id: string) => {
    setActiveTeacher(id);
    navigate('/student/communication/chat');
  };

  const handleChannelClick = (id: string) => {
    setActiveChannel(id);
    navigate('/student/communication/channels');
  };

  const isChatActive = location.pathname.includes('/chat');
  const isChannelsActive = location.pathname.includes('/channels');

  return (
    <div className="flex h-full w-full bg-white overflow-hidden relative">
      {/* Sidebar */}
      <div className={`
        ${(activeTeacherId || activeChannelId) ? 'hidden md:flex' : 'flex'}
        w-full md:w-80 h-full border-r border-gray-100 flex-col bg-white shrink-0
      `}>
        <div className="p-6 border-b border-gray-100">
           <div className="mb-1">
              <img src={logo} alt="Grow Logo" className="h-8 w-auto object-contain" />
           </div>
           <span className="text-gray-400 text-sm">Student Chat</span>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Direct Messages Section */}
          <div className="p-4">
            <h3 className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2 px-2">
              <FiMessageCircle /> Direct Messages
            </h3>
            
            {isLoadingTeachers ? (
              <div className="text-sm text-gray-400 px-2 animate-pulse">Loading teachers...</div>
            ) : (
              <div className="space-y-1">
                {teachers.map(teacher => (
                  <button
                    key={teacher.id}
                    onClick={() => handleTeacherClick(teacher.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left ${
                      isChatActive && activeTeacherId === teacher.id
                        ? 'bg-indigo-50 border border-indigo-100'
                        : 'hover:bg-gray-50 border border-transparent'
                    }`}
                  >
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0"></div>
                      {teacher.isOnline && (
                         <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-0.5">
                        <span className="font-medium text-gray-900 text-[14px] truncate">{teacher.name}</span>
                        {/* Fake time for mockup */}
                        <span className="text-[10px] text-gray-400">10 min</span>
                      </div>
                      <p className="text-[12px] text-gray-500 truncate">{teacher.subject}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="my-2 border-t border-gray-50 mx-4"></div>

          {/* Class Channels Section */}
          <div className="p-4">
            <h3 className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2 px-2">
              <FiHash /> Class Channels
            </h3>
            
            {isLoadingChannels ? (
              <div className="text-sm text-gray-400 px-2 animate-pulse">Loading channels...</div>
            ) : (
              <div className="space-y-1">
                {channels.map(channel => (
                  <button
                    key={channel.id}
                    onClick={() => handleChannelClick(channel.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left ${
                      isChannelsActive && activeChannelId === channel.id
                        ? 'bg-indigo-50 border border-indigo-100 text-indigo-700'
                        : 'hover:bg-gray-50 border border-transparent text-gray-700'
                    }`}
                  >
                     <FiHash className={isChannelsActive && activeChannelId === channel.id ? 'text-indigo-500' : 'text-gray-400'} />
                     <span className="font-medium text-[14px] truncate">{channel.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Back to Dashboard */}
        <div className="p-6 border-t border-gray-100 shrink-0">
          <button 
            onClick={() => navigate('/student/dashboard')}
            className="flex items-center gap-2 text-[#1600D5] font-medium hover:text-indigo-800 transition"
          >
            <FiChevronLeft className="w-5 h-5" />
            Back to dashboard
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className={`
        ${(activeTeacherId || activeChannelId) ? 'flex' : 'hidden md:flex'}
        flex-1 min-w-0 min-h-0 relative flex-col overflow-hidden
      `}>
        <Outlet />
      </div>
    </div>
  );
};

export default CommunicationLayout;
