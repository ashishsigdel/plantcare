import axios, {AxiosInstance} from 'axios';

export const baseUrl = `https://plantcare-api.sigdelashish.com.np/api`;

const myAxios: AxiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});
export {myAxios};
