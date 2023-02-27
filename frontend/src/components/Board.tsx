import { ReactNode } from 'react';
import Box from "@mui/material/Box";
import Typograhpy from "@mui/material/Typography";
import blueGrey from '@mui/material/colors/blueGrey';

const Board: React.FC<{title: string, children: ReactNode}> = ({title, children}) => {
  return (
    <Box>
      <Box sx={{ bgcolor: blueGrey[200], p: 1, mb: 2}}>
        <Typograhpy variant='h5' component='h2'>{title}</Typograhpy>
      </Box>
      <Box>{children}</Box>
    </Box>
  )
}

export default Board;