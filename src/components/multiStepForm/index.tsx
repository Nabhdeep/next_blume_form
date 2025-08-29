'use client';

import React, { useState, useCallback, useMemo, JSX } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { FormStep, FormData, MultiStepFormProps } from './types';
import { defaultFormSteps } from './steps';

const MultiStepForm: React.FC<MultiStepFormProps> = ({ 
  onComplete, 
  customSteps,
  className = ''
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>({});

  const formSteps = useMemo(() => customSteps || defaultFormSteps, [customSteps]);

  const updateFormData = useCallback((stepId: string, value: any): void => {
    setFormData(prev => ({
      ...prev,
      [stepId]: value
    }));
  }, []);

  const handleNext = useCallback((): void => {
    if (currentStep < formSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep, formSteps.length]);

  const handleBack = useCallback((): void => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const handleComplete = useCallback((): void => {
    console.log('Form completed:', formData);
    if (onComplete) {
      onComplete(formData);
    } else {
      alert('Form submitted successfully!');
    }
  }, [formData, onComplete]);

  const isStepValid = useMemo((): boolean => {
    const currentStepData = formSteps[currentStep];
    const stepData = formData[currentStepData.id];

    if (currentStepData.fields) {
      return currentStepData.fields.every(field => {
        if (field.required) {
          return stepData && 
                 stepData[field.name] && 
                 typeof stepData[field.name] === 'string' &&
                 stepData[field.name].trim() !== '';
        }
        return true;
      });
    } else if (currentStepData.type === 'checkbox') {
      return stepData && Array.isArray(stepData) && stepData.length > 0;
    } else if (currentStepData.type === 'radio') {
      return stepData && stepData !== '';
    }
    return true;
  }, [formSteps, currentStep, formData]);

  const renderFormFields = useCallback((step: FormStep): JSX.Element => {
    if (!step.fields) return <></>;
    
    const stepData = formData[step.id] || {};

    return (
      <div className="space-y-6">
        {step.fields.map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <input
              type={field.type}
              value={stepData[field.name] || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                updateFormData(step.id, {
                  ...stepData,
                  [field.name]: e.target.value
                });
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              placeholder={field.placeholder || `Enter your ${field.label.toLowerCase()}`}
            />
          </div>
        ))}
      </div>
    );
  }, [formData, updateFormData]);

  const renderCheckboxOptions = useCallback((step: FormStep): JSX.Element => {
    if (!step.options) return <></>;
    
    const stepData: string[] = formData[step.id] || [];

    return (
      <div className="space-y-4">
        {step.options.map((option, index) => (
          <label key={index} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={stepData.includes(option)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                let newData: string[];
                if (e.target.checked) {
                  newData = [...stepData, option];
                } else {
                  newData = stepData.filter(item => item !== option);
                }
                updateFormData(step.id, newData);
              }}
              className="h-5 w-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-3 text-gray-700">{option}</span>
          </label>
        ))}
      </div>
    );
  }, [formData, updateFormData]);

  const renderRadioOptions = useCallback((step: FormStep): JSX.Element => {
    if (!step.options) return <></>;
    
    const stepData: string = formData[step.id] || '';

    return (
      <div className="space-y-4">
        {step.options.map((option, index) => (
          <label key={index} className="flex items-start p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
            <input
              type="radio"
              name={step.id}
              value={option}
              checked={stepData === option}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                updateFormData(step.id, e.target.value)
              }
              className="h-5 w-5 text-blue-600 border-2 border-gray-300 mt-0.5 focus:ring-blue-500"
            />
            <span className="ml-3 text-gray-700">{option}</span>
          </label>
        ))}
      </div>
    );
  }, [formData, updateFormData]);

  const currentStepData = formSteps[currentStep];
  const progressPercentage = ((currentStep + 1) / formSteps.length) * 100;

  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      <div className="flex flex-col lg:flex-row">
        {/* Left Panel */}
        <div className="lg:w-1/3 bg-coral-500 text-white p-8 flex flex-col justify-between min-h-screen lg:min-h-screen">
          <div>
            <h1 className="text-3xl font-bold mb-4">Blume Health</h1>
            {/* <p className="text-blue-100 mb-8">Join Our Trusted Network of Healthcare Providers</p> */}
            
            <div className="bg-coral-600 rounded-lg p-6 mb-8">
              <h3 className="font-semibold mb-4">Why We Screen</h3>
              <p className="text-blue-100 text-sm leading-relaxed">
                We're building a network of providers who love practicing medicine without the usual headaches. 
                A few questions help us make sure we're a good fit for each other.
              </p>
            </div>
            
            {/* Statistics */}
            {/* <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">500k+</div>
                <div className="text-blue-200 text-xs">Visits Completed</div>
              </div>
              <div>
                <div className="text-2xl font-bold">4.9★</div>
                <div className="text-blue-200 text-xs">Provider Rating</div>
              </div>
              <div>
                <div className="text-2xl font-bold">40+</div>
                <div className="text-blue-200 text-xs">States Covered</div>
              </div>
            </div> */}
          </div>
          
          <div className="text-sm text-blue-200">
            © 2025 Blume Health. All rights reserved.
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
          <div className="w-full max-w-2xl">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">
                  Step {currentStep + 1} of {formSteps.length}
                </span>
                <span className="text-sm text-gray-500">{Math.round(progressPercentage)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            {/* Form Content */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:p-8">
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">
                {currentStepData.title}
              </h2>
              <p className="text-gray-600 mb-8">
                {currentStepData.subtitle}
              </p>

              {/* Dynamic Form Content */}
              {currentStepData.fields && renderFormFields(currentStepData)}
              {currentStepData.type === 'checkbox' && renderCheckboxOptions(currentStepData)}
              {currentStepData.type === 'radio' && renderRadioOptions(currentStepData)}

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row justify-between items-center mt-8 pt-6 border-t border-gray-200 gap-4">
                <button
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className="flex items-center px-6 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeftIcon className="w-5 h-5 mr-1" />
                  Back
                </button>

                {currentStep < formSteps.length - 1 ? (
                  <button
                    onClick={handleNext}
                    disabled={!isStepValid}
                    className="flex items-center px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                  >
                    Continue
                    <ChevronRightIcon className="w-5 h-5 ml-1" />
                  </button>
                ) : (
                  <button
                    onClick={handleComplete}
                    disabled={!isStepValid}
                    className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                  >
                    Complete
                  </button>
                )}
              </div>
            </div>

            {/* Form Data Preview (for development) */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-8 p-4 bg-gray-100 rounded-lg">
                <h3 className="font-semibold mb-2">Form Data (Dev Only):</h3>
                <pre className="text-xs text-gray-600 overflow-auto max-h-40">
                  {JSON.stringify(formData, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;