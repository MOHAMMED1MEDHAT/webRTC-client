import { MessageCircle, Mic, MicOff, Monitor, Phone, Video, VideoOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMeetStore } from '../store/meetStore';

interface ControlsProps {
  onChatToggle: () => void;
}

export const Controls = ({ onChatToggle }: ControlsProps) => {
  const { 
    isMuted, 
    isVideoOff, 
    isScreenSharing,
    toggleAudio,
    toggleVideo,
    toggleScreenShare
  } = useMeetStore();

  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t flex items-center justify-center gap-4 px-4">
      <button
        onClick={toggleAudio}
        className={`p-3 rounded-full ${isMuted ? 'bg-red-100 text-red-600' : 'bg-gray-100 hover:bg-gray-200'}`}
      >
        {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
      </button>

      <button
        onClick={toggleVideo}
        className={`p-3 rounded-full ${isVideoOff ? 'bg-red-100 text-red-600' : 'bg-gray-100 hover:bg-gray-200'}`}
      >
        {isVideoOff ? <VideoOff size={24} /> : <Video size={24} />}
      </button>

      <button
        onClick={toggleScreenShare}
        className={`p-3 rounded-full ${isScreenSharing ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 hover:bg-gray-200'}`}
      >
        <Monitor size={24} />
      </button>

      <button
        onClick={onChatToggle}
        className="p-3 rounded-full bg-gray-100 hover:bg-gray-200"
      >
        <MessageCircle size={24} />
      </button>

      <button
        onClick={() => navigate('/')}
        className="p-3 rounded-full bg-red-500 hover:bg-red-600 text-white"
      >
        <Phone size={24} />
      </button>
    </div>
  );
};