import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Element, Form } from 'types';

export default function FormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form, setForm] = useState<Form | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('forms');
    if (stored) {
      const forms: Form[] = JSON.parse(stored);
      const found = forms.find((f) => f.id === id);
      if (found) setForm(found);
      else navigate('/');
    }
  }, [id, navigate]);

  const handleDelete = () => {
    if (!form) return;
    const stored = localStorage.getItem('forms');
    if (stored) {
      const forms: Form[] = JSON.parse(stored);
      const updated = forms.filter((f) => f.id !== form.id);
      localStorage.setItem('forms', JSON.stringify(updated));
    }
    navigate('/');
  };

  const handleEdit = () => {
    if (!form) return;
    navigate(`/generate-form?id=${form.id}`);
  };

  if (!form) return null;

  return (
    <Stack gap={6} maxWidth='sm' width='100%' mx='auto'>
      <Stack direction='row' justifyContent='space-between'>
        <Button
          variant='outlined'
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
        >
          Back
        </Button>

        <Stack direction='row' gap={1}>
          <IconButton color='primary' onClick={handleEdit}>
            <EditIcon />
          </IconButton>
          <IconButton color='error' onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      </Stack>

      <Stack
        p={2}
        border='1px solid'
        borderColor='divider'
        borderRadius={2}
        gap={2}
      >
        <Typography fontWeight='bold'>{form.name}</Typography>

        {form.elements.map((el: Element) => {
          if (el.type === 'text') {
            return <TextField key={el.id} label={el.label} fullWidth />;
          }

          if (el.type === 'checkbox') {
            return (
              <Stack key={el.id} gap={1}>
                <Typography fontWeight='bold'>{el.label}</Typography>
                <FormGroup>
                  {el.choices?.map((choice) => (
                    <FormControlLabel
                      key={choice.id}
                      control={<Checkbox />}
                      label={choice.name}
                    />
                  ))}
                </FormGroup>
              </Stack>
            );
          }

          return null;
        })}
      </Stack>
    </Stack>
  );
}
