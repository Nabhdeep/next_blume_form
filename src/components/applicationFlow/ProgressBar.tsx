export default function ProgressBar({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
}) {
  const percent = Math.round((currentStep / totalSteps) * 100);
  
  return (
    <div className="w-full space-y-2">
      {/* Progress bar */}
      <div className="w-full bg-gray-200 h-5 rounded-full relative overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-white-500 to-coral-500 transition-all duration-700 ease-out rounded-full relative"
          style={{ width: `${percent}%` }}
        >
          {/* Moving highlight */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse rounded-full" />
        </div>
      </div>
      
      {/* Step info */}
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-600 font-medium">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-coral-600 font-bold">
          {percent}%
        </span>
      </div>
    </div>
  );
}