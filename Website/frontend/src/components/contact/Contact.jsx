import React from 'react'

const Contact = () => {
  return (
    <section id='contact' className="flex flex-col items-center py-20 text-white">
        <h1 className='text-4xl font-semibold text-center pb-10'>GET IN TOUCH</h1>
        <form className='bg-slate-800 flex flex-col justify-center gap-2 p-8 w-4/12'>
            <input type='name' className='w-full outline-none bg-transparent border-[1px] border-slate-700 p-1' placeholder='Name'></input>
            <input type='email' className='w-full outline-none bg-transparent border-[1px] border-slate-700 p-1' placeholder='Email'></input>
            <input className='w-full outline-none bg-transparent border-[1px] border-slate-700 p-1' placeholder='Phone'></input>
            <textarea rows={2} className='w-full outline-none bg-transparent border-[1px] border-slate-700 p-1' placeholder='Message'></textarea>
            <button type='submit' className='py-2 bg-stone-700'>Submit</button>
        </form>
        <div className='py-5 text-center text-lg font-light'>
            <h4>Email: shbhtsemwal@gmail.com</h4>
            <h4>Phone: +916396430288</h4>
        </div>
    </section>
  )
}

export default Contact