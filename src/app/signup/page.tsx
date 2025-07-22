"use client"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import React, { useEffect } from "react"
import axios from "axios"



export default function signup(){

  const router=useRouter();

  const [user,setUser]=React.useState({
    email:"",
    password:"",
    confirmPassword:""
  })

  const [buttonDisabled,setButtonDisabled]=React.useState(true);
  const [loading,setLoading]=React.useState(false);
  
    const  onSignup=async()=>{
      try {
        setLoading(true);
        
        const response=await axios.post("/api/users/signup",user);
        console.log(response.data);

        router.push('/login');
        

      } catch (error:any) {
        console.log("signup failed" , error.message);
      }
      finally{
        setLoading(false);
      }
    }

    useEffect(()=>{
      if(user.email.length>0 && user.confirmPassword.length>0 && user.confirmPassword==user.password){
        setButtonDisabled(false);
      }
      else{
        setButtonDisabled(true);
      }
    },[user]);

    return (
     <div className="min-h-screen flex items-center justify-center p-4 text-2xl">
         <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Only use CEA approved Email</CardDescription>
          <CardAction >{(loading==true ? "Loading":"Sign-Up")}</CardAction>
        </CardHeader>
        <CardContent className="space-y-8">
          <div >
            <p>Email</p>
            <Input
            value={user.email}
            onChange={(e)=>setUser({...user,email:e.target.value})}
             />
          </div>
          <div>
            <p>Password</p>
            <Input 
            value={user.password}
            onChange={(e)=>setUser({...user,password:e.target.value})}
            />
          </div>
          <div>
            <p>Confirm Password</p>
            <Input
            value={user.confirmPassword}
            onChange={(e)=>setUser({...user,confirmPassword:e.target.value})}
             />
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-center">
          <Button onClick={onSignup} variant={"ghost"}>
            {(buttonDisabled ? "No-Submit":"Submit")}
          </Button>
        </CardFooter>
      </Card>
     </div>
    );
}