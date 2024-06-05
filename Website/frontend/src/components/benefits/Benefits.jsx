import React from 'react'

const Benefits = () => {
  return (
    <section id='benefits' className='text-white py-20'>
     <h1 className='text-4xl font-semibold text-center pb-10'>BENEFITS</h1>
      <div className='w-9/12 mx-auto flex justify-between'>
        <div style={{backgroundImage: "url(/c2tv.png)"}} className='rounded-md bg-cover w-[28%] flex flex-col gap-2 justify-end h-[500px] px-2 pb-5'>
          <h1 className='text-2xl font-semibold text-center'>Enhanced Security</h1>
          <p className='text-center'>Improve overall security with proactive monitoring.</p>
        </div>
        <div style={{backgroundImage: "url(/ceff.png)"}} className='bg-cover rounded-md w-[28%] flex flex-col gap-2 justify-end h-[500px] px-2 pb-5'>
          <h1 className='text-2xl font-semibold text-center'>Cost Effective</h1>
          <p className='text-center'>Reduce costs by minimizing the need for physical security.</p>
        </div>
        <div style={{backgroundImage: "url(/quick.png)"}} className='bg-cover rounded-md w-[28%] flex flex-col gap-2 justify-end h-[500px] px-2 pb-5'>
          <h1 className='text-2xl font-semibold text-center'>Quick Response</h1>
          <p className='text-center'>Enable faster response times to potential threats.</p>
        </div>
      </div>
    </section>
  )
}

export default Benefits