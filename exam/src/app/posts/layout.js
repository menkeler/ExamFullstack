import React from 'react';
import '@/app/globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

const NonRootLayout = ({ children }) => {
  return (
    <div className={`font-${inter.fontFamily} ${inter.className}`}>
      {children}
    </div>
  );
};

export default NonRootLayout;
