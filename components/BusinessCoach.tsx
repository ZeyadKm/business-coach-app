'use client'

import React, { useState } from 'react';
import { ChevronRight, Sparkles, Target, TrendingUp, Shield, Lightbulb, Brain, BarChart, Zap, MessageCircle, FileText, CheckCircle } from 'lucide-react';

const BusinessCoach = () => {
  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [showFeatures, setShowFeatures] = useState(true);

  const handleSubmit = async () => {
    if (!currentInput.trim() || isLoading) return;

    const userMessage = { role: 'user', content: currentInput };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setCurrentInput('');
    setIsLoading(true);
    setShowFeatures(false);

    if (!sessionStarted) {
      setSessionStarted(true);
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages })
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      const assistantMessage = { role: 'assistant', content: data.content };
      setMessages([...updatedMessages, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { 
        role: 'assistant', 
        content: 'I encountered an error processing your request. Please try again.' 
      };
      setMessages([...updatedMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const resetSession = () => {
    setMessages([]);
    setSessionStarted(false);
    setCurrentInput('');
    setShowFeatures(true);
  };

  const startChat = () => {
    setShowFeatures(false);
    setMessages([{ 
      role: 'assistant', 
      content: "Welcome! I'm your Business Evaluation Coach. Let's rigorously analyze your business idea together. Please start by telling me about your business concept - what industry are you in, what's your value proposition, who are your target customers, and what's your revenue model?" 
    }]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="backdrop-blur-xl bg-white/70 sticky top-0 z-50 border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-50"></div>
                <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-3">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Business Coach</h1>
                <p className="text-sm text-gray-500 mt-0.5">Think clearer.</p>
              </div>
            </div>
            <button
              onClick={resetSession}
              className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-full transition-all duration-200"
            >
              New Session
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      {showFeatures && (
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-20">
            <h1 className="text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
              Question everything. Build what matters.
            </h1>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {/* Card 1 */}
            <div className="text-center">
              <div className="flex justify-center items-center mb-8 relative">
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute -top-10 -left-10 w-12 h-12 bg-red-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                      <Target className="w-6 h-6" />
                    </div>
                    <div className="absolute -top-10 right-0 w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                      <BarChart className="w-6 h-6" />
                    </div>
                    <div className="absolute top-8 -right-12 w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <div className="absolute top-8 -left-12 w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                      <Lightbulb className="w-6 h-6" />
                    </div>
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-xl">
                      <Brain className="w-10 h-10 text-white" />
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Ship faster.
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                <span className="text-gray-500">Clarity in seconds.</span> Get instant analysis on viability, scalability, and product-market fit. Real frameworks. Real insights. 10 seconds.
              </p>
            </div>

            {/* Card 2 */}
            <div className="text-center">
              <div className="flex justify-center items-center mb-8 relative">
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute -top-8 left-0 w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <div className="absolute top-0 -right-10 w-12 h-12 bg-yellow-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                      <Zap className="w-6 h-6" />
                    </div>
                    <div className="absolute bottom-0 -left-10 w-12 h-12 bg-red-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                      <Shield className="w-6 h-6" />
                    </div>
                    <div className="w-24 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center">
                      <div className="text-xs font-mono text-gray-600">
                        <div>Advantage</div>
                        <div className="text-green-600">↑ 85%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Kill your darlings.
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                <span className="text-gray-500">Find what's broken before users do.</span> Catalytic questions expose hidden assumptions. See your blind spots. Fix them. Ship.
              </p>
            </div>

            {/* Card 3 */}
            <div className="text-center">
              <div className="flex justify-center items-center mb-8 relative">
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute -top-10 -right-2 w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <div className="absolute top-2 -left-12 w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="absolute bottom-2 -right-12 w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                      <Target className="w-6 h-6" />
                    </div>
                    <div className="space-y-2">
                      <div className="w-20 h-8 bg-blue-600 rounded-2xl rounded-br-sm"></div>
                      <div className="w-24 h-8 bg-white rounded-2xl rounded-bl-sm ml-4 shadow-lg"></div>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Think 10x.
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                <span className="text-gray-500">Good ideas aren't enough.</span> Push past obvious answers. Get to the core insight. Build something people want.
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <button
              onClick={startChat}
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white text-lg font-medium rounded-full hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Start now
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      )}

      {/* Chat Interface */}
      {!showFeatures && (
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200/50 flex flex-col h-[calc(100vh-120px)]">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-3xl animate-slide-in ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white px-6 py-4 rounded-3xl rounded-br-lg'
                        : 'bg-gray-100 text-gray-900 px-6 py-4 rounded-3xl rounded-bl-lg'
                    }`}
                  >
                    {message.role === 'assistant' ? (
                      <div 
                        className="prose prose-gray max-w-none"
                        dangerouslySetInnerHTML={{ 
                          __html: message.content
                            .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
                            .replace(/\n/g, '<br>')
                            .replace(/• /g, '<span class="text-blue-600 font-medium">• </span>')
                        }}
                      />
                    ) : (
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-900 px-6 py-4 rounded-3xl rounded-bl-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200/50 p-6">
              <div className="flex items-center gap-3">
                <textarea
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Describe your business idea or answer the coach's questions..."
                  className="flex-1 bg-gray-100 text-gray-900 placeholder-gray-500 rounded-2xl px-6 py-4 resize-none focus:outline-none focus:ring-4 focus:ring-blue-100 border-0 transition-all duration-200"
                  rows={3}
                  style={{ fontSize: '16px' }}
                />
                <button
                  onClick={handleSubmit}
                  disabled={isLoading || !currentInput.trim()}
                  className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                >
                  <span>Send</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessCoach;