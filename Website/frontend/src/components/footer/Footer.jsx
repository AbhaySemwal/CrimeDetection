import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-slate-800 py-8'>
        <div className='flex gap-5 w-full items-center justify-center'>
            <Link href={"#"}><Image className='w-[40px] h-[40px]' width={1000} height={1000} src={"/ig.png"}></Image></Link>
            <Link href={"#"}><Image className='w-[50px] h-[50px]' width={1000} height={1000} src={"/fb.png"}></Image></Link>
            <Link href={"#"}><Image className='w-[50px] h-[50px]' width={1000} height={1000} src={"/x.png"}></Image></Link>
            <Link href={"#"}><Image className='w-[40px] h-[40px]' width={1000} height={1000} src={"/discord.png"}></Image></Link>
        </div>
        <h3 className='text-center font-light text-white pt-5'>© 2024 Abhay Semwal All rights reserved.</h3>
    </footer>
  )
}

export default Footer