import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import {
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddCheckboxDialog, AddTextFieldDialog } from '../components';
import { useFormStore } from '../stores';

export default function FormGenerator() {
  const navigate = useNavigate();

  const { elements, resetElements } = useFormStore();

  console.log(elements);

  const [openTextFieldDialog, setOpenTextFieldDialog] =
    useState<boolean>(false);
  const [openCheckboxDialog, setOpenCheckboxDialog] = useState<boolean>(false);

  const [formName, setFormName] = useState<string>('');

  const { breakpoints } = useTheme();
  const isMdUp = useMediaQuery(breakpoints.up('md'));

  const initialValues = {
    formName: '',
  };

  const isDirty = formName !== initialValues.formName;

  const handleReset = () => {
    setFormName(initialValues.formName);
    resetElements();
  };

  return (
    <Stack gap={6}>
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

      <Stack direction={{ md: 'row' }} gap={4}>
        <Stack gap={2}>
          <AddTextFieldDialog
            open={openTextFieldDialog}
            handleClose={() => setOpenTextFieldDialog(false)}
          />
          <AddCheckboxDialog
            open={openCheckboxDialog}
            handleClose={() => setOpenCheckboxDialog(false)}
          />

          <TextField
            label='Form Name'
            autoFocus
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
          />

          <Stack direction='row' gap={2}>
            <Button
              startIcon={<AddIcon />}
              variant='outlined'
              onClick={() => setOpenTextFieldDialog(true)}
            >
              Add Text Field
            </Button>
            <Button
              startIcon={<AddIcon />}
              variant='outlined'
              onClick={() => setOpenCheckboxDialog(true)}
            >
              Add Checkbox Field
            </Button>
          </Stack>
        </Stack>

        <Divider orientation={isMdUp ? 'vertical' : 'horizontal'} flexItem />

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
              {formName ? formName : 'Untitled Form'}
            </Typography>

            {elements.map((el) =>
              el.type === 'text' ? (
                <TextField key={el.id} label={el.label} />
              ) : (
                <></>
              )
            )}
          </Stack>
        </Stack>
      </Stack>

      <Button variant='contained'>Create</Button>
    </Stack>
  );
}
