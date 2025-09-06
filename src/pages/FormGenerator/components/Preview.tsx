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
import { useState } from 'react';
import { useFormStore } from 'stores';
import type { Choice, Element } from 'types';

interface PreviewProps {
  formNameValue: string;
  elements: Element[];
  editable?: boolean;
}

export default function Preview({
  formNameValue,
  elements,
  editable = true,
}: PreviewProps) {
  const removeElement = useFormStore((state) => state.removeElement);

  const [values, setValues] = useState<Record<string, unknown>>({});

  const handleValueChange = (id: string, value: unknown) => {
    setValues((prev) => ({ ...prev, [id]: value }));
  };

  const shouldRender = (el: Element) => {
    if (!el.condition) return true;
    const targetValue = values[el.condition.targetElementId];
    return targetValue === el.condition.valueToMatch;
  };

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
          if (!shouldRender(el)) return null;

          if (el.type === 'text') {
            return (
              <Stack key={el.id} direction='row' alignItems='center' gap={1}>
                <TextField
                  label={el.label}
                  fullWidth
                  value={values[el.id] || ''}
                  onChange={(e) => handleValueChange(el.id, e.target.value)}
                />
                {editable && (
                  <IconButton
                    color='error'
                    onClick={() => removeElement(el.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
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
                  {editable && (
                    <IconButton
                      color='error'
                      onClick={() => removeElement(el.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Stack>
                <FormGroup>
                  {el.choices?.map((choice: Choice) => (
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
