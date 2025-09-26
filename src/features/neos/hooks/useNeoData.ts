
import { useForm } from 'react-hook-form';
import { FormValues } from '../types/FormValues';

type Props = { defaultValues?: FormValues };

const useNeoData = ({ defaultValues }: Props) => {
  const { register, handleSubmit, formState } = useForm<FormValues>({
    defaultValues: defaultValues ?? { startDate: '', endDate: '' },
  });
  return { register, handleSubmit, formState };
}

export default useNeoData;