import React, { useEffect } from 'react';
import useDefault from './hooks/useDefault';
import './App.css';

function App() {
  const { defaultData, onDefaultData } = useDefault();
  useEffect(() => {
    onDefaultData();
  }, []);
  console.log(defaultData.data && console.log(defaultData.data));
  return (
    <div>
      <p>test</p>
    </div>
  );
}

export default App;
