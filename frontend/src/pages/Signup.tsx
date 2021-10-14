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
	const [ firstname ,setFirstname ] = useState("");
	const [ lastname, setLastname ] = useState("");
	const [ password, setPassword ] = useState("");
	const [ re_password , setRepassword ] = useState("");
	const [ email , setEmail ] = useState("");
	const [ checkpass , setCheckpass ] = useState("");
	const [ success , setSuccess ] = useState("");
	const [ error , setError ] = useState("");
	const [ csrf , setCSRF ] = useState("");

	const formhandle = async (e) => {
		e.preventDefault();
		try{
			if(password === re_password){
				setCheckpass("");
				const res = await axios.post('http://localhost:8000/signup', { username , password , firstname , lastname , email },{
						withCredentials: true,
						headers : {
							'Content-Type': 'application/json',
							'X-CSRFToken': csrf ,
						},
					}
				)
				if(res.data.status == 201){
					setSuccess(res.data.Response)
					setTimeout(window.location.replace('/Loginpage'), 750)
				}else{
					setError(res.data.Response)
					setSuccess(res.data.Response)
				}

			}else{
				setCheckpass("incorrect password matched");
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
			<Navbar />
		    <Container style={{ textAlign : 'center',}} >
		    	<Box
			      sx={{
			        '& .MuiTextField-root': { m: 1, width: '25ch' },
			      }}
			      noValidate
			      autoComplete="off"
			    >
			    <Container sx={{ mt : 5,}}>
						<h2>Sign up </h2>
						<Box sx={{ color: 'success.main' ,mt :2 , mb : 2 }}>{success}
						</Box>
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
									value={firstname}
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
							<Box sx={{ color: 'error.main' ,mt :1 , mb : 1 }}>{checkpass}</Box>
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
						<Typography  underline="always" sx={{mt : 1,mb : 18 ,'&:hover' : { color: 'blue' } }} variant="h6" component="h6">
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

