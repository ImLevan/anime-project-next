'use client';

import Link from "next/link";

function UserButton({ logo, toggleSubMenu}) {

  return (
    <Link className='decoration-none text-xs font-bold text-black transition[0.3s ease] hover:text-secondary active:text-secondary' href="#" onClick={toggleSubMenu}>
      {logo}
    </Link>
  );
}

export default UserButton;