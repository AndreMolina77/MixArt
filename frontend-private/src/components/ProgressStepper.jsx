import React from 'react'
const ProgressStepper = ({  steps = 4,  currentStep = 1,  completedColor = '#E07A5F', incompleteColor = '#8B7B7A', backgroundColor = '#FFFFFF', circleSize = 48, lineWidth = 80, lineHeight = 4}) => {
  return (
    <div className="flex items-center">
      {Array.from({ length: steps }, (_, index) => {
        const stepNumber = index + 1
        const isCompleted = stepNumber <= currentStep
        const isActive = stepNumber === currentStep
        return (
          <React.Fragment key={stepNumber}>
            <div className="rounded-full border-4 transition-all duration-300 flex-shrink-0" style={{ width: `${circleSize}px`, height: `${circleSize}px`, backgroundColor: isCompleted ? completedColor : backgroundColor, borderColor: isCompleted ? completedColor : incompleteColor, boxShadow: isActive ? `0 0 0 4px ${completedColor}20` : 'none'}}/>
            {index < steps - 1 && (
              <div className="transition-all duration-300 flex-shrink-0" style={{ width: `${lineWidth}px`, height: `${lineHeight}px`, backgroundColor: stepNumber < currentStep ? completedColor : incompleteColor}}/>
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}
export default ProgressStepper