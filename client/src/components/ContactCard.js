import React from 'react'
import { useDispatch } from 'react-redux';
import { deleteContact, getContactDetails } from '../redux/slices/contactsSlice';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { AiOutlineDelete } from 'react-icons/ai';

const ContactCard = ({ _id, index, name, email, phoneNumber, createdAt, handleContactFormModal }) => {

  const dispatch = useDispatch();

  const handleEditContactDetails = (contactId, e) => {
    e.stopPropagation();
    dispatch(getContactDetails(contactId));
    handleContactFormModal(true);
  }

  const handleDeleteContact = (contactId) => {
    dispatch(deleteContact(contactId));
  }

  return (
    <>
      <tr className={`${index%2 === 0 ? 'bg-white' : 'bg-gray-100'} text-sm py-2`}>
        <td className='p-2 px-4'>{index}</td>
        <td className='p-2'>{name}</td>
        <td className='p-2'>{email}</td>
        <td className='p-2'>{phoneNumber}</td>
        <td className='p-2'>{createdAt?.split('T')[0]}</td>
        <td className='p-2 flex flex-row items-center justify-start gap-3 text-center'>
          <button onClick={(e) => { handleEditContactDetails(_id, e) }}>
            <HiOutlinePencilSquare className='w-5 h-5 stroke-green-700' />
          </button>
          <button onClick={() => { handleDeleteContact(_id) }}>
            <AiOutlineDelete className='w-5 h-5 fill-red-600' />
          </button>
        </td>
      </tr>
    </>
  )
}

export default ContactCard