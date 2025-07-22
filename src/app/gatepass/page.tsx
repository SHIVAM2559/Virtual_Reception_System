"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import axios from "axios";
import { Checkbox } from "@/components/ui/checkbox";
import { useTheme } from "next-themes";

export default function GatePass() {
  const {setTheme}=useTheme();
  const [adhar, setAdhar] = React.useState("");
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [fetched, setFetched] = React.useState(false);
  const [selectedPurposes, setSelectedPurposes] = React.useState("None");
  const [index, setIndex] = React.useState(-1);
  const currentDate = new Date();
  const [gadgetInput, setGadgetInput] = React.useState("");
  const [gadgets, setGadgets] = React.useState<string[]>([]);
  const [guest, setGuest] = React.useState({
    name: "",
    mobile_No: "",
    adhar: "",
    purpose: [],
    valid_from: [new Date()],
    valid_to: [new Date()],
    gender: "",
    visiting_officer: [],
    division: "",
  });

  const fetch = async () => {
    try {
      const response = await axios.post("/api/users/gatepass", {
        adhar: adhar,
      });

      if (response.data.success == true) {
        setFetched(true);
        setGuest(response.data.value);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setTheme('light');
    return () => setTheme('dark'); // Reset to system preference when unmounting
  }, [setTheme]);

  useEffect(() => {
    setButtonDisabled(adhar.length <= 2);
  }, [adhar]);

  return (
    <div className="max-w-md mx-auto p-6 ">
      {!fetched ? (
        <div className="space-y-4">
          <p>Type Your Aadhaar Number</p>
          <Input onChange={(e) => setAdhar(e.target.value)} />
          <div className="flex justify-center">
            <Button onClick={fetch} disabled={buttonDisabled} variant="outline">
              {buttonDisabled ? "NO-Submit" : "Submit"}
            </Button>
          </div>
        </div>
      ) : selectedPurposes === "None" ? (
       <div className="space-y-4">
  <h2 className="text-xl font-bold">Guest Details</h2>
  <div className="p-4 border rounded">
    <p><span className="font-semibold">Name:</span> {guest.name}</p>
    <p><span className="font-semibold">Aadhaar:</span> {guest.adhar}</p>
    <p><span className="font-semibold">Mobile:</span> {guest.mobile_No}</p>
  </div>

  {/* Gadget Input Section */}
  <div className="space-y-2">
    <h3 className="font-semibold">Add Gadgets:</h3>
    <div className="flex gap-2">
      <Input 
        id="gadgetInput"
        placeholder="Enter gadget name"
        value={gadgetInput}
        onChange={(e) => setGadgetInput(e.target.value)}
      />
      <Button 
        onClick={() => {
          if (gadgetInput.trim()) {
            setGadgets([...gadgets, gadgetInput.trim()]);
            setGadgetInput(""); // Clear input after adding
          }
        }}
      >
        Add
      </Button>
    </div>
    
    {/* Display list of gadgets */}
    {gadgets.length > 0 && (
      <div className="mt-2 border rounded p-2">
        <h4 className="font-medium mb-1">Gadgets List:</h4>
        <ul className="list-disc pl-5 space-y-1">
          {gadgets.map((gadget, index) => (
            <li key={index} className="flex justify-between items-center">
              <span>{gadget}</span>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  setGadgets(gadgets.filter((_, i) => i !== index));
                }}
              >
                ×
              </Button>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>

  <div>
    <h3 className="font-semibold mb-2">Select Purpose:</h3>
    {guest.purpose?.map((purpose: string, idx: number) => (
      <div key={purpose} className="flex items-center space-x-2">
        <Checkbox
          id={purpose}
          checked={selectedPurposes.includes(purpose)}
          onCheckedChange={(checked) => {
            if (checked) {
              setSelectedPurposes(purpose);
              setIndex(idx);
            }
          }}
        />
        <label htmlFor={purpose}>{purpose}</label>
      </div>
    ))}
  </div>
</div>
      ) : currentDate >= new Date(guest.valid_from[index]) && 
        currentDate <= new Date(guest.valid_to[index]) ? (
          <div className="mr-200">
        <div className="w-full min-h-screen  mr-200">
          <div className="w-200 h-120 border-2 border-red-800 flex flex-col ">
            {/* Header */}
            <div className="text-center py-1 border-b-2 bg-blue-600">
              <h1 className="text-lg text-white font-bold">Ministry of Home Affairs - Reception</h1>
            </div>

            {/* Logo */}
            <div className="flex justify-center my-1">
              <img
                className="h-20 object-contain"
                src="https://www.shutterstock.com/shutterstock/photos/2206483805/display_1500/stock-vector-nellore-india-september-indian-emblem-vector-art-with-fine-details-lions-2206483805.jpg"
                alt="Indian Emblem"
              />
            </div>

            {/* Pass Title */}
            <div className="text-center">
              <h2 className="text-md font-semibold">Sewa Bhawan (Daily Visitor Pass)</h2>
            </div>

            {/* Valid Duration */}
            <div className="text-center p-1 bg-blue-300">
              <p className="text-xs">
                Valid: {currentDate.toLocaleTimeString('en-US', {hour:'2-digit', minute:'2-digit', hour12:true})} to 05:11 PM | 
                Printed: {currentDate.toLocaleDateString("en-GB")}
              </p>
            </div>

            {/* Visitor Details */}
            <div className="flex-1 grid grid-cols-2 gap-2 p-2">
              <div className="space-y-1">
                <div className="flex">
                  <p className="font-semibold w-20 text-sm">Name:</p>
                  <p className="text-sm">{guest.name}</p>
                </div>
                <div className="flex">
                  <p className="font-semibold w-20 text-sm">Address:</p>
                  <p className="text-sm">123 Sample Street, New Delhi</p>
                </div>
                <div className="flex">
                  <p className="font-semibold w-20 text-sm">Officer:</p>
                  <p className="text-sm">{guest.visiting_officer[index]}</p>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex">
                  <p className="font-semibold w-20 text-sm">Gender:</p>
                  <p className="text-sm">{guest.gender}</p>
                </div>
                <div className="flex">
                  <p className="font-semibold w-20 text-sm">Mobile:</p>
                  <p className="text-sm">{guest.mobile_No}</p>
                </div>
                <div className="flex">
                  <p className="font-semibold w-20 text-sm">Division:</p>
                  <p className="text-sm">{guest.division}</p>
                </div>
              </div>
              <div className="flex">
                <p className="font-semibold w-20 text-sm">Valid Date :</p>
                <p className="text-sm">{currentDate.toLocaleDateString('en-GB')}</p>
              </div>
              
              <div className="col-span-2">
                <div className="flex">
                  <p className="font-semibold w-20 text-sm">Purpose:</p>
                  <p className="text-sm">{guest.purpose[index]}</p>
                </div>
              </div>
               {gadgets.length > 0 && (
                <div className="col-span-2">
                  <div className="flex">
                    <p className="font-semibold w-24">Gadgets:</p>
                    <div className="flex flex-wrap gap-2">
                      {gadgets.map((gadget, index) => (
                        <span 
                          key={index} 
                          className="px-2 py-1 bg-gray-100 rounded text-sm"
                        >
                          {gadget}
                        </span>
                      ))}
                      
                    </div>
                    
                  </div>
                  
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="p-1 border-t-2 text-blue-800 ">
              <p className="text-xs font-semibold">Important Instructions:</p>
              <ul className="text-xxs list-disc pl-4 space-y-0">
                <li>Visitor should not roam around except the office to be visited</li>
                <li>Must return pass to security after visit</li>
                <li>Carry this pass at all times</li>
              </ul>
            </div>

            {/* Footer */}
            <div className="text-center py-1 border-t-2 bg-blue-500">
              <p className="text-xs text-white">Ministry of Home Affairs - Reception Organisation</p>
            </div>
          </div>
        </div>
        </div>
      ) : (
        <div className="text-red-600">
          Your date is invalid. You are not allowed for gate pass today. Please contact your administrator.
        </div>
      )}
    </div>
  );
}
