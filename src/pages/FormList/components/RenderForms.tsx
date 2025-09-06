import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Paper, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { Form } from 'types';

interface RenderFormsProps {
  forms: Form[];
  onEdit: (form: Form) => void;
  onDelete: (id: string) => void;
}

export default function RenderForms({
  forms,
  onEdit,
  onDelete,
}: RenderFormsProps) {
  const navigate = useNavigate();

  return (
    <Stack gap={2}>
      {forms.map((form) => (
        <Paper
          key={form.id}
          variant='outlined'
          sx={{
            p: 2,
            cursor: 'pointer',
            borderRadius: 2,
            transition: 'all 0.2s',
            '&:hover': {
              transform: 'scale(1.02)',
            },
          }}
          onClick={() => navigate(`/forms/${form.id}`)}
        >
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='space-between'
          >
            <Stack>
              <Typography fontWeight='bold'>{form.name}</Typography>
              <Typography variant='body2'>
                {form.elements.length} field{form.elements.length > 1 && 's'}
              </Typography>
            </Stack>

            <Stack direction='row' gap={1}>
              <IconButton
                size='small'
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(form);
                }}
              >
                <EditIcon fontSize='small' />
              </IconButton>

              <IconButton
                size='small'
                color='error'
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(form.id);
                }}
              >
                <DeleteIcon fontSize='small' />
              </IconButton>
            </Stack>
          </Stack>
        </Paper>
      ))}
    </Stack>
  );
}
