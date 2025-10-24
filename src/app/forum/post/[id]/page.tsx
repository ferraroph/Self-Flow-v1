"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

interface Reply {
  id: string;
  content: string;
  author: {
    fullName: string | null;
  };
}

interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    fullName: string | null;
  };
  replies: Reply[];
}

export default function PostPage() {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newReplyContent, setNewReplyContent] = useState('');
  const params = useParams();
  const postId = params.id as string;

  const fetchPost = async () => {
    if (!postId) return;
    setIsLoading(true);
    try {
      const response = await fetch(`/api/forum/posts/${postId}`);
      if (!response.ok) throw new Error('Failed to fetch post');
      const data = await response.json();
      setPost(data.post);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const handleCreateReply = async () => {
    try {
      const response = await fetch(`/api/forum/posts/${postId}/replies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newReplyContent }),
      });
      if (!response.ok) throw new Error('Failed to create reply');
      setNewReplyContent('');
      fetchPost(); // Refresh post and replies
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) return <p className="text-white text-center p-8">Loading post...</p>;
  if (!post) return <p className="text-white text-center p-8">Post not found.</p>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white items-center p-4">
      <div className="w-full max-w-4xl">
        <Card className="bg-gray-800 border-gray-700 mb-6">
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
            <p className="text-sm text-gray-400">by {post.author.fullName || 'Anonymous'}</p>
          </CardHeader>
          <CardContent>
            <p>{post.content}</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700 mb-6">
          <CardHeader>
            <CardTitle>Replies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {post.replies.map((reply) => (
              <div key={reply.id} className="p-4 bg-gray-700 rounded-lg">
                <p>{reply.content}</p>
                <p className="text-xs text-gray-400 mt-2">by {reply.author.fullName || 'Anonymous'}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle>Post a Reply</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Share your thoughts..."
              value={newReplyContent}
              onChange={(e) => setNewReplyContent(e.target.value)}
              className="bg-gray-700 border-gray-600"
            />
            <Button onClick={handleCreateReply}>Reply</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
