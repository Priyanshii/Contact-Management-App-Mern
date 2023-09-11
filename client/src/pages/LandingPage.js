import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import ContactsList from '../components/ContactsList'
import Header from '../components/Header'
import { getAllContacts } from '../redux/slices/contactsSlice'

const LandingPage = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllContacts());
  },[])

  return (
    <div className='w-[100%] flex flex-col gap-4'>
      <Header />
      <ContactsList />
    </div>
  )
}

export default LandingPage;
