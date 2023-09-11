import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchedContacts } from '../redux/slices/contactsSlice';

const SearchBar = () => {

  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const { contactsList } = useSelector((store) => store.contacts.contactsData);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  }

  const handleEnterKey = (e) => {
    if(e.key === 'Enter'){
      dispatch(getSearchedContacts({contactsList, searchInput:searchValue}));
    }
  }

  return (
    <div className='relative h-auto w-auto my-2'>
      <BiSearch className='absolute text-[#807d7d] top-[50%] left-0 translate-y-[-50%] translate-x-[50%]'/>
      <input
        className="pl-8 pr-2 py-2 bg-[#f7f5f5] outline-none rounded-full text-sm"
        type="text"
        placeholder="Search"
        onKeyDown={handleEnterKey}
        onChange={(e) => handleSearch(e)}
        value={searchValue}/>
    </div>
  )
}

export default SearchBar;
