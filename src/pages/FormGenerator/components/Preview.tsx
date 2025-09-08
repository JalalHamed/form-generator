import { yupResolver } from '@hookform/resolvers/yup';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import {
  Controller,
  useForm,
  type ControllerRenderProps,
  type SubmitHandler,
} from 'react-hook-form';
import { useFormStore } from 'stores';
import type { Choice, Element } from 'types';
import * as yup from 'yup';

interface PreviewProps {
  formNameValue: string;
  elements: Element[];
}

type FormValues = Record<string, string | string[] | boolean | undefined>;

export default function Preview({ formNameValue, elements }: PreviewProps) {
  const removeElement = useFormStore((state) => state.removeElement);
  const [showAll, setShowAll] = useState(false);

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
  } = useForm<FormValues>({
    resolver: yupResolver(createValidationSchema(elements)),
    defaultValues: {},
  });

  const watchedValues = watch();

  const visibleElements = elements.filter((el) => {
    if (showAll) return true;
    if (!el.condition) return true;
    return (
      watchedValues[el.condition.targetElementId] === el.condition.valueToMatch
    );
  });

  const hasConditionals = elements.some((el) => !!el.condition);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log('Form submitted:', data);
  };

  const renderField = (el: Element) => {
    switch (el.type) {
      case 'text':
        return (
          <Stack
            key={el.id}
            direction='row'
            alignItems='center'
            gap={1}
            width='100%'
          >
            <Controller
              name={el.id}
              control={control}
              defaultValue=''
              render={({
                field,
              }: {
                field: ControllerRenderProps<FormValues, string>;
              }) => (
                <TextField
                  {...field}
                  label={el.label}
                  fullWidth
                  error={!!errors[el.id]}
                  helperText={errors[el.id]?.message as string | undefined}
                />
              )}
            />
            <IconButton color='error' onClick={() => removeElement(el.id)}>
              <DeleteIcon />
            </IconButton>
          </Stack>
        );
      case 'checkbox':
        return (
          <Stack key={el.id} gap={1} width='100%'>
            <Stack
              direction='row'
              justifyContent='space-between'
              alignItems='center'
            >
              <Typography fontWeight='bold'>{el.label}</Typography>
              <IconButton color='error' onClick={() => removeElement(el.id)}>
                <DeleteIcon />
              </IconButton>
            </Stack>
            <Controller
              name={el.id}
              control={control}
              defaultValue={[]}
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
    <Stack flexGrow={1} gap={2}>
      <Typography textAlign='center'>Preview</Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          p={2}
          border='1px solid'
          borderColor='divider'
          borderRadius={2}
          gap={2}
        >
          <Stack direction='row' justifyContent='space-between'>
            <Typography fontWeight='bold'>
              {formNameValue || 'Untitled Form'}
            </Typography>

            {hasConditionals && (
              <Button
                variant='outlined'
                onClick={() => setShowAll((prev) => !prev)}
                size='small'
              >
                {showAll
                  ? 'Hide Conditional Fields'
                  : 'Show Conditional Fields'}
              </Button>
            )}
          </Stack>

          {visibleElements.map((el) => (
            <Stack key={el.id} direction='row' alignItems='center' gap={1}>
              {renderField(el)}
            </Stack>
          ))}

          {elements.length > 0 && (
            <Button variant='outlined' type='submit'>
              Submit
            </Button>
          )}
        </Stack>
      </form>
    </Stack>
  );
}
