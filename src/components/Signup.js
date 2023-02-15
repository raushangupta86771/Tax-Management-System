import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Signup = () => {

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:7000/api/auth/createUser', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password }),
        });
        const json = await response.json();
        console.log(json);
        localStorage.setItem('token', json.authToken);
        history.push("/"); //redirecting to "/" endpoint
    }

    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return <>
        {/* <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onchange} name='name' />
            </div>
            <div className="mb-3">
                <label htmlFor="emaill" className="form-label">Email address</label>
                <input type="email" className="form-control" id="emaill" aria-describedby="emailHelp" onChange={onchange} name='email' />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" onChange={onchange} name='password' minLength={5} required />
            </div>
            <div className="mb-3">
                <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" id="cpassword" onChange={onchange} name='cpassword' minLength={5} required />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form> */}


        {/* <div className="containerrrr" autoComplete='off'> */}
        <form className='signForm mt-4 mb-3' autoComplete='off' onSubmit={handleSubmit}>
            <p>Welcome</p>
            <label htmlFor="" className='mb-3'>Name</label><br />
            <input type="text" placeholder="Name" className='signInput' onChange={onchange} name='name' minLength={5} required /><br />

            <label htmlFor="" className='mb-3'>Email</label><br />
            <input type="email" placeholder="Email" className='signInput' onChange={onchange} name='email' minLength={5} required /><br />

            <label htmlFor="" className='mb-3'>Password</label><br />
            <input type="password" placeholder="password" className='signInput' onChange={onchange} name='password' minLength={5} required /><br />

            <label htmlFor="" className='mb-3'>Confirm Password</label><br />
            <input type="password" placeholder="Confirm Password" className='signInput' onChange={onchange} name='cpassword' minLength={5} required /><br />

            <button type="submit" value="Submit" className='m-auto sbt-btn mb-1'>Submit</button>
        </form>


        {/* </div> */}
    </>;
};

export default Signup;