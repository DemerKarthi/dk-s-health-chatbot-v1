"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Send, ArrowLeft, CheckCircle2, Sparkles, MessageCircle, Bot, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from 'next/navigation';

const surveyQuestions = {
  "anxiety": [
    {
      question: "How often do you feel nervous or anxious?",
      options: [
        "Never",
        "Occasionally",
        "Frequently",
        "Almost always"
      ]
    },
    {
      question: "Do you experience physical symptoms like rapid heartbeat or sweating when anxious?",
      options: [
        "Never",
        "Sometimes",
        "Often",
        "Always"
      ]
    },
    {
      question: "How does anxiety affect your daily activities?",
      options: [
        "Not at all",
        "Mildly",
        "Moderately",
        "Severely"
      ]
    }
  ],
  "sleep": [
    {
      question: "How many hours of sleep do you typically get?",
      options: [
        "Less than 4 hours",
        "4-6 hours",
        "6-8 hours",
        "More than 8 hours"
      ]
    },
    {
      question: "How often do you have trouble falling asleep?",
      options: [
        "Never",
        "Occasionally",
        "Frequently",
        "Every night"
      ]
    },
    {
      question: "Do you feel rested when you wake up?",
      options: [
        "Always",
        "Usually",
        "Sometimes",
        "Never"
      ]
    }
  ],
  "stress": [
    {
      question: "How often do you feel stressed?",
      options: [
        "Never",
        "Occasionally",
        "Frequently",
        "Almost always"
      ]
    },
    {
      question: "How do you typically cope with stress?",
      options: [
        "Exercise/Meditation",
        "Talking to friends",
        "Eating/Drinking",
        "Avoiding the situation"
      ]
    },
    {
      question: "How does stress affect your work or studies?",
      options: [
        "Not at all",
        "Mildly",
        "Moderately",
        "Severely"
      ]
    }
  ]
};

