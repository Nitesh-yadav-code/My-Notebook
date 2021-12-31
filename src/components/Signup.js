import React,{useState} from 'react'
import { useHistory } from 'react-router-dom';

function Signup(props) {
    let history =  useHistory();
    const [credential, setCredential] = useState({name:"", email: "", password:""});
    const onChange=(e)=>{
        setCredential({...credential, [e.target.name]: e.target.value})
    }
    const handleSubmit= async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({name:credential.name ,email:credential.email, password:credential.password})
          });
          const json =  await response.json();
          console.log(json);
          if(json.success){
            history.push("/login")
            props.showAlert("Account Created Successfully", "success");
          }else{
            props.showAlert("Inavalid Details", "danger");

        }
    }
    return (
        <div className='container mt-2' >
            <h2 className='my-2'>Create an Account to use MyNoteBook</h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" onChange={onChange} value={credential.name} id="name" name='name' aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={onChange} value={credential.email} id="email" name='email' aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credential.password}  autoComplete="on" onChange={onChange} name="password" id="password" />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Signup
