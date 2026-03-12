import { NextRequest } from "next/server";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL_ID = "nvidia/nemotron-3-super-120b-a12b:free";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { message?: string };
  const message = body.message?.trim();

  if (!message) {
    return new Response(JSON.stringify({ error: "Поле 'message' обязательно." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY не найден в переменных окружения.");
    return new Response(
      JSON.stringify({ error: "Сервер не сконфигурирован (отсутствует API_KEY)." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const requestBody = {
    model: MODEL_ID,
    messages: [
      {
        role: "user",
        content: message,
      },
    ],
  };

  return fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "HTTP-Referer": "http://localhost:3000",
      "X-Title": "My Test App - Next.js Chat",
    },
    body: JSON.stringify(requestBody),
  })
    .then((res) => res.json())
    .then((data) => {
      const choice = data?.choices?.[0];
      const content = choice?.message?.content;
      let reply = "";

      if (Array.isArray(content)) {
        reply = content
          .map((part: { type?: string; text?: string }) => part.text ?? "")
          .join("\n")
          .trim();
      } else if (typeof content === "string") {
        reply = content;
      }

      if (!reply) {
        reply = "Модель вернула пустой ответ.";
      }

      return new Response(JSON.stringify({ reply }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    })
    .catch((err) => {
      console.error(err);
      return new Response(JSON.stringify({ error: "Внутренняя ошибка сервера." }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    });
}

