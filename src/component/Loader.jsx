import React from "react";

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
      <div className="flex space-x-2">
        <div className="w-5 h-5 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="w-5 h-5 bg-green-500 rounded-full animate-bounce delay-150"></div>
        <div className="w-5 h-5 bg-red-500 rounded-full animate-bounce delay-300"></div>
      </div>
    </div>
  );
}
