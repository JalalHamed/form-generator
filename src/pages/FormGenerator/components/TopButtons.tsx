import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { Element } from 'types';

interface TopButtonsProps {
  isDirty: boolean;
  handleReset: () => void;
  elements: Element[];
}

export default function TopButtons({
  isDirty,
  handleReset,
  elements,
}: TopButtonsProps) {
  const navigate = useNavigate();

  return (
    <Stack direction='row' gap={1}>
      <Button
        variant='outlined'
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/')}
      >
        Back
      </Button>
      <Button
        variant='outlined'
        startIcon={<RestartAltIcon />}
        disabled={!isDirty && elements.length === 0}
        onClick={handleReset}
      >
        Reset
      </Button>
    </Stack>
  );
}
