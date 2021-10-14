import React, { useState , useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
// axios
import axios from 'axios';
//Link
import Link from 'next/link'


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const Content= () => {
  const [ picture , setPicture ] = useState([]);

  useEffect( 
    async function getdata(){
      try{
        const res = await axios.get('http://127.0.0.1:8000/api/picture')
        setPicture(res.data)
      }catch(error){
        console.log(error);
      }
    }
  ,[])
  return (
    <Box sx={{ mt : 4, width: '100%', }}>
      <Container justifycontent="center">
              <Grid container justifyContent="center" rowSpacing={5} columnSpacing={4}>
                {
                  picture.map((data) =>{
                    return (
                      <Grid item xs={12} sm={4}  >
                         <Item sx={{'&:hover' :{ opacity: [0.9, 0.8, 0.7]}, cursor: "pointer"  , backgroundColor : '#FFFAFA'}}>
                           <Link href={`/${data.upload_by}/${data.alt_text}/${data.id}?img=${data.image.slice(22, data.image.length)}`}>
                               <img style={{ height : '200px' , width : '100%', }} src={`${data.image}`} />
                           </Link>
                           <p style={{color:'black'}}>Upload By : <b>{data.upload_by}</b></p>
                         </Item>
                      </Grid>
                    )

                  })
                }
              </Grid>
      </Container>
    </Box>
  );
}



export default Content;

