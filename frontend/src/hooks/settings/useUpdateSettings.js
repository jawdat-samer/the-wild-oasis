import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSettings as updateSettingsApi } from '../../services/apiSettings';
import toast from 'react-hot-toast';

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  const { mutate: updateSettings, isPending: isUpdating } = useMutation({
    mutationFn: (data) => updateSettingsApi(data),
    onSuccess: () => {
      toast.success('Settings updated successfully');
      queryClient.invalidateQueries({
        queryKey: ['settings'],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateSettings, isUpdating };
}
