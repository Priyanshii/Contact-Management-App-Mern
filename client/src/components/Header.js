import React from 'react';
import SearchBar from './SearchBar';
import { HiPlus } from 'react-icons/hi';
import { BsSortAlphaDown, BsSortAlphaUpAlt } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { getSortedContactsByName } from '../redux/slices/contactsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/slices/userSlice';

const Header = () => {

  const dispatch = useDispatch();
  const { contactsList: updatedContactsList } = useSelector((store) => store.contacts.updatedContactsData);

  const handleSortContactsByName = (sortType) => {
    dispatch(getSortedContactsByName({ contactsList: updatedContactsList, sortType }))
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
        <section className='flex flex-row items-center justify-normal gap-5'>
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
      </div>
    </>
  )
}

export default Header;
