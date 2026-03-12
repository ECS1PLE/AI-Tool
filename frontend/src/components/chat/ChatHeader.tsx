import React from "react";

interface ChatHeaderProps {
  isLoading: boolean;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ isLoading }) => {
  return (
    <header className="flex items-center justify-between gap-3 border-b border-zinc-100 pb-4 dark:border-zinc-800">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-sm font-semibold text-white">
          AI
        </div>
        <div>
          <h1 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            ИИ чат-агент
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Задайте вопрос на русском или английском
          </p>
        </div>
      </div>
      {isLoading && (
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          Модель думает...
        </span>
      )}
    </header>
  );
};

