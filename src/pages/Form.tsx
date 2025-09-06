import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
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

  const [values, setValues] = useState<Record<string, unknown>>({});

  useEffect(() => {
    const stored = localStorage.getItem('forms');
    if (stored) {
      const forms: Form[] = JSON.parse(stored);
      const found = forms.find((f) => f.id === id);
      if (found) {
        setForm(found);

        const initialValues: Record<string, unknown> = {};
        found.elements.forEach((el) => {
          if (el.type === 'text') initialValues[el.id] = '';
          if (el.type === 'checkbox') {
            el.choices?.forEach((c) => {
              initialValues[c.id] = false;
            });
          }
        });
        setValues(initialValues);
      } else {
        navigate('/');
      }
    }
  }, [id, navigate]);

  const handleDeleteForm = () => {
    if (!form) return;
    const stored = localStorage.getItem('forms');
    if (stored) {
      const forms: Form[] = JSON.parse(stored);
      const updated = forms.filter((f) => f.id !== form.id);
      localStorage.setItem('forms', JSON.stringify(updated));
    }
    navigate('/');
  };

  const handleEditForm = () => {
    if (!form) return;
    navigate(`/generate-form?id=${form.id}`);
  };

  const handleValueChange = (id: string, value: unknown) => {
    setValues((prev) => ({ ...prev, [id]: value }));
  };

  const shouldRender = (el: Element) => {
    if (!el.condition) return true;
    const targetValue = values[el.condition.targetElementId];
    return targetValue === el.condition.valueToMatch;
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
          <Button
            variant='outlined'
            startIcon={<EditIcon />}
            onClick={handleEditForm}
          >
            Edit
          </Button>
          <Button
            variant='outlined'
            startIcon={<DeleteIcon />}
            color='error'
            onClick={handleDeleteForm}
          >
            Delete
          </Button>
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

        {form.elements.map((el) => {
          if (!shouldRender(el)) return null;

          if (el.type === 'text') {
            return (
              <TextField
                key={el.id}
                label={el.label}
                value={values[el.id] || ''}
                onChange={(e) => handleValueChange(el.id, e.target.value)}
                fullWidth
              />
            );
          }

          if (el.type === 'checkbox') {
            return (
              <Stack key={el.id} gap={1}>
                <Typography fontWeight='bold'>{el.label}</Typography>
                <FormGroup>
                  {el.choices?.map((choice) => (
                    <FormControlLabel
                      key={choice.id}
                      control={
                        <Checkbox
                          checked={Boolean(values[choice.id])}
                          onChange={(e) =>
                            handleValueChange(choice.id, e.target.checked)
                          }
                        />
                      }
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
