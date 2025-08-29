"use client";
import { RootState } from "@/lib/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStage1 } from "@/lib/slices/FormSlice";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function Step1Contact({onNext,onBack,}: {onNext: () => void;onBack: () => void;}) {
  const dispatch = useDispatch();
  const { first_name, last_name, email, phone } = useSelector(
    (state: RootState) => state.form
  );
  // console.log(first_name , last_name);

  const [firstName, setFirstName] = useState(first_name);
  const [lastName, setLastName] = useState(last_name);
  const [emailState, setEmail] = useState(email);
  const [phoneState, setPhone] = useState(phone);
  const [error ,setError] = useState("")

  const handleChange = (field: string, value: string) => {
    setError("")
    if (field === "first_name") setFirstName(value);
    if (field === "last_name") setLastName(value);
    if (field === "email") setEmail(value);
    if (field === "phone") setPhone(value);

    dispatch(addStage1({ [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    
    if (!firstName || !lastName || !emailState || !phoneState) {
      setError("Please fill in all required fields.");
      return;
    }

    const phoneRegex= /\D/g
    const val = phoneState.replace(phoneRegex ,"")
    if(val.length<10  || val.length>10){
      setError("Please enter a valid phone number.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailState)) {
      setError("Please enter a valid email address.");
      return;
    }

   
    setError(""); 
    onNext();
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex flex-col pt-5 pb-5">
        <h2 className="text-4xl font-bold mb-6">What's your contact info?</h2>
        {error ? <span className="text-red-600">{error}</span> : <></>} 
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* First + Last Name */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col gap-2 items-start w-full">
            <Label>
              Firstname <span className="text-red-600">*</span>
            </Label>
            <Input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => handleChange("first_name", e.target.value)}
              className="w-full border p-4 text-lg rounded-xl border-gray-300 h-14"
            />
          </div>
          <div className="flex flex-col gap-2 items-start w-full">
            <Label>
              Lastname <span className="text-red-600">*</span>
            </Label>
            <Input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => handleChange("last_name", e.target.value)}
              className="w-full border p-4 text-lg rounded-xl border-gray-300 h-14"
            />
          </div>
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-2">
          <Label>
            Phone Number <span className="text-red-600">*</span>
          </Label>
          <Input
            type="number"
            inputMode="numeric"
            maxLength={10}
            placeholder="Phone Number"
            value={phoneState}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="w-full border p-4 text-lg rounded-xl border-gray-300 h-14"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <Label>
            Email <span className="text-red-600">*</span>
          </Label>
          <Input
            type="email"
            placeholder="Email"
            value={emailState}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full border p-4 text-lg rounded-xl border-gray-300 h-14"
          />
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 bg-gray-200 rounded-lg"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-coral-600 text-white rounded-lg"
          >
            continue
          </button>
        </div>
      </form>
    </div>
  );
}
