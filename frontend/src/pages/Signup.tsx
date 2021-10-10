import { useState, useEffect } from 'react'
// component
import Footer from './component/Footer';
import Header from './component/Header';
import Navbar from './component/Navbar'; 
// mui
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
// axios
import axios from 'axios';
// set csrf for django




const Signup = () =>{
	const [ username , setUsername ]  = useState("");
	const [ firtsname ,setFirstname ] = useState("");
	const [ lastname, setLastname ] = useState("");
	const [ password, setPassword ] = useState("");
	const [ re_password , setRepassword ] = useState("");
	const [ email , setEmail ] = useState("");
	const [ error , setError ] = useState("");
	const [ csrf , setCSRF ] = useState("");

	const formhandle = async (e) => {
		e.preventDefault();

		try{
			if(password === re_password){
				setError("");
				const res = await axios.post('http://localhost:8000/signup', { username , password , firtsname , lastname , email },{
					headers : {
						'Content-Type': 'application/json',
						'X-CSRFToken': csrf
					},
					credentials : "include"
					},
				)
			}else{
				setError("incorrect password matched");
			}
		}catch(err){
			console.log(err)
		}
	}
	
	useEffect(() => {
		fetch("http://localhost:8000/csrf",{
			credentials : "include",
		})
		.then((res) =>{
			const csrfToken = res.headers.get("X-CSRFToken")
			setCSRF(csrfToken)
		})
		.catch((err) => {
			console.log(err)
		})
	},[])
	return (
			      
		<div >
			<Header />
			<Box sx={{ flexGrow: 1 }} >
			{console.log(csrf)}
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
			      sx={{
			        '& .MuiTextField-root': { m: 1, width: '25ch' },
			      }}
			      noValidate
			      autoComplete="off"
			    >
			    <Container sx={{ mt : 5,}}>
						<h2>Log in </h2>
						<form onSubmit={formhandle}>
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
									id="fName"
									label="firstname"
									value={firtsname}
									autoComplete="on"
									onChange={(e) => setFirstname(e.target.value)}
								/>
							</div>
							<div>
								<TextField
									required
									id="lName"
									label="lastname"
									value={lastname}
									onChange={(e) => setLastname(e.target.value)}
								/>
							</div>
							{/*{password === re_password? console.log(password,re_password):console.log(password,re_password)}*/}
							<div>
								<TextField
									required
									id="password"
									type="password"
									label="password"
									suggested="H3L0 WoR1D"
									autoComplete="on"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							<div>
								<TextField
									required
									type="password"
									id="Re-password"
									label="Re-password"
									suggested="H3L0 WoR1D"
									autoComplete="on"
									value={re_password}
									onChange={(e) => setRepassword(e.target.value)}
								/>
							</div>
							{error}
							<div>
								<TextField
									type="email"
									id="email"
									label="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<Button type="submit" variant="contained" sx={{ mt: 2, mb: 1 }}size="large">Sign Up</Button>
						</form>
						<Typography  sx={{mt : 2 }} variant="h5" component="h2">
							Already have Account? 
						</Typography>
						<Typography  underline="always" sx={{mt : 1,mb : 20 ,'&:hover' : { color: 'blue' } }} variant="h6" component="h6">
							<Link style={{ color: "blue"}} href="/Loginpage" sx={{ mt : 2}}>
							  Log In here! 
							</Link> 
						</Typography>  
			     </ Container>
			      
			    </Box>
		    </Container>
		    <Footer />

		</div>


	)
}

export default Signup;

