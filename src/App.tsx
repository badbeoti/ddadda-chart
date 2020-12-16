import React, { useState, useEffect } from 'react';
import { Checkbox } from 'antd';
import useDefault from './hooks/useDefault';
import useDivision from './hooks/useDivision';
import './App.css';

function App() {
  const [axis, setAxis] = useState(false);
  const { divisionList, onDivisionList } = useDivision();
  const { defaultData, onDefaultData } = useDefault();
  const [select, setSelect] = useState(divisionList);
  useEffect(() => {
    onDefaultData();
    onDivisionList();
  }, []);

  useEffect(() => {
    console.log(select);
  }, [select]);

  const test = () => {
    setAxis(axis ? !axis : !axis);
    console.log(axis);
  };

  const onClick = (i: number) => {
    divisionList &&
      setSelect(select.map((e) => (e.id === i ? { ...e, isSelect: !e.isSelect } : e)));
    console.log(select[i].isSelect);
  };

  return (
    <div>
      <button onClick={test}>
        <p>test</p>
      </button>
      {defaultData.data &&
        defaultData.data.map((e, i) => <li key={i}>{axis ? e.bikeC : e.divC}</li>)}
      {select.map((e, i) => (
        <button onClick={() => onClick(i)} key={i}>
          {e.name}
          {e.isSelect ? 'true' : 'false'}
        </button>
      ))}
    </div>
  );
}

export default App;
