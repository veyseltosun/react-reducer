import { useReducer} from "react";
import {reducer} from "./reducer";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';




const initialState = {
  data: "",
  loading: false,
  error:"",
}

function App() {
  const[state, dispatch] = useReducer(reducer, initialState);
  const {data, loading, error} = state
  
//  const[data, setData] = useState("");
//  const[loading, setLoading] = useState(false);
//  const[error, setError] = useState("");

 const fetchData = () =>{

  dispatch({type:"FETCH_START"});
  
  fetch("https://api.thecatapi.com/v1/images/search").then((response) => response.json())
           .then((response) =>{
            dispatch({type:"FETCH_SUCCESS", payload: response[0].url})
           }).catch(() => {
           dispatch({type:"FETCH_FAIL", payload:"Something went wrong!"})
           })
 }

  return (
    <div>

    <Container maxWidth="large" style={{bgcolor:"black"}}>

    <div style={{display:"flex", flexDirection:"column", alignItem:"center"}} >
      
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar variant="dense">
           <Button variant="contained" onClick={fetchData} disabled={loading} style={{width:"100px", margin:"1rem"}} >Fetch The Cats</Button>
        
          <Typography variant="h6" color="inherit" component="div">
            Photos
          </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <div style={{width:"60%", height:"60%"}}>

      {data&& <img src={data} alt="cat-img" style={{width:"100%", height:"100%"}}/>}
      {error && <p>{error}</p>}
     
      </div>
    </div>
    </Container>
    </div>
  );
}

export default App;



