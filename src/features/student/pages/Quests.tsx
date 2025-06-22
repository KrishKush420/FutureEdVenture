import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@design-system/components';
import { Trophy, Target, Users, Clock, Star, CheckCircle, Lock } from 'lucide-react';

const Quests: React.FC = () => {
  const activeQuests = [
    {
      id: 1,
      title: 'React Master Challenge',
      description: 'Complete 5 advanced React projects and earn the React Master badge',
      progress: 60,
      totalTasks: 5,
      completedTasks: 3,
      reward: 500,
      difficulty: 'Expert',
      timeLeft: '5 days',
      participants: 124
    },
    {
      id: 2,
      title: 'TypeScript Explorer',
      description: 'Learn TypeScript fundamentals through hands-on coding challenges',
      progress: 80,
      totalTasks: 8,
      completedTasks: 6,
      reward: 300,
      difficulty: 'Intermediate',
      timeLeft: '12 days',
      participants: 89
    }
  ];

  const availableQuests = [
    {
      id: 3,
      title: 'Full-Stack Developer Path',
      description: 'Master both frontend and backend development in this comprehensive quest',
      tasks: 12,
      reward: 1000,
      difficulty: 'Expert',
      duration: '30 days',
      participants: 256,
      locked: false
    },
    {
      id: 4,
      title: 'AI & Machine Learning Journey',
      description: 'Dive into the world of artificial intelligence and machine learning',
      tasks: 15,
      reward: 800,
      difficulty: 'Advanced',
      duration: '45 days',
      participants: 178,
      locked: true,
      unlockRequirement: 'Complete 3 Python courses'
    }
  ];

  const achievements = [
    { id: 1, title: 'First Steps', description: 'Completed your first quest', earned: true },
    { id: 2, title: 'Code Warrior', description: 'Completed 5 coding challenges', earned: true },
    { id: 3, title: 'Team Player', description: 'Collaborated on 3 group projects', earned: false },
    { id: 4, title: 'Speed Demon', description: 'Completed a quest in under 7 days', earned: false }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'Advanced': return 'text-orange-600 bg-orange-100';
      case 'Expert': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quest Hub</h1>
          <p className="text-gray-600 mt-1">Take on challenges and earn rewards</p>
        </div>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <div className="text-center">
            <p className="text-2xl font-bold text-role-student-600">1,250</p>
            <p className="text-sm text-gray-600">Total Points</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">8</p>
            <p className="text-sm text-gray-600">Badges Earned</p>
          </div>
        </div>
      </motion.div>

      {/* Active Quests */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Active Quests</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {activeQuests.map((quest, index) => (
            <motion.div
              key={quest.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-l-4 border-l-role-student-500">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{quest.title}</CardTitle>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${getDifficultyColor(quest.difficulty)}`}>
                        {quest.difficulty}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 text-yellow-600">
                      <Trophy className="h-4 w-4" />
                      <span className="font-bold">{quest.reward}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{quest.description}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Progress</span>
                        <span>{quest.completedTasks}/{quest.totalTasks} tasks completed</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-role-student-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${quest.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {quest.timeLeft} left
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {quest.participants} participants
                      </div>
                    </div>

                    <Button variant="primary" role="student" className="w-full">
                      <Target className="h-4 w-4 mr-2" />
                      Continue Quest
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Available Quests */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Available Quests</h2>
          <div className="space-y-4">
            {availableQuests.map((quest, index) => (
              <motion.div
                key={quest.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                <Card className={quest.locked ? 'opacity-60' : 'hover:shadow-md transition-shadow'}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-gray-900">{quest.title}</h3>
                          {quest.locked && <Lock className="h-4 w-4 text-gray-400" />}
                        </div>
                        <p className="text-gray-600 text-sm mb-3">{quest.description}</p>
                        {quest.locked && (
                          <p className="text-sm text-orange-600 bg-orange-50 px-2 py-1 rounded">
                            🔒 {quest.unlockRequirement}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center space-x-1 text-yellow-600 ml-4">
                        <Trophy className="h-4 w-4" />
                        <span className="font-bold">{quest.reward}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(quest.difficulty)}`}>
                        {quest.difficulty}
                      </span>
                      <div className="flex items-center space-x-4">
                        <span>{quest.tasks} tasks</span>
                        <span>{quest.duration}</span>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {quest.participants}
                        </div>
                      </div>
                    </div>

                    <Button 
                      variant={quest.locked ? "outline" : "primary"} 
                      role="student" 
                      className="w-full"
                      disabled={quest.locked}
                    >
                      {quest.locked ? 'Locked' : 'Start Quest'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Achievements */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Achievements</h2>
          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <Card className={`${achievement.earned ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-full ${achievement.earned ? 'bg-yellow-100' : 'bg-gray-100'}`}>
                        {achievement.earned ? (
                          <CheckCircle className="h-6 w-6 text-yellow-600" />
                        ) : (
                          <Star className="h-6 w-6 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-medium ${achievement.earned ? 'text-gray-900' : 'text-gray-500'}`}>
                          {achievement.title}
                        </h4>
                        <p className={`text-sm ${achievement.earned ? 'text-gray-600' : 'text-gray-400'}`}>
                          {achievement.description}
                        </p>
                      </div>
                      {achievement.earned && (
                        <div className="text-yellow-600 font-bold">
                          ✨ Earned
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Quests;