const doctorRecommendations = {
  "anxiety": {
    mild: {
      message: "Your responses suggest mild anxiety. Consider practicing mindfulness and relaxation techniques.",
      doctors: [
        {
          name: "Dr. Sarah Johnson",
          specialty: "Clinical Psychologist",
          contact: "sarah.johnson@wellnessclinic.com",
          location: "Wellness Center, Downtown",
          experience: "10+ years",
          rating: "4.8/5",
          availability: "Mon-Fri, 9AM-5PM",
          languages: "English, Spanish"
        },
        {
          name: "Dr. Michael Chen",
          specialty: "Counseling Psychologist",
          contact: "michael.chen@mentalhealth.org",
          location: "Mental Health Institute",
          experience: "8 years",
          rating: "4.7/5",
          availability: "Mon-Sat, 10AM-6PM",
          languages: "English, Mandarin"
        },
        {
          name: "Dr. Emily Rodriguez",
          specialty: "Mindfulness Therapist",
          contact: "emily.rodriguez@wellnessclinic.com",
          location: "Mindfulness Center",
          experience: "12 years",
          rating: "4.9/5",
          availability: "Tue-Sat, 8AM-4PM",
          languages: "English, Spanish"
        },
        {
          name: "Dr. James Wilson",
          specialty: "Cognitive Behavioral Therapist",
          contact: "james.wilson@therapycenter.org",
          location: "Therapy Center",
          experience: "15 years",
          rating: "4.8/5",
          availability: "Mon-Fri, 8AM-6PM",
          languages: "English"
        }
      ]
    },
    moderate: {
      message: "Your responses indicate moderate anxiety. It would be beneficial to consult with a mental health professional.",
      doctors: [
        {
          name: "Dr. Lisa Park",
          specialty: "Psychiatrist",
          contact: "lisa.park@mentalhealth.org",
          location: "Mental Health Institute",
          experience: "12 years",
          rating: "4.9/5",
          availability: "Mon-Fri, 9AM-5PM",
          languages: "English, Korean"
        },
        {
          name: "Dr. Robert Taylor",
          specialty: "Clinical Psychologist",
          contact: "robert.taylor@wellnessclinic.com",
          location: "Wellness Center",
          experience: "15 years",
          rating: "4.8/5",
          availability: "Mon-Sat, 8AM-6PM",
          languages: "English"
        },
        {
          name: "Dr. Maria Garcia",
          specialty: "Anxiety Specialist",
          contact: "maria.garcia@anxietycenter.org",
          location: "Anxiety Treatment Center",
          experience: "10 years",
          rating: "4.7/5",
          availability: "Mon-Fri, 10AM-7PM",
          languages: "English, Spanish"
        },
        {
          name: "Dr. David Kim",
          specialty: "Psychiatrist",
          contact: "david.kim@mentalhealth.org",
          location: "Mental Health Institute",
          experience: "8 years",
          rating: "4.6/5",
          availability: "Tue-Sat, 9AM-5PM",
          languages: "English, Korean"
        }
      ]
    },
    severe: {
      message: "Your responses suggest severe anxiety. Please seek immediate professional help.",
      doctors: [
        {
          name: "Dr. Patricia Smith",
          specialty: "Emergency Psychiatry",
          contact: "emergency@mentalhealth.org",
          location: "Emergency Mental Health Services",
          experience: "20 years",
          rating: "4.9/5",
          availability: "24/7 Emergency",
          languages: "English"
        },
        {
          name: "Dr. John Williams",
          specialty: "Crisis Intervention Specialist",
          contact: "john.williams@crisiscenter.org",
          location: "Crisis Intervention Center",
          experience: "15 years",
          rating: "4.8/5",
          availability: "24/7 Emergency",
          languages: "English, Spanish"
        },
        {
          name: "Dr. Anna Lee",
          specialty: "Emergency Psychiatrist",
          contact: "anna.lee@emergencycare.org",
          location: "Emergency Care Center",
          experience: "12 years",
          rating: "4.7/5",
          availability: "24/7 Emergency",
          languages: "English, Mandarin"
        },
        {
          name: "Dr. Thomas Brown",
          specialty: "Crisis Counselor",
          contact: "thomas.brown@crisiscenter.org",
          location: "Crisis Counseling Center",
          experience: "18 years",
          rating: "4.9/5",
          availability: "24/7 Emergency",
          languages: "English"
        }
      ]
    }
  },
  "sleep": {
    mild: {
      message: "Your sleep patterns show minor disturbances. Try improving your sleep hygiene.",
      doctors: [
        {
          name: "Dr. James Wilson",
          specialty: "Sleep Specialist",
          contact: "james.wilson@sleepclinic.com",
          location: "Sleep Wellness Center",
          experience: "15 years",
          rating: "4.8/5",
          availability: "Mon-Fri, 9AM-5PM",
          languages: "English"
        },
        {
          name: "Dr. Lisa Park",
          specialty: "Sleep Medicine",
          contact: "lisa.park@sleepclinic.com",
          location: "Sleep Disorders Center",
          experience: "10 years",
          rating: "4.7/5",
          availability: "Mon-Sat, 8AM-6PM",
          languages: "English, Korean"
        },
        {
          name: "Dr. Michael Chen",
          specialty: "Sleep Therapist",
          contact: "michael.chen@sleepclinic.com",
          location: "Sleep Therapy Center",
          experience: "8 years",
          rating: "4.6/5",
          availability: "Tue-Sat, 10AM-7PM",
          languages: "English, Mandarin"
        },
        {
          name: "Dr. Sarah Johnson",
          specialty: "Sleep Psychologist",
          contact: "sarah.johnson@sleepclinic.com",
          location: "Sleep Psychology Center",
          experience: "12 years",
          rating: "4.9/5",
          availability: "Mon-Fri, 8AM-4PM",
          languages: "English, Spanish"
        }
      ]
    },
    moderate: {
      message: "You're experiencing moderate sleep issues. Consider consulting a sleep specialist.",
      doctors: [
        {
          name: "Dr. Robert Taylor",
          specialty: "Sleep Medicine",
          contact: "robert.taylor@sleepclinic.com",
          location: "Sleep Disorders Center",
          experience: "18 years",
          rating: "4.9/5",
          availability: "Mon-Fri, 8AM-6PM",
          languages: "English"
        },
        {
          name: "Dr. Emily Rodriguez",
          specialty: "Sleep Specialist",
          contact: "emily.rodriguez@sleepclinic.com",
          location: "Sleep Wellness Center",
          experience: "15 years",
          rating: "4.8/5",
          availability: "Mon-Sat, 9AM-5PM",
          languages: "English, Spanish"
        },
        {
          name: "Dr. David Kim",
          specialty: "Sleep Psychiatrist",
          contact: "david.kim@sleepclinic.com",
          location: "Sleep Psychiatry Center",
          experience: "10 years",
          rating: "4.7/5",
          availability: "Tue-Sat, 10AM-6PM",
          languages: "English, Korean"
        },
        {
          name: "Dr. Maria Garcia",
          specialty: "Sleep Medicine",
          contact: "maria.garcia@sleepclinic.com",
          location: "Sleep Treatment Center",
          experience: "12 years",
          rating: "4.8/5",
          availability: "Mon-Fri, 8AM-4PM",
          languages: "English, Spanish"
        }
      ]
    },
    severe: {
      message: "Your responses indicate severe sleep disturbances. Please consult a sleep specialist immediately.",
      doctors: [
        {
          name: "Dr. Patricia Smith",
          specialty: "Sleep Medicine",
          contact: "emergency@sleepclinic.com",
          location: "Sleep Emergency Services",
          experience: "20 years",
          rating: "4.9/5",
          availability: "24/7 Emergency",
          languages: "English"
        },
        {
          name: "Dr. John Williams",
          specialty: "Sleep Emergency Specialist",
          contact: "john.williams@sleepemergency.org",
          location: "Sleep Emergency Center",
          experience: "15 years",
          rating: "4.8/5",
          availability: "24/7 Emergency",
          languages: "English, Spanish"
        },
        {
          name: "Dr. Anna Lee",
          specialty: "Sleep Crisis Intervention",
          contact: "anna.lee@sleepemergency.org",
          location: "Sleep Crisis Center",
          experience: "12 years",
          rating: "4.7/5",
          availability: "24/7 Emergency",
          languages: "English, Mandarin"
        },
        {
          name: "Dr. Thomas Brown",
          specialty: "Emergency Sleep Medicine",
          contact: "thomas.brown@sleepemergency.org",
          location: "Emergency Sleep Center",
          experience: "18 years",
          rating: "4.9/5",
          availability: "24/7 Emergency",
          languages: "English"
        }
      ]
    }
  },
  "stress": {
    mild: {
      message: "You're experiencing mild stress. Regular exercise and relaxation techniques may help.",
      doctors: [
        {
          name: "Dr. Maria Garcia",
          specialty: "Stress Management",
          contact: "maria.garcia@wellnessclinic.com",
          location: "Wellness Center",
          experience: "12 years",
          rating: "4.8/5",
          availability: "Mon-Fri, 9AM-5PM",
          languages: "English, Spanish"
        },
        {
          name: "Dr. David Kim",
          specialty: "Stress Management",
          contact: "david.kim@mentalhealth.org",
          location: "Stress Management Center",
          experience: "10 years",
          rating: "4.7/5",
          availability: "Mon-Sat, 10AM-6PM",
          languages: "English, Korean"
        },
        {
          name: "Dr. Sarah Johnson",
          specialty: "Stress Counselor",
          contact: "sarah.johnson@wellnessclinic.com",
          location: "Wellness Center",
          experience: "8 years",
          rating: "4.6/5",
          availability: "Tue-Sat, 8AM-4PM",
          languages: "English, Spanish"
        },
        {
          name: "Dr. Michael Chen",
          specialty: "Stress Therapist",
          contact: "michael.chen@mentalhealth.org",
          location: "Stress Therapy Center",
          experience: "15 years",
          rating: "4.9/5",
          availability: "Mon-Fri, 8AM-6PM",
          languages: "English, Mandarin"
        }
      ]
    },
    moderate: {
      message: "Your stress levels are moderate. Consider stress management counseling.",
      doctors: [
        {
          name: "Dr. Lisa Park",
          specialty: "Stress Management",
          contact: "lisa.park@mentalhealth.org",
          location: "Stress Management Center",
          experience: "15 years",
          rating: "4.9/5",
          availability: "Mon-Fri, 9AM-5PM",
          languages: "English, Korean"
        },
        {
          name: "Dr. Robert Taylor",
          specialty: "Stress Psychologist",
          contact: "robert.taylor@wellnessclinic.com",
          location: "Wellness Center",
          experience: "12 years",
          rating: "4.8/5",
          availability: "Mon-Sat, 8AM-6PM",
          languages: "English"
        },
        {
          name: "Dr. Emily Rodriguez",
          specialty: "Stress Specialist",
          contact: "emily.rodriguez@stresscenter.org",
          location: "Stress Treatment Center",
          experience: "10 years",
          rating: "4.7/5",
          availability: "Mon-Fri, 10AM-7PM",
          languages: "English, Spanish"
        },
        {
          name: "Dr. James Wilson",
          specialty: "Stress Management",
          contact: "james.wilson@mentalhealth.org",
          location: "Stress Management Center",
          experience: "18 years",
          rating: "4.9/5",
          availability: "Tue-Sat, 9AM-5PM",
          languages: "English"
        }
      ]
    },
    severe: {
      message: "You're experiencing severe stress. Please seek professional help immediately.",
      doctors: [
        {
          name: "Dr. Patricia Smith",
          specialty: "Emergency Stress Management",
          contact: "emergency@stressclinic.com",
          location: "Emergency Stress Services",
          experience: "20 years",
          rating: "4.9/5",
          availability: "24/7 Emergency",
          languages: "English"
        },
        {
          name: "Dr. John Williams",
          specialty: "Crisis Stress Management",
          contact: "john.williams@crisiscenter.org",
          location: "Crisis Intervention Center",
          experience: "15 years",
          rating: "4.8/5",
          availability: "24/7 Emergency",
          languages: "English, Spanish"
        },
        {
          name: "Dr. Anna Lee",
          specialty: "Emergency Stress Counselor",
          contact: "anna.lee@emergencycare.org",
          location: "Emergency Care Center",
          experience: "12 years",
          rating: "4.7/5",
          availability: "24/7 Emergency",
          languages: "English, Mandarin"
        },
        {
          name: "Dr. Thomas Brown",
          specialty: "Crisis Stress Specialist",
          contact: "thomas.brown@crisiscenter.org",
          location: "Crisis Counseling Center",
          experience: "18 years",
          rating: "4.9/5",
          availability: "24/7 Emergency",
          languages: "English"
        }
      ]
    }
  }
};

