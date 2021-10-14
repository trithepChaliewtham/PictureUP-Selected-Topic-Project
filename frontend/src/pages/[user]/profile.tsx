import { useState , useEffect} from 'react';
// Component
import Header from '../component/Header';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
// mui
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';
import Container from '@mui/material/Container';
import Switch from '@mui/material/Switch';
// axios
import axios from 'axios';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const profile = ({userid}) => {
	const [ csrf , setCSRF ] = useState("");
	const [ loggedin , setLoggedin ] = useState(false);
	const [ anonymous , setAnonymous ] = useState(false);
	const [ user , setUser ] = useState(null);
	const [ firstname , setFirstname ] = useState("");
	const [ lastname , setLastname ] = useState("");
	const [ email, setEmail ] = useState("");
	const [ openedit , setOpenedit ] = useState(false);
	const [ success , setSuccess ] = useState("");
	const [ updated , setUpdated] = useState(false);
	const edithandle = async (e) =>{
		e.preventDefault();
		try{
			

			const edit = await axios.post('http://localhost:8000/editprofile',{
				user, firstname ,lastname , email
			} ,{
				withCredentials: true,
				headers : {
					'Content-Type': 'application/json',
					'X-CSRFToken': csrf ,
				},
			})
			if(edit.data.status === 202 && edit.data.Response === "Accepted"){
					setUpdated(!updated)
					setSuccess("Success Change Profile !")
			}
		}catch(err){

		}
	}
	useEffect(
		async (e) => {
		try{
			const checklogin = await axios.get('http://localhost:8000/userprofile', {
				withCredentials: true,
				headers : {
					'Content-Type': 'application/json',
					'X-CSRFToken': csrf ,
				},
			})
			if(checklogin.data.status === 200){
				// Already logged in
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
				setLoggedin(true)
				setUser(checklogin.data.user)
				setFirstname(checklogin.data.fisrt_name)
				setLastname(checklogin.data.last_name)
				setEmail(checklogin.data.email)
			}else if (checklogin.data.status === 401){
				// Unauthorized
				window.location.replace('/Loginpage');
			}else{
				// Whatever
				window.location.replace('/Loginpage');
			}

		}catch(err){
			console.log(err)
			setAnonymous(true)
		}
	},[updated])

	return(

		<div>
			<Header />
			{anonymous? 
				<>
					<Container style={{ textAlign: 'center',}} sx={{ mt:5 }}> 
						<CircularProgress sx={{ mt:5 }} />
						<div style={{color:'white'}}>
							{setTimeout((e) => { window.location.replace('/Loginpage') }, 750)}
						</div>
					</Container>
				</>
				:
				<>
				{user != null?

					<>
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
									<Stack direction="row" spacing={2} justifyContent="center" sx={{ mt : 2, mb : 5,}}>
								      <Avatar sx={{ bgcolor: deepOrange[500] , width: 75, height: 75 , fontSize: '50px',}}>{user[0].toUpperCase()}</Avatar>
								    </Stack>
								    <div>
								    	{
								    		success != ""? 
								    		<>
								    			<Box sx={{ color: 'error.main' ,mt :2 , mb : 2  }} >
													<Stack>
														<Alert severity="success">Succesfully logged in</Alert>
													</Stack>	
												</Box>	
								    		</>
								    		: 
								    		<>
									    		
								    		</>
									    }
									    <div>
										      <Switch {...label} onChange={(e) => {openedit? setOpenedit(false):setOpenedit(true)}} />
									    </div>
								      
								      {openedit? 
								      	<>
									    	<form onSubmit={edithandle}>
												<div>
													<TextField
														required
														id="username"
														label="username"
														value={user}
														onChange={(e) => setUser(e.target.value)}
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
														type="email"
														id="email"
														label="email"
														value={email}
														onChange={(e) => setEmail(e.target.value)}
													/>
												</div>
												<Button type="submit" variant="contained" sx={{ mt: 2, mb: 1 }}size="large">Save Change</Button>
											</form>  		
								      	</>
								      	:
								      	<>
								      		<form >
												<div>
													<TextField
														required
														id="username"
														label="username"
														value={user}
														onChange={(e) => setUsername(e.target.value)}
														disabled
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
														disabled
													/>
												</div>
												<div>
													<TextField
														required
														id="lName"
														label="lastname"
														value={lastname}
														onChange={(e) => setLastname(e.target.value)}
														disabled
													/>
												</div>
												<div>
													<TextField
														type="email"
														id="email"
														label="email"
														value={email}
														onChange={(e) => setEmail(e.target.value)}
														disabled
													/>
												</div>
												<Button type="button" variant="contained" sx={{ mt: 2, mb: 1 }}size="large">Save Change</Button>
											</form>
								      	</>
								      }
								    </div>
									
							     </ Container>
								      
						    </Box>
					    </Container>
					<Footer />
						
					</>
					:
					<>
							<CircularProgress sx={{ mt:5 }} />
					</>
				}
				</>

			}
			
		</div>

	)
}

export default profile;