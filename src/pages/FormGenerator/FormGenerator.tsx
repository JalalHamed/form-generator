import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Divider, Stack, useMediaQuery, useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import * as yup from 'yup';
import { useFormStore } from '../../stores';
import type { Form, FormNameField } from '../../types';
import { Form as FormComponent, Preview, TopButtons } from './components';

const schema = yup.object({
  name: yup.string().required('Form Name is required'),
});

export default function FormGenerator() {
  const navigate = useNavigate();
  const { elements, resetElements } = useFormStore();

  const { breakpoints } = useTheme();
  const isMdUp = useMediaQuery(breakpoints.up('md'));

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm<FormNameField>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
    },
  });

  const formNameValue = watch('name');

  const handleReset = () => {
    reset({ name: '' });
    resetElements();
  };

  const onSubmit = (data: FormNameField) => {
    if (elements.length === 0) {
      alert('Please add at least one field before creating the form.');
      return;
    }

    const newForm: Form = {
      id: uuid(),
      name: data.name,
      elements: elements,
    };

    const existing = localStorage.getItem('forms');
    const existingForms: Form[] = existing ? JSON.parse(existing) : [];

    const updatedForms = [...existingForms, newForm];

    localStorage.setItem('forms', JSON.stringify(updatedForms));

    reset({ name: '' });
    resetElements();

    navigate('/');
  };

  return (
    <Stack gap={6} maxWidth='md' width='100%' mx='auto'>
      <TopButtons
        isDirty={isDirty}
        handleReset={handleReset}
        elements={elements}
      />

      <Stack direction={{ md: 'row' }} gap={4}>
        <FormComponent control={control} errors={errors} />

        <Divider orientation={isMdUp ? 'vertical' : 'horizontal'} flexItem />

        <Preview formNameValue={formNameValue} elements={elements} />
      </Stack>

      <Button
        type='submit'
        variant='contained'
        onClick={handleSubmit(onSubmit)}
        size='large'
      >
        Create
      </Button>
    </Stack>
  );
}
