import AddIcon from '@mui/icons-material/Add';
import { Button, Divider, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddCheckboxDialog, AddTextFieldDialog } from '../components';

export default function FormGenerator() {
  const navigate = useNavigate();

  const [openTextFieldDialog, setOpenTextFieldDialog] =
    useState<boolean>(false);
  const [openCheckboxDialog, setOpenCheckboxDialog] = useState<boolean>(false);

  const [formName, setFormName] = useState<string>('');

  return (
    <Stack maxWidth='md' width='100%' gap={4}>
      <Stack direction='row' gap={4}>
        <Stack gap={2}>
          <AddTextFieldDialog
            open={openTextFieldDialog}
            handleClose={() => setOpenTextFieldDialog(false)}
          />
          <AddCheckboxDialog
            open={openCheckboxDialog}
            handleClose={() => setOpenCheckboxDialog(false)}
          />

          <TextField
            label='Form Name'
            required
            autoFocus
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
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

        <Divider orientation='vertical' flexItem />

        <Stack flexGrow={1} gap={1}>
          <Typography>Preview</Typography>
          <Stack
            p={2}
            border='1px solid'
            borderColor='divider'
            borderRadius={2}
          >
            <Typography>{formName ? formName : ''}</Typography>
          </Stack>
        </Stack>
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
