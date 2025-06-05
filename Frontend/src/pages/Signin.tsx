import { useState } from "react"
import Heading from "../components/Heading";
import Desc from "../components/Desc";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import { NavLink } from "react-router-dom";
import UserWarning from "../components/UserWarning";
import axios from "axios";

// base url 
const base_url = import.meta.env.VITE_BASE_URL;
console.log(base_url);

function Signin() {

  const [userlogin , setUserLogin] = useState({email:"" , password:""});
  console.log(userlogin)

   const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const {name , value} = event.target;
        setUserLogin(prev => {
          return {
            ...prev,
            [name] : value
          }
        })
    }
  
   const submitHandler = async(event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      // api call for create user
      try{

        const {email , password} = userlogin;
        const res = await axios.post(`${base_url}/user/signin` , {
          email,
          password
        } , {headers : { 'Content-Type': 'application/json'}});

        if(res){
          console.log(res.data);
          localStorage.setItem( "token" , res.data.token);
        }

      } catch(err: unknown){
          if(typeof(err) === 'string'){
            console.log(err)
          } else if(err instanceof Error){
            console.log(err.message);
          }
      }
  }


  return (
    <div className="border w-[350px] h-[40vh] flex flex-col items-center gap-2 p-2 rounded-2xl">
     <Heading heading="Sign in"/>
     <Desc description="Enter your credentials to access your account"/>
     <form action="" onSubmit={submitHandler}>
        <label htmlFor="email">Email</label><br />
        <InputBox type="text" placeholder="Johndoe@example.com" name="email" value={userlogin.email || ""} onChange={changeHandler}/>

        <label htmlFor="password">Password</label><br />
        <InputBox type="password" name="password" value={userlogin.password || ""} onChange={changeHandler}/>

        <Button type="submit" variant="primary" size="lg" text="Sign in"/>
     </form>

     <UserWarning warn={
         <>
          Don't have an account? <NavLink to="/"><u>Sign up</u></NavLink>
         </>
      }/>
    </div>
  )
}

export default Signin
