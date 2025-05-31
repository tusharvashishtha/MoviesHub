import React from 'react';
import loading from "/loading.gif"

const Loading = () => {
  return (
    <div className='w-[100vw] h-[100vh] flex justify-center items-center '>
        <img  src= {loading} alt="" />
    </div>
  )
}

export default Loading