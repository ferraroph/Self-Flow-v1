"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Conversation {
  id: string;
  participants: {
    id: string;
    fullName: string | null;
  }[];
}

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await fetch('/api/messages/conversations');
        if (!response.ok) throw new Error('Failed to fetch conversations');
        const data = await response.json();
        setConversations(data.conversations);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchConversations();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white items-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle>Your Conversations</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p>Loading conversations...</p>
            ) : (
              <div className="space-y-4">
                {conversations.map((convo) => (
                  <Link key={convo.id} href={`/messages/${convo.id}`} passHref>
                    <div className="block p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                      {/* This assumes two participants for simplicity */}
                      <h3 className="font-bold">
                        Conversation with {convo.participants[0]?.fullName || 'Anonymous'}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
