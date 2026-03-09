const API_KEY = `${API_KEY}`;
const url = 'https://openrouter.ai/api/v1/chat/completions';
const prompt = require('prompt-sync')();

let content = prompt('Введите текст для ИИ: ');

const requestBody = {
  model: 'arcee-ai/trinity-large-preview:free',
  messages: [
    { role: 'user', content: `${content}` }
  ]
};

fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`,
    'HTTP-Referer': 'http://localhost:3000',
    'X-Title': 'My Test App'
  },
  body: JSON.stringify(requestBody)
})
.then(res => res.json())
.then(data => {
  const reply = data.choices[0].message.content;
  console.log("Ответ ИИ:\n", reply);
})
.catch(err => console.error(err));