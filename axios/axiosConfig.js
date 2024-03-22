import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://onlinemarket-api.nguyenminhhai.us/api/v1/',
  timeout: 10000, 
});


  
  export default instance;