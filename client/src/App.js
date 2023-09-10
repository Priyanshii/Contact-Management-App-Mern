import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import Pages from "./pages";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
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
  );
}

export default App;
