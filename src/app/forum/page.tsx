"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface Post {
  id: string;
  title: string;
  author: {
    fullName: string | null;
  };
}

export default function ForumPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/forum/posts');
      if (!response.ok) throw new Error('Failed to fetch posts');
      const data = await response.json();
      setPosts(data.posts);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreatePost = async () => {
    try {
      const response = await fetch('/api/forum/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newPostTitle, content: newPostContent }),
      });
      if (!response.ok) throw new Error('Failed to create post');
      setNewPostTitle('');
      setNewPostContent('');
      fetchPosts(); // Refresh posts list
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white items-center p-4">
      <div className="w-full max-w-4xl">
        <Card className="bg-gray-800 border-gray-700 mb-6">
          <CardHeader>
            <CardTitle>Create New Post</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Post Title"
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              className="bg-gray-700 border-gray-600"
            />
            <Textarea
              placeholder="What's on your mind?"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              className="bg-gray-700 border-gray-600"
            />
            <Button onClick={handleCreatePost}>Create Post</Button>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle>Community Forum</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p>Loading posts...</p>
            ) : (
              <div className="space-y-4">
                {posts.map((post) => (
                  <Link key={post.id} href={`/forum/post/${post.id}`} passHref>
                    <div className="block p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                      <h3 className="font-bold text-lg">{post.title}</h3>
                      <p className="text-sm text-gray-400">by {post.author.fullName || 'Anonymous'}</p>
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
