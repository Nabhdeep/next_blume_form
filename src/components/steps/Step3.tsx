"use client";
import { RootState } from "@/lib/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCanSeePatient } from "@/lib/slices/FormSlice";
import { Label } from "../ui/label";
import {
  Checkbox
} from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";


const options = [
  { id: "op1", label: "Yes, I have full practice autonomy and can see patients independently" },
  { id: "op2", label: "Yes, I can see patients independently but in collaboration with a supervising physician" },
  { id: "op3", label: "No, I do not have the authorization to see patients independently" },
] as const;

export default function Step3Component({onNext,onBack,}: {onNext: () => void;onBack: () => void;}) {
  const dispatch = useDispatch();
  const { first_name, canSeePatientsInde } = useSelector(
    (state: RootState) => state.form
  );
  const [q1State, setQ1] = useState<string>(canSeePatientsInde);




  const [error, setError] = useState("");

   const handleChange = (value: string) => {
    setError("");
    setQ1(value);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!q1State) {
      setError("Please select an option before continuing.");
      return;
    }
    dispatch(updateCanSeePatient(q1State));
    onNext();
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex flex-col pt-5 pb-5">
        <h2 className="text-4xl font-bold mb-2">
          Can you see patients independently?
        </h2>
        {error && <span className="text-red-600 mt-2">{error}</span>}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <RadioGroup value={q1State} onValueChange={handleChange}>
            {options.map((item) => (
                <div
                key={item.id}
                className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-gray-50 cursor-pointer border-gray-300"
                >
                <RadioGroupItem                     
                  id={item.id}                     
                  value={item.label}                     
                  className="appearance-none w-5 h-5 rounded-full border-2 border-gray-400                       
                    data-[state=checked]:bg-coral-600 data-[state=checked]:border-coral-600
                    data-[state=checked]:relative
                    data-[state=checked]:after:content-[''] 
                    data-[state=checked]:after:absolute 
                    data-[state=checked]:after:top-1/2 
                    data-[state=checked]:after:left-1/2 
                    data-[state=checked]:after:-translate-x-1/2 
                    data-[state=checked]:after:-translate-y-1/2
                    data-[state=checked]:after:w-2 
                    data-[state=checked]:after:h-2 
                    data-[state=checked]:after:bg-white 
                    data-[state=checked]:after:rounded-full
                    transition-all duration-200 focus:outline-none"                   
                />
                <Label htmlFor={item.id} className="text-base">
                    {item.label}
                </Label>
                </div>
            ))}
        </RadioGroup>
        {/* Navigation */}
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
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
