import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../../services/apiCabins';

export function useGetCabin() {
  const {
    isError,
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ['cabins'],
    queryFn: getCabins,
    // retry: 0,
    // refetchOnWindowFocus: false,
  });

  return { isError, isLoading, cabins, error };
}
