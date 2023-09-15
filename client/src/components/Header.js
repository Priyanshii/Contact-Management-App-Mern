import React, { useState } from 'react';
import SearchBar from './SearchBar';
import { HiPlus } from 'react-icons/hi';
import { FaBars } from 'react-icons/fa';
import { BsSortAlphaDown, BsSortAlphaUpAlt } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { getSortedContactsByName } from '../redux/slices/contactsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/slices/userSlice';
import SideBarMobile from './SideBarMobile';

const Header = () => {

  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { contactsList: updatedContactsList } = useSelector((store) => store.contacts.updatedContactsData);

  const handleSortContactsByName = (sortType) => {
    dispatch(getSortedContactsByName({ contactsList: updatedContactsList, sortType }))
    setIsOpen(false);
  }

  const toggle = () => {
    setIsOpen(!isOpen);
  }

  const handleSignOutButton = () => {
    dispatch(logoutUser());
  }

  return (
    <>
      <div className='w-[100%] px-6 py-4 flex flex-row items-center justify-between shadow-sm'>
        <section className=' text-2xl font-medium text-gray-800'>
          Contacts
        </section>
        <section className='flex flex-row items-center justify-normal gap-5 md:hidden'>
          <SearchBar />
          <button onClick={() => { handleSortContactsByName(1) }}>
            <BsSortAlphaDown className='w-6 h-6 fill-gray-700' />
          </button>
          <button onClick={() => { handleSortContactsByName(-1) }}>
            <BsSortAlphaUpAlt className='w-6 h-6 fill-gray-700' />
          </button>
          <Link to={'/add-contact'} className='flex flex-row items-center gap-2 px-4 py-2 ml-2 bg-[#156da0] hover:bg-[#11547a] rounded-md text-white'>
            <HiPlus className='fill-white stroke-[1px] stroke-white' />
            Add Contact
          </Link>
          <button className='px-4 py-2 bg-[#156da0] hover:bg-[#11547a] text-white font-medium text-base rounded-md border-none' onClick={handleSignOutButton}>
            Sign out
          </button>
        </section>
        <button onClick={toggle} className="hidden md:block cursor-pointer ">
          <FaBars className='w-5 h-5' />
        </button>
        <SideBarMobile isOpen={isOpen} toggle={toggle} handleSortContactsByName={handleSortContactsByName} handleSignOutButton={handleSignOutButton} />
      </div>
    </>
  )
}

export default Header;
