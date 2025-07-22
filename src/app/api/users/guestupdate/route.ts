import { connect } from "@/dbconfig/dbconfig";
import Guest from "@/models/guestmodel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest){
    try {
        const reqbody=await request.json();

        const adhar=reqbody.Adhar;
        const purpose= reqbody.purpose;
        const valid_from= reqbody.valid;
        const valid_to= reqbody.valid_to;
        const visiting_office=reqbody.officer
        
        const newGuest = new Guest({
          name: reqbody.Name,
          mobile_No: reqbody.Mobile_No,
          adhar: reqbody.Adhar,
          purpose: [reqbody.purpose],
          valid_from: [reqbody.valid],
          valid_to: [reqbody.valid_to],
          Father_name: reqbody.father_name,
          address: reqbody.address,
          gender: reqbody.gender,
          company: reqbody.institute,
          division: reqbody.division,
          visiting_officer: [reqbody.officer],
        });

        //if guest already updated with same purpose

        const guest=await Guest.findOne({adhar});

        if(guest){
            const index=guest.purpose.indexOf(purpose);
            if(index!=-1){
                //now i if purposse exist that means now my user is updating the guest entry or exit date or the guest visisting officer
                guest.purpose[index]=purpose;
                guest.valid_from[index]=valid_from;
                guest.valid_to[index]=valid_to;
                guest.visiting_officer[index]=visiting_office;
                await guest.save();

                return NextResponse.json({
                    success:true,
                    message:"guest updated and saved successfully"
                })
            }
            else{
                guest.purpose.push(purpose);
                guest.valid_from.push(valid_from);
                guest.valid_to.push(valid_to);
                guest.visiting_officer.push(visiting_office);
                await guest.save();
                return NextResponse.json({
                    success:true,
                    message:"guest saved successfully"
                })
            }
        }

        const saveGuest=await newGuest.save();

        console.log(newGuest);
        

        return NextResponse.json(
      { success: true,data:saveGuest },
      { status: 201 } // HTTP 201 = Created
    );
        
    } catch (error:any) {
        console.log(error);
        
        return NextResponse.json({
            success:false,
            message:"Unable to update Guest"
            
        },
    {status:500})
    }
}