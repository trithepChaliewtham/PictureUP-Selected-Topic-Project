import { useState , useEffect } from 'react';
// Component
import Header from '../component/Header';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import Loginpage from '../Loginpage';
// mui
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
// axios
import axios from 'axios';
function RedBar() {
  return (
    <Box
      sx={{
        height: 20,
        mt:5,
        justifyContent:"center",
	    alignItems:"center",
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? 'rgba(255, 0, 0, 0.1)'
            : 'rgb(255 132 132 / 25%)',
      }}
    />
  );
}

const Upload = () => {
	const [ csrf , setCSRF ] = useState(null);
	const [ loggedin , setLoggedin ] = useState(false);
	const [ anonymous , setAnonymous ] = useState(false);
	const [ user , setUser ] = useState(null);
	const [ firstname , setFirstname ] = useState("");
	const [ lastname , setLastname ] = useState("");
	const [ email, setEmail ] = useState("");
	const [ image ,setImage ] = useState(null);
	const [ alt_text , setAltText ] = useState("");

	const uploadhandle = async (e) =>{
		e.preventDefault();
		const formData = new FormData();
		formData.append('image', image);
		formData.append('alt_text' , alt_text);

		const body = formData;
		try{
			const uploadimg = await axios.post('http://localhost:8000/upload' ,formData ,{
				withCredentials: true,
				headers : {
					'Content-Type': 'application/json',
					'X-CSRFToken': csrf ,
				},
			})
			if(uploadimg.data.status === 201){
				alert('Upload Success !')
			}
		}catch(err){
			console.log(err)
		}
	}
	useEffect(
		async () => {
			try{
				const res = await axios.get('http://localhost:8000/isauth',{
				withCredentials: true,
				headers : {
					'Content-Type': 'application/json',
					'X-CSRFToken': csrf ,
				},
			})
			console.log(res)
			if(res.data.status === 200 && csrf === null){
					fetch("http://localhost:8000/csrf",{
						credentials : "include",
					})
					.then((res) =>{
						const csrfToken = res.headers.get("X-CSRFToken")
						setCSRF(csrfToken)
						setLoggedin(true)
					})
					.catch((err) => {
						console.log(err)
					})
			}
			else{
				return <Loginpage />				
			}
			}catch(err){
				console.log(err)
			}
	},[])

	return(
		<div>

			{loggedin? 
				<>
					<Header />
					<Navbar />
						<Container style={{ textAlign:'center'}}>
							<Typography sx={{mt:5,}}variant="h3" component="h2">
								  Upload Image
							</Typography>;
							<form onSubmit={uploadhandle}>
								<RedBar sx={{mt:5, mb:5,}}  />
									<TextField 
										sx={{ mt:5 , }}
										id="margin-none" 
										name="img"
										type="file"
										required
										onChange={e => setImage(e.target.files[0])}
								/>
								<RedBar />
								<Container sx={{mt:5,mb:5}}>
									<TextField
										required
										id="Alt text"
										label="Alt text"
										value={alt_text}
										onChange={(e) => setAltText(e.target.value)}
									/>
								</Container>
								<Button type="submit" variant="contained" sx={{ mt: 2, mb: 1 }}size="large">Upload</Button>
							</form>
						</Container>
					<Footer />
				</>
				:
				<>
					<Navbar />
				</>
			}
		</div>
	)
}

export default Upload;