import React from "react";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea: React.FC<TextareaProps> = ({
  className = "",
  ...props
}) => {
  const baseClasses =
    "max-h-40 min-h-10 flex-1 resize-none bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-50";

  return (
    <textarea
      {...props}
      className={`${baseClasses} ${className}`.trim()}
    />
  );
};

