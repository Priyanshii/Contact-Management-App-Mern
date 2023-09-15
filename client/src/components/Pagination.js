import React from 'react'
import { useDispatch } from 'react-redux';
import { setContactsListDisplay } from '../redux/slices/contactsSlice';

const Pagination = ({ gotoPage, currentDataToDisplay, currentPage, totalPages }) => {

  const dispatch = useDispatch();

  const handlePageChange = (value) => {
    if (value) {
      gotoPage(value);
      dispatch(setContactsListDisplay(currentDataToDisplay(value)));
    }
  }

  return (
    <div className='ml-auto flex flex-row items-center justify-start gap-2 mr-8'>
      Page
      <input
        type="number"
        name='currentPage'
        placeholder=''
        value={currentPage}
        onChange={(e) => { handlePageChange(e.target.value) }}
        className='text-base pl-1 w-12 border-[1px] border-solid border-gray-900'
        required
        min={1}
        max={totalPages}
      />
      <span>of {totalPages}</span>
    </div>
  )
}

export default Pagination;
