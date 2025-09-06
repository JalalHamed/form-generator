import { Paper, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { Form } from '../../../types';

interface RenderFormsProps {
  forms: Form[];
}

export default function RenderForms({ forms }: RenderFormsProps) {
  const navigate = useNavigate();

  return (
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
  );
}
