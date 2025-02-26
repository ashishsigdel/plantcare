import axios, {AxiosInstance} from 'axios';

//change the baseURl as per server
export const baseUrl = `http://192.168.1.108:8000/api`;

const myAxios: AxiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});
export {myAxios};
