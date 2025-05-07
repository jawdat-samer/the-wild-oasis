import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCabin as updateCabinApi } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export function useUpdateCabin() {
  const queryClient = useQueryClient();

  const { mutate: updateCabin, isPending: isUpdating } = useMutation({
    mutationFn: ({ cabinId, newCabin }) => updateCabinApi(cabinId, newCabin),
    onSuccess: () => {
      toast.success('Cabin created successfully');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateCabin, isUpdating };
}
