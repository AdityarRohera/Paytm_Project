import React, { useState } from "react"
import Desc from "../components/Desc"
import Heading from "../components/Heading"
import InputBox from "../components/InputBox"
import Button from "../components/Button";
import UserWarning from "../components/UserWarning";
import { NavLink } from "react-router-dom";
import axios from "axios";

// dot env config
// import dotenv from 'dotenv'
// dotenv.config();
const base_url = import.meta.env.VITE_BASE_URL;
console.log(base_url);

function Signup() {

  const [userData , setUserData] = useState({firstName : "" , lastName : "" , email : "" , password : ""});
  console.log(userData);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      const {name , value} = event.target;
      setUserData(prev => {
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

        const {firstName , lastName , email , password} = userData;
        const res = await axios.post(`${base_url}/user/signup` , {
          firstName,
          lastName,
          email,
          password
        } , {headers : { 'Content-Type': 'application/json'}});

        if(res){
          console.log(res);
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
    <div className=" border w-[350px] h-[50vh] flex flex-col items-center gap-2 p-2 rounded-2xl">
      <Heading heading="Sign Up"/>
      <Desc description="Enter your information to create an account"/>

      <form action="" onSubmit={submitHandler}>

        <label htmlFor="firstName">First Name</label><br />
        <InputBox type="text" placeholder="John" name="firstName" value={userData.firstName || ""} onChange={changeHandler}/>

        <label htmlFor="lastName">Last Name</label><br />
        <InputBox type="text" placeholder="Doe" name="lastName" value={userData.lastName || ""} onChange={changeHandler}/>

        <label htmlFor="email">Email</label><br />
        <InputBox type="text" placeholder="Johndoe@example.com" name="email" value={userData.email || ""} onChange={changeHandler}/>

        <label htmlFor="password">Password</label><br />
        <InputBox type="password" name="password" value={userData.password || ""} onChange={changeHandler}/>

        <Button type="submit" variant="primary" size="lg" text="Sign up"/>
      </form>

      <UserWarning warn={
         <>
          Already have an Account? <NavLink to="/signin"><u>Sign in</u></NavLink>
         </>
      }/>

    </div>
  )
}

export default Signup
