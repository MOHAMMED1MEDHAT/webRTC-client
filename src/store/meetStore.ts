import { create } from 'zustand';

interface MeetStore {
  localStream: MediaStream | null;
  remoteStreams: Map<string, MediaStream>;
  isMuted: boolean;
  isVideoOff: boolean;
  isScreenSharing: boolean;
  messages: Message[];
  setLocalStream: (stream: MediaStream | null) => void;
  addRemoteStream: (peerId: string, stream: MediaStream) => void;
  removeRemoteStream: (peerId: string) => void;
  toggleAudio: () => void;
  toggleVideo: () => void;
  toggleScreenShare: () => void;
  addMessage: (message: Message) => void;
}

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
}

export const useMeetStore = create<MeetStore>((set) => ({
  localStream: null,
  remoteStreams: new Map(),
  isMuted: false,
  isVideoOff: false,
  isScreenSharing: false,
  messages: [],
  
  setLocalStream: (stream) => set({ localStream: stream }),
  
  addRemoteStream: (peerId, stream) => 
    set((state) => {
      const newStreams = new Map(state.remoteStreams);
      newStreams.set(peerId, stream);
      return { remoteStreams: newStreams };
    }),
    
  removeRemoteStream: (peerId) =>
    set((state) => {
      const newStreams = new Map(state.remoteStreams);
      newStreams.delete(peerId);
      return { remoteStreams: newStreams };
    }),
    
  toggleAudio: () =>
    set((state) => {
      if (state.localStream) {
        state.localStream.getAudioTracks().forEach(track => {
          track.enabled = !track.enabled;
        });
      }
      return { isMuted: !state.isMuted };
    }),
    
  toggleVideo: () =>
    set((state) => {
      if (state.localStream) {
        state.localStream.getVideoTracks().forEach(track => {
          track.enabled = !track.enabled;
        });
      }
      return { isVideoOff: !state.isVideoOff };
    }),
    
  toggleScreenShare: () =>
    set((state) => ({ isScreenSharing: !state.isScreenSharing })),
    
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
}));