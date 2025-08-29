"use client";
import { RootState } from "@/lib/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  updateCreds, updateNpiNumber, updateYearsExp } from "@/lib/slices/FormSlice";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
const credentialsChoice = [
  {
    "id": "LCSW",
    "label": "LCSW"
  },
  {
    "id": "LMFT",
    "label": "LMFT"
  },
  {
    "id": "LPC",
    "label": "LPC"
  },
  {
    "id": "PMHNP-BC",
    "label": "PMHNP-BC"
  },
  {
    "id": "FNP-C",
    "label": "FNP-C"
  },
  {
    "id": "FNP-BC",
    "label": "FNP-BC"
  },
  {
    "id": "AGNP-C",
    "label": "AGNP-C"
  },
  {
    "id": "PNP-BC",
    "label": "PNP-BC"
  },
  {
    "id": "WHNP-BC",
    "label": "WHNP-BC"
  },
  {
    "id": "DNP",
    "label": "DNP"
  },
  {
    "id": "PhD",
    "label": "PhD"
  },
  {
    "id": "PsyD",
    "label": "PsyD"
  },
  {
    "id": "MD",
    "label": "MD"
  },
  {
    "id": "DO",
    "label":"DO"
  }
]  as const
export default function Step1Contact({onNext,onBack,}: {onNext: () => void;onBack: () => void;}) {
  const dispatch = useDispatch();
  const { npiNumber , yearsExperience , credentials } = useSelector(
    (state: RootState) => state.form
  );

  const [npiNumberState, setNpiNumber] = useState(npiNumber);
  const [yearsExperienceState, setYearsExp] = useState(yearsExperience || "");
  const [credentialsState, setCredentials] = useState(credentials || []);
  
  const [error ,setError] = useState("")

  const handleChange = (field: string, value: string) => {
    setError("")
    if (field === "npiNumber") setNpiNumber(value);
    if (field === "yearsExperience") setYearsExp(value);
  };

    const handleToggle = (id: string) => {
        setError("");
        console.log(credentialsState);

        let updated: string[];
        if (credentialsState.includes(id)) {
        updated = credentialsState.filter((s) => s !== id);
        } else {
        updated = [...credentialsState, id];
        }
        setCredentials(updated);
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(npiNumber , yearsExperience , credentials);
    // Simple validation
    if (!npiNumberState || !yearsExperienceState || !credentialsState) {
      setError("Please fill in all required fields.");
      return;
    }
    dispatch(updateCreds(credentialsState));
    dispatch(updateNpiNumber(npiNumberState));
    dispatch(updateYearsExp(yearsExperienceState))
    onNext(); // go to next step
  };

  return (
    <div className="w-full max-w-2xl mx-auto ">
      <div className="flex flex-col pt-5 pb-5">
        <h2 className="text-4xl font-bold mb-6">Your Professional Details</h2>
        {error ? <span className="text-red-600">{error}</span> : <></>} 
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* First + Last Name */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col gap-2 items-start w-full">
            <Label>
              NPI Number <span className="text-red-600">*</span>
            </Label>
            <Input
              type="number"
              inputMode="numeric"
              maxLength={10}
              placeholder="must be in 10 digits"
              value={npiNumberState}
              onChange={(e) => handleChange("npiNumber", e.target.value)}
              className="w-full border p-4 text-lg rounded-xl border-gray-300 h-14"
            />
          </div>
          <div className="flex flex-col gap-2 items-start w-full">
            <Label>
              Years of Experience <span className="text-red-600">*</span>
            </Label>
            <Input
              type="number"
              inputMode="numeric"
              placeholder="4"
              value={yearsExperienceState}
              onChange={(e) => handleChange("yearsExperience", e.target.value)}
              className="w-full border p-4 text-lg rounded-xl border-gray-300 h-14"
            />
          </div>
        </div>
        <div>
            <Label >
              Credentials <span className="text-red-600">*</span>
            </Label>
        </div>
        <div className="max-h-130 overflow-y-auto border rounded-lg border-gray-300">
            
        {credentialsChoice.map((item) => (
            <Label
            key={item.id}
            className="flex items-center space-x-3 border-b last:border-b-0 p-4 hover:bg-gray-50 cursor-pointer border-gray-200"
            >
            <Checkbox
              className="appearance-none w-5 h-5  border-2 border-gray-400
                        data-[state=checked]:bg-coral-600 data-[state=checked]:border-coral-600
                        transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-coral-500"
                checked={credentialsState.includes(item.id)}
                onCheckedChange={() => handleToggle(item.id)}
            />
            <span className="text-base">{item.label}</span>
            </Label>
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
            continue
          </button>
        </div>
      </form>
    </div>
  );
}
