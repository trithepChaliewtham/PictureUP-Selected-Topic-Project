import { useState , useRouter , useEffect } from 'next/router';
// import Component
import Footer from '../../component/Footer';
import Header from '../../component/Header';
import Navbar from '../../component/Navbar'; 
import Content from '../../component/Content';
// import material-ui
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
// axios
import axios from 'axios';


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Picture_id = () =>{
	const router = useRouter();
	const picid = router.query.Picture_id 
	const alt_text = router.query.picture 
	const user = router.query.user
	const img = router.query.img
	console.log(router.query)
	

	return (
		<div>
			{console.log(picid, user)}
			<Header />
			<Navbar />
			<Container sx={{textAlign : 'center' ,mt:5}}>
				<h1>This { router.query.picture } picture is picture  of {router.query.user}</h1> 
				<Grid container justifyContent="center" rowSpacing={5} columnSpacing={4}>
                      <Grid item xs={12} sm={4}  >
                         <Item sx={{'&:hover' :{ opacity: [0.9, 0.8, 0.7]}, cursor: "pointer"  , backgroundColor : '#FFFAFA', width: '100%'}}>
                               <img style={{ width:'100%', height:'250px'}} src={`http://127.0.0.1:8000/${img}`} />
                           <p style={{color:'black'}}>Upload By : <b>{user}</b></p>
                         </Item>
                      </Grid>
              </Grid>
				
	      </Container>
			<Footer />
		</div>
	)
}

export default Picture_id;