import {axiosBaseInstance} from '../configs/axios.config';
import {HttpMethods} from '../constants/http-methods.enum';

export const apiHandler = (
  endpoint: string,
  method: HttpMethods,
  params?: any,
) => {
  return method === 'get'
    ? axiosBaseInstance[method](endpoint)
    : axiosBaseInstance[method](endpoint, params);
};
