import AddIcon from '@mui/icons-material/Add';
import { Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { FormGeneratorDialog } from './components';

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <Stack mx='auto' alignItems='center' py={8} gap={4}>
      <FormGeneratorDialog open={open} onClose={() => setOpen(false)} />

      <Button
        variant='contained'
        startIcon={<AddIcon />}
        onClick={() => setOpen(true)}
      >
        Add New Form
      </Button>

      <Stack
        border='1px solid'
        borderColor='divider'
        borderRadius={2}
        p={3}
        alignItems='center'
      >
        <Typography>You have not created any forms yet.</Typography>
        <Typography>Try Adding a new form</Typography>
      </Stack>
    </Stack>
  );
}
