"use client";
import { RootState } from "@/lib/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  updateCreds, updateNpiNumber, updatePracticeState, updateYearsExp } from "@/lib/slices/FormSlice";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

import { ChevronDown, X } from "lucide-react";

const stateChoices = [
  { id: "AL", label: "Alabama" },
  { id: "AK", label: "Alaska" },
  { id: "AZ", label: "Arizona" },
  { id: "AR", label: "Arkansas" },
  { id: "CA", label: "California" },
  { id: "CO", label: "Colorado" },
  { id: "CT", label: "Connecticut" },
  { id: "DE", label: "Delaware" },
  { id: "FL", label: "Florida" },
  { id: "GA", label: "Georgia" },
  { id: "HI", label: "Hawaii" },
  { id: "ID", label: "Idaho" },
  { id: "IL", label: "Illinois" },
  { id: "IN", label: "Indiana" },
  { id: "IA", label: "Iowa" },
  { id: "KS", label: "Kansas" },
  { id: "KY", label: "Kentucky" },
  { id: "LA", label: "Louisiana" },
  { id: "ME", label: "Maine" },
  { id: "MD", label: "Maryland" },
  { id: "MA", label: "Massachusetts" },
  { id: "MI", label: "Michigan" },
  { id: "MN", label: "Minnesota" },
  { id: "MS", label: "Mississippi" },
  { id: "MO", label: "Missouri" },
  { id: "MT", label: "Montana" },
  { id: "NE", label: "Nebraska" },
  { id: "NV", label: "Nevada" },
  { id: "NH", label: "New Hampshire" },
  { id: "NJ", label: "New Jersey" },
  { id: "NM", label: "New Mexico" },
  { id: "NY", label: "New York" },
  { id: "NC", label: "North Carolina" },
  { id: "ND", label: "North Dakota" },
  { id: "OH", label: "Ohio" },
  { id: "OK", label: "Oklahoma" },
  { id: "OR", label: "Oregon" },
  { id: "PA", label: "Pennsylvania" },
  { id: "RI", label: "Rhode Island" },
  { id: "SC", label: "South Carolina" },
  { id: "SD", label: "South Dakota" },
  { id: "TN", label: "Tennessee" },
  { id: "TX", label: "Texas" },
  { id: "UT", label: "Utah" },
  { id: "VT", label: "Vermont" },
  { id: "VA", label: "Virginia" },
  { id: "WA", label: "Washington" },
  { id: "WV", label: "West Virginia" },
  { id: "WI", label: "Wisconsin" },
  { id: "WY", label: "Wyoming" },
  { id: "DC", label: "District of Columbia" } 
] as const;

export default function Step1Contact({onNext,onBack,}: {onNext: () => void;onBack: () => void;}) {
  const dispatch = useDispatch();
  const { practiceState } = useSelector(
    (state: RootState) => state.form
  );


  const [practiceStateState, setPracticeState] = useState(practiceState || []);
  
  const [error ,setError] = useState("")

 

    const handleToggle = (id: string) => {
        setError("");
        
        let updated: string[];
        if (practiceStateState.includes(id)) {
          updated = practiceStateState.filter((s) => s !== id);
        } else {
            updated = [...practiceStateState, id];
        }
        setPracticeState(updated);
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (practiceStateState.length === 0) {
      setError("Please fill in all required fields.");
      return;
    }
    dispatch(updatePracticeState(practiceStateState));
    onNext(); // go to next step
  };

  return (
    <div className="w-full max-w-2xl mx-auto ">
      <div className="flex flex-col pt-5 pb-5">
        <h2 className="text-4xl font-bold mb-6">Licensed States of Practice</h2>
        {error ? <span className="text-red-600">{error}</span> : <></>} 
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
            <Label>
              Please select all states where you are currently licensed to pratice. <span className="text-red-600">*</span>
            </Label>
        </div>
       <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 lg:max-h-120 max-h-150  overflow-y-auto border rounded-lg p-4">
        {stateChoices.map((item) => (
            <label
            key={item.id}
            className="flex items-center space-x-2 p-2 hover:bg-gray-50 cursor-pointer rounded"
            >
            <Checkbox
                className="appearance-none w-5 h-5  border-2 border-gray-400
                      data-[state=checked]:bg-coral-600 data-[state=checked]:border-coral-600
                      transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-coral-500"
                checked={practiceStateState.includes(item.id)}
                onCheckedChange={() => handleToggle(item.id)}
            />
            <span className="text-xs">{item.label}</span>
            </label>
        ))}
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
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
