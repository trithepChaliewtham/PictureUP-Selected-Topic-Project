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


function Content({data}){
  const [ picture , setPicture ] = useState([]);
  useEffect( async () =>{
      try{
        const res = await axios.get('http://127.0.0.1:8000/api/picture')
        // setPicture([... new Set])
        for(let i of res.data){
          setPicture([... picture, i]);
        }
        // console.log("Picture is : ",picture);
      }catch(error){
        console.log(error);
      }
    }
  ,[])
  // picture.map(data => {console.log(data)})  
  return (
    <Box sx={{ mt : 4, width: '100%', }}>
      <Container justifycontent="center">
              <Grid container justifyContent="center" rowSpacing={5} columnSpacing={4}>

                {

                  picture.map(data =>{
                        // <Grid item xs={12} sm={4}  >
                        //   <Item sx={{'&:hover' :{ opacity: [0.9, 0.8, 0.7]}, cursor: "pointer"  }}>
                        //     <Link href={`/${data.upload_by}/Picture/${data.id}`}>
                        //         <img style={{ height : '200px' , width : '100%', }} src="data:image/jpeg;base64,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" />
                        //     </Link>
                        //   </Item>
                        // </Grid>
                        // console.log('data is : ',data.name)
                        <div>data.name</div>
                      }

                  )

                }
                   
                  

              </Grid>
      </Container>
    </Box>
  );
}


export default Content;

