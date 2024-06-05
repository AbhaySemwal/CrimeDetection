"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Navbar = () => {
    const [navbg, setNavBg] = useState(false); // Initial state doesn't depend on window

    const changeNavBg = () => {
      window.scrollY >= 50 ? setNavBg(true) : setNavBg(false);
    }
  
    useEffect(() => {
      changeNavBg();
      window.addEventListener('scroll', changeNavBg);
      return () => window.removeEventListener('scroll', changeNavBg);
    }, [])
  

  return (
    <div onScroll={changeNavBg} className={`fixed flex justify-between items-center w-full py-3 px-20 text-white transition duration-300 ease-in-out ${navbg ? "bg-black" : "bg-gray-500/15"}`}>
      <div className='flex justify-between w-full'>
        <div className='w-[40%]'>
          <Link href="/" className='font-semibold text-2xl'>Crime Detection</Link>
        </div>
        <div className='flex items-center justify-between w-[60%]'>
          <Link href="/">Home</Link>
          <Link href="#features">Features</Link>
          <Link href="#cd">Crime Detector</Link>
          <Link href="#benefits">Benefits</Link>
          <Link href="#contact">Contact Us</Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
