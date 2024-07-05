import { Box, Stack } from '@mui/material';
import { Logo } from './Logo';
import { Search, UserMenu } from '..';

export const HeaderDesktop = () => {
  return (
    <>
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <Box sx={{ paddingInline: "25px", paddingBlock: "10px", height: '100%' }}>

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
