import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import type { Element } from '../../../types';

interface PreviewProps {
  formNameValue: string;
  elements: Element[];
}

export default function Preview({ formNameValue, elements }: PreviewProps) {
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
            return <TextField key={el.id} label={el.label} fullWidth />;
          }

          if (el.type === 'checkbox') {
            return (
              <Stack key={el.id}>
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
