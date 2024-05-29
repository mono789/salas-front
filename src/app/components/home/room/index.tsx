import React from "react";

const Index = () => {
  return (
    <div>
      <div className="w-full max-w-xs overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <img
          className="object-cover w-full h-56"
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="computador"
        />

        <div className="py-5 text-center">
            <a
                href="#"
                className="block text-xl font-bold text-gray-800 dark:text-white"
                tabIndex={parseInt("0")}
                role="link"
            >
                Bloque 21
            </a>
            <span className="text-sm text-gray-700 dark:text-gray-200">
                21-119
            </span>
        </div>
      </div>
    </div>
  );
};

export default Index;
