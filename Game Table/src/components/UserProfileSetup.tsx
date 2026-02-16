import { useState } from 'react';
import { User } from '../App';

const AVATAR_OPTIONS = [
  '🦊', '🐼', '🐯', '🦁', '🐸', '🐙', '🦉', '🐺',
  '🦄', '🐲', '🦇', '🐻', '🦈', '🐧', '🦩', '🦚'
];

interface UserProfileSetupProps {
  onComplete: (user: User) => void;
}

export function UserProfileSetup({ onComplete }: UserProfileSetupProps) {
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_OPTIONS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onComplete({ name: name.trim(), avatar: selectedAvatar });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-900">Welcome to Game Lobby</h1>
        <p className="text-center text-gray-600 mb-8">Create your profile to get started</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Your Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Choose Your Avatar
            </label>
            <div className="grid grid-cols-8 gap-2">
              {AVATAR_OPTIONS.map((avatar) => (
                <button
                  key={avatar}
                  type="button"
                  onClick={() => setSelectedAvatar(avatar)}
                  className={`text-3xl p-2 rounded-lg transition hover:scale-110 ${
                    selectedAvatar === avatar
                      ? 'bg-indigo-100 ring-2 ring-indigo-500'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {avatar}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            Enter Lobby
          </button>
        </form>
      </div>
    </div>
  );
}