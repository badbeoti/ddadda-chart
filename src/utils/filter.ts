import * as d3 from 'd3';

export const divisionArr = [
  { name: '강남구', id: 0, isSelect: false },
  { name: '강동구', id: 1, isSelect: false },
  { name: '강북구', id: 2, isSelect: false },
  { name: '강서구', id: 3, isSelect: false },
  { name: '관악구', id: 4, isSelect: false },
  { name: '광진구', id: 5, isSelect: false },
  { name: '구로구', id: 6, isSelect: false },
  { name: '금천구', id: 7, isSelect: false },
  { name: '노원구', id: 8, isSelect: false },
  { name: '도봉구', id: 9, isSelect: false },
  { name: '동작구', id: 10, isSelect: false },
  { name: '동대문구', id: 11, isSelect: false },
  { name: '마포구', id: 12, isSelect: false },
  { name: '서대문구', id: 13, isSelect: false },
  { name: '서초구', id: 14, isSelect: false },
  { name: '성동구', id: 15, isSelect: false },
  { name: '성북구', id: 16, isSelect: false },
  { name: '송파구', id: 17, isSelect: false },
  { name: '양천구', id: 18, isSelect: false },
  { name: '영등포구', id: 19, isSelect: false },
  { name: '용산구', id: 20, isSelect: false },
  { name: '은평구', id: 21, isSelect: false },
  { name: '종로구', id: 22, isSelect: false },
  { name: '중구', id: 23, isSelect: false },
  { name: '중랑구', id: 24, isSelect: false },
];

export type ddaddaData = {
  대여소_구: string;
  대여소ID: number;
  대여소명: string;
  대여소주소: string;
  위도: number;
  경도: number;
  기준시작일자: string;
  거치대수: number;
};

export type defaultDataType = ReturnType<typeof filterData>;
// export type mapFilterDataType = ReturnType<typeof mapFilterData>;

export function filterData(array: ddaddaData[]) {
  const newData = array.map((item: ddaddaData) => {
    const newObj = {
      name: item.대여소명,
      size: item.거치대수,
      division: item.대여소_구,
      id: item.대여소ID,
    };
    return newObj;
  });
  const newDataGroup = d3.group(newData, (d) => d.division);
  const mapFilterArray = divisionArr.map((e: { name: string; isSelect: boolean }, i: number) => {
    return {
      name: e.name,
      id: i,
      divC: newDataGroup.get(e.name)?.length,
      bikeC: newDataGroup
        .get(e.name)
        ?.map((data) => data.size)
        .reduce((acc, cur) => acc + cur, 0),
    };
  });
  return mapFilterArray;
}

// export function mapFilterData(array: ReturnType<typeof filterData>) {
//   const arrayGroup = d3.group(array, (d) => d.division);
//   const mapFilterArray = divisionArr.map((e: string, i: number) => {
//     return {
//       name: e,
//       id: i,
//       divC: arrayGroup.get(e)?.length,
//       bikeC: arrayGroup
//         .get(e)
//         ?.map((data) => data.size)
//         .reduce((acc, cur) => acc + cur, 0),
//     };
//   });
//   return mapFilterArray;
// }
