import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  Zap,
  Shield,
  Server,
  Database,
  ArrowRight,
  Github,
  ExternalLink,
  Mail,
  Linkedin,
  MonitorSpeaker,
  Clock,
  CheckCircle,
} from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { cn } from '../utils/cn';

interface APIProject {
  id: string;
  name: string;
  description: string;
  tech: string[];
  status: 'online' | 'offline' | 'maintenance';
  responseTime: number;
  uptime: number;
  endpoint: string;
  documentation: string;
  github: string;
  features: string[];
  category: 'REST' | 'GraphQL' | 'WebSocket' | 'gRPC';
}

// Mock data - substitua pelos seus projetos reais
const apiProjects: APIProject[] = [
  {
    id: '1',
    name: 'E-commerce API',
    description:
      'API completa para e-commerce com autenticação, pagamentos e gestão de produtos',
    tech: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'JWT'],
    status: 'online',
    responseTime: 120,
    uptime: 99.9,
    endpoint: 'https://api.example.com/v1',
    documentation: 'https://docs.example.com',
    github: 'https://github.com/yourusername/ecommerce-api',
    features: [
      'Autenticação JWT',
      'Pagamentos Stripe',
      'Cache Redis',
      'Rate Limiting',
    ],
    category: 'REST',
  },
  {
    id: '2',
    name: 'Real-time Chat API',
    description:
      'Sistema de chat em tempo real com WebSockets e notificações push',
    tech: ['Node.js', 'Socket.io', 'MongoDB', 'Redis'],
    status: 'online',
    responseTime: 45,
    uptime: 99.8,
    endpoint: 'wss://chat.example.com',
    documentation: 'https://chat-docs.example.com',
    github: 'https://github.com/yourusername/chat-api',
    features: [
      'WebSockets',
      'Rooms & Channels',
      'Push Notifications',
      'File Upload',
    ],
    category: 'WebSocket',
  },
  {
    id: '3',
    name: 'Analytics GraphQL API',
    description: 'API GraphQL para analytics e métricas com queries complexas',
    tech: ['GraphQL', 'Apollo Server', 'PostgreSQL', 'DataLoader'],
    status: 'maintenance',
    responseTime: 200,
    uptime: 95.5,
    endpoint: 'https://analytics.example.com/graphql',
    documentation: 'https://analytics-docs.example.com',
    github: 'https://github.com/yourusername/analytics-api',
    features: [
      'GraphQL Subscriptions',
      'DataLoader',
      'Complex Queries',
      'Real-time Metrics',
    ],
    category: 'GraphQL',
  },
];

const StatusBadge: React.FC<{
  status: APIProject['status'];
  responseTime: number;
}> = ({ status, responseTime }) => {
  const statusConfig = {
    online: { color: 'bg-green-500', text: 'Online', icon: CheckCircle },
    offline: { color: 'bg-red-500', text: 'Offline', icon: MonitorSpeaker },
    maintenance: { color: 'bg-yellow-500', text: 'Maintenance', icon: Clock },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          'flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-white',
          config.color
        )}
      >
        <Icon size={12} />
        {config.text}
      </div>
      {status === 'online' && (
        <span className="text-xs text-gray-400">{responseTime}ms</span>
      )}
    </div>
  );
};

const APICard: React.FC<{ project: APIProject; index: number }> = ({
  project,
  index,
}) => {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.2,
  });

  return (
    <motion.div
      ref={elementRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isIntersecting ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-bold text-white">{project.name}</h3>
              <span
                className={cn(
                  'px-2 py-1 text-xs rounded-full font-medium',
                  project.category === 'REST' && 'bg-blue-500/20 text-blue-400',
                  project.category === 'GraphQL' &&
                    'bg-pink-500/20 text-pink-400',
                  project.category === 'WebSocket' &&
                    'bg-green-500/20 text-green-400',
                  project.category === 'gRPC' &&
                    'bg-purple-500/20 text-purple-400'
                )}
              >
                {project.category}
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-3">{project.description}</p>
          </div>
          <StatusBadge
            status={project.status}
            responseTime={project.responseTime}
          />
        </div>

        <div className="mb-4">
          <div className="flex flex-wrap gap-2 mb-3">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4">
            {project.features.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-2 text-xs text-gray-400"
              >
                <CheckCircle size={12} className="text-green-400" />
                {feature}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a
              href={project.documentation}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm transition-colors"
            >
              <ExternalLink size={14} />
              Docs
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-gray-400 hover:text-white text-sm transition-colors"
            >
              <Github size={14} />
              Code
            </a>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm transition-colors"
          >
            Test API
            <ArrowRight size={14} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20" />

      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:14px_24px]" />

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Backend Developer
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Construindo APIs robustas e escaláveis que impulsionam aplicações
            modernas
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {[
              { icon: Server, text: 'APIs REST & GraphQL' },
              { icon: Database, text: 'Arquitetura de Dados' },
              { icon: Shield, text: 'Segurança & Performance' },
              { icon: Zap, text: 'Microserviços' },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-700"
              >
                <Icon size={16} className="text-blue-400" />
                <span className="text-gray-300 text-sm">{text}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="flex justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <Activity size={18} />
              Ver APIs
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <Mail size={18} />
              Contato
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const APIShowcase: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const categories = ['all', 'REST', 'GraphQL', 'WebSocket', 'gRPC'];

  const filteredProjects =
    selectedCategory === 'all'
      ? apiProjects
      : apiProjects.filter((project) => project.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <HeroSection />

      {/* APIs Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Meus Projetos API
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Uma coleção das minhas melhores APIs, demonstrando diferentes
              tecnologias e padrões arquiteturais
            </p>
          </motion.div>

          {/* Category Filter */}
          <div className="flex justify-center mb-12">
            <div className="flex gap-2 bg-gray-900/50 backdrop-blur-sm p-2 rounded-xl border border-gray-800">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  )}
                >
                  {category === 'all' ? 'Todos' : category}
                </button>
              ))}
            </div>
          </div>

          {/* API Cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProjects.map((project, index) => (
                <APICard key={project.id} project={project} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6 bg-gray-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Vamos trabalhar juntos?</h2>
            <p className="text-gray-400 mb-8">
              Entre em contato para discutir seu próximo projeto de API
            </p>

            <div className="flex justify-center gap-4">
              <motion.a
                href="mailto:seu-email@email.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <Mail size={18} />
                Email
              </motion.a>

              <motion.a
                href="https://linkedin.com/in/seulinkedin"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <Linkedin size={18} />
                LinkedIn
              </motion.a>

              <motion.a
                href="https://github.com/seugithub"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <Github size={18} />
                GitHub
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default APIShowcase;
