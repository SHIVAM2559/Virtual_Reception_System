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
import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { WarpBackground } from "@/components/magicui/warp-background";


export default function login(){

    const router=useRouter();

     const [loading , setLoading]=React.useState(false);
     const [user,setUser]=React.useState(
        {
            email:"",
            password:""
        }
     )
     const [buttonDisabled,setButtonDisabled]=React.useState(true);

     const onLogin=async()=>{
        try {
            setLoading(true);
            const response=await axios.post("/api/users/login",user)

            if(response.data.success){
                router.push("/guestupdate");
            }
           else router.push("/signup");
            console.log(response.data);
            
            
            
        } catch (error:any) {
            router.push("/signup")
            console.log("login failed",error.message);
            
        }
        finally{
            setLoading(false);
        }
     }

     useEffect(()=>{
        if(user.email.length>0 && user.password.length>0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
     },[user])


    return (
       <div className="min-h-screen flex items-center justify-center p-4 text-2xl">
      
         <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login to Reception</CardTitle>
          <CardDescription>Please use registered and CEA approved email only</CardDescription>
          <CardAction >{(loading==true ? "Loading...":"Login")}</CardAction>
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
            type="Password"
            value={user.password}
            onChange={(e)=>setUser({...user,password:e.target.value})}
            />
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-center">
          <Button onClick={onLogin} variant={"ghost"}>
            {(buttonDisabled ? "No-Login":"Login")}
          </Button>
        </CardFooter>
      </Card>
     </div>
    );
}