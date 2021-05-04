import { useQuery } from 'react-query';
import { fetchTheme } from '@cx/fakedata/theme';

export function useBrandingTheme() {
  return useQuery<any, Error>(
    'fetchTheme',
    async () => {
      const { data }: any = await fetchTheme();
      return {
        ...data.result,
        styles: JSON.parse(data.result.styles),
      };
    },
    { refetchOnWindowFocus: false },
  );
}
