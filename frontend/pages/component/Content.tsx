import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
// axios
import axios from 'axios';


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Content(getdata) {
  console.log(getdata);  
  return (
    <Box sx={{ mt : 2, mb : 2 , width: '100%', }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 4, sm: 8, md: 12 }}>
          
          <Grid item  sm={4} xs={12}>
            <Item >
              <img style={{ height : '200px' , width : '100%'}} src="" />
            </Item>
          </Grid>
      </Grid>
    </Box>
  );
}

export const getStaticProps = async () => {
  const res = await axios("http://localhost:8000/test")
  return {
    props: { 
      data : res,
     }, // will be passed to the page component as props
  }
}

