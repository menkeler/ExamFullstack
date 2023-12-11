import React from 'react';
import Link from 'next/link';
import '@/app/globals.css'

const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
       <Link href="/posts" className="btn btn-ghost text-xl">
        daisyUI
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu  menu-horizontal px-1">
          <li>
            <Link href="/posts">
              Posts
            </Link>
          </li>
          <li>
            <Link href="/">
              Create Post
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
