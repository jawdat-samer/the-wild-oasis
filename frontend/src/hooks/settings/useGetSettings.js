import { useQuery } from '@tanstack/react-query';
import { getSettings } from '../../services/apiSettings';

export function useGetSettings() {
  const {
    data: settings,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['settings'],
    queryFn: () => getSettings(),
  });

  return { settings, isLoading, isError, error };
}
