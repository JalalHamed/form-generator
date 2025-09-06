import AddIcon from '@mui/icons-material/Add';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Controller, type Control, type FieldErrors } from 'react-hook-form';
import { AddCheckboxDialog, AddTextFieldDialog } from '../../../components';
import type { FormNameField } from '../../../types';

interface FormProps {
  control: Control<FormNameField, unknown, FormNameField>;
  errors: FieldErrors<FormNameField>;
}

export default function Form({ control, errors }: FormProps) {
  const [openTextFieldDialog, setOpenTextFieldDialog] =
    useState<boolean>(false);
  const [openCheckboxDialog, setOpenCheckboxDialog] = useState<boolean>(false);

  return (
    <Stack gap={2}>
      <Typography textAlign='center'>Make Changes</Typography>

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
  );
}
