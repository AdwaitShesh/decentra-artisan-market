import { Link, useLocation } from "react-router-dom";
import { 
  UserRound,
  FileCheck,
  PenTool,
  CheckCircle2
} from "lucide-react";

interface CreateNavProps {
  currentStep?: number;
}

export function CreateNav({ currentStep = 3 }: CreateNavProps) {
  const location = useLocation();
  const path = location.pathname;
  
  // Determine current step based on path if not provided
  const currentStepFromPath = path.includes("artist-info") 
    ? 1 
    : path.includes("checklist") 
      ? 2 
      : path.includes("mint") 
        ? 3 
        : path.includes("success") 
          ? 4 
          : 3;
  
  const activeStep = currentStep || currentStepFromPath;
  
  const steps = [
    {
      href: "/create/artist-info",
      label: "Artist Info",
      icon: <UserRound className="h-5 w-5" />,
      step: 1
    },
    {
      href: "/create/checklist",
      label: "Art Checklist",
      icon: <FileCheck className="h-5 w-5" />,
      step: 2
    },
    {
      href: "/create/mint",
      label: "Create NFT",
      icon: <PenTool className="h-5 w-5" />,
      step: 3
    },
    {
      href: "/create/success",
      label: "Complete",
      icon: <CheckCircle2 className="h-5 w-5" />,
      step: 4
    }
  ];

  return (
    <div className="bg-gray-900 rounded-xl p-6 mb-8 border border-gray-800">
      <div className="flex flex-col md:flex-row justify-between relative">
        {/* Progress line */}
        <div className="absolute top-5 left-6 right-6 h-1 bg-gray-800 z-0 hidden md:block">
          <div 
            className="h-full bg-purple-600 transition-all duration-500"
            style={{ width: `${Math.max(0, (activeStep - 1) / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
        
        {/* Steps */}
        {steps.map((step) => {
          const isActive = activeStep === step.step;
          const isCompleted = activeStep > step.step;
          const isPending = activeStep < step.step;
          
          return (
            <div 
              key={step.step}
              className={`flex flex-col items-center relative z-10 ${
                isPending ? 'opacity-60' : ''
              }`}
            >
              <Link
                to={isCompleted || isActive ? step.href : '#'}
                className={`h-10 w-10 rounded-full flex items-center justify-center mb-2 transition-colors ${
                  isActive 
                    ? 'bg-purple-600 text-white'
                    : isCompleted
                      ? 'bg-purple-900/50 text-purple-400 border border-purple-500'
                      : 'bg-gray-800 text-gray-400'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  step.icon
                )}
              </Link>
              <span className={`text-sm ${
                isActive ? 'text-purple-400 font-medium' : 'text-gray-400'
              }`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
} 