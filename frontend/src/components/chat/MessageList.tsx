import React from "react";
import { ChatMessage } from "./ChatMessage";

type Role = "user" | "assistant";

interface Message {
  id: string;
  role: Role;
  content: string;
}

interface MessageListProps {
  messages: Message[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  if (messages.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-center text-sm text-zinc-500 dark:text-zinc-400">
        Начните диалог, отправив первое сообщение.
      </div>
    );
  }

  return (
    <>
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          role={message.role}
          content={message.content}
        />
      ))}
    </>
  );
};

