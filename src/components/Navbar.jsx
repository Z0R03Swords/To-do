/* eslint-disable no-unused-vars */
import React from 'react'
const Navbar = () => {
  return (
    <div>
       <nav className='flex justify-around bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ... text-center p-3 '>
        <div className="logo text-white text-3xl font-bold">Todoing...</div>
        <ul className='flex text-white font-bold gap-28 cursor-pointer'>
            <li className='hover:font-extrabold transition-all'>Home</li>
            <li className='hover:font-extrabold transition-all'>Todo</li>
        </ul>
      </nav>
    </div>
  )
}
 
export default Navbar
