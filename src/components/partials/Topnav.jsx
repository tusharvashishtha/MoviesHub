import React from 'react'

const Topnav = () => {
  return (
    <div className='w-full h-[10vh] relative flex justify-center items-center'>
        <i class="ri-search-line text-3xl text-zinc-400"></i>
        <input className='w-[50%] mx-10 p-3 text-xl outline-none border-none bg-transparent text-zinc-200' type='text' placeholder='search anything' />
        <i class="ri-close-fill text-3xl text-zinc-400"></i>
    </div>
  )
}

export default Topnav