import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Stack,
  TextField,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { v4 as uuid } from 'uuid';
import * as yup from 'yup';
import { useFormStore } from '../../stores';

interface AddTextFieldProps {
  open: boolean;
  handleClose: () => void;
}

interface FormValues {
  label: string;
  required: boolean;
}

const schema = yup.object({
  label: yup.string().required('Label is required'),
  required: yup.boolean().default(false),
});

export default function AddTextField({ open, handleClose }: AddTextFieldProps) {
  const addElement = useFormStore((state) => state.addElement);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      label: '',
      required: false,
    },
  });

  const onSubmit = (data: FormValues) => {
    addElement({
      id: uuid(),
      type: 'text',
      label: data.label,
      isRequired: data.required,
    });
    reset();
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Add Text Field</DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent dividers>
          <Stack gap={2}>
            <Controller
              name='label'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Label'
                  autoFocus
                  error={!!errors.label}
                  helperText={errors.label?.message}
                  inputRef={(input) => {
                    if (input) input.focus();
                  }}
                />
              )}
            />

            <FormGroup>
              <Controller
                name='required'
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
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              reset();
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
