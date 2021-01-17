// api
const isDev: boolean = true;
import { API_BASE_DOMAIN, API_BASE_DOMAIN_DEV } from '@env';
export const API_BASE_URL = true ? API_BASE_DOMAIN_DEV : API_BASE_DOMAIN;
