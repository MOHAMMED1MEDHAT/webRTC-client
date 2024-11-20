import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { Chat } from '../components/Chat';
import { Controls } from '../components/Controls';
import { VideoGrid } from '../components/VideoGrid';
import { useAuthStore } from '../store/authStore';
import { useMeetStore } from '../store/meetStore';
import { useMeetingStore } from '../store/meetingStore';

export const Meeting = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = React.useState(false);
  const { setLocalStream } = useMeetStore();
  const { joinMeeting, currentMeetingId } = useMeetingStore();
  const { user } = useAuthStore();

  React.useEffect(() => {
    const initializeMeeting = async () => {
      // if (id && user) {
      const id='testId'
        const exists = await joinMeeting(id);
        if (!exists) {
          toast.error('Meeting not found');
          navigate('/');
          return;
        }

        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
          });
          setLocalStream(stream);
        } catch (error) {
          console.error('Error accessing media devices:', error);
          toast.error('Could not access camera or microphone');
        }
      // }
    };

    initializeMeeting();

    return () => {
      useMeetStore.getState().localStream?.getTracks().forEach(track => track.stop());
    };
  }, [id, user]);

  const copyMeetingId = () => {
    navigator.clipboard.writeText(currentMeetingId || '');
    toast.success('Meeting ID copied to clipboard');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">Video Meeting</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Meeting ID:</span>
            <code className="px-2 py-1 bg-gray-100 rounded text-sm">{currentMeetingId}</code>
            <button
              onClick={copyMeetingId}
              className="text-blue-600 hover:text-blue-700 text-sm"
            >
              Copy
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-7xl pb-20">
        <VideoGrid />
      </main>

      <Controls onChatToggle={() => setIsChatOpen(!isChatOpen)} />
      <Chat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};