import Image from 'next/image'
import React from 'react'

const Features = () => {
  return (
    <section id='features' className='mx-auto w-9/12 text-white py-20'>
        <h1 className='text-4xl font-semibold text-center pb-10'>FEATURES</h1>
        <div className='flex flex-col gap-10 '>
            <div className='flex justify-between items-center'>
                <div className='flex justify-center w-[45%]'>
                    <Image width={1000} height={1000} src={'/cctv.jpeg'}></Image>
                </div>
                <div className='flex w-[45%] justify-end'>
                    <div className='w-10/12 flex flex-col gap-5'>
                        <h3 className='text-3xl font-medium text-right'>Real-time Monitoring</h3>
                        <p className='text-right'>This feature goes beyond simple motion detection. It utilizes advanced video analytics powered by machine learning algorithms to analyze live camera feeds and identify suspicious activities in real-time. </p>
                    </div>
                </div>
            </div>
            <div className='flex flex-row-reverse justify-between items-center'>
                <div className='flex justify-center w-[45%]'>
                    <Image width={1000} height={1000} src={'/vdo.png'}></Image>
                </div>
                <div className='w-[45%]'>
                    <div className='w-10/12 flex flex-col gap-5'>
                        <h3 className='text-3xl font-medium'>Recorded Video Analysis</h3>
                        <p className=''>This feature allows users to upload pre-recorded video footage for analysis. The system employs machine learning models to identify potential criminal activity within the uploaded video</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Features