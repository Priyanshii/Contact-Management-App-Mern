import React, { useEffect } from 'react'
import { FcGoogle } from 'react-icons/fc';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch, useSelector } from 'react-redux';
import { signInUserWithGoogle } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import LoadingComponent from '../components/LoadingComponent';

const Login = () => {

  const dispatch = useDispatch();
  const  navigate = useNavigate();
  const { loading } = useSelector((store) => store.user);

  const gotoIndexPage = () => {
    navigate("/");
  }

  const login = useGoogleLogin({
    onSuccess: async (data) => {
      console.log(data);
      dispatch(signInUserWithGoogle(data, gotoIndexPage))
    },
    flow: 'auth-code',
  })

  return (
    <div className='w-[100vw] h-[100vh] flex flex-col items-center justify-start bg-login'>
      <span className=' mt-10 text-4xl font-medium text-white'>Welcome to App</span>
      <span className='mt-2 text-lg font-normal text-white'>Please Login to access</span>
      <button className='w-72 p-3 rounded-full border-[1px] border-solid border-white flex flex-row items-center justify-center text-base mt-28' onClick={() => login()}>
        <FcGoogle className='w-9 h-9 mr-4'/>
        <span className=' text-lg text-white'>Sign in with Google</span>
      </button>
      {
        loading && <LoadingComponent />
      }
    </div>
  )
}

export default Login;
