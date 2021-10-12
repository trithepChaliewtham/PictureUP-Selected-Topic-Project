import Header from '../component/Header';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

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

	return(
		<div>
			<Header />
			<Navbar />
				<Container>
					<Typography variant="h1" component="h2">
						  h1. Heading
					</Typography>;
					<RedBar sx={{}}  />
						<TextField 
        
							sx={{ mt:5 , }}
							id="margin-none" 
							type="file"
						/>
					<RedBar />
				</Container>
			<Footer />
		</div>
	)
}

export default Upload;