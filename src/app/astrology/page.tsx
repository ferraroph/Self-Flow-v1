"use client";

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Horoscope {
  current_date: string;
  description: string;
  compatibility: string;
  mood: string;
  color: string;
  lucky_number: string;
  lucky_time: string;
}

export default function AstrologyPage() {
  const [horoscope, setHoroscope] = useState<Horoscope | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    const fetchHoroscope = async () => {
      try {
        const response = await fetch('/api/astrology', {
          method: 'POST',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setHoroscope(data.horoscope);
      } catch (error) {
        console.error('Error fetching horoscope:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchHoroscope();
    }
  }, [user]);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white justify-center items-center">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Daily Horoscope</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-center">Loading your horoscope...</p>
          ) : horoscope ? (
            <div className="space-y-4">
              <p className="text-center">{horoscope.description}</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-bold">Compatibility:</span> {horoscope.compatibility}
                </div>
                <div>
                  <span className="font-bold">Mood:</span> {horoscope.mood}
                </div>
                <div>
                  <span className="font-bold">Color:</span> {horoscope.color}
                </div>
                <div>
                  <span className="font-bold">Lucky Number:</span> {horoscope.lucky_number}
                </div>
                <div>
                  <span className="font-bold">Lucky Time:</span> {horoscope.lucky_time}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center">Could not load your horoscope. Please make sure you have completed the onboarding.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
