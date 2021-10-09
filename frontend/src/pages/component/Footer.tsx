import styles from '../../styles/Home.module.css';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const styleFooter={
    textAlign: 'center',
    cursor:'pointer',
}
export default function Footer(){
    return (
        <Typography style={styleFooter} sx={{ mt:7  }} variant="h5" component="h2">
            <a href="https://github.com/trithepChaliewtham/PictureUP-Selected-Topic-Project" target="_blank">
                <i>Copy Right @ by trithep.ch.62@ubu.ac.th </i>
            </a>
        </Typography>
    );
} 
