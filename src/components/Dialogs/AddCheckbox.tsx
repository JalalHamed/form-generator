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
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useFormStore } from 'stores';
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
}

const schema = yup.object({
  label: yup.string().required('Label is required'),
  options: yup
    .array()
    .of(
      yup.object({
        name: yup.string().required('Option is required'),
      })
    )
    .min(1, 'At least one option is required')
    .required(),
  isRequired: yup.boolean().required(),
});

export default function AddCheckbox({ open, handleClose }: AddCheckboxProps) {
  const addElement = useFormStore((state) => state.addElement);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CheckboxFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      label: '',
      options: [{ name: '' }],
      isRequired: false,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options',
  });

  const onSubmit = (data: CheckboxFormValues) => {
    addElement({
      id: uuid(),
      type: 'checkbox',
      label: data.label,
      isRequired: data.isRequired,
      choices: data.options.map((opt) => ({ id: uuid(), name: opt.name })),
    });
    reset();
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
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Label'
                  autoFocus
                  error={!!errors.label}
                  helperText={errors.label?.message}
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

            {fields.map((field, index) => (
              <Controller
                key={field.id}
                name={`options.${index}.name`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={`Option ${index + 1}`}
                    error={!!errors.options?.[index]?.name}
                    helperText={errors.options?.[index]?.name?.message}
                    fullWidth
                    slotProps={{
                      input: {
                        endAdornment:
                          fields.length > 1 ? (
                            <InputAdornment position='end'>
                              <IconButton
                                edge='end'
                                color='error'
                                onClick={() => remove(index)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </InputAdornment>
                          ) : null,
                      },
                    }}
                  />
                )}
              />
            ))}

            <Button
              variant='outlined'
              startIcon={<AddIcon />}
              onClick={() => append({ name: '' })}
            >
              Add Option
            </Button>
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
