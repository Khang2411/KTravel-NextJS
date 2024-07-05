'use client'
import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const Logo = () => {
  return (
    <>
      <Link href={'/'}>
        <Image alt='logo' width={100} height={100} src="/app-logo.png" />
      </Link>
    </>
  );
}
