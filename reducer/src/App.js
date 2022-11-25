import {useState, useReducer} from "react";

const initialState = {
  data: "",
  loading: false,
  error:"",
}

function App() {
  const[state, dispatch] = useReducer(reducer, initialState)
//  const[data, setData] = useState("");
//  const[loading, setLoading] = useState(false);
//  const[error, setError] = useState("");

 const fetchData = () =>{
  setLoading(true);
  setError("");
  setData("");
  fetch("https://api.thecatapi.com/v1/images/search").then((response) => response.json())
           .then((response) =>{
            setLoading(false);
            setData(response[0].url)
           }).catch(() => {
            setLoading(false);
            setError("Something went wrong!")
           })
 }

  return (
    <div style={{display:"flex", flexDirection:"column"}} >
      <button onClick={fetchData} disabled={loading} style={{width:"100px", margin:"1rem"}}>
        Fetch Data
        
      </button>
      <div style={{width:"100px", height:"100px"}}>

      {data&& <img src={data} alt="cat-img"/>}
      {error && <p>{error}</p>}
     
      </div>
    </div>
  );
}

export default App;
