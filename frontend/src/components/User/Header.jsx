import React from 'react';


export default function Header() {
  

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo + Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">⚽</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Courtify</h1>
          </div>

          {/* Right Side Updated */}
          <div className="flex items-center gap-4">
           
                {/* Dummy SVG Profile Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.121 17.804A7 7 0 1112 19a7 7 0 01-6.879-1.196zM12 12a3 3 0 100-6 3 3 0 000 6z"
                  />
                </svg>
             
          </div>

        </div>
      </div>
    </header>
  );
}
