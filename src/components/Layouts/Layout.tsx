import { Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <Stack minHeight='100%' p={8} maxWidth='lg' width='100%' mx='auto'>
      <Outlet />
    </Stack>
  );
}
