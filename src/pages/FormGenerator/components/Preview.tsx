import DeleteIcon from '@mui/icons-material/Delete';
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useFormStore } from 'stores';
import type { Element } from 'types';

interface PreviewProps {
  formNameValue: string;
  elements: Element[];
}

export default function Preview({ formNameValue, elements }: PreviewProps) {
  const removeElement = useFormStore((state) => state.removeElement);

  return (
    <Stack flexGrow={1} gap={2}>
      <Typography textAlign='center'>Preview</Typography>

      <Stack
        p={2}
        border='1px solid'
        borderColor='divider'
        borderRadius={2}
        gap={2}
      >
        <Typography fontWeight='bold'>
          {formNameValue || 'Untitled Form'}
        </Typography>

        {elements.map((el) => {
          if (el.type === 'text') {
            return (
              <Stack key={el.id} direction='row' alignItems='center' gap={1}>
                <TextField label={el.label} fullWidth disabled />
                <IconButton color='error' onClick={() => removeElement(el.id)}>
                  <DeleteIcon />
                </IconButton>
              </Stack>
            );
          }

          if (el.type === 'checkbox') {
            return (
              <Stack key={el.id} gap={1}>
                <Stack
                  direction='row'
                  alignItems='center'
                  justifyContent='space-between'
                >
                  <Typography fontWeight='bold'>{el.label}</Typography>
                  <IconButton
                    color='error'
                    onClick={() => removeElement(el.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
                <FormGroup>
                  {el.choices?.map((choice) => (
                    <FormControlLabel
                      key={choice.id}
                      control={<Checkbox disabled />}
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
