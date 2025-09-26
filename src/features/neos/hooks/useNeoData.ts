/**
 * useNeoData
 * Wraps react-hook-form for managing NEO date range input state.
 */
import { useForm } from 'react-hook-form';
import { FormValues } from '../types/FormValues';

type Props = { defaultValues?: FormValues };

const useNeoData = ({ defaultValues }: Props) => {
  // Initialize form with OPTIONAL defaults (falling back to empty strings)
  const { register, handleSubmit, formState } = useForm<FormValues>({
    defaultValues: defaultValues ?? { startDate: '', endDate: '' },
  });
  return { register, handleSubmit, formState };
};

export default useNeoData;
