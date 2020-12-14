import axios from 'axios';

export async function getData() {
  const response = await axios.get(
    'https://dangdang-data.s3.ap-northeast-2.amazonaws.com/data.json'
  );
  return response.data;
}
