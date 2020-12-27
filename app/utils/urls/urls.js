// api
const isDev = true
import { API_BASE_DOMAIN, API_BASE_DOMAIN_DEV } from '@env'
export const API_BASE_URL = isDev ? API_BASE_DOMAIN_DEV : API_BASE_DOMAIN
