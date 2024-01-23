"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
    const { data: session } = useSession();
    const [providers, setProviders] = useState(null)
    const [toggleDropdown, setToggleDropdown] = useState(false);

    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        }
        setUpProviders();
    }, [])
    return (
        <nav className='flex-between w-full mb-18 pt-3'>
            <Link href={"/"} className='flex justify-center items-end text-xl'>
                <Image src="/assets/logo.png"
                    alt='Prompttopia Logo'
                    width={60}
                    height={60}
                    className='abject-contain' />
                <p className='logo_text'>Human Generated Prompt</p>
            </Link>

            {/* desktop */}

            <div className='sm:flex hidden '>
                {
                    session?.user ?
                        (
                            <div className='flex gap-3 md:gap-5'>
                                <Link href={"/create-prompt"} className='black_btn'>Create Post</Link>
                                <button type='button' onClick={signOut} className='outline_btn'>
                                    Sign Out
                                </button>
                                <Link href={"/profile"}>
                                    <Image src={session?.user.image}
                                        width={37}
                                        height={37}
                                        className='rounded-full'
                                        alt='profile' />
                                </Link>

                            </div>
                        ) : (
                            <>
                                {providers && Object.values(providers).map((providers) => (
                                    <button type='button'
                                        key={providers.name}
                                        onClick={() => signIn(providers.id)}
                                        className='black_btn'>Sign In</button>
                                ))}
                            </>
                        )

                }
            </div>

            {/* Mobile */}
            <div className='sm:hidden flex relative'>
                {session?.user ?
                    (<div className='flex'>
                        <Image src={session?.user.image}
                            width={37}
                            height={37}
                            className='rounded-full'
                            alt='profile'
                            onClick={() => setToggleDropdown((prev) => !prev)} />
                        {toggleDropdown && (
                            <div className='dropdown'>
                                <Link href={'/profile'}
                                    className=''
                                    onClick={() => setToggleDropdown(false)}>
                                    My Profile
                                </Link>

                                <Link href={'/create-prompt'}
                                    className='dropdown_link'
                                    onClick={() => setToggleDropdown(false)}>
                                    Create Prompt
                                </Link>
                                <button type='button'
                                    onClick={() => {
                                        setToggleDropdown(false);
                                        signIn();

                                    }}
                                    className='mt-5 w-full black_btn'
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                    )
                    :
                    (
                        <>
                            {providers && Object.values(providers).map((providers) => (
                                <button type='button'
                                    key={providers.name}
                                    onClick={() => signIn(providers.id)}
                                    className='black_btn'>Sign In</button>
                            ))}
                        </>
                    )
                }
            </div>
        </nav >

    );
};

export default Nav;
