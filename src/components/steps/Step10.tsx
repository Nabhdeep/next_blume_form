"use client";
import { postPublicForm } from "@/lib/api";
import { RootState } from "@/lib/store";
import { isAxiosError } from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Step4Component({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const dispatch = useDispatch();
  const reduxForm = useSelector((state: RootState) => state.form);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setError("");
    setLoading(true);

    try {
      await postPublicForm(reduxForm); 
      onNext();
    } catch (err: any) {
      if (err?.response?.data?.errors?.length) {
        const apiErrors = err.response.data.errors;
        // Grab first error, or join them if multiple
        const messages = apiErrors.map((e: any) => `${e.path}: ${e.msg}`).join(", ");
        setError(messages);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Overlay loading screen */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-50 rounded-lg">
          <div className="w-12 h-12 border-4 border-coral-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div className="flex flex-col pt-5 pb-5">
        <h2 className="text-4xl font-bold mb-2">
          Thank you {reduxForm?.first_name} for sharing!
        </h2>
        {error && <span className="text-red-600 mt-2">{error}</span>}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 bg-gray-200 rounded-lg"
            disabled={loading}
          >
            Back
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-coral-600 text-white rounded-lg disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
