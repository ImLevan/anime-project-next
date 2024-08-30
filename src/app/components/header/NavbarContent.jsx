'use client';
import { PublicRoutes } from '@/app/routes/routes';
//import { logOut } from '@/app/utilities/cookies.utilities';
import Link from "next/link";
import UserButton from "./UserButton";
import { FaSignOutAlt, FaTimes, FaUser, FaOutdent } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { logOut } from '@/libs/api-methods';

function NavbarContent({ isAuthenticated, usernameC, rightNavbarItems }) {
    const pathName = usePathname();
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMobile = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const toggleSubMenu = () => {
        setIsSubMenuOpen(!isSubMenuOpen);
    };

    const handleLogOut = async () => {
        //router.push("/");
        const response = await logOut();
        if (response.auth) {
            router.refresh();
        }
        else {
            console.log(response.message);
        }
        toggleSubMenu();
    }

    return (
        <ul className="flex items-center justify-center md:flex md:justify-between">
            {/* Hidden navbar elements on mobile screens */}
            <div className="hidden md:flex">
                {rightNavbarItems.map((item) => (
                    <li className="list-none px-4 relative" key={item.path}>
                        <Link
                            className="decoration-none text-base font-bold text-black transition[0.3s ease] hover:text-secondary active:text-secondary"
                            href={item.path}
                        >
                            {item.name}
                        </Link>
                    </li>
                ))}
                {!isAuthenticated && (
                    <li className="list-none px-4 relative">
                        <UserButton logo={<FaUser size={18} />} toggleSubMenu={toggleSubMenu} />
                        {isSubMenuOpen && (
                            <ul className="absolute right-20 top-[58px] bg-zinc-950 z-10 -mr-20 w-[24.25rem] h-[20rem]">
                                <div className='h-full '>
                                    <li className='list-none relative h-14'>
                                        <Link onClick={toggleSubMenu} className='text-white block decoration-none text-xs font-bold transition[0.3s ease] hover:text-secondary active:text-secondary' href={`/${PublicRoutes.REGISTER}`}>
                                            <div className='h-14 w-[24.25rem] hover:bg-gray-900'>
                                                <p className='pt-4 pl-4 text-base'>Crear una cuenta</p>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className='list-none relative'>
                                        <Link onClick={toggleSubMenu} className='decoration-none text-xs font-bold text-white transition[0.3s ease] hover:text-secondary active:text-secondary' href={`/${PublicRoutes.LOGIN}`}>
                                            <div className='h-14 w-[24.25rem] hover:bg-gray-900'>
                                                <p className='pt-4 pl-4 text-base'>Acceder</p>
                                            </div>
                                        </Link>
                                    </li>
                                </div>
                            </ul>
                        )}
                    </li>
                )}
                {isAuthenticated && (
                    <li className="list-none px-4 relative">
                        <UserButton logo={<MdAccountCircle size={28} />} toggleSubMenu={toggleSubMenu} />
                        {isSubMenuOpen && (
                            <ul className="absolute right-20 top-[62px] bg-zinc-950 z-10 -mr-20 w-[24.25rem] h-[20rem]">
                                <div className='h-full mt-4'>
                                    <p className='text-white pl-6 text-base'>Hola!, bienvenido {usernameC} </p>
                                    <li className='list-none relative'>
                                        <div className='flex w-full hover:bg-gray-800 py-2'>
                                            <button className='flex w-full bg-none ml-1 cursor-pointer bg-inherit border-0 border-none' onClick={handleLogOut}>
                                                <p className='text-base pt-[10px] pl-2 text-white'><FaSignOutAlt color='white' /></p>
                                                <p className='text-base mt-[-2.7px] pt-2 pl-2 text-white'>Cerrar sesión</p>
                                            </button>
                                        </div>
                                    </li>
                                </div>
                            </ul>
                        )}
                    </li>
                )}
            </div>

            {/* FaTimes icon on mobile screens */}
            <div className="md:hidden align-center">
                <Link
                    className="decoration-none text-xs font-bold text-black transition[0.3s ease] hover:text-secondary active:text-secondary"
                    href="#"
                    onClick={toggleMobile}
                >
                    <FaOutdent id="bar" size={22} />
                </Link>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="absolute top-0 left-0 w-full h-screen bg-tertiary z-10">
                    <ul className="flex flex-col p-4">
                        {rightNavbarItems.map((item) => (
                            <li className="list-none" key={item.path}>
                                <Link
                                    className="decoration-none text-base font-bold text-black transition[0.3s ease] hover:text-secondary active:text-secondary"
                                    href={item.path}
                                    onClick={toggleMobile}
                                >
                                    <div className='h-14 w-[24.25rem] hover:bg-gray-900'>
                                        <p className='pt-4 pl-4 text-base'>{item.name}</p>
                                    </div>
                                </Link>
                            </li>
                        ))}
                        {!isAuthenticated && (
                            <div>
                                <li className='list-none relative h-14'>
                                    <Link onClick={toggleMobile} className='decoration-none text-base font-bold text-black transition[0.3s ease] hover:text-secondary active:text-secondary' href={`/${PublicRoutes.REGISTER}`}>
                                        <div className='h-14 w-[24.25rem] hover:bg-gray-900'>
                                            <p className='pt-4 pl-4 text-base'>Crear una cuenta</p>
                                        </div>
                                    </Link>
                                </li>
                                <li className='list-none relative'>
                                    <Link onClick={toggleMobile} className='decoration-none text-base font-bold text-black transition[0.3s ease] hover:text-secondary active:text-secondary' href={`/${PublicRoutes.LOGIN}`}>
                                        <div className='h-14 w-[24.25rem] hover:bg-gray-900'>
                                            <p className='pt-4 pl-4 text-base'>Acceder</p>
                                        </div>
                                    </Link>
                                </li>
                                <li className='list-none relative'>
                                    <Link onClick={toggleMobile} href="#" className='decoration-none text-base font-bold text-black transition[0.3s ease] hover:text-secondary active:text-secondary'>
                                        <div className='h-14 w-[24.25rem] hover:bg-gray-900'>
                                            <p className='pt-4 pl-4 text-base'>
                                                <FaTimes size={22} />
                                            </p>
                                        </div>
                                    </Link>
                                </li>
                            </div>
                        )}
                        {isAuthenticated && (
                            <div>
                                <li className='list-none relative'>
                                    <div className='decoration-none text-base font-bold text-black transition[0.3s ease] hover:text-secondary active:text-secondar'>
                                        <div className='h-14 w-[24.25rem] hover:bg-gray-900'>
                                            <p className='pt-4 pl-4 text-base'>Hola!, bienvenido {usernameC} </p>
                                        </div>
                                    </div>
                                </li>
                                <li className='list-none relative'>
                                    <div className='decoration-none text-base font-bold text-black transition[0.3s ease] hover:text-secondary active:text-secondar'>
                                        <div className='h-14 w-[24.25rem] hover:bg-gray-900'>
                                            <button className='flex w-full bg-none ml-1 cursor-pointer bg-inherit border-0 border-none' onClick={handleLogOut}>
                                                <p className='text-base pt-[10px] pl-2'><FaSignOutAlt color='black' /></p>
                                                <p className='text-base mt-[-2.7px] pt-2 pl-2'>Cerrar sesión</p>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                                <li className='list-none relative'>
                                    <Link onClick={toggleMobile} href="#" className='decoration-none text-base font-bold text-black transition[0.3s ease] hover:text-secondary active:text-secondary'>
                                        <div className='h-14 w-[24.25rem] hover:bg-gray-900'>
                                            <p className='pt-4 pl-4 text-base'>
                                                <FaTimes size={22} />
                                            </p>
                                        </div>
                                    </Link>
                                </li>
                            </div>
                        )}
                    </ul>
                </div>
            )}
        </ul>
    );
}

export default NavbarContent;