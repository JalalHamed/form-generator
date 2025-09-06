import { Button, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function FormGenerator() {
  return (
    <Stack>
      <Stack direction='row' gap={2}>
        <Button startIcon={<AddIcon />} variant='outlined'>
          Add Text Field
        </Button>
        <Button startIcon={<AddIcon />} variant='outlined'>
          Add Checkbox Field
        </Button>
      </Stack>
    </Stack>
  );
}
