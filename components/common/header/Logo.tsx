'use client'
import * as React from 'react';
import Image from 'next/image';

export const Logo = () => {
  return (
    <>
      <Image alt='logo' width={100} height={100} src="/next.svg" />
    </>
  );
}
