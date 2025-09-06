import AddIcon from '@mui/icons-material/Add';
import { Button, Paper, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Form } from '../types';

export default function FormsList() {
  const navigate = useNavigate();
  const [forms, setForms] = useState<Form[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('forms');
    if (stored) setForms(JSON.parse(stored));
  }, []);

  return (
    <Stack gap={4} maxWidth='sm' width='100%' mx='auto'>
      <Button
        variant='contained'
        startIcon={<AddIcon />}
        onClick={() => navigate('/generate-form')}
      >
        Add New Form
      </Button>

      {forms.length === 0 ? (
        <Stack
          border='1px solid'
          borderColor='divider'
          borderRadius={2}
          p={3}
          alignItems='center'
          gap={1}
        >
          <Typography>You have not created any forms yet.</Typography>
          <Typography>
            Try{' '}
            <Typography
              component='span'
              onClick={() => navigate('/generate-form')}
              sx={{
                textDecoration: 'underline',
                cursor: 'pointer',
                color: 'blue',
              }}
            >
              Adding a new form
            </Typography>
            .
          </Typography>
        </Stack>
      ) : (
        <Stack gap={2}>
          {forms.map((form) => (
            <Paper
              key={form.id}
              variant='outlined'
              sx={{ p: 2, cursor: 'pointer', borderRadius: 2 }}
              onClick={() => navigate(`/forms/${form.id}`)}
            >
              <Typography fontWeight='bold'>{form.name}</Typography>
              <Typography variant='body2'>
                {form.elements.length} field{form.elements.length > 1 && 's'}
              </Typography>
            </Paper>
          ))}
        </Stack>
      )}
    </Stack>
  );
}
