import { useState } from 'react'
import Footer from './component/Footer';
import Header from './component/Header';
import Navbar from './component/Navbar'; 
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Link from 'next/link';



const Loginpage = () =>{
	const [ username , setUsername ]  = useState("");
	const [ password, setPassword ] = useState("");

	const formhandle = async () =>{
		try{
			const res = await axios.post('http://localhost:8000/api/login', { username , password } ) 
		}catch(err){
			console.log(err)
		}
	}
	return (
			      
		<div >
			<Header />
			<Box sx={{ flexGrow: 1 }} >
		      <AppBar position="static">
		        <Toolbar>
		          <IconButton
		            size="large"
		            edge="start"
		            color="inherit"
		            aria-label="menu"
		            sx={{ mr: 2 }}
		          >
		            <MenuIcon />
		          </IconButton>
		          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
		            Welcom to PictureUP
		          </Typography>
		          <Link href="/">
		            <Button color="inherit" >Home</Button>
		          </Link>
		        </Toolbar>
		      </AppBar>
		    </Box>
		    <Container style={{ textAlign : 'center',}} >
		    	<Box
			      component="form"
			      sx={{
			        '& .MuiTextField-root': { m: 1, width: '25ch' },
			      }}
			      noValidate
			      autoComplete="off"
			    >
			    <Container sx={{ mt : 5,}}>
						<h2>Log in </h2>
						<form>
						<div>
							<TextField
								required
								id="username"
								label="username"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</div>
						<div>
							<TextField
								required
								id="password"
								label="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<Button variant="contained" sx={{ mt: 2, mb: 1 }}size="large">Log In</Button>
						<Typography  sx={{mt : 2 }} variant="h5" component="h2">
							Didn't have Account? 
						</Typography>
						</form>
						<form>
							<Typography  underline="always" sx={{mt : 1,mb : 20 ,'&:hover' : { color: 'blue' } }} variant="h6" component="h6">
								<Link style={{ color: "blue"}}href="/" sx={{ mt : 2}}>
								  Sign Up here! 
								</Link> 
							</Typography>  
						</form>
			     </ Container>
			      
			    </Box>
		    </Container>
		    <Footer />

		</div>


	)
}

export default Loginpage;

