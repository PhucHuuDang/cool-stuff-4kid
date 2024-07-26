import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="flex items-center justify-center bg-gray-800 p-4 text-white">
      <p className="text-center">
        &copy; {new Date().getFullYear()} FPT University SWD Team Bá Trung. All
        rights reserved.
      </p>
    </footer>
  );
};

export { Footer };
