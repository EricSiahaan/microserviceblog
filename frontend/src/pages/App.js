//import React, { useEffect, useState } from 'react';
// import logo from '../assets/images/logo.svg';
import React from 'react';
import { Provider } from 'react-redux';
import { Routes, store } from '../config';
import './App.css';


function App() {
  return (
    <>
      <Provider store={store}>
        <Routes />
      </Provider>
    </>
  )
}

export default App;
