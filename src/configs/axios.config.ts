import axios from 'axios';

import {baseUrl} from '../constants/api.constant';

export const axiosBaseInstance = axios.create({baseURL: baseUrl});
