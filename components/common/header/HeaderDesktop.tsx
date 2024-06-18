import { Box, Stack } from '@mui/material';
import { Logo } from './Logo';
import { Search, UserMenu } from '..';

export const HeaderDesktop = () => {
  return (
    <>
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <Box sx={{ padding: "25px", height: '100%' }}>

          <Stack direction="row" justifyContent="space-between" alignItems={'center'}>
            <Logo></Logo>
            <Search></Search>
            <UserMenu></UserMenu>
          </Stack>
        </Box>
      </Box>
    </>
  );
}
