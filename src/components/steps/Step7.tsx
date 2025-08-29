"use client";
import { RootState } from "@/lib/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateEhrEmrSystem  } from "@/lib/slices/FormSlice";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";


const options = [
  { id: "op1", label: "Yes, I have an EHR/EMR system" },
  { id: "op2", label: "No, but I'm willing to obtain one" },
  { id: "op3", label: "No, I prefer not to use one" },
] as const;

export default function Step4Component({onNext,onBack,}: {onNext: () => void;onBack: () => void;}) {
  const dispatch = useDispatch();
  const { first_name, ehr_emr_system } = useSelector(
    (state: RootState) => state.form
  );
  console.log(ehr_emr_system);
  const [Q4State, setQ4] = useState<string>(ehr_emr_system);




  const [error, setError] = useState("");

   const handleChange = (value: string) => {
    setError("");
    setQ4(value);
    
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!Q4State) {
      setError("Please select an option before continuing.");
      return;
    }
    dispatch(updateEhrEmrSystem(Q4State))
    onNext();
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex flex-col pt-5 pb-5">
        <h2 className="text-4xl font-bold mb-2">
            Do you currently have an EHR/EMR system?
        </h2>
        {error && <span className="text-red-600 mt-2">{error}</span>}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <RadioGroup value={Q4State} onValueChange={handleChange}>
            {options.map((item) => (
                <div
                key={item.id}
                className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-gray-50 cursor-pointer border-gray-300"
                >
                <RadioGroupItem id={item.id} value={item.label} />
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
            className="px-6 py-2 bg-blue-600 text-white rounded-lg"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
