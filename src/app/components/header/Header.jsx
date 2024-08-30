import Image from "next/image";
import Link from "next/link";
import logo from "@/app/assets/imgs/logo.png";
import Navbar from "./Navbar";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';

async function Header() {
  let isAuthenticated = false;
  let usernameC = null;

  const token = cookies().get('loginToken');

  if(token){
    const decoded = jwt.decode(token.value);
    usernameC = decoded.username;
    isAuthenticated = true;
  }

  return (
    <section className="md:[ flex align-center justify-between bg-primary z-50 sticky top-0 left-0 h-14 ] max-w-[100vw] lg:h-24">
      <div className=" group flex h-full w-full items-center justify-between max-w-7xl mx-auto">
        <div className="flex">
          <Link href={"/"}>
            <Image src={logo} className="w-16 h-full" alt="logo" priority={true}/>
          </Link>
        </div>
        <Navbar isAuthenticated={isAuthenticated} usernameC={usernameC} />
      </div>
    </section>
  );
}

export default Header;