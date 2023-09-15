import React, { useEffect, useRef, useState } from 'react'
import ContactForm from './ContactForm';
import { useDispatch, useSelector } from 'react-redux';
import ContactCard from './ContactCard';
import useOutsideClick from '../helpers/useOutsideClick';
import LoadingComponent from './LoadingComponent';
import Pagination from './Pagination';
import usePagination from '../helpers/usePagination';
import { setContactsListDisplay } from '../redux/slices/contactsSlice';

const ContactsList = () => {

  const [showContactForm, setShowContactForm] = useState(false);
  const { contactsList } = useSelector((store) => store.contacts.updatedContactsData);
  const { contactsListDisplay } = useSelector((store) => store.contacts);
  const { loading } = useSelector((store) => store.contacts.updatedContactsData);
  const { contactDetails } = useSelector((store) => store.contacts);

  const { gotoPage, currentDataToDisplay, currentPage, totalPages } = usePagination(contactsList)
  const dispatch = useDispatch();
  const ref = useRef();

  useEffect(() => {
    gotoPage(1);
    dispatch(setContactsListDisplay(currentDataToDisplay(1)));
  }, [contactsList])

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
          <div ref={ref} className='h-auto bg-white sm:py-4 flex items-center justify-center'>
            <ContactForm type='edit' gotoIndexPage={closeModal} {...contactDetails} />
          </div>
        </div>
      }
      {
        loading
          ?
          <LoadingComponent />
          :
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col overflow-x-auto shadow-md'>
              <table className='mt-6 '>
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
                      contactsListDisplay.map((contact, index) => {
                        return (
                          <ContactCard key={contact._id} index={index + 1} {...contact} handleContactFormModal={handleContactFormModal} />
                        );
                      })
                    }
                  </tbody>
                }
              </table>
              {
                (contactsList?.length === 0 && !loading)
                &&
                <div className='w-full h-28 pb-4 font-medium text-base text-gray-600 flex items-center justify-center shadow-md'>
                  No Contacts
                </div>
              }
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} gotoPage={gotoPage} currentDataToDisplay={currentDataToDisplay} />
          </div>
      }
    </>
  )
}

export default ContactsList;
