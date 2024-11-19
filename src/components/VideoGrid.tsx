import React from 'react';
import { useMeetStore } from '../store/meetStore';

export const VideoGrid = () => {
  const { localStream, remoteStreams } = useMeetStore();
  
  React.useEffect(() => {
    if (localStream) {
      const localVideo = document.getElementById('localVideo') as HTMLVideoElement;
      if (localVideo) {
        localVideo.srcObject = localStream;
      }
    }
  }, [localStream]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
        <video
          id="localVideo"
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-2 left-2 bg-gray-900/60 px-2 py-1 rounded text-white text-sm">
          You
        </div>
      </div>
      
      {Array.from(remoteStreams).map(([peerId, stream]) => (
        <div key={peerId} className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
          <video
            autoPlay
            playsInline
            ref={(video) => {
              if (video) video.srcObject = stream;
            }}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2 left-2 bg-gray-900/60 px-2 py-1 rounded text-white text-sm">
            Participant
          </div>
        </div>
      ))}
    </div>
  );
};