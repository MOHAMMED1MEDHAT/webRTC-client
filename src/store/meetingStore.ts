import { create } from 'zustand';

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
    //this line represents the fetch step from the backed to create a meeting and get it's id in return
    // const meetingId = fetch
    const meetingId='testId'
    set({ currentMeetingId: meetingId });
    return meetingId;
  },
  
  joinMeeting: async (meetingId) => {
    //this line must be replaced with the a fetch logic from the backend
    // const querySnapshot = await getDoc(doc(meetingsRef, meetingId));
    const querySnapshot = {test:'test',exists:()=>{return true}}
    
    if (querySnapshot.exists()) {
      set({ currentMeetingId: meetingId });
      return true;
    }
    return false;
  }
}));