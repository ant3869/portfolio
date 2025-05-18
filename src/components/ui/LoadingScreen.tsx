import { Circle as CircleNotch } from 'lucide-react';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <CircleNotch className="h-12 w-12 text-primary animate-spin" />
        <div className="mt-4 text-2xl font-bold gradient-heading animate-pulse">
          Loading Portfolio
        </div>
      </div>
    </div>
  );
}