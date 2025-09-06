import { Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <Stack minHeight='100%' p={{ xs: 2, sm: 5, md: 8 }}>
      <Outlet />
    </Stack>
  );
}
