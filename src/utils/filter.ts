import * as d3 from 'd3';

const divisionArr = [
  '강남구',
  '강동구',
  '강북구',
  '강서구',
  '관악구',
  '광진구',
  '구로구',
  '금천구',
  '노원구',
  '도봉구',
  '동작구',
  '동대문구',
  '마포구',
  '서대문구',
  '서초구',
  '성동구',
  '성북구',
  '송파구',
  '양천구',
  '영등포구',
  '용산구',
  '은평구',
  '종로구',
  '중구',
  '중랑구',
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
export type mapFilterDataType = ReturnType<typeof mapFilterData>;

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
  return newData;
}

export function mapFilterData(array: ReturnType<typeof filterData>) {
  const arrayGroup = d3.group(array, (d) => d.division);
  const mapFilterArray = divisionArr.map((e: string, i: number) => {
    return {
      name: e,
      id: i,
      divC: arrayGroup.get(e)?.length,
      bikeC: arrayGroup
        .get(e)
        ?.map((data) => data.size)
        .reduce((acc, cur) => acc + cur, 0),
    };
  });
  return mapFilterArray;
}

export function sortFilterData(array: ReturnType<typeof mapFilterData>) {
  return array.sort((a, b) => (a.bikeC! > b.bikeC! ? 1 : -1));
}
