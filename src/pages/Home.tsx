import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Video, UserPlus, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useMeetingStore } from '../store/meetingStore';
import toast from 'react-hot-toast';

export const Home = () => {
  const { user, signOut } = useAuthStore();
  const { createMeeting, joinMeeting } = useMeetingStore();
  const [meetingId, setMeetingId] = React.useState('');
  const navigate = useNavigate();

  const handleCreateMeeting = async () => {
    const id = await createMeeting();
    navigate(`/meeting/${id}`);
  };

  const handleJoinMeeting = async (e: React.FormEvent) => {
    e.preventDefault();
    const exists = await joinMeeting(meetingId);
    if (exists) {
      navigate(`/meeting/${meetingId}`);
    } else {
      toast.error('Meeting not found');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Video className="h-8 w-8 text-blue-500" />
            <h1 className="text-xl font-semibold text-gray-900">Video Meet</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user?.email}</span>
            <button
              onClick={signOut}
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Create a Meeting</h2>
            <button
              onClick={handleCreateMeeting}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Video size={20} />
              New Meeting
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Join a Meeting</h2>
            <form onSubmit={handleJoinMeeting} className="space-y-4">
              <div>
                <label htmlFor="meetingId" className="sr-only">
                  Meeting ID
                </label>
                <input
                  type="text"
                  id="meetingId"
                  value={meetingId}
                  onChange={(e) => setMeetingId(e.target.value)}
                  placeholder="Enter meeting ID"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <UserPlus size={20} />
                Join Meeting
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};