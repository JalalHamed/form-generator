import { Stack, TextField, Typography } from '@mui/material';
import type { Element } from '../../../types';

interface PreviewProps {
  formNameValue: string;
  elements: Element[];
}

export default function Preview({ formNameValue, elements }: PreviewProps) {
  return (
    <Stack flexGrow={1} gap={1}>
      <Typography>Preview</Typography>
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

        {elements.map((el) =>
          el.type === 'text' ? (
            <TextField key={el.id} label={el.label} disabled />
          ) : (
            <></>
          )
        )}
      </Stack>
    </Stack>
  );
}
