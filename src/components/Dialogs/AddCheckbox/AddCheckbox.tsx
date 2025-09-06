import { yupResolver } from '@hookform/resolvers/yup';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  IconButton,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useFormStore } from 'stores';
import type { Element } from 'types';
import { v4 as uuid } from 'uuid';
import * as yup from 'yup';

interface AddCheckboxProps {
  open: boolean;
  handleClose: () => void;
}

interface CheckboxFormValues {
  label: string;
  options: { name: string }[];
  isRequired: boolean;
  conditionTarget?: string;
  conditionValue?: string;
}

const schema = yup.object({
  label: yup.string().required('Label is required'),
  options: yup
    .array()
    .of(yup.object({ name: yup.string().required('Option is required') }))
    .min(1, 'At least one option is required')
    .required(),
  isRequired: yup.boolean().required(),
});

export default function AddCheckboxDialog({
  open,
  handleClose,
}: AddCheckboxProps) {
  const addElement = useFormStore((state) => state.addElement);
  const elements = useFormStore((state) => state.elements);

  const [showConditionFields, setShowConditionFields] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CheckboxFormValues>({
    resolver: yupResolver(schema),
    defaultValues: { label: '', options: [{ name: '' }], isRequired: false },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options',
  });

  const onSubmit = (data: CheckboxFormValues) => {
    const newElement: Element = {
      id: uuid(),
      type: 'checkbox',
      label: data.label,
      isRequired: data.isRequired,
      choices: data.options.map((o) => ({ id: uuid(), name: o.name })),
      condition: data.conditionTarget
        ? {
            targetElementId: data.conditionTarget,
            valueToMatch: data.conditionValue,
          }
        : undefined,
    };

    addElement(newElement);
    reset();
    setShowConditionFields(false);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Add Checkbox Field</DialogTitle>

        <DialogContent dividers>
          <Stack gap={2}>
            <Controller
              name='label'
              control={control}
              render={({ field }) => <TextField {...field} label='Label' />}
            />

            <FormGroup>
              <Controller
                name='isRequired'
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    }
                    label='Required'
                  />
                )}
              />
            </FormGroup>

            {fields.map((field, index) => (
              <Stack key={field.id} direction='row' gap={1} alignItems='center'>
                <Controller
                  name={`options.${index}.name`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label={`Option ${index + 1}`}
                      error={!!errors.options?.[index]?.name}
                      helperText={errors.options?.[index]?.name?.message}
                      fullWidth
                    />
                  )}
                />
                {fields.length > 1 && (
                  <IconButton
                    aria-label='Delete option'
                    color='error'
                    onClick={() => remove(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </Stack>
            ))}

            <Button
              variant='outlined'
              startIcon={<AddIcon />}
              onClick={() => append({ name: '' })}
            >
              Add Option
            </Button>

            {elements.length > 0 && (
              <Button
                variant='outlined'
                onClick={() => setShowConditionFields(!showConditionFields)}
              >
                Conditional Rendering
              </Button>
            )}

            {showConditionFields && (
              <>
                <Controller
                  name='conditionTarget'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      select
                      label='Based on'
                      fullWidth
                      {...field}
                      value={field.value || ''}
                    >
                      {elements.map((el) => (
                        <MenuItem key={el.id} value={el.id}>
                          {el.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />

                <Controller
                  name='conditionValue'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label='If value equals to'
                      value={field.value ?? ''}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  )}
                />
              </>
            )}
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              reset();
              setShowConditionFields(false);
              handleClose();
            }}
          >
            Cancel
          </Button>
          <Button type='submit' variant='contained'>
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
