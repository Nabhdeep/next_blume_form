"use client";
import { RootState } from "@/lib/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Notebook , ArrowUpRight} from "lucide-react"
import { Label } from "../ui/label";
import { Button } from "../ui/button";

export default function Step1Contact({onNext,onBack,}: {onNext: () => void;onBack: () => void;}) {
  const dispatch = useDispatch();
  const { first_name, last_name, email, phone } = useSelector(
    (state: RootState) => state.form
  );

  const [error  , setError] = useState("")


  const handleBookClick = (e: React.FormEvent) => {
    
  };

  return (
    <div className="w-full max-w-2xl mx-auto text-center">
      <div className="flex flex-col pt-5 pb-20 items-center">
        <h2 className="text-4xl font-bold mb-6">You are almost there! {first_name || ""} Book a call with us</h2>
        <span>Meet with our pactice success manager to get started.</span>
        {error ? <span className="text-red-600">{error}</span> : <></>} 
      </div>
      <div className="flex flex-1 flex-col items-center gap-5">
        <Notebook className="text-coral-500 h-25 w-25"></Notebook>
        <Label className="text-2xl">Schedule Your Onboarding Call</Label>
        <Label>This call required to step up your <span className="text-coral-600">blume health</span> profile and get started</Label>
        <Button  onClick={() => window.open("https://calendly.com/aman-bansal-blumehealthco/webinar", "_blank")} className="bg-coral-600 h-20 w-40 text-2xl rounded-4xl">Book Here! <ArrowUpRight className="h-14 w-14" /></Button>
      </div>
    </div>
  );
}
