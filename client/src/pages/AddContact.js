import React from 'react';
import { useNavigate } from 'react-router-dom';
import ContactForm from '../components/ContactForm';

const AddContact = () => {

  const navigate = useNavigate();

  const gotoIndexPage = () => {
    navigate("/", { replace: true });
  }

  return (
    <div className='m-auto max-w-[1336px] h-[100vh] flex flex-col items-center justify-center'>
      <ContactForm type='add' gotoIndexPage={gotoIndexPage}/>
    </div>
  )
}

export default AddContact;
