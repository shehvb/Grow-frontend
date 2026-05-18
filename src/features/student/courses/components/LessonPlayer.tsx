import { type FC } from 'react';
import type { TeacherLesson } from '../../../../types/course'; // Assuming the API returns full details for the active lesson

interface LessonPlayerProps {
  lesson: TeacherLesson | null; // Detailed lesson with video_url and content
}

export const LessonPlayer: FC<LessonPlayerProps> = ({ lesson }) => {
  if (!lesson) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-white rounded-3xl border border-gray-100 p-12 text-center min-h-[600px]">
        <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Select a Lesson</h3>
        <p className="text-gray-500">Choose a lesson from the sidebar to start learning.</p>
      </div>
    );
  }

  const getEmbedUrl = (url: string): string | null => {
    if (!url) return null;
    let safeUrl = url.trim();
    if (!/^https?:\/\//i.test(safeUrl)) {
      safeUrl = 'https://' + safeUrl;
    }
    try {
      const parsed = new URL(safeUrl);
      if (parsed.hostname.includes('youtu.be')) {
        const videoId = parsed.pathname.substring(1);
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
      }
      if (parsed.hostname.includes('youtube.com')) {
        if (parsed.pathname.startsWith('/embed/')) {
          return safeUrl;
        }
        const videoId = parsed.searchParams.get('v');
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
      }
      if (parsed.hostname.includes('vimeo.com')) {
        const parts = parsed.pathname.split('/');
        const videoId = parts[parts.length - 1];
        return videoId ? `https://player.vimeo.com/video/${videoId}` : null;
      }
    } catch (e) {
      console.error("Failed to parse video URL:", e);
    }
    return url;
  };

  const embedUrl = getEmbedUrl(lesson.video_url || '');

  return (
    <div className="flex-1 bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm flex flex-col">
      {/* Video Player Area */}
      <div className="w-full aspect-video bg-gray-900 relative">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title={lesson.title}
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-white/50">
            No video available for this lesson.
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-8 flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-gray-900 mb-6">{lesson.title}</h2>
          
          <div className="prose prose-indigo max-w-none">
            {/* If the content is markdown or HTML, it would normally be parsed here. We'll just render it as text or basic HTML for now */}
            <div dangerouslySetInnerHTML={{ __html: (lesson.content || '').replace(/\n/g, '<br/>') }} />
          </div>
        </div>
      </div>
    </div>
  );
};
