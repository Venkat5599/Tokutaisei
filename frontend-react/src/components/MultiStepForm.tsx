import { useState } from 'react'
import { ChevronLeft, ChevronRight, Check } from 'lucide-react'
import { Button } from './ui/button'

interface MultiStepFormProps {
  currentStep: number
  totalSteps: number
  onNext: () => void
  onPrev: () => void
  onSubmit: () => void
  isLastStep: boolean
  isFirstStep: boolean
  canProceed: boolean
}

export const MultiStepForm = ({
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  onSubmit,
  isLastStep,
  isFirstStep,
  canProceed,
}: MultiStepFormProps) => {
  const steps = [
    'Personal Info',
    'Academic Details',
    'Financial Info',
    'Guardian Info',
    'Essays',
    'Documents',
    'Review'
  ]

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="relative">
        <div className="flex justify-between mb-2">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col items-center ${
                index + 1 <= currentStep ? 'text-cyan-400' : 'text-slate-500'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  index + 1 < currentStep
                    ? 'bg-cyan-500 border-cyan-500'
                    : index + 1 === currentStep
                    ? 'bg-cyan-500/20 border-cyan-500'
                    : 'bg-slate-800 border-slate-600'
                }`}
              >
                {index + 1 < currentStep ? (
                  <Check className="w-5 h-5 text-white" />
                ) : (
                  <span className="text-sm font-bold">{index + 1}</span>
                )}
              </div>
              <span className="text-xs mt-2 hidden md:block">{step}</span>
            </div>
          ))}
        </div>
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-slate-700 -z-10">
          <div
            className="h-full bg-cyan-500 transition-all duration-500"
            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <Button
          type="button"
          onClick={onPrev}
          disabled={isFirstStep}
          variant="outline"
          className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-xl border-slate-600"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>

        {isLastStep ? (
          <Button
            type="button"
            onClick={onSubmit}
            disabled={!canProceed}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-cyan-600 text-black font-bold"
          >
            Submit Application
            <Check className="w-4 h-4" />
          </Button>
        ) : (
          <Button
            type="button"
            onClick={onNext}
            disabled={!canProceed}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-cyan-600 text-black font-bold"
          >
            Next Step
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
