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

interface AddTextFieldProps {
  open: boolean;
  handleClose: () => void;
}

export default function AddTextField({ open, handleClose }: AddTextFieldProps) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Text Field</DialogTitle>

      <DialogContent dividers>
        <Stack gap={2}>
          <TextField label='Label' required autoFocus />

          <FormGroup>
            <FormControlLabel control={<Checkbox />} label='Required' />
          </FormGroup>
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
