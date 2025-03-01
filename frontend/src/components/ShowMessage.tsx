import { useEffect } from "react";

interface ErrorMessageProps {
  message: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

export const ShowErrorMessage = ({ message, setErrorMessage }: ErrorMessageProps) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message, setErrorMessage]);

  if (!message) return null;

  return (
    <div className="fixed bottom-10 right-10 z-50 flex items-center gap-3 p-3 bg-red-100 text-red-700 border border-red-400 rounded-lg shadow-lg transition-transform transform animate-slide-in">
      <span className="text-base font-medium">{message}</span>
      <button
        onClick={() => setErrorMessage("")}
        className="p-1 rounded-full text-red-600 hover:bg-red-500 hover:text-white transition-all"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};
