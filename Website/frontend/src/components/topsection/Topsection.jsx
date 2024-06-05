import Link from 'next/link'
import React from 'react'

const Topsection = () => {
  return (
    <section className='text-white'>
        <div className='flex flex-col items-center gap-5 pt-28'>
            <h1 className='text-5xl font-semibold'>Advanced Crime Detection Through CCTV</h1>
            <h3 className='text-3xl font-light'>Leveraging AI to Enhance Security</h3>
            <div className='absolute bottom-14'>
            <Link href={"#cd"} className='bg-gray-700 text-lg rounded-md py-2 px-6 border-[1px] border-white font-semibold'>Get Started</Link>
            </div>
        </div>
    </section>
  )
}

export default Topsection