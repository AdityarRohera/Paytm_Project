import { useState } from "react"
import Heading from "../components/Heading";
import Desc from "../components/Desc";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import { NavLink } from "react-router-dom";
import UserWarning from "../components/UserWarning";

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
  
    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
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
