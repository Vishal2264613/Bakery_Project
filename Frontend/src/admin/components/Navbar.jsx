import { hamburgerImg, bellImg, accountImg } from '../../utils'
import React from 'react'

const Navbar = () => {
  return (
    <header
    className="w-full h-[50px] flex justify-center items-center px-2 mb-2 "
  >
        <nav className="flex justify-between items-center p-4 w-full h-[50px] mt-0 backdrop-blur-[10px] bg-white/30 border border-white/20 rounded-2xl">
        
            <h1 className='text-3xl font-greatvibes font-bold'>Hello</h1>
             <div className='flex'>
             <img src={bellImg} alt="logo" className="w-[30px] h-[30px] cursor-pointer" />
             <img  src={accountImg} alt="logo" className="w-[30px] h-[30px] cursor-pointer ml-6 "/>
             </div>
        </nav>
    </header>
  )
}

export default Navbar