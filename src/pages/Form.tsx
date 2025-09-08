import { yupResolver } from '@hookform/resolvers/yup';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import type { Choice, Element, Form } from 'types';
import * as yup from 'yup';

type FormValues = Record<string, string | string[] | boolean | undefined>;

export default function FormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form, setForm] = useState<Form | null>(null);

  const createValidationSchema = (elements: Element[]) =>
    yup.object(
      Object.fromEntries(
        elements.map((el) => {
          if (el.type === 'text') {
            return [
              el.id,
              el.isRequired
                ? yup.string().required(`${el.label} is required`)
                : yup.string().optional(),
            ];
          }
          if (el.type === 'checkbox' && el.isRequired) {
            return [
              el.id,
              yup.array().of(yup.string()).min(1, `${el.label} is required`),
            ];
          }
          return [el.id, yup.mixed().notRequired()];
        })
      )
    ) as yup.ObjectSchema<FormValues>;

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(createValidationSchema(form?.elements || [])),
    defaultValues: {},
  });

  const watchedValues = watch();

  useEffect(() => {
    const stored = localStorage.getItem('forms');
    if (stored) {
      const forms: Form[] = JSON.parse(stored);
      const found = forms.find((f) => f.id === id);
      if (found) {
        setForm(found);

        const defaultValues: FormValues = {};
        found.elements.forEach((el) => {
          if (el.type === 'text') {
            defaultValues[el.id] = '';
          } else if (el.type === 'checkbox') {
            defaultValues[el.id] = [];
          }
        });
        reset(defaultValues);
      } else {
        navigate('/');
      }
    }
  }, [id, navigate, reset]);

  const handleDeleteForm = () => {
    if (!form) return;
    const stored = localStorage.getItem('forms');
    if (stored) {
      const forms: Form[] = JSON.parse(stored);
      const updated = forms.filter((f) => f.id !== form.id);
      localStorage.setItem('forms', JSON.stringify(updated));
    }
    navigate('/');
  };

  const handleEditForm = () => {
    if (!form) return;
    navigate(`/generate-form?id=${form.id}`);
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log('Form submitted:', data);
  };

  const shouldRender = (el: Element) => {
    if (!el.condition) return true;
    const targetValue = watchedValues[el.condition.targetElementId];
    return targetValue === el.condition.valueToMatch;
  };

  if (!form) return null;

  const renderField = (el: Element) => {
    switch (el.type) {
      case 'text':
        return (
          <Controller
            key={el.id}
            name={el.id}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={el.label}
                fullWidth
                error={!!errors[el.id]}
                helperText={errors[el.id]?.message as string | undefined}
              />
            )}
          />
        );
      case 'checkbox':
        return (
          <Stack key={el.id} gap={1} width='100%'>
            <Typography fontWeight='bold'>{el.label}</Typography>
            <Controller
              name={el.id}
              control={control}
              render={({ field }) => (
                <FormGroup>
                  {el.choices?.map((c: Choice) => (
                    <FormControlLabel
                      key={c.id}
                      control={
                        <Checkbox
                          checked={((field.value as string[]) || []).includes(
                            c.id
                          )}
                          onChange={(e) => {
                            const value = e.target.checked
                              ? [...((field.value as string[]) || []), c.id]
                              : ((field.value as string[]) || []).filter(
                                  (v) => v !== c.id
                                );
                            field.onChange(value);
                          }}
                        />
                      }
                      label={c.name}
                    />
                  ))}
                </FormGroup>
              )}
            />
            {errors[el.id] && (
              <Typography variant='body2' color='error'>
                {errors[el.id]?.message as string}
              </Typography>
            )}
          </Stack>
        );
      default:
        return null;
    }
  };

  return (
    <Stack gap={6} maxWidth='sm' width='100%' mx='auto'>
      <Stack direction='row' justifyContent='space-between'>
        <Button
          variant='outlined'
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
        >
          Back
        </Button>
        <Stack direction='row' gap={1}>
          <Button
            variant='outlined'
            startIcon={<EditIcon />}
            onClick={handleEditForm}
          >
            Edit
          </Button>
          <Button
            variant='outlined'
            startIcon={<DeleteIcon />}
            color='error'
            onClick={handleDeleteForm}
          >
            Delete
          </Button>
        </Stack>
      </Stack>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          p={2}
          border='1px solid'
          borderColor='divider'
          borderRadius={2}
          gap={2}
        >
          <Typography fontWeight='bold'>{form.name}</Typography>

          {form.elements.map((el) => {
            if (!shouldRender(el)) return null;

            return renderField(el);
          })}

          {form.elements.length > 0 && (
            <Button variant='outlined' type='submit'>
              Submit
            </Button>
          )}
        </Stack>
      </form>
    </Stack>
  );
}