export function ChatComponent({ activeTopic, setActiveTab, setSelectedTopic }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [checkIn, setCheckIn] = useState(null);
  const messagesEndRef = useRef(null);
  const router = useRouter();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const questions = surveyQuestions[activeTopic] || [];
  const totalQuestions = questions.length;

  useEffect(() => {
    if (activeTopic) {
      setMessages([
        {
          role: "assistant",
          content: `Let's do a quick wellness check about your ${activeTopic}. I'll ask you a few questions to better understand how you're feeling.`
        },
        {
          role: "assistant",
          content: questions[0].question,
          options: questions[0].options
        }
      ]);
    }
  }, [activeTopic]);

  const handleSend = () => {
    if (!input.trim()) return;

    // Check if the input matches any of the current options
    const currentOptions = questions[currentQuestion]?.options || [];
    const isValidOption = currentOptions.includes(input);

    if (!isValidOption) {
      // Add a message indicating that the user should select from the options
      setMessages(prev => [
        ...prev,
        { role: "user", content: input },
        { 
          role: "assistant", 
          content: "Please select one of the provided options to continue with the wellness check.",
          options: currentOptions
        }
      ]);
      setInput("");
      return;
    }

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    if (!showResults) {
      const answerIndex = questions[currentQuestion].options.indexOf(input);
      if (answerIndex !== -1) {
        const newAnswers = [...answers, answerIndex];
        setAnswers(newAnswers);

        if (currentQuestion < totalQuestions - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setTimeout(() => {
            setMessages([
              ...newMessages,
              { role: "assistant", content: questions[currentQuestion + 1].question, options: questions[currentQuestion + 1].options }
            ]);
          }, 1000);
        } else {
          calculateResults(newAnswers);
        }
      }
    }
  };

  const calculateResults = (answers) => {
    const score = answers.reduce((sum, answer) => sum + answer, 0);
    const averageScore = score / totalQuestions;
    
    let severity;
    if (averageScore < 1.5) {
      severity = "mild";
    } else if (averageScore < 2.5) {
      severity = "moderate";
    } else {
      severity = "severe";
    }

    const result = {
      severity,
      ...doctorRecommendations[activeTopic][severity]
    };
    setCheckIn(result);
    setShowResults(true);

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: result.message },
        { role: "assistant", content: "Here are some recommended healthcare professionals who can help:", doctors: result.doctors }
      ]);
    }, 1000);
  };

  const resetSurvey = () => {
    // Reset all states
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setCheckIn(null);
    setMessages([]);
    
    // Match home button behavior
    setActiveTab("home");
    setSelectedTopic(null);
  };

  return (
    <div className="flex flex-col h-full bg-[#F5F7FB]">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200/20 bg-white shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-[#4F46E5] text-white shadow-lg">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#1F2937]">
              Wellness Assistant
            </h2>
            <p className="text-sm text-[#6B7280]">Let's assess your {activeTopic} together</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`max-w-[80%] ${message.role === "user" ? "ml-4" : "mr-4"}`}
              >
                <div className={`relative ${message.role === "user" ? "text-right" : "text-left"}`}>
                  {message.role === "assistant" && (
                    <div className="absolute -top-2 -left-2 p-1.5 rounded-full bg-[#4F46E5] text-white shadow-lg">
                      <MessageCircle className="h-4 w-4" />
                    </div>
                  )}
                  {message.role === "user" && (
                    <div className="absolute -top-2 -right-2 p-1.5 rounded-full bg-[#4F46E5] text-white shadow-lg">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                  <div className={`rounded-2xl p-4 ${
                    message.role === "user" 
                      ? "bg-[#4F46E5] text-white" 
                      : "bg-white shadow-lg"
                  }`}>
                    <p className={`text-lg ${message.role === "user" ? "text-white" : "text-[#1F2937]"}`}>
                      {message.content}
                    </p>
                    {message.options && (
                      <div className="mt-4 space-y-2">
                        {message.options.map((option, i) => (
                          <motion.div
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button
                              variant="outline"
                              className={`w-full justify-start text-lg transition-all duration-300 group rounded-xl
                                ${message.role === "user" 
                                  ? "bg-white/20 hover:bg-white/30 text-white border-white/30" 
                                  : "hover:bg-gray-50 border-gray-200"}`}
                              onClick={() => {
                                // Add user message immediately
                                setMessages(prev => [...prev, { role: "user", content: option }]);
                                
                                // Process the answer
                                const answerIndex = questions[currentQuestion].options.indexOf(option);
                                if (answerIndex !== -1) {
                                  const newAnswers = [...answers, answerIndex];
                                  setAnswers(newAnswers);

                                  if (currentQuestion < totalQuestions - 1) {
                                    setCurrentQuestion(currentQuestion + 1);
                                    setTimeout(() => {
                                      setMessages(prev => [
                                        ...prev,
                                        { role: "assistant", content: questions[currentQuestion + 1].question, options: questions[currentQuestion + 1].options }
                                      ]);
                                    }, 1000);
                                  } else {
                                    calculateResults(newAnswers);
                                  }
                                }
                              }}
                            >
                              <span className="group-hover:translate-x-2 transition-transform">
                                {option}
                              </span>
                            </Button>
                          </motion.div>
                        ))}
                      </div>
                    )}
                    {message.doctors && (
                      <div className="mt-4 space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="p-1.5 rounded-full bg-[#10B981] text-white shadow-lg">
                            <CheckCircle2 className="h-4 w-4" />
                          </div>
                          <span className="text-sm font-medium text-[#6B7280]">Recommended Professionals</span>
                        </div>
                        {message.doctors.map((doctor, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <div 
                              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-4 cursor-pointer group"
                              onClick={() => {
                                setMessages(prev => [
                                  ...prev,
                                  {
                                    role: "assistant",
                                    content: `Here are more details about ${doctor.name}:`,
                                    doctorDetails: {
                                      ...doctor,
                                      additionalInfo: {
                                        education: "MD in Psychiatry",
                                        certifications: ["Board Certified", "Cognitive Behavioral Therapy Specialist"],
                                        approach: "Holistic and evidence-based treatment",
                                        specialties: doctor.specialty.split(", "),
                                        languages: doctor.languages.split(", ")
                                      }
                                    }
                                  }
                                ]);
                              }}
                            >
                              <div className="flex items-start gap-4">
                                <div className="p-2 rounded-lg bg-[#4F46E5] text-white shadow-lg group-hover:scale-110 transition-transform">
                                  <Sparkles className="h-5 w-5" />
                                </div>
                                <div className="space-y-1 flex-1">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <p className="font-medium text-lg text-[#1F2937] group-hover:text-[#4F46E5] transition-colors">
                                        {doctor.name}
                                      </p>
                                      <p className="text-sm text-[#6B7280]">{doctor.specialty}</p>
                                      <p className="text-sm text-[#6B7280]">{doctor.location}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm font-medium text-[#10B981]">{doctor.rating}</span>
                                      <span className="text-xs text-gray-500">({doctor.experience})</span>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2 mt-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="text-xs hover:bg-[#4F46E5] hover:text-white transition-colors"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        window.location.href = `mailto:${doctor.contact}`;
                                      }}
                                    >
                                      Contact
                                    </Button>
                                    <span className="text-xs text-gray-500">{doctor.availability}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                    {message.doctorDetails && (
                      <div className="mt-4 space-y-4">
                        <div className="bg-white rounded-xl shadow-lg p-6">
                          <div className="space-y-6">
                            {/* Basic Info */}
                            <div className="flex items-start gap-4">
                              <div className="p-3 rounded-lg bg-[#4F46E5] text-white shadow-lg">
                                <Sparkles className="h-6 w-6" />
                              </div>
                              <div className="space-y-1">
                                <h3 className="text-xl font-bold text-[#1F2937]">{message.doctorDetails.name}</h3>
                                <p className="text-[#4F46E5] font-medium">{message.doctorDetails.specialty}</p>
                                <p className="text-sm text-gray-600">{message.doctorDetails.location}</p>
                              </div>
                            </div>

                            {/* Contact & Availability */}
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <h4 className="text-sm font-medium text-gray-500">Contact</h4>
                                <Button
                                  variant="outline"
                                  className="w-full justify-start"
                                  onClick={() => window.location.href = `mailto:${message.doctorDetails.contact}`}
                                >
                                  <span className="text-[#4F46E5]">{message.doctorDetails.contact}</span>
                                </Button>
                              </div>
                              <div className="space-y-2">
                                <h4 className="text-sm font-medium text-gray-500">Availability</h4>
                                <p className="text-sm text-gray-600">{message.doctorDetails.availability}</p>
                              </div>
                            </div>

                            {/* Professional Details */}
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <h4 className="text-sm font-medium text-gray-500">Education & Experience</h4>
                                <div className="space-y-1">
                                  <p className="text-sm text-gray-600">{message.doctorDetails.additionalInfo.education}</p>
                                  <p className="text-sm text-gray-600">{message.doctorDetails.experience} of experience</p>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <h4 className="text-sm font-medium text-gray-500">Certifications</h4>
                                <div className="flex flex-wrap gap-2">
                                  {message.doctorDetails.additionalInfo.certifications.map((cert, index) => (
                                    <span key={index} className="px-3 py-1 bg-[#F3F4F6] rounded-full text-sm text-gray-600">
                                      {cert}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <div className="space-y-2">
                                <h4 className="text-sm font-medium text-gray-500">Treatment Approach</h4>
                                <p className="text-sm text-gray-600">{message.doctorDetails.additionalInfo.approach}</p>
                              </div>

                              <div className="space-y-2">
                                <h4 className="text-sm font-medium text-gray-500">Specialties</h4>
                                <div className="flex flex-wrap gap-2">
                                  {message.doctorDetails.additionalInfo.specialties.map((specialty, index) => (
                                    <span key={index} className="px-3 py-1 bg-[#EEF2FF] rounded-full text-sm text-[#4F46E5]">
                                      {specialty}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <div className="space-y-2">
                                <h4 className="text-sm font-medium text-gray-500">Languages</h4>
                                <div className="flex flex-wrap gap-2">
                                  {message.doctorDetails.additionalInfo.languages.map((language, index) => (
                                    <span key={index} className="px-3 py-1 bg-[#F0FDF4] rounded-full text-sm text-[#10B981]">
                                      {language}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Rating & Reviews */}
                            <div className="space-y-2">
                              <h4 className="text-sm font-medium text-gray-500">Professional Rating</h4>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <svg
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < Math.floor(parseFloat(message.doctorDetails.rating)) 
                                          ? "text-yellow-400" 
                                          : "text-gray-300"
                                      }`}
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                  ))}
                                </div>
                                <span className="text-sm font-medium text-gray-600">{message.doctorDetails.rating}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className="border-t border-gray-200/20 p-4 bg-white shadow-sm">
        {showResults && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center"
          >
            <Button
              onClick={resetSurvey}
              variant="outline"
              className="flex items-center gap-2 group bg-white rounded-xl shadow-sm"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Return to Home
            </Button>
          </motion.div>
        )}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} DK. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}