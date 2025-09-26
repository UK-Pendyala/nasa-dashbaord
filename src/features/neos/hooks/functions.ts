
import { FormValues } from '../types/FormValues';

const useNeoData = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: defaultValues ?? { startDate: '', endDate: '' },
  });
  return { register, handleSubmit, errors };
}

export default useNeoData;