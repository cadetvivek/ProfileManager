import { useState, useEffect, useRef } from "react";
import './ChateBot.css'

const ChateBot = () => {
  const faqs = [
    {
      question: "What technologies do you specialize in?",
      answer:
        "I specialize in the MERN stack — MongoDB, Express.js, React, and Node.js. I also have experience working with RESTful APIs, JWT Authentication, cloud storage services like AWS S3, payment gateways like Razorpay, and modern UI frameworks like Tailwind CSS and Bootstrap.",
    },
    {
      question: "What is your best project?",
      answer:
        "My crowning achievement is an AI-powered Tenant-Landlord Communication Platform designed to streamline property management. It features a centralized system for maintenance requests, real-time messaging, AI-assisted interactions, and rent payment tracking.",
    },
    {
      question: "What are your soft skills",
      answer:
        "Along with technical expertise, I bring strong soft skills to the table — including effective communication, teamwork, time management, and adaptability.",
    },
    {
      question: "Are you open to freelance or remote work",
      answer:
        "Yes, I'm open to both freelance and remote opportunities. I’m comfortable working in flexible environments and using tools like GitHub, Trello, Slack, and Zoom to stay aligned with project goals and deadlines, no matter the location.",
    },
    {
      question: "Where do you see yourself in 5 years?",
      answer: "In five years, I aim to be a leading MERN stack authority, overseeing complex projects and mentoring developers while contributing to open-source ecosystems and innovative tech solutions.",
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const chatBodyRef = useRef(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const handleQuestionClick = (question, answer) => {
    setMessages((prev) => [...prev, { type: "user", content: question }]);
    setTimeout(() => {
      setMessages((prev) => [...prev, { type: "bot", content: answer }]);
      speakAnswer(answer);
    }, 500);
  };

  const speakAnswer = (text) => {
    window.speechSynthesis.cancel();
    const speech = new SpeechSynthesisUtterance(text);
    setIsSpeaking(true);
    speech.onend = () => setIsSpeaking(false);
    speech.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(speech);
  };

  return (
    <div className="chatbot-container">
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} className="chatbot-icon">
          <img
            src="https://avatars.githubusercontent.com/u/106858243?v=4"
            alt="Chatbot Avatar"
            className="avatar"
          />
        </button>
      )}

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="header-avatar-container">
              <div className="avatar-border">
                <img
                  src="https://avatars.githubusercontent.com/u/106858243?v=4"
                  alt="Vivek"
                  className="avatar-image"
                />
              </div>
              {isSpeaking && <div className="speaking-indicator" />}
            </div>
            <div>
              <h2 className="chat-title">Vivek AI Assistant</h2>
              <p className="chat-status">Available Now</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="close-button"
            >
              &times;
            </button>
          </div>

          <div className="chat-main">
            <div ref={chatBodyRef} className="chat-body">
              <div className="bot-message">
                <p>Hello! I'm here to help answer your questions.</p>
              </div>

              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.type}`}>
                  <div className={`message-bubble ${msg.type}`}>
                    <p>{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="faq-section">
              {faqs.map((faq, index) => (
                <button
                  key={index}
                  onClick={() => handleQuestionClick(faq.question, faq.answer)}
                  className="faq-button"
                >
                  {faq.question}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChateBot;
