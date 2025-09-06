import { Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <Stack minHeight='100%' p={8} alignItems='center'>
      <Outlet />
    </Stack>
  );
}
