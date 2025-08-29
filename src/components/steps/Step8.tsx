"use client";
import { RootState } from "@/lib/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStage2, addInsurance } from "@/lib/slices/FormSlice";
import { Label } from "../ui/label";
import {
  Checkbox
} from "@/components/ui/checkbox";

const specialtiesList = [
  { id: "selfPay", label: "Self-pay" },
  { id: "medicare", label: "Medicare" },
  { id: "blueCross", label: "Blue Cross Blue Shield" },
  { id: "unitedHealth", label: "UnitedHealth" },
  { id: "aetna", label: "Aetna" },
  { id: "cigna", label: "Cigna" },
  { id: "medicaid", label: "Medicaid" },
  { id: "other", label: "Other" },
] as const;

export default function Step2Component({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const dispatch = useDispatch();
  const { first_name, insurance } = useSelector(
    (state: RootState) => state.form
  );
  console.log(first_name);
  const [selected, setSelected] = useState<string[]>( insurance || []);




  const [error, setError] = useState("");

  const handleToggle = (id: string) => {
    setError("");
    console.log(selected);

    let updated: string[];
    if (selected.includes(id)) {
      updated = selected.filter((s) => s !== id);
    } else {
      updated = [...selected, id];
    }
    setSelected(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selected.length === 0) {
      setError("Please select at least one specialty");
      return;
    }
    dispatch(addInsurance(selected));
    onNext();
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex flex-col pt-5 pb-5">
        <h2 className="text-2xl font-bold mb-2">
          Accepted Insurance
        </h2>
        <p className="text-gray-600 text-sm">
          Which insurance plans do you currently accept? Select all that apply.
        </p>
        {error && <span className="text-red-600 mt-2">{error}</span>}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {specialtiesList.map((item) => (
          <Label
            key={item.id}
            className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-gray-50 cursor-pointer border-gray-300 "
          >
            <Checkbox
              checked={selected.includes(item.id)}
              onCheckedChange={() => handleToggle(item.id)}
            />
            <span className="text-base">{item.label}</span>
          </Label>
        ))}

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
