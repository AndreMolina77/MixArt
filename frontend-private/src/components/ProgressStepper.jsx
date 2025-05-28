import React from 'react'
const ProgressStepper = ({steps = 4, currentStep = 1, completedColor = '#E07A5F', incompleteColor = '#7A6E6E', backgroundColor = '#F4F1DE', circleSize = 32, borderWidth = 3, lineWidth = 40, lineHeight = 2}) => {
  return (
    <div className="flex items-center justify-center">
      {Array.from({ length: steps }).map((_, idx) => {
        const step = idx + 1;
        const completed = step <= currentStep
        const active    = step === currentStep
        return (
          <React.Fragment key={step}>
            <div className="rounded-full transition-all duration-300 flex-shrink-0" style={{width: circleSize, height: circleSize, backgroundColor: completed ? completedColor : backgroundColor, border: completed ? 'none' : `${borderWidth}px solid ${incompleteColor}`, boxShadow: active ? `0 0 0 4px ${completedColor}33` : 'none'}}/>
            {idx < steps - 1 && (
              <div className="flex-shrink-0 transition-all duration-300" style={{width: lineWidth, height: lineHeight, backgroundColor: step < currentStep ? completedColor : incompleteColor}}/>
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}
export default ProgressStepper