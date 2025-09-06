import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Stack,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useFormStore } from '../../stores';

interface AddTextFieldProps {
  open: boolean;
  handleClose: () => void;
}

export default function AddTextField({ open, handleClose }: AddTextFieldProps) {
  const addElement = useFormStore((state) => state.addElement);

  const [label, setLabel] = useState('');
  const [required, setRequired] = useState(false);

  const handleAdd = () => {
    addElement({
      id: uuid(),
      type: 'text',
      label,
      isRequired: required,
    });
    handleClose();
    setLabel('');
    setRequired(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Text Field</DialogTitle>

      <DialogContent dividers>
        <Stack gap={2}>
          <TextField
            label='Label'
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            inputRef={(input) => {
              if (input) input.focus();
            }}
          />

          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={required}
                  onChange={(e) => setRequired(e.target.checked)}
                />
              }
              label='Required'
            />
          </FormGroup>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} sx={{ flexGrow: 1 }}>
          Cancel
        </Button>
        <Button onClick={handleAdd} variant='contained' sx={{ flexGrow: 3 }}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
