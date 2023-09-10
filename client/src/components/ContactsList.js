import React, { useRef, useState } from 'react'
import ContactForm from './ContactForm';
import { useSelector } from 'react-redux';
import ContactCard from './ContactCard';
import useOutsideClick from '../helpers/useOutsideClick';
import LoadingComponent from './LoadingComponent';

const ContactsList = () => {

  const [showContactForm, setShowContactForm] = useState(false);
  const { contactsList } = useSelector((store) => store.contacts.updatedContactsData);
  const { contactDetails, loading } = useSelector((store) => store.contacts);
  const ref = useRef();

  useOutsideClick(ref, () => {
    closeModal();
  })

  const handleContactFormModal = (value) => {
    setShowContactForm(value);
  }

  const closeModal = () => {
    handleContactFormModal(false);
  }

  return (
    <>
      {
        showContactForm &&
        <div className='fixed z-5 top-0 left-0 bottom-0 h-[100vh] w-[100vw] bg-black/[0.65] flex items-center justify-center'>
          <div ref={ref} className='h-auto bg-white flex items-center justify-center'>
            <ContactForm type='edit' gotoIndexPage={closeModal} {...contactDetails} />
          </div>
        </div>
      }
      {
        loading
          ?
          <LoadingComponent />
          :
          <>
            <table className='mt-6 shadow-md'>
              <thead className='text-left bg-[#115C88] text-white h-8'>
                <tr>
                  <th className='p-2 px-4 text-base font-medium'>Index</th>
                  <th className='p-2 text-base font-medium'>Name</th>
                  <th className='p-2 text-base font-medium'>Email</th>
                  <th className='p-2 text-base font-medium'>Phone</th>
                  <th className='p-2 text-base font-medium'>Created At</th>
                  <th className='p-2 text-base font-medium'>Action</th>
                </tr>
              </thead>
              {
                contactsList.length > 0
                &&
                <tbody>
                  {
                    contactsList.map((contact, index) => {
                      return (
                        <ContactCard key={contact._id} index={index + 1} {...contact} handleContactFormModal={handleContactFormModal} />
                      );
                    })
                  }
                </tbody>
              }
            </table>
            {
              (contactsList?.length === 0  && !loading)
              &&
              <div className='w-full h-28 pb-4 font-medium text-base text-gray-600 flex items-center justify-center shadow-md'>
                No Contacts
              </div>
            }
          </>
      }
    </>
  )
}

export default ContactsList