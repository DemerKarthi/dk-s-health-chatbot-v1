"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HomeIcon, ClipboardList, ArrowRight, Sparkles, Clock, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatComponent } from "@/components/chat-components";

// Enhanced Mindful Loader Component
function MindfulLoader() {
  const icons = [
    { component: Heart, color: "text-pink-500" },
    { component: ClipboardList, color: "text-blue-400" },
    { component: Clock, color: "text-purple-500" },
    { component: Sparkles, color: "text-yellow-500" }
  ];

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex flex-col items-center justify-center z-50">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl flex flex-col items-center"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          DK's Wellness Hub
        </h2>
        <div className="flex space-x-4 mb-6">
          {icons.map((Icon, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: [0.2, 1, 0.2], 
                y: [0, -15, 0],
                rotate: [0, 5, 0, -5, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                delay: index * 0.3 
              }}
              className={`${Icon.color}`}
            >
              <Icon.component size={32} />
            </motion.div>
          ))}
        </div>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-600 text-center font-medium mb-2"
        >
          Taking a moment to center...
        </motion.p>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-gray-500 text-sm text-center"
        >
          Your wellness journey is about to begin
        </motion.p>
        <div className="mt-6 flex space-x-3">
          {[0, 1, 2].map((dot) => (
            <motion.div
              key={dot}
              className="h-3 w-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                delay: dot * 0.4
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

const featuredTopics = [
  {
    title: "Anxiety Wellness Check",
    description: "Understand your anxiety levels and get personalized support",
    image: "/anxiety.jpg",
    topic: "anxiety",
    color: "from-blue-500 to-indigo-600",
    icon: <Heart className="h-6 w-6" />
  },
  {
    title: "Sleep Quality Check",
    description: "Explore your sleep patterns and receive helpful guidance",
    image: "/sleep.jpg",
    topic: "sleep",
    color: "from-purple-500 to-pink-600",
    icon: <Clock className="h-6 w-6" />
  },
  {
    title: "Stress Level Check",
    description: "Check your stress levels and discover helpful strategies",
    image: "/stress.jpg",
    topic: "stress",
    color: "from-amber-500 to-orange-600",
    icon: <Sparkles className="h-6 w-6" />
  }
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <MindfulLoader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Sparkles className="h-8 w-8 text-indigo-600" />
              </div>
              <h1 className="ml-2 text-xl font-bold text-gray-900">DK's Wellness Hub</h1>
            </div>
            <div className="flex space-x-4">
              <Button
                variant={activeTab === "home" ? "default" : "ghost"}
                onClick={() => {
                  setActiveTab("home");
                  setSelectedTopic(null);
                }}
                className="flex items-center gap-2"
              >
                <HomeIcon className="h-4 w-4" />
                Home
              </Button>
              <Button
                variant={activeTab === "wellness" ? "default" : "ghost"}
                onClick={() => setActiveTab("wellness")}
                className="flex items-center gap-2"
              >
                <ClipboardList className="h-4 w-4" />
                Wellness Check
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        <AnimatePresence mode="wait">
          {activeTab === "home" && !selectedTopic ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {/* Hero Section */}
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                  <div className="text-center">
                    <motion.h2 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-4xl font-bold text-gray-900 mb-4"
                    >
                      Your Path to Better Well-being
                    </motion.h2>
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-xl text-gray-600 max-w-2xl mx-auto"
                    >
                      Take our wellness checks to understand your mental well-being and receive personalized support.
                    </motion.p>
                  </div>
                </div>
              </div>

              {/* Wellness Check Cards */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {featuredTopics.map((topic, index) => (
                    <motion.div
                      key={topic.topic}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card 
                        className="h-full cursor-pointer hover:shadow-xl transition-all duration-300 group border-0 bg-white/80 backdrop-blur-sm"
                        onClick={() => {
                          setSelectedTopic(topic.topic);
                          setActiveTab("wellness");
                        }}
                      >
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className={`p-3 rounded-lg bg-gradient-to-r ${topic.color} text-white shadow-lg`}>
                              {topic.icon}
                            </div>
                            <CardTitle className="text-xl font-semibold text-gray-900">
                              {topic.title}
                            </CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 mb-6">{topic.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-indigo-600 group-hover:text-indigo-700 transition-colors">
                              <span className="text-sm font-medium">Start Wellness Check</span>
                              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                            <div className="text-xs text-gray-500">
                              ~5 minutes
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Features Section */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-center"
                  >
                    <div className="p-4 rounded-full bg-indigo-100 inline-block mb-4">
                      <Heart className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Personalized Insights</h3>
                    <p className="text-gray-600">Get tailored recommendations based on your responses</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-center"
                  >
                    <div className="p-4 rounded-full bg-purple-100 inline-block mb-4">
                      <Clock className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Assessment</h3>
                    <p className="text-gray-600">Complete your assessment in just a few minutes</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-center"
                  >
                    <div className="p-4 rounded-full bg-pink-100 inline-block mb-4">
                      <Sparkles className="h-6 w-6 text-pink-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Guidance</h3>
                    <p className="text-gray-600">Access professional recommendations and resources</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-[calc(100vh-5rem)]"
            >
              <ChatComponent 
                activeTopic={selectedTopic} 
                setActiveTab={setActiveTab}
                setSelectedTopic={setSelectedTopic}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}