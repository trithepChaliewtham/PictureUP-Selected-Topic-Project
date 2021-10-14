import { useState , useEffect} from 'react';
// mui
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Link from 'next/link';
// axios
import axios from 'axios';

const Navbar = () => {
  const [ csrf , setCSRF ] = useState("");
  const [ user , setUser ] = useState("");  
  const [ loggedin , setLoggedin ] = useState("");

  const logouthandle = async (e) => {
    e.preventDefault();
    const res = await axios('http://localhost:8000/logout', {
      withCredentials: true,
      headers : {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrf ,
      },
    })
    if(res.request.status === 200 && res.request.statusText === 'OK'){
      window.location.replace('/Loginpage')
    }
  }
  useEffect(
    async () => {
    const checklogin = await axios.get('http://localhost:8000/isauth', {
      withCredentials: true,
      headers : {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrf ,
      },
    })
    if(checklogin.data.status === 200){
      setLoggedin(true)
      setUser(checklogin.data.user)
    }else if (checklogin.data.status === 401){
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
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>


                
              {loggedin? 
                <> 
                   <PopupState variant="popover" popupId="demo-popup-menu">
                    {(popupState) => (
                        <>
                        <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        {...bindTrigger(popupState)}
                        >
                          <MenuIcon />
                        </IconButton>
                        <Menu {...bindMenu(popupState)}>
                          <MenuItem ><Button type="" color="inherit" >Profile</Button></MenuItem>
                          <MenuItem ><Button type="" color="inherit" >Creator</Button></MenuItem>
                          <MenuItem >
                            <form >
                                <Button type="" color="inherit" >Search</Button>
                            </form>
                          </MenuItem>
                          <MenuItem >
                            <form onSubmit={logouthandle}>
                              <Button type="submit" color="inherit" >Logout</Button>
                            </form>
                          </MenuItem>
                        </Menu>
                        </>
                    )}
                  </PopupState>

                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>

                      <Link href="/">PictureUP</Link>

                  </Typography>
                  <Link href={`/${user}/profile`}>
                    <Button color="inherit" >{user}</Button>
                  </Link>
                  <Link href={`/${user}/Upload`}>
                    <Button color="inherit" >Upload</Button>
                  </Link>
                      
                </>
                :
                <> 
                  <PopupState variant="popover" popupId="demo-popup-menu">
                    {(popupState) => (
                        <>
                        <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        {...bindTrigger(popupState)}
                        >
                          <MenuIcon />
                        </IconButton>
                        <Menu {...bindMenu(popupState)}>
                          <MenuItem ><Button type="" color="inherit" >Creator</Button></MenuItem>
                          <MenuItem >
                            <form >
                                <Button type="" color="inherit" >Search</Button>
                            </form>
                          </MenuItem>
                        </Menu>
                        </>
                    )}
                  </PopupState>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                      <Link href="/">PictureUP</Link>
                  </Typography>
                  <Link href="/Loginpage">
                    <Button color="inherit" >Login</Button>
                  </Link>
                  <Link href="/Signup">
                    <Button color="inherit" >Signup</Button>
                  </Link>
                </>
              }
            </Toolbar>
          </AppBar>
        </Box>
      );

  
}
export default Navbar;