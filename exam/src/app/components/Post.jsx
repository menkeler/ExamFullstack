'use client'
import React from 'react'
import Button from './Button'

const Post = ({postId ,title, body, author}) => {
  return (
    <div className='border border-gray-100 p-4 flex flex-col'>
      <h1 className='font-bold text-xl'>{title}</h1>
      <span className='text-lg mb-3'>by {author}</span>
      <p className='text-base'>{body}</p>
      <div className='w-full flex flex-row-reverse'>
        <Button to={`/posts/${postId}`} text="Go to Post" className="mt-4" />
      </div>
    </div>
  )
}

export default Post
