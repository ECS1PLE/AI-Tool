import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({
  className = "",
  children,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400";

  return (
    <button
      {...props}
      className={`${baseClasses} ${className}`.trim()}
    >
      {children}
    </button>
  );
};

