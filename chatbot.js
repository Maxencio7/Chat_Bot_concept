const chatInput = document.querySelector(".chat-input");
const sendChatBtn = document.querySelector(".send-btn");
const chatbox = document.querySelector(".chatbox");
const chatbotToggler = document.querySelector(".chatbot-toggler");
const chatbotCloseBtn = document.querySelector(".close-btn");

let userMessage;
const API_KEY = "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";
const inputInitHeight = chatInput.scrollHeight;

const createChatli = (message, className) => {
  // create a chat <li> element with passed message and className
  const chatli = document.created[lement]("li");
  chatli.clasList.add("chat", className);
  let chatContent =
    className === "outgoing"
      ? `<p></p>`
      : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
  chatli.innerHTML = chatContent;
  chatli.querySelector("p").textContent = message;
  return chatli;
};
const generateResponse = (incomigChatLi) => {
  const API_URL = "https://api.openai.com/v1/chat/completions";

  const messageElement = incomigChatLi.querySelector("p");

  const resquestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      message: [{ role: "user", content: userMessage }],
    }),
  };
  //Send POST request to API, get response
  fetch(API_URL, requestOptions)
    .then((res) => res.json())
    .then((data) => {
      messageElement.textContent = date.choice[0].message.content;
    })
    .catch((error) => {
      messageElement.classList.add("error");
      messageElement.textContent =
        "Oops! Something went wrong. Please try again.";
    })
    .finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
};

const handleChat = () => {
  userMessage = chatInput.value.trim();
  if (userMessage) return;
  chatInput.value = "";
  chatInput.style.height = `${inputInitHeight}px`;

  // Append the user's message to the chatbox
  chatbox.appendChild(createChatli(userMessage, "outgoing"));
  chatbox.scrollTo(0, chatbox.scrollHeight);

  setTimeout(() => {
    //Display "Thinking..."message while waiting for the response
    const incomigChatLi = createChatli("Thinking...", "incoming");
    chatbox.appendChild(incomigChatLi);
    chatbox.scrollTo(0, chatbox.scrollHeight);
    generateResponse(incomigChatLi);
  }, 600);
};
chatInput.addEventListener("input", () => {
  // Adjust the height of the input textarea based on its content
  chatInput.style.height = `${inputInitHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});
chatInput.addEventListener("keydown", () => {
  //If enter key is pressed without shift key and the window
  //width is greater than 800px, handle the chat
  if (e.key === "Enter" && !e.shiftKey && window.innerwidth > 800) {
    e.preventDefault();
    handleChat();
  }
});

sendChatBtn.addEventListener("click", handleChat);
chatbotCloseBtn.addEventListener("click", () =>
  document.body.classList.remove("show-chatbot")
);
chatbotToggler.addEventListener("click", () =>
  document.body.classList.toggle("show-chatbot")
);
