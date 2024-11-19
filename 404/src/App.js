import React from 'react';
import Card from './Card';
import Sidebar from './Sidebar';
import  {useEffect, useState} from 'react'
import axios from 'axios';

function App() {
  const [data, setData] = useState(null); 
  useEffect(() => { axios.get('http://localhost:5000/api/data') 
    .then(response => setData(response.data)) 
    .catch(error => console.error('Lỗi:', error)); }, []);
  return (
    <div> 
      {data ? ( <div> <h1>{data.key}</h1> </div> 
      ) : ( 
      <p>Loading...</p> )} 
      <Card></Card>
      <Sidebar></Sidebar>
    </div>
  );
}

export default App;
