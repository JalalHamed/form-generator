import { yupResolver } from '@hookform/resolvers/yup';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import {
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import * as yup from 'yup';
import { AddCheckboxDialog, AddTextFieldDialog } from '../components';
import { useFormStore } from '../stores';
import type { Form } from '../types';

const schema = yup.object({
  name: yup.string().required('Form Name is required'),
});

interface FormNameField {
  name: string;
}

export default function FormGenerator() {
  const navigate = useNavigate();
  const { elements, resetElements } = useFormStore();

  const [openTextFieldDialog, setOpenTextFieldDialog] =
    useState<boolean>(false);
  const [openCheckboxDialog, setOpenCheckboxDialog] = useState<boolean>(false);

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
      <Stack direction='row' gap={1}>
        <Button
          variant='outlined'
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
        >
          Back
        </Button>
        <Button
          variant='outlined'
          startIcon={<RestartAltIcon />}
          disabled={!isDirty && elements.length === 0}
          onClick={handleReset}
        >
          Reset
        </Button>
      </Stack>

      <Stack direction={{ md: 'row' }} gap={4}>
        <Stack gap={2}>
          <AddTextFieldDialog
            open={openTextFieldDialog}
            handleClose={() => setOpenTextFieldDialog(false)}
          />
          <AddCheckboxDialog
            open={openCheckboxDialog}
            handleClose={() => setOpenCheckboxDialog(false)}
          />

          <Controller
            name='name'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='Form Name'
                autoFocus
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />

          <Stack direction='row' gap={2}>
            <Button
              startIcon={<AddIcon />}
              variant='outlined'
              onClick={() => setOpenTextFieldDialog(true)}
            >
              Add Text Field
            </Button>
            <Button
              startIcon={<AddIcon />}
              variant='outlined'
              onClick={() => setOpenCheckboxDialog(true)}
            >
              Add Checkbox Field
            </Button>
          </Stack>
        </Stack>

        <Divider orientation={isMdUp ? 'vertical' : 'horizontal'} flexItem />

        <Stack flexGrow={1} gap={1}>
          <Typography>Preview</Typography>
          <Stack
            p={2}
            border='1px solid'
            borderColor='divider'
            borderRadius={2}
            gap={2}
          >
            <Typography fontWeight='bold'>
              {formNameValue || 'Untitled Form'}
            </Typography>

            {elements.map((el) =>
              el.type === 'text' ? (
                <TextField key={el.id} label={el.label} disabled />
              ) : (
                <></>
              )
            )}
          </Stack>
        </Stack>
      </Stack>

      <Button
        type='submit'
        variant='contained'
        onClick={handleSubmit(onSubmit)}
      >
        Create
      </Button>
    </Stack>
  );
}
