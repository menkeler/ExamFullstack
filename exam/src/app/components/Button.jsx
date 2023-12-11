import React from 'react';
import Link from 'next/link';

const Button = ({ to, text, className }) => {
  return (
    <Link href={to}>
        {text}

    </Link>
  );
};

export default Button;
