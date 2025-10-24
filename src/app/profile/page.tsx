"use client";

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface UserProfile {
  fullName: string | null;
  points: number;
  badges: { badge: Badge }[];
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/profile');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProfile(data.user);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white items-center p-4">
      <Card className="w-full max-w-2xl bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            {profile?.fullName || 'Your Profile'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-center">Loading profile...</p>
          ) : profile ? (
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-4xl font-bold">{profile.points}</p>
                <p className="text-gray-400">Points</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Badges</h3>
                <div className="grid grid-cols-3 gap-4">
                  {profile.badges.map(({ badge }) => (
                    <div key={badge.id} className="flex flex-col items-center text-center p-4 bg-gray-700 rounded-lg">
                      <span className="text-4xl">{badge.icon}</span>
                      <p className="font-bold mt-2">{badge.name}</p>
                      <p className="text-xs text-gray-400">{badge.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center">Could not load your profile.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
