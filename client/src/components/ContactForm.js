import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createNewContact, updateContact } from '../redux/slices/contactsSlice';
import LoadingComponent from './LoadingComponent';

const ContactForm = ({ type, gotoIndexPage, ...contactDetails }) => {

  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.contacts);

  const { _id, name, email: initialEmail, phoneNumber: initialPhoneNumber } = contactDetails;
  const [initialFirstName, ...initialLastName] = name?.split(' ').filter(Boolean) || [];

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
  });

  useEffect(() => {
    setFormData(
      {
        firstName: initialFirstName,
        lastName: initialLastName.join(' '),
        phoneNumber: initialPhoneNumber,
        email: initialEmail,
      }
    )
  }, [name])

  const handleSubmit = (event) => {
    event.preventDefault();

    if (type === 'add') {
      dispatch(createNewContact(formData, gotoIndexPage));
    }
    else {
      gotoIndexPage();
      dispatch(updateContact({ contactId: _id, ...formData }));
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }))
  }

  return (
    <section className='w-auto py-8 px-10 flex flex-col items-center justify-between gap-10 shadow-2xl border-[1px] border-solid border-[#e9e4e4]'>
      {
        loading
          ?
          <LoadingComponent />
          :
          <>
            <span className='text-xl font-medium text-gray-700 '>
              {
                type === 'add'
                  ?
                  'Add Contact'
                  :
                  'Edit Contact'
              }
            </span>
            <form className='flex flex-col justify-between items-start gap-8' onSubmit={handleSubmit}>
              <section className='flex flex-row items-center justify-around gap-8'>
                <input
                  type="text"
                  name='firstName'
                  placeholder='First Name'
                  value={formData.firstName}
                  onChange={handleChange}
                  className='text-base p-3 pl-1 w-44 border-b-[1px] border-solid border-[#8b8787] outline-none focus:border-[#1ac914]'
                  required
                  minLength={2}
                  maxLength={40}
                />
                <input
                  type="text"
                  name='lastName'
                  placeholder='Last Name'
                  value={formData.lastName}
                  onChange={handleChange}
                  className='text-base p-3 pl-1 w-44 border-b-[1px] border-solid border-[#8b8787] outline-none focus:border-[#1ac914]'
                  required
                  minLength={2}
                  maxLength={40}
                />
              </section>
              <input
                type="email"
                name='email'
                placeholder='Email'
                value={formData.email}
                onChange={handleChange}
                className='text-base p-3 pl-1 w-96 border-b-[1px] border-solid border-[#8b8787] outline-none focus:border-[#1ac914]'
                required
              />
              <div className='relative'>

                <input
                  type="tel"
                  name='phoneNumber'
                  placeholder='Phone number'
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  pattern="[0-9]{10}"
                  className='text-base p-3 pl-1 w-96 border-b-[1px] border-solid border-[#8b8787] outline-none focus:border-[#1ac914]'
                  required
                />
                <span className='absolute bottom-[-20px] left-0 text-xs font-normal text-gray-500'>Phone number must be a 10 digit number</span>
              </div>
              <button type='submit' className='px-4 py-2 mt-10 bg-[#156da0] hover:bg-[#11547a] rounded-full text-white m-auto'>
                Save
              </button>
            </form>
          </>
      }
    </section>
  )
}

export default ContactForm;
