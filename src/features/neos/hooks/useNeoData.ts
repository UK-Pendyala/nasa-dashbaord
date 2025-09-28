/**
 * useNeoData
 * Wraps react-hook-form for managing NEO date range input state.
 */
import { useForm } from 'react-hook-form';
import { FormValues } from '../types/FormValues';

type Props = { defaultValues?: FormValues };

const useNeoData = ({ defaultValues }: Props) => {
  // Initialize form with OPTIONAL defaults (falling back to empty strings)
  const { register, handleSubmit, formState, setValue, getValues } = useForm<FormValues>({
    defaultValues: defaultValues ?? { startDate: '', endDate: '' },
  });
  const setEndDateFromStartDate = () => {
    const startDate = getValues('startDate');
    const endDate = getValues('endDate');
    if (startDate && !endDate) {
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(startDateObj);
      endDateObj.setDate(startDateObj.getDate() + 7);
      setValue('endDate', endDateObj.toISOString().split('T')[0]);
    }
  };

  return { register, handleSubmit, formState, setEndDateFromStartDate };
};

export default useNeoData;
