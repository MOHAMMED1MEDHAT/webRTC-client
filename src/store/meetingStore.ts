import { create } from 'zustand';
import { db } from '../lib/firebase';
import { 
  collection, 
  addDoc, 
  getDoc, 
  doc, 
  updateDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

interface MeetingStore {
  createMeeting: () => Promise<string>;
  joinMeeting: (meetingId: string) => Promise<boolean>;
  currentMeetingId: string | null;
  setCurrentMeetingId: (id: string | null) => void;
}

export const useMeetingStore = create<MeetingStore>((set) => ({
  currentMeetingId: null,
  setCurrentMeetingId: (id) => set({ currentMeetingId: id }),
  
  createMeeting: async () => {
    const meetingId = uuidv4().substring(0, 8);
    await addDoc(collection(db, 'meetings'), {
      meetingId,
      createdAt: serverTimestamp(),
      participants: []
    });
    set({ currentMeetingId: meetingId });
    return meetingId;
  },
  
  joinMeeting: async (meetingId) => {
    const meetingsRef = collection(db, 'meetings');
    const querySnapshot = await getDoc(doc(meetingsRef, meetingId));
    
    if (querySnapshot.exists()) {
      set({ currentMeetingId: meetingId });
      return true;
    }
    return false;
  }
}));