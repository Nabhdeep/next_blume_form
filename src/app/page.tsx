"use client"
import { useState } from "react";
import StepWrapper from "@/components/applicationFlow/StepWrapper";
import Step1Contact from "@/components/steps/Step1Contact";
import Step2 from "@/components/steps/Step2"
import Step3 from "@/components/steps/Step3"
import Step4 from "@/components/steps/Step4"
import Step5 from "@/components/steps/Step5"
import Step6 from "@/components/steps/Step6"
import Step7 from "@/components/steps/Step7"
import Step8 from "@/components/steps/Step8"
import Step10 from "@/components/steps/Step10"
import Step9 from "@/components/steps/Step9"
import BookingCall from "@/components/steps/BookingCall"
import StartApplication from "@/components/steps/ApplicationStart"


const steps = [
  {id:12 , component:StartApplication },
  { id: 1, component: Step1Contact },
  {id:2 , component:Step2},
  {id:3 , component:Step3},
  // {id:4 , component:Step4},
  // {id:5 , component:Step5},
  {id:6 , component:Step6},
  // {id:7 , component:Step7},
  // {id:8 , component:Step8},
  {id:9 , component:Step9},
  {id:10 , component:Step10},
  {id:11 , component: BookingCall},
];

export default function Application() {
  const [currentStep, setCurrentStep] = useState(0);
  const StepComponent = steps[currentStep].component;

  const handleNext = () =>
    setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  const handleBack = () => setCurrentStep((s) => Math.max(s - 1, 0));

  return (
    <StepWrapper
      currentStep={currentStep}
      totalSteps={steps.length}
    >
      <StepComponent onNext={handleNext} onBack={handleBack} />
    </StepWrapper>
  );
}