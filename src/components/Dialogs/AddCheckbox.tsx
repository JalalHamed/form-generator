import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';

interface AddCheckboxProps {
  open: boolean;
  handleClose: () => void;
}

export default function AddCheckbox({ open, handleClose }: AddCheckboxProps) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Checkbox Field</DialogTitle>

      <DialogContent dividers>
        <Stack gap={2}>
          <TextField label='Label' required autoFocus />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} sx={{ flexGrow: 1 }}>
          Cancel
        </Button>
        <Button onClick={handleClose} variant='contained' sx={{ flexGrow: 3 }}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
