import { useState , useEffect } from 'react'
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
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Link from 'next/link';
//
import axios from 'axios';


const Loginpage = () =>{
	const [ user, setUser ] = useState("");
	const [ username , setUsername ]  = useState("");
	const [ password, setPassword ] = useState("");
	const [ csrf , setCSRF ] = useState("");
	const [ errorlogin , setErrorlogin] = useState(false);
	const [ loggedin , setLoggedin ] = useState(false);
	const [ loginsuccess , setLoginsuccess ] = useState(false);
	const formhandle = async (e) => {
		e.preventDefault();
		try{
			const res = await axios.post('http://localhost:8000/login', { username , password },{
					withCredentials: true,
					headers : {
						'Content-Type': 'application/json',
						'X-CSRFToken': csrf ,
					},
				}
			)
			if(res.data.status === 200 && res.data.Response === "Already login"){
				// Already login
				setLoggedin(true);
				setTimeout((e)=> { window.location.replace('/') }, 750);
				// window.location.replace('/')
			}
			else if (res.data.status === 200 && res.data.Response === "Login Success!" ){
				// log in Success !
				setLoggedin(true);
				setLoginsuccess(true)
				setTimeout((e)=> { window.location.replace('/') }, 750);
			}
			else{
				// Username or Password didn't match
				setErrorlogin(res.data.Response)
			}
		}catch(err){
			console.log(err)
		}
	}
	
	useEffect(
		async () => {
		const checklogin = await axios.get('http://localhost:8000/login', {
			withCredentials: true,
			headers : {
				'Content-Type': 'application/json',
				'X-CSRFToken': csrf ,
			},
		})
		if(checklogin.data.status === 200){
			setLoggedin(true)
		}else if (checklogin.data.status === 401){
			console.log("Not logged in yet")
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

		}
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
			    <Container sx={{ mt : 5,}} >
						<h2>Log in </h2>
						{loggedin? 
							<>	
								{loginsuccess != false?
									<Box sx={{ color: 'error.main' ,mt :2 , mb : 2  }} >
										<Stack>
											<Alert severity="success">Succesfully logged in</Alert>
										</Stack>	
									</Box>
									:
									<Box sx={{ color: 'error.main' ,mt :2 , mb : 2  }} >
										<Stack>
											<Alert severity="warning">You already logged in</Alert>
										</Stack>	
									</Box>
								}
							</>
							: 
							<>
								{errorlogin != false? 

									<Box sx={{ color: 'error.main' ,mt :2 , mb : 2 }}>
										<Stack>
											<Alert severity="error">{errorlogin}</Alert>
										</Stack>	
									</Box>
									:
									<>{errorlogin}</>
								}
							</>
							
						}
						
						<form onSubmit={formhandle}>
						{loggedin? 
							<>
							<div>
								<TextField
									required
									id="username"
									label="username - disable"
									type="text"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									disabled
								/>
							</div>
							<div>
								<TextField
									required
									id="password"
									label="password - disable"
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									disabled
								/>
							</div>
							</>
							:
							<>
							<div>
								<TextField
									required
									id="username"
									label="username"
									type="text"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
								/>
							</div>
							<div>
								<TextField
									required
									id="password"
									label="password"
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							</> 

						}
						
 						<Button type="submit" variant="contained" sx={{ mt: 2, mb: 1 }}size="large">Log In</Button>
						<Typography  sx={{mt : 2 }} variant="h5" component="h2">
							Didn't have Account? 
						</Typography>
						</form>
						<Typography  underline="always" sx={{mt : 1,mb : 20 ,'&:hover' : { color: 'blue' } }} variant="h6" component="h6">
							<Link style={{ color: "blue"}} href="/Signup" sx={{ mt : 2}}>
							  Sign Up here! 
							</Link> 
						</Typography>  
			     </ Container>
			      
			    </Box>
		    </Container>
		    <Footer />

		</div>


	)
}

export default Loginpage;

