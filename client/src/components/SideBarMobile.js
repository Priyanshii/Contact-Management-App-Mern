import React from 'react'
import { FiLogOut } from 'react-icons/fi';
import { FaTimes } from 'react-icons/fa';
import { HiPlus } from 'react-icons/hi';
import { BsSortAlphaDown, BsSortAlphaUpAlt } from 'react-icons/bs';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';

const SideBarMobile = ({ isOpen, toggle, handleSortContactsByName, handleSignOutButton }) => {
  return (
    <div className={`${isOpen ? ' opacity-100 top-0' : ' opacity-0 top-[-100vh]'} w-full h-[100vh] fixed left-0 z-10 hidden md:flex md:flex-col md:items-center md:justify-center bg-white`}>
      <button className='absolute top-5 right-5 cursor-pointer' onClick={toggle}>
        <FaTimes className='w-5 h-5' />
      </button>
      <section className='flex flex-col items-center justify-normal gap-5'>
        <SearchBar closeSideBar={toggle} />
        <section className='flex items-center justify-between'>
          <button className='flex flex-row items-center gap-2 px-4 py-2 ml-2 bg-[#156da0] hover:bg-[#11547a] text-white font-normal rounded-md border-none' onClick={() => { handleSortContactsByName(1) }}>
            <BsSortAlphaDown className='w-6 h-6 fill-white' />
          </button>
          <button className='flex flex-row items-center gap-2 px-4 py-2 ml-2 bg-[#156da0] hover:bg-[#11547a] text-white font-normal rounded-md border-none' onClick={() => { handleSortContactsByName(-1) }}>
            <BsSortAlphaUpAlt className='w-6 h-6 fill-white' />
          </button>
        </section>
        <Link to={'/add-contact'} className='flex flex-row items-center gap-2 px-4 py-2 ml-2 bg-[#156da0] hover:bg-[#11547a] rounded-md text-white'>
          <HiPlus className='fill-white stroke-[1px] stroke-white' />
          Add Contact
        </Link>
        <button className='flex flex-row items-center gap-2 px-4 py-2 ml-2 bg-[#156da0] hover:bg-[#11547a] text-white font-normal rounded-md border-none' onClick={handleSignOutButton}>
          <FiLogOut className=' stroke-[2.5px] stroke-white' />
          Sign out
        </button>
      </section>
    </div>
  )
}

export default SideBarMobile;
