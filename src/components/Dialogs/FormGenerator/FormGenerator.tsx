import { Dialog, DialogTitle } from '@mui/material';

export interface FormGeneratorProps {
  open: boolean;
  onClose: (value: string) => void;
}

export default function FormGenerator({ open, onClose }: FormGeneratorProps) {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Add New Form</DialogTitle>
    </Dialog>
  );
}
