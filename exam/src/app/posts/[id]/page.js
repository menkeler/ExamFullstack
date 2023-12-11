"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '@/app/components/Navbar';
import Link from 'next/link';

const Posts = ({ params }) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editedPost, setEditedPost] = useState({
    title: '',
    body: '',
  });
  
  const fetchData = async () => { 
    try {
      const response = await fetch(`/api/posts/${params.id}`);
      const data = await response.json();

      if (response.ok) {
        setPost(data);
        setEditedPost({
          title: data.title,
          body: data.body,
        });
      } else {
        console.error('Error fetching post:', data.error);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching post:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/posts/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedPost),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Post updated successfully:', data);
        setEditing(false);
        fetchData();
      } else {
        console.error('Error updating post:', data.error);
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/posts/${params.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Post deleted successfully');
        // Navigate to the "/posts" page
      } else {
        const data = await response.json();
        console.error('Error deleting post:', data.error);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };

  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        <Navbar />
        <div className="max-w-2xl mx-auto my-8">
          {loading ? (
            <p className="text-2xl text-center">Loading...</p>
          ) : post ? (
            <div className="bg-white p-8 rounded shadow-md flex flex-col items-center">
              {!editing ? (
                <>
                  <h2 className="text-3xl font-bold mb-4">Title: {post.title}</h2>
                  <p className="text-gray-600">Author: {post.author}</p>
                  <p className="text-gray-800 mt-4">Body:</p>
                  <p className="text-gray-800 mt-4">{post.body}</p>
                  <div className="flex space-x-2 mt-4">
                    <button className="btn btn-neutral" onClick={toggleEditing}>
                      EDIT
                    </button>
                    <Link href="/posts" className="btn btn-danger" onClick={handleDelete}>
                       DELETE  
                    </Link>
                  </div>
                </>
              ) : (
                <form onSubmit={handleEditSubmit} className="flex flex-col items-center mt-4">
                  <label htmlFor="title" className="text-gray-800 mb-2">
                    New Title:
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={editedPost.title}
                    onChange={handleInputChange}
                    className="input"
                  />
                  <label htmlFor="body" className="text-gray-800 mt-2 mb-2">
                    New Body:
                  </label>
                  <textarea
                    id="body"
                    name="body"
                    value={editedPost.body}
                    onChange={handleInputChange}
                    className="textarea"
                  />
                  <button type="submit" className="btn btn-neutral mt-4">
                    Save Changes
                  </button>
                  <button type="button" className="btn btn-neutral mt-2" onClick={toggleEditing}>
                    Cancel
                  </button>
                </form>
              )}
            </div>
          ) : (
            <p className="text-2xl text-center text-red-500">Post not found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Posts;
