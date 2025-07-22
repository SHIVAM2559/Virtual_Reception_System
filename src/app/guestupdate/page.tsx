"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useRouter } from "next/navigation";


export default function guestupdate() {

  const [guest,setGuest]=React.useState({
     Name:"",
     Mobile_No:34,
     Adhar:"",
     purpose:"",
     valid: new Date(),
     valid_to:new Date(),
     father_Name:"",
     address:"",
     gender:"",
     institute:"",
     division:"",
     officer:""
  })

  const [loading,setLoading]=React.useState(false);
  const [buttonDisabled,setButtonDisabled]=React.useState(true);

  const router=useRouter();

   const onSubmit=async()=>{
     
    try {
      setLoading(true);

      const response=await axios.post("/api/users/guestupdate",guest)
      if(response.data.success==true){
        router.push("/addmore");
      }
      
    } catch (error:any) {
       console.log("unable to update user");
       
    }
    finally{
      setLoading(false);
    }

   }

   useEffect(()=>{
    //first check either disable the button or enable it
      if(guest.Name.length>0 && guest.Mobile_No.toString.length>0 && guest.Adhar.length>0 && guest.purpose.length>0 && guest.valid && guest.valid_to){
        setButtonDisabled(false);
        
      }
      else{
        setButtonDisabled(true);
      }
   },[guest])

   
   

  return (
   
    <div className="text-2xl">
      
      <CardTitle className="flex justify-center py-7 text-3xl">
       {loading==true ? "Updating...":" Update Guest Information"}
      </CardTitle>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        {/* Left Section */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Visitor Detail</CardTitle>
              <CardDescription>
                All fields in this section are necessary
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <p>Name</p>
                <Input
                  onChange={(e) => setGuest({ ...guest, Name: e.target.value })}
                ></Input>
              </div>

              <div>
                <p>Mobile no.</p>
                <Input
                  onChange={(e) =>
                    setGuest({
                      ...guest,
                      Mobile_No: Number(e.target.value) || 0,
                    })
                  }
                ></Input>
              </div>

              <div>
                <p>Adhar Number</p>
                <Input
                  onChange={(e) =>
                    setGuest({ ...guest, Adhar: e.target.value })
                  }
                ></Input>
              </div>

              <div>
                <p>Purpose</p>
                <Input
                  onChange={(e) =>setGuest({ ...guest, purpose: e.target.value })
                  }
                ></Input>
              </div>

              <div className="">
                <p>Valid From</p>
               <DatePicker className="border-1 border-blue-50 " value={guest.valid?.toLocaleDateString('en-CA') || new Date().toISOString()}  onChange={(date) => setGuest(prev => ({ ...prev, valid: date || new Date() }))} />


              </div>

              <div>
                <p>Valid To</p>
                <DatePicker className="border-1 border-blue-50 " value={guest.valid_to?.toLocaleDateString('en-CA') || new Date().toISOString()}  onChange={(date) => setGuest(prev => ({ ...prev, valid_to: date || new Date() }))} />
              </div>
            </CardContent>
          </Card>
        </div>
        {/* right Section */}
        <div>
          <Card>
            <CardHeader>
              {/* <CardTitle>Card Title</CardTitle> */}
              <br />
              <CardDescription>Please fill avilable details</CardDescription>
              {/* <CardAction>Card Action</CardAction> */}
            </CardHeader>
            <CardContent>
              <div>
                <p>Father's Name</p>
                <Input  onChange={(e) =>setGuest({ ...guest, father_Name: e.target.value })}></Input>
              </div>

              <div>
                <p>Address</p>
                <Input onChange={(e) =>setGuest({ ...guest, address: e.target.value })}></Input>
              </div>

              <div>
                <p>Gender</p>
                <input type="radio" onChange={(e)=>{setGuest({...guest,gender: e.target.value})}} value="Male" name="gender" />Male
                <input type="radio" onChange={(e)=>{setGuest({...guest,gender:e.target.value})}} value="Female" name="gender" />Female
                
              </div>

              <div>
                <p>Company / Institute Name</p>
                <Input onChange={(e) =>setGuest({ ...guest, institute: e.target.value })}></Input>
              </div>

              <div>
                <p>Division / Wing</p>
                <Input  onChange={(e) =>setGuest({ ...guest, division: e.target.value })}></Input>
              </div>

              <div>
                <p>Visiting Officer Name</p>
                <Input onChange={(e) =>setGuest({ ...guest, officer: e.target.value })}></Input>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex justify-center pt-0.5">
        <Button onClick={onSubmit} variant="outline">{buttonDisabled==true ? "No-Submit":"Submit"}</Button>
      </div>
      
    </div>
  );
}
