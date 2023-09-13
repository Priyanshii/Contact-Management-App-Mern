import { createSlice } from '@reduxjs/toolkit';
import axios from '../Api';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
  loading: false,
  error: { isError: false, message: '' },
  userData: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    getUserSuccess: (state, { payload }) => {
      state.loading = false;
      state.userData = { ...payload };
      state.error = { isError: false, message: '' };
    },
    getUserFailure: (state, { payload }) => {
      state.loading = false;
      state.userData = {};
      state.error = { isError: true, message: payload };
    },
    removeUser: (state) => {
      state.userData = {}
    }
  },
});

export const { setLoading, getUserSuccess, getUserFailure, removeUser } = userSlice.actions;

export default userSlice.reducer;

export const signInUserWithGoogle = (data, callback) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.post('/auth/google', {
      data,
    });
    console.log(response);
    if (response.status === 201 || response.status === 200) {
      dispatch(getUserSuccess(response.data.user));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("contact-app-user", JSON.stringify(response.data.user));
      toast.success('Sign up successfully done');

      if (callback) {
        callback();
      }
    }
  } catch (error) {
    toast.error(error.response.data.message);
    dispatch(getUserFailure(error.response.data.message))
  }
}

export const getUserData = () => dispatch => {
  const userData = localStorage.getItem("contact-app-user");
  dispatch(getUserSuccess(JSON.parse(userData)));
}

export const removeUserData = (callback) => async dispatch => {
  try {
    localStorage.removeItem("contact-app-user");
    localStorage.removeItem("token");
    dispatch(removeUser());
    if (callback) {
      callback();
    }

  } catch (error) {
    toast.error(error.response.data.message);
  }
}