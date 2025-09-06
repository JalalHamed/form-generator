import AddIcon from '@mui/icons-material/Add';
import { Button, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddCheckboxDialog, AddTextFieldDialog } from '../components';

export default function FormGenerator() {
  const navigate = useNavigate();
  const [openTextFieldDialog, setOpenTextFieldDialog] =
    useState<boolean>(false);
  const [openCheckboxDialog, setOpenCheckboxDialog] = useState<boolean>(false);

  return (
    <Stack gap={2}>
      <AddTextFieldDialog
        open={openTextFieldDialog}
        handleClose={() => setOpenTextFieldDialog(false)}
      />
      <AddCheckboxDialog
        open={openCheckboxDialog}
        handleClose={() => setOpenCheckboxDialog(false)}
      />

      <TextField label='Form Name' required />

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

      <Stack direction='row' gap={2}>
        <Button onClick={() => navigate('/')} sx={{ flexGrow: 1 }}>
          Cancel
        </Button>
        <Button variant='contained' sx={{ flexGrow: 3 }}>
          Create
        </Button>
      </Stack>
    </Stack>
  );
}
