import { Loader2, HeartPulse } from 'lucide-react';

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="text-center">
        <div className="mb-8">
          <HeartPulse className="w-20 h-20 text-blue-600 animate-pulse mx-auto" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Loading Your Details</h1>
        <p className="text-gray-600 mb-8">Please wait while we fetch your information...</p>
        <div className="flex justify-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
        </div>
        <div className="mt-8 w-64 h-2 bg-gray-200 rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-blue-600 rounded-full animate-progress"></div>
        </div>
      </div>
      <style jsx>{`
        @keyframes progress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
        .animate-progress {
          animation: progress 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Loading;