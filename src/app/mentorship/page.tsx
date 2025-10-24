"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Mentor {
  id: string;
  fullName: string | null;
  points: number;
}

export default function MentorshipPage() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await fetch('/api/mentorship/mentors');
        if (!response.ok) throw new Error('Failed to fetch mentors');
        const data = await response.json();
        setMentors(data.mentors);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMentors();
  }, []);

  const handleBecomeMentor = async () => {
    // Logic to become a mentor
  };

  const handleRequestMentorship = async (mentorId: string) => {
    // Logic to request mentorship
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white items-center p-4">
      <div className="w-full max-w-2xl">
        <Button onClick={handleBecomeMentor} className="mb-6">
          Become a Mentor
        </Button>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle>Find a Mentor</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p>Loading mentors...</p>
            ) : (
              <div className="space-y-4">
                {mentors.map((mentor) => (
                  <div key={mentor.id} className="flex justify-between items-center p-4 bg-gray-700 rounded-lg">
                    <div>
                      <p className="font-bold">{mentor.fullName || 'Anonymous'}</p>
                      <p className="text-sm text-gray-400">{mentor.points} points</p>
                    </div>
                    <Button onClick={() => handleRequestMentorship(mentor.id)}>
                      Request Mentorship
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
