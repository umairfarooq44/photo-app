import { SWRConfig } from 'swr';
import axios from '@/utils/axios';
import { ReactNode } from 'react';

const fetcher = (url: any[]) => {
  return axios.get(url[0]).then(res => res.data);
};

interface IProps {
  children: ReactNode;
}

export const SwrProvider: React.FC<IProps> = ({ children }) => (
  <SWRConfig
    value={{
      fetcher,
      errorRetryCount: 5,
      revalidateOnFocus: false,
      revalidateIfStale: false
    }}
  >
    {children}
  </SWRConfig>
);
