import React, { useState, useEffect } from 'react';
import useDefault from './hooks/useDefault';
import ButtonList from './components/ButtonList';
import Canvas from './components/Canvas';
import './App.css';

function App() {
  return (
    <div
      style={{
        display: 'flex',
        placeContent: 'center',
        placeItems: 'center',
        width: '100%',
        height: '100vh',
        flexDirection: 'column',
      }}
    >
      <Canvas></Canvas>
      <ButtonList></ButtonList>
    </div>
  );
}

export default App;
