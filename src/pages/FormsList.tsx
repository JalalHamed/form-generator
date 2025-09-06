import AddIcon from '@mui/icons-material/Add';
import { Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function FormsList() {
  const navigate = useNavigate();

  return (
    <Stack gap={4}>
      <Button
        variant='contained'
        startIcon={<AddIcon />}
        onClick={() => navigate('/generate-form')}
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
