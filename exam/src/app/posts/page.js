"use client"
import React, { useState, useEffect } from 'react';
import Navbar from '@/app/components/Navbar';
import Post from '@/app/components/Post';

const PostsPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/posts');
        const data = await response.json();
        setPosts(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="container mx-auto my-8">
        <h1 className="text-3xl font-semibold mb-4">All Posts</h1>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {posts.map((post) => (
            <li key={post.id} className="bg-white p-4 rounded shadow">
              <Post postId = {post.id} title={post.title} author={post.author} body={post.body} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PostsPage;