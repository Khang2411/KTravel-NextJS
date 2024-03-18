import { Box, Stack } from '@mui/material';
import { Logo } from './Logo';
import Search from './Search';
import UserMenu from './UserMenu';

export const HeaderDesktop = () => {
  
  return (
    <>
      <Box sx={{ padding: "15px", height: '100%' }}>
        <Stack direction="row" justifyContent="space-between">
          <Logo></Logo>
          <Search></Search>
          <UserMenu></UserMenu>
        </Stack>
      </Box>
    </>
  );
}
