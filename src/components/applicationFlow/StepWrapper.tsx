"use client"
import ProgressBar from "@/components/applicationFlow/ProgressBar";
import Image from "next/image";
import { docAsian } from "../../../public";
// import { postPublicForm } from "@/lib/api";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useState } from "react";

export default function StepWrapper({
  children,
  currentStep,
  totalSteps,
}: {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
}) {
  const date = new Date();
  const reduxState = useSelector((state: RootState) => state.form);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // useEffect(() => {
  //   const submitForm = async () => {
  //     if (totalSteps - 1 === currentStep) {
  //       try {
  //         setIsSubmitting(true);
  //         await postPublicForm(reduxState);
  //         // You could navigate to a thank-you page here if needed
  //       } catch (err) {
  //         console.error("Error submitting form:", err);
  //       } finally {
  //         setIsSubmitting(false);
  //       }
  //     }
  //   };
  //   submitForm();
  // }, [currentStep]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen relative">
      {/* ✅ Loading Overlay */}
      {isSubmitting && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-50">
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 border-4 border-coral-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-700 font-medium">Submitting your form...</p>
          </div>
        </div>
      )}

      {/* Sidebar / Header */}
      <div className="w-full lg:w-1/3 bg-coral-500 text-white p-8 flex flex-col justify-between lg:rounded-r-4xl gap-10">
        <h1 className="text-2xl font-bold mb-4">Blume Health</h1>

        <div className="bg-coral-600 p-4 rounded-lg">
          <h2 className="font-semibold mb-2 text-3xl">Why are we collecting this information?</h2>
          <p className="text-md opacity-90">  
            Blume Health is ensuring providers find success quickly. Collecting this information in advance makes sure we match you with the right Practice Success Manager to help grow your private practice.
          </p>
        </div>
        
        <div className="bg-coral-600 p-4 rounded-lg">
          <h2 className="font-semibold mb-4 text-2xl">What Other Providers Are Saying:</h2>
          <div className="space-y-4">
            {/* Review 1 */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-start space-x-3">
                <Image 
                  src={docAsian}
                  alt="Dr. Denise Smith"
                  className="h-10 w-10 rounded-full flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <p className="font-semibold text-gray-900 mr-2">Dr. Denise Smith</p>
                    <div className="flex text-yellow-400 text-sm">★★★★★</div>
                  </div>
                  <p className="text-gray-700 text-sm italic mb-1">
                    "Blume Health transformed my practice's online presence completely!"
                  </p>
                  <p className="text-gray-500 text-xs">PMHNP • Texas</p>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-white/90 p-4 rounded-lg shadow-md">
              <div className="flex items-start space-x-3">
                <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  MJ
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <p className="font-semibold text-gray-900 mr-2">Dr. Sarah Johnson</p>
                    <div className="flex text-yellow-400 text-sm">★★★★★</div>
                  </div>
                  <p className="text-gray-700 text-sm italic mb-1">
                    "The platform is intuitive and actually saves me time. I can focus on patient care while Blume handles my online presence."
                  </p>
                  <p className="text-gray-500 text-xs">LCSW • New York</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="flex flex-1">©{date.getFullYear()} Blume Health</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex justify-center items-center bg-white mt-20">
        <div className="bg-white p-8 rounded-lg shadow-2xl shadow-amber-700 w-full max-w-lg">
          {/* Progress */}
          {currentStep == 0 ? null : (
            <ProgressBar currentStep={currentStep + 1} totalSteps={totalSteps} />
          )}
          {/* Step Content */}
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
