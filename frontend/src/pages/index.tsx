// import Component
import Footer from './component/Footer';
import Header from './component/Header';
import Navbar from './component/Navbar'; 
import Content from './component/Content';
// import material-ui
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import axios from 'axios';

const stylePage={
  backgroundColor : 'white',
  width: '100%',
  
}
export default function Home(){
  return (

    <div container style={stylePage} >
      <Header />
      <Navbar />
      
      <Container >

          <Content />

      </Container>

      <Footer />
    </div>
  )
}







