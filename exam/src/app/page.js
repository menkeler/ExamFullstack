"use client";
import React, { useState } from 'react';
import Navbar from '@/app/components/Navbar';
import Link from 'next/link';

const Page = () => {
  const [postFields, setPostFields] = useState({
    author: '',
    title: '',
    body: '',
  });

  const handleInputChange = (field, value) => {
    setPostFields((prev) => ({ ...prev, [field]: value }));
  };

  const isFormEmpty = Object.values(postFields).some((value) => value.trim() === '');

  const handlePostSubmit = async () => {
    if (isFormEmpty) {
      return; // Do not submit if any field is empty
    }

    try {
      const response = await fetch('/api/posts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postFields),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Post submitted:', data);

      setPostFields({ author: '', title: '', body: '' });
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        <Navbar />
        <div className="max-w-2xl mx-auto mt-8">
          <h1 className="text-3xl font-semibold mb-4">Make a post here</h1>

          <form className="space-y-4">
            {Object.keys(postFields).map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700">
                  {field.charAt(0).toUpperCase() + field.slice(1)}:
                </label>
                <input
                  type="text"
                  value={postFields[field]}
                  onChange={(e) => handleInputChange(field, e.target.value)}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
            ))}

            {isFormEmpty ? (
              <p className="text-red-500">Fill in the form first</p>
            ) : (
              <div>
                <Link href="/posts" className="btn btn-neutral" onClick={handlePostSubmit}>

                    Submit Post
   
                </Link>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;