import AddIcon from '@mui/icons-material/Add';
import { Button, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Form } from '../../types';
import { NoForms, RenderForms } from './components';

export default function FormsList() {
  const navigate = useNavigate();
  const [forms, setForms] = useState<Form[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('forms');
    if (stored) setForms(JSON.parse(stored));
  }, []);

  const handleDelete = (id: string) => {
    const updated = forms.filter((f) => f.id !== id);
    setForms(updated);
    localStorage.setItem('forms', JSON.stringify(updated));
  };

  const handleEdit = (form: Form) => {
    navigate(`/generate-form?id=${form.id}`);
  };

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
        <NoForms />
      ) : (
        <RenderForms
          forms={forms}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </Stack>
  );
}
