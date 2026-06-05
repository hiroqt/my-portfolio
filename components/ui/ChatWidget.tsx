'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [remaining, setRemaining] = useState<number | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    setError(null)

    // Add user message
    const newUserMessage: Message = {
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, newUserMessage])
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userMessage })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response')
      }

      // Update remaining requests
      if (data.remaining !== undefined) {
        setRemaining(data.remaining)
      }

      // Add assistant message
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMessage])

    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
      console.error('Chat error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="chat-widget-button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
        {!isOpen && messages.length === 0 && (
          <span className="chat-badge">Chat with Nel</span>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chat-widget-window"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="chat-widget-header">
              <div className="flex items-center gap-3">
                <div className="chat-avatar">
                  <span>N</span>
                </div>
                <div>
                  <h3 className="chat-title">Nel</h3>
                  <div className="flex items-center gap-2">
                    <svg width="8" height="8" viewBox="0 0 8 8" className="animate-pulse">
                      <circle cx="4" cy="4" r="4" fill="#10b981" />
                    </svg>
                    <p className="chat-subtitle">Online</p>
                  </div>
                </div>
              </div>
              {remaining !== null && remaining < 5 && (
                <span className="chat-remaining">{remaining} left</span>
              )}
            </div>

            {/* Messages */}
            <div className="chat-widget-messages">
              {messages.length === 0 && (
                <div className="chat-welcome">
                  <div className="chat-avatar-large">
                    <span>N</span>
                  </div>
                  <h4>Hi! I'm Nel</h4>
                  <p>Ask me anything about Arnel's projects, skills, or experience.</p>
                </div>
              )}

              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  className={`chat-message ${msg.role}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {msg.role === 'assistant' && (
                    <div className="chat-avatar-small">
                      <span>N</span>
                    </div>
                  )}
                  <div className="chat-message-content">
                    <p>{msg.content}</p>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  className="chat-message assistant"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="chat-avatar-small">
                    <span>N</span>
                  </div>
                  <div className="chat-message-content">
                    <p className="chat-typing-simple">Typing...</p>
                  </div>
                </motion.div>
              )}

              {error && (
                <motion.div
                  className="chat-error"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {error}
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="chat-widget-input">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message (max 500 chars)"
                rows={1}
                maxLength={500}
                disabled={isLoading}
                className="chat-textarea"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="chat-send-button"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
