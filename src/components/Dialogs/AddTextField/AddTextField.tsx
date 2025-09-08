import { yupResolver } from '@hookform/resolvers/yup';
import AddIcon from '@mui/icons-material/Add';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { v4 as uuid } from 'uuid';
import * as yup from 'yup';
import { useFormStore } from '../../../stores';
import type { Element } from '../../../types';

interface AddTextFieldProps {
  open: boolean;
  handleClose: () => void;
}

interface TextFieldFormValues {
  label: string;
  isRequired: boolean;
  conditionTarget?: string;
  conditionValue?: string;
}

const schema = yup.object({
  label: yup.string().required('Label is required'),
  isRequired: yup.boolean().required(),
});

export default function AddTextFieldDialog({
  open,
  handleClose,
}: AddTextFieldProps) {
  const addElement = useFormStore((state) => state.addElement);
  const elements = useFormStore((state) => state.elements);

  const [showConditionFields, setShowConditionFields] = useState(false);

  const { control, handleSubmit, reset } = useForm<TextFieldFormValues>({
    resolver: yupResolver(schema),
    defaultValues: { label: '', isRequired: false },
  });

  const onSubmit = (data: TextFieldFormValues) => {
    const newElement: Element = {
      id: uuid(),
      type: 'text',
      label: data.label,
      isRequired: data.isRequired,
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
        <DialogTitle>Add Text Field</DialogTitle>

        <DialogContent dividers>
          <Stack gap={2}>
            <Controller
              name='label'
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label='Label'
                  autoFocus
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
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

            {elements.length > 0 && (
              <Button
                variant='outlined'
                onClick={() => setShowConditionFields(!showConditionFields)}
                startIcon={<AddIcon />}
              >
                Add Conditional Rendering
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
            sx={{ flexGrow: 1 }}
          >
            Cancel
          </Button>
          <Button type='submit' variant='contained' sx={{ flexGrow: 3 }}>
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
