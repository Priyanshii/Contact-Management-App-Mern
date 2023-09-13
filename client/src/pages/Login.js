import React from 'react'
import { FcGoogle } from 'react-icons/fc';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { signInUserWithGoogle } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const dispatch = useDispatch();
  const  navigate = useNavigate();
  
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
    <div className='w-[100vw] h-[100vh] flex items-center justify-center'>
      <button className='w-72 p-1 rounded-full border-[1px] border-solid border-[#242424] flex flex-row items-center justify-center text-base' onClick={() => login()}>
        <FcGoogle className='w-6 h-6 mr-4'/>
        Sign in with Google
      </button>
    </div>
  )
}

export default Login;
