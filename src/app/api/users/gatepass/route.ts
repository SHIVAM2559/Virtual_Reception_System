import { connect } from "@/dbconfig/dbconfig";
import Guest from "@/models/guestmodel";
import { NextRequest, NextResponse } from "next/server";

//connect the mngo db

connect();

export async function POST(request: NextRequest) {
  //check if it is presentin the database
  //if present send the array to frontend

  try {
    const reqbody = await request.json();

    const adhar = reqbody.adhar;

    const guest = await Guest.findOne({ adhar });

    //
    if (!guest) {
        console.log("guest nhi mila");
        
      return NextResponse.json({
        success: false,
        message: "Guest not found",
      });
    } else {
      //guest mil gaya hai return it
      console.log(guest);
      
      console.log("guest mil gaya hai ab agge chal raha hun");
      
      return NextResponse.json({
        success: true,
        value: guest,
      });
    }
  } catch (error: any) {
    console.log("error aa gaya hai");
    
    return NextResponse.json({
      success: false,
      data: error,
    });
  }
}
