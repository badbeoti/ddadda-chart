import React from 'react';
import styled from 'styled-components';
import ButtonList from './components/ButtonList';
import Canvas from './components/Canvas';
import './App.css';

const AppBox = styled.div`
  display: flex;
  place-content: center;
  place-items: center;
  width: 100%;
  height: 100vh;
  flex-direction: column;
`;

function App() {
  return (
    <AppBox>
      <Canvas></Canvas>
      <ButtonList></ButtonList>
    </AppBox>
  );
}

export default App;
