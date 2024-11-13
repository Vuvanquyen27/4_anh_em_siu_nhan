import React from 'react';  
import './index.css'; // Assuming thi hackathon.css is in the same directory
import FormLogin from './component/formlogin.jsx';// Nhớ đổi đường dẫn nếu cần
import FormRegister from './component/form-register.jsx'



function App() {

  return(
    <>
      <FormRegister></FormRegister>
      <FormLogin></FormLogin>
    </>
  );
}

export default App;


  