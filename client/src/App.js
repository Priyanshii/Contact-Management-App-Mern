import React, { useEffect } from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import Pages from "./pages";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { getUserSuccess } from "./redux/slices/userSlice";

function App() {

  const dispatch = useDispatch();
  const userData = localStorage.getItem("contact-app-user");
  
  useEffect(() => {
    dispatch(getUserSuccess(JSON.parse(userData)));
  },[])

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_PUBLIC_GOOGLE_API_TOKEN}>
      <div className="relative overflow-x-hidden">
        <ToastContainer
          autoClose={2000}
          theme="colored"
          hideProgressBar={true}
          newestOnTop
        />
        <Router>
          <Pages />
        </Router>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
