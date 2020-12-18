import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Space, Button } from 'antd';
import useDivision from '../hooks/useDivision';
import { divisionArr } from '../utils/filter';

const ButtonContainer = styled.div`
  width: 750px;
  display: flex;
  justify-content: center;

  .ant-space {
    display: flex;
    place-content: center;
    justify-items: center;
  }
`;

const BtnBox = styled.div`
  .ant-btn {
    background-color: ${(props) => (props.color === 'true' ? '#39db75' : '#fff')};
  }
`;

function ButtonList() {
  const { divisionList, onDivisionList } = useDivision();
  const [select, setSelect] = useState(divisionArr);

  useEffect(() => {
    onDivisionList(select);
  }, [select]);

  // useEffect(()=>{
  //   setSelect(divisionArr)
  // },[])

  const selectDivision = (i: number) => {
    divisionList &&
      setSelect(divisionList.map((e) => (e.id === i ? { ...e, isSelect: !e.isSelect } : e)));
  };

  return (
    <>
      <ButtonContainer>
        <Space size={[5, 10]} wrap>
          {divisionList.map((e, i) => (
            <BtnBox color={e.isSelect ? 'true' : 'false'}>
              <Button style={{ width: '8rem' }} onClick={() => selectDivision(i)} key={i}>
                {e.name}
              </Button>
            </BtnBox>
          ))}
        </Space>
      </ButtonContainer>
    </>
  );
}

export default ButtonList;
