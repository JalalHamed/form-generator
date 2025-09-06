import { Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <Stack minHeight='100%'>
      <Stack p={8} mx='auto' alignItems='center' flexGrow={1}>
        <Outlet />
      </Stack>
    </Stack>
  );
}
