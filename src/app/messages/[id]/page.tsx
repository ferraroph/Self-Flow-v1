"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

interface Message {
  id: string;
  content: string;
  sender: {
    id: string;
    fullName: string | null;
  };
}

interface Conversation {
  id: string;
  messages: Message[];
}

export default function ConversationPage() {
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newMessageContent, setNewMessageContent] = useState('');
  const params = useParams();
  const conversationId = params.id as string;

  const fetchConversation = async () => {
    if (!conversationId) return;
    setIsLoading(true);
    try {
      const response = await fetch(`/api/messages/conversations/${conversationId}`);
      if (!response.ok) throw new Error('Failed to fetch conversation');
      const data = await response.json();
      setConversation(data.conversation);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConversation();
  }, [conversationId]);

  const handleSendMessage = async () => {
    try {
      const response = await fetch(`/api/messages/conversations/${conversationId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newMessageContent }),
      });
      if (!response.ok) throw new Error('Failed to send message');
      setNewMessageContent('');
      fetchConversation(); // Refresh messages
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) return <p className="text-white text-center p-8">Loading conversation...</p>;
  if (!conversation) return <p className="text-white text-center p-8">Conversation not found.</p>;

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white p-4">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {conversation.messages.map((message) => (
          <Card key={message.id} className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <p className="font-bold">{message.sender.fullName || 'Anonymous'}</p>
              <p>{message.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex space-x-4">
        <Textarea
          placeholder="Type your message..."
          value={newMessageContent}
          onChange={(e) => setNewMessageContent(e.target.value)}
          className="bg-gray-700 border-gray-600"
        />
        <Button onClick={handleSendMessage}>Send</Button>
      </div>
    </div>
  );
}
