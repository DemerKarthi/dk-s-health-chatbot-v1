"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, AlertCircle, ArrowLeft, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
          location: "Wellness Center, Downtown"
        }
      ]
    },
    moderate: {
      message: "Your responses indicate moderate anxiety. It would be beneficial to consult with a mental health professional.",
      doctors: [
        {
          name: "Dr. Michael Chen",
          specialty: "Psychiatrist",
          contact: "michael.chen@mentalhealth.org",
          location: "Mental Health Institute"
        }
      ]
    },
    severe: {
      message: "Your responses suggest severe anxiety. Please seek immediate professional help.",
      doctors: [
        {
          name: "Dr. Emily Rodriguez",
          specialty: "Emergency Psychiatry",
          contact: "emergency@mentalhealth.org",
          location: "Emergency Mental Health Services"
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
          location: "Sleep Wellness Center"
        }
      ]
    },
    moderate: {
      message: "You're experiencing moderate sleep issues. Consider consulting a sleep specialist.",
      doctors: [
        {
          name: "Dr. Lisa Park",
          specialty: "Sleep Medicine",
          contact: "lisa.park@sleepclinic.com",
          location: "Sleep Disorders Center"
        }
      ]
    },
    severe: {
      message: "Your responses indicate severe sleep disturbances. Please consult a sleep specialist immediately.",
      doctors: [
        {
          name: "Dr. Robert Taylor",
          specialty: "Sleep Medicine",
          contact: "emergency@sleepclinic.com",
          location: "Sleep Emergency Services"
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
          location: "Wellness Center"
        }
      ]
    },
    moderate: {
      message: "Your stress levels are moderate. Consider stress management counseling.",
      doctors: [
        {
          name: "Dr. David Kim",
          specialty: "Stress Management",
          contact: "david.kim@mentalhealth.org",
          location: "Stress Management Center"
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
          location: "Emergency Stress Services"
        }
      ]
    }
  }
};

export function WellnessSurvey({ activeTopic }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [assessment, setAssessment] = useState(null);

  const questions = surveyQuestions[activeTopic] || [];
  const totalQuestions = questions.length;

  const handleAnswer = (answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults(newAnswers);
      setShowResults(true);
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

    setAssessment({
      severity,
      ...doctorRecommendations[activeTopic][severity]
    });
  };

  const resetSurvey = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setAssessment(null);
  };

  if (!activeTopic) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Please select a topic to begin the assessment.</p>
      </div>
    );
  }

  if (showResults) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 space-y-6"
      >
        <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Assessment Results
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-700"
            >
              {assessment.message}
            </motion.p>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-gray-800">Recommended Healthcare Professionals:</h3>
              <AnimatePresence>
                {assessment.doctors.map((doctor, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <Card className="bg-gradient-to-br from-gray-50 to-white border-0 shadow-md hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                            <Sparkles className="h-5 w-5" />
                          </div>
                          <div className="space-y-1">
                            <p className="font-medium text-lg text-gray-800">{doctor.name}</p>
                            <p className="text-sm text-gray-600">{doctor.specialty}</p>
                            <p className="text-sm text-gray-600">{doctor.location}</p>
                            <p className="text-sm text-blue-600 hover:text-blue-700 transition-colors">
                              {doctor.contact}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="pt-6 flex justify-between">
              <Button 
                onClick={resetSurvey} 
                variant="outline"
                className="flex items-center gap-2 group"
              >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Take Another Assessment
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 space-y-6"
    >
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            Question {currentQuestion + 1} of {totalQuestions}
          </span>
          <Progress 
            value={(currentQuestion + 1) / totalQuestions * 100} 
            className="w-[60%] h-2 bg-gray-200"
          />
        </div>
      </div>

      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {questions[currentQuestion].question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <AnimatePresence>
              {questions[currentQuestion].options.map((option, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Button
                    variant="outline"
                    className="w-full justify-start py-6 text-lg hover:bg-gray-50 transition-all duration-300 group"
                    onClick={() => handleAnswer(index)}
                  >
                    <span className="group-hover:translate-x-2 transition-transform">
                      {option}
                    </span>
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
} 