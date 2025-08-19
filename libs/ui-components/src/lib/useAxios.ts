import axios from 'axios';

import { useAuth } from 'react-oidc-context';

export function useAxios() {
  const auth = useAuth();

  axios.defaults.headers.Authorization = `Bearer ${auth.user?.access_token}`;

  return axios;
}
