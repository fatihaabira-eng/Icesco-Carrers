"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, X, Send, Briefcase, MapPin, ChevronDown, Bot } from "lucide-react"

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
  quickReplies?: string[]
  jobSuggestions?: JobSuggestion[]
}

interface JobSuggestion {
  title: string
  department: string
  location: string
  type: string
}

const jobSuggestions: JobSuggestion[] = [
  {
    title: "Senior Software Engineer",
    department: "Digital Transformation",
    location: "Rabat, Morocco",
    type: "Full-time",
  },
  {
    title: "Education Program Manager",
    department: "Education",
    location: "Remote",
    type: "Full-time",
  },
  {
    title: "Data Analyst",
    department: "Science & Technology",
    location: "Rabat, Morocco",
    type: "Contract",
  },
]

const quickReplies = ["Find a job", "Ask a question", "Application status", "About ICESCO", "Contact HR"]

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial greeting
      setTimeout(() => {
        addBotMessage(
          "Hi! Are you looking for a job? I'm here to help you explore opportunities at ICESCO.",
          quickReplies,
        )
      }, 500)
    }
  }, [isOpen])

  const addBotMessage = (text: string, quickReplies?: string[], jobSuggestions?: JobSuggestion[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: true,
      timestamp: new Date(),
      quickReplies,
      jobSuggestions,
    }
    setMessages((prev) => [...prev, newMessage])
  }

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, newMessage])
  }

  const simulateTyping = () => {
    setIsTyping(true)
    setTimeout(
      () => {
        setIsTyping(false)
      },
      1000 + Math.random() * 1000,
    )
  }

  const handleSendMessage = (message?: string) => {
    const messageText = message || inputValue.trim()
    if (!messageText) return

    addUserMessage(messageText)
    setInputValue("")
    simulateTyping()

    // Simple bot responses based on keywords
    setTimeout(() => {
      let botResponse = ""
      let replies: string[] = []
      let jobs: JobSuggestion[] = []

      const lowerMessage = messageText.toLowerCase()

      if (lowerMessage.includes("job") || lowerMessage.includes("find") || lowerMessage.includes("position")) {
        botResponse =
          "Great! I can help you find the perfect opportunity at ICESCO. Here are some featured positions that might interest you:"
        jobs = jobSuggestions
        replies = ["View all jobs", "Filter by department", "Remote positions", "Application tips"]
      } else if (lowerMessage.includes("application") || lowerMessage.includes("status")) {
        botResponse =
          "To check your application status, please provide your application reference number or the email you used to apply."
        replies = ["I don't have reference", "Contact HR directly", "Application tips"]
      } else if (lowerMessage.includes("about") || lowerMessage.includes("icesco")) {
        botResponse =
          "ICESCO is the Islamic World Educational, Scientific and Cultural Organization. We work across 57 member states to advance education, science, and culture. We offer diverse career opportunities in a multicultural environment."
        replies = ["Career opportunities", "Our mission", "Work culture", "Benefits"]
      } else if (lowerMessage.includes("remote") || lowerMessage.includes("work from home")) {
        botResponse =
          "Yes! ICESCO offers remote and hybrid work opportunities. Many of our positions support flexible working arrangements."
        replies = ["Show remote jobs", "Hybrid positions", "Work policies"]
      } else if (lowerMessage.includes("salary") || lowerMessage.includes("benefits")) {
        botResponse =
          "ICESCO offers competitive international salary packages with comprehensive benefits including health coverage, professional development, and work-life balance programs."
        replies = ["Learn more about benefits", "Career development", "Work-life balance"]
      } else {
        botResponse =
          "I'd be happy to help! You can ask me about job opportunities, application processes, or general information about working at ICESCO."
        replies = quickReplies
      }

      addBotMessage(botResponse, replies, jobs)
    }, 1500)
  }

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply)
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
    setIsMinimized(false)
  }

  const minimizeChat = () => {
    setIsMinimized(true)
  }

  return (
    <>
      {/* Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <Button
            onClick={toggleChat}
            className="w-14 h-14 rounded-full bg-[#0b787f] hover:bg-[#0b787f]/90 shadow-lg transition-all duration-300 hover:scale-110"
          >
            <MessageCircle className="w-6 h-6 text-white" />
          </Button>
        )}

        {isOpen && (
          <Card className="w-80 h-96 shadow-2xl border-0 overflow-hidden">
            {/* Header */}
            <CardHeader className="bg-[#0b787f] text-white p-4 flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-[#0b787f]" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">ICESCO Assistant</h3>
                  <p className="text-xs text-white/80">Online now</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={minimizeChat}
                  className="text-white hover:bg-white/20 p-1 h-auto"
                >
                  <ChevronDown className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleChat}
                  className="text-white hover:bg-white/20 p-1 h-auto"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>

            {!isMinimized && (
              <>
                {/* Messages */}
                <CardContent className="flex-1 p-0 h-64 overflow-y-auto bg-gray-50">
                  <div className="p-4 space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className="space-y-3">
                        <div className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                          <div
                            className={`max-w-[80%] p-3 rounded-lg ${
                              message.isBot ? "bg-white text-gray-800 shadow-sm" : "bg-[#0b787f] text-white"
                            }`}
                          >
                            <p className="text-sm">{message.text}</p>
                          </div>
                        </div>

                        {/* Job Suggestions */}
                        {message.jobSuggestions && (
                          <div className="space-y-2">
                            {message.jobSuggestions.map((job, index) => (
                              <Card key={index} className="p-3 cursor-pointer hover:shadow-md transition-shadow">
                                <div className="space-y-1">
                                  <h4 className="font-medium text-sm">{job.title}</h4>
                                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <Briefcase className="w-3 h-3" />
                                    <span>{job.department}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <MapPin className="w-3 h-3" />
                                    <span>{job.location}</span>
                                    <Badge variant="outline" className="text-xs">
                                      {job.type}
                                    </Badge>
                                  </div>
                                </div>
                              </Card>
                            ))}
                          </div>
                        )}

                        {/* Quick Replies */}
                        {message.quickReplies && (
                          <div className="flex flex-wrap gap-2">
                            {message.quickReplies.map((reply, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                onClick={() => handleQuickReply(reply)}
                                className="text-xs h-8 rounded-full"
                              >
                                {reply}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}

                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-white p-3 rounded-lg shadow-sm">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </CardContent>

                {/* Input */}
                <div className="p-4 border-t bg-white">
                  <div className="flex gap-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Type your message..."
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button
                      onClick={() => handleSendMessage()}
                      size="sm"
                      className="bg-[#0b787f] hover:bg-[#0b787f]/90"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </Card>
        )}
      </div>
    </>
  )
}
