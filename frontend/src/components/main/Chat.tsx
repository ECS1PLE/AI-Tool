"use client";

import React, { useState } from "react";
import { ChatHeader } from "../chat/ChatHeader";
import { MessageList } from "../chat/MessageList";
import { ChatInput } from "../chat/ChatInput";

type Role = "user" | "assistant";

interface Message {
  id: string;
  role: Role;
  content: string;
}

export const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSend = async (text: string) => {
    const id = crypto.randomUUID();
    const userMessage: Message = { id, role: "user", content: text };

    setMessages((prev) => [...prev, userMessage]);
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (!response.ok) {
        throw new Error("Ошибка ответа от сервера");
      }

      const data: { reply?: string } = await response.json();
      const replyText =
        data.reply ?? "Извини, я сейчас не смог сформировать ответ.";

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: replyText,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error(err);
      setError("Не удалось получить ответ от ИИ. Попробуйте ещё раз.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 py-8 dark:bg-black">
      <div className="flex w-full max-w-3xl flex-col gap-4 rounded-3xl border border-zinc-200 bg-white p-6 shadow-lg dark:border-zinc-800 dark:bg-zinc-950">
        <ChatHeader isLoading={isLoading} />

        <main className="flex-1 space-y-3 overflow-hidden">
          <div className="flex h-[380px] flex-col gap-3 overflow-y-auto rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-900">
            <MessageList messages={messages} />
          </div>
        </main>

        <section className="space-y-2 pt-2">
          <ChatInput onSend={handleSend} disabled={isLoading} />
          {error && (
            <p className="text-xs text-red-500 dark:text-red-400">{error}</p>
          )}
        </section>
      </div>
    </div>
  );
};

