import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Github,
  ArrowRight,
  CheckCircle,
  MonitorSpeaker,
  Clock,
  ChevronDown,
} from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useIsMobile } from '../hooks/useIsMobile';
import { cn } from '../utils/cn';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { colors } from '../styles/colors';

// Defina o tipo para os projetos
type APIProject = {
  id: number;
  name: string;
  description: string;
  category: string;
  status: 'online' | 'offline' | 'maintenance';
  responseTime: number;
  tech: string[];
  features: string[];
  documentation: string;
  github: string;
};

// Use o tipo no array e no componente
const apiProjects: APIProject[] = [
  {
    id: 1,
    name: 'E-commerce API',
    description:
      'API completa para e-commerce com autenticação JWT e pagamentos',
    category: 'REST',
    status: 'online',
    responseTime: 120,
    tech: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Stripe'],
    features: [
      'Autenticação JWT',
      'Pagamentos Stripe',
      'CRUD Produtos',
      'Rate Limiting',
    ],
    documentation: 'https://docs.projeto1.com',
    github: 'https://github.com/projeto1',
  },
  {
    id: 2,
    name: 'Social Media GraphQL',
    description:
      'API GraphQL para rede social com subscriptions em tempo real e upload de mídia',
    category: 'GraphQL',
    status: 'maintenance',
    responseTime: 80,
    tech: ['Apollo Server', 'GraphQL', 'MongoDB', 'Redis', 'CloudinaryAPI'],
    features: [
      'Real-time Subscriptions',
      'Upload de Mídia',
      'Cache Redis',
      'Pagination',
    ],
    documentation: 'https://docs.projeto2.com',
    github: 'https://github.com/projeto2',
  },
  {
    id: 3,
    name: 'Chat WebSocket',
    description:
      'Sistema de chat em tempo real com salas, notificações e histórico de mensagens',
    category: 'WebSocket',
    status: 'offline',
    responseTime: 0,
    tech: ['Socket.io', 'Node.js', 'Express', 'MongoDB', 'Redis'],
    features: [
      'Salas Privadas',
      'Notificações Push',
      'Histórico',
      'Status Online',
    ],
    documentation: 'https://docs.projeto3.com',
    github: 'https://github.com/projeto3',
  },
  {
    id: 4,
    name: 'Microservices gRPC',
    description:
      'Arquitetura de microserviços usando gRPC para comunicação entre serviços',
    category: 'gRPC',
    status: 'online',
    responseTime: 60,
    tech: ['gRPC', 'Node.js', 'TypeScript', 'Docker', 'Kubernetes'],
    features: [
      'Load Balancing',
      'Service Discovery',
      'Health Checks',
      'Monitoring',
    ],
    documentation: 'https://docs.projeto4.com',
    github: 'https://github.com/projeto4',
  },
];

const StatusBadge: React.FC<{ status: string; responseTime: number }> = ({
  status,
  responseTime,
}) => {
  const statusConfig = {
    online: { color: 'bg-green-500', text: 'Online', icon: CheckCircle },
    offline: { color: 'bg-red-500', text: 'Offline', icon: MonitorSpeaker },
    maintenance: { color: 'bg-yellow-500', text: 'Maintenance', icon: Clock },
  };
  const config = statusConfig[status as keyof typeof statusConfig];
  const Icon = config.icon;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2">
      <div
        className={cn(
          'flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium',
          config.color
        )}
        style={{ color: colors.text.primary }}
      >
        <Icon size={12} />
        <span className="whitespace-nowrap">{config.text}</span>
      </div>
      {status === 'online' && (
        <span
          className="text-xs whitespace-nowrap"
          style={{ color: colors.text.muted }}
        >
          {responseTime}ms
        </span>
      )}
    </div>
  );
};

const APICard: React.FC<{ project: APIProject; index: number }> = ({
  project,
  index,
}) => {
  const isMobile = useIsMobile();
  const [isExpanded, setIsExpanded] = useState(isMobile);
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.2,
  });

  useEffect(() => {
    setIsExpanded(isMobile);
  }, [isMobile]);

  const visibleTech = project.tech.slice(0, 3);
  const hiddenTech = project.tech.slice(3);
  const hasMoreTech = hiddenTech.length > 0;

  return (
    <motion.div
      ref={elementRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isIntersecting ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative backdrop-blur-sm border rounded-xl p-4 sm:p-6 hover:border-blue-500/50 transition-all duration-300 touch-manipulation"
      style={{
        backgroundColor: colors.surface.secondary,
        borderColor: colors.border.primary,
      }}
    >
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(135deg, ${colors.accent.from}10, ${colors.accent.via}10)`,
        }}
      />

      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row items-start justify-between mb-4 gap-3">
          <div className="flex-1 min-w-0 w-full sm:w-auto">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
              <h3
                className="text-lg sm:text-xl font-bold line-clamp-2 sm:line-clamp-1"
                style={{ color: colors.text.primary }}
              >
                {project.name}
              </h3>
              <span
                className="px-2 py-1 text-xs rounded-full font-medium self-start whitespace-nowrap"
                style={{
                  backgroundColor: colors.surface.tertiary,
                  color: colors.text.accent,
                }}
              >
                {project.category}
              </span>
            </div>
            <p
              className="text-sm mb-3 leading-relaxed line-clamp-3"
              style={{ color: colors.text.secondary }}
            >
              {project.description}
            </p>
          </div>

          <div className="flex-shrink-0 w-full sm:w-auto">
            <StatusBadge
              status={project.status}
              responseTime={project.responseTime}
            />
          </div>
        </div>

        <div className="mb-4 sm:mb-6">
          {/* Tecnologias visíveis */}
          <div className="flex flex-wrap gap-2 mb-3">
            {visibleTech.map((tech: string) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs rounded-md font-medium"
                style={{
                  backgroundColor: colors.surface.tertiary,
                  color: colors.text.secondary,
                }}
              >
                {tech}
              </span>
            ))}

            {/* Botão para mostrar mais tecnologias */}
            {hasMoreTech && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="px-2 py-1 text-xs rounded-md font-medium flex items-center gap-1 touch-manipulation transition-colors hover:bg-blue-600/20"
                style={{
                  color: colors.text.accent,
                  minHeight: '32px',
                  backgroundColor: colors.surface.tertiary + '80',
                }}
              >
                +{hiddenTech.length}
                <ChevronDown
                  size={12}
                  className={cn(
                    'transition-transform duration-200',
                    isExpanded && 'rotate-180'
                  )}
                />
              </button>
            )}
          </div>

          {/* Tecnologias expandidas (mobile) */}
          <AnimatePresence>
            {isExpanded && project.tech.length > 3 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mb-3"
              >
                <div className="flex flex-wrap gap-2">
                  {hiddenTech.map((tech: string) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs rounded-md font-medium"
                      style={{
                        backgroundColor: colors.surface.tertiary,
                        color: colors.text.secondary,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
            {project.features.map((feature: string) => (
              <div
                key={feature}
                className="flex items-start gap-2 text-xs"
                style={{ color: colors.text.muted }}
              >
                <CheckCircle
                  size={12}
                  className="text-green-400 flex-shrink-0 mt-0.5"
                />
                <span className="line-clamp-2">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-4 order-2 sm:order-1">
            <a
              href={project.documentation}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm transition-colors touch-manipulation py-2"
            >
              <ExternalLink size={14} />
              <span>Docs</span>
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-gray-400 hover:text-white text-sm transition-colors touch-manipulation py-2"
            >
              <Github size={14} />
              <span>Code</span>
            </a>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg text-sm font-medium transition-colors w-full sm:w-auto touch-manipulation order-1 sm:order-2"
            style={{ minHeight: '44px' }}
          >
            <span>Test API</span>
            <ArrowRight size={14} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export const APISection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const categories = ['all', 'REST', 'GraphQL', 'WebSocket', 'gRPC'];
  const filteredProjects =
    selectedCategory === 'all'
      ? apiProjects
      : apiProjects.filter((project) => project.category === selectedCategory);

  if (loading) return <LoadingSpinner size={48} />;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <ErrorBoundary>
      <section id="api-projects" className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2
              className="text-3xl sm:text-4xl font-bold mb-4 px-2"
              style={{
                background: `linear-gradient(135deg, ${colors.text.accent} 0%, ${colors.accent.to} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Meus Projetos API
            </h2>
            <p
              className="text-base sm:text-lg max-w-2xl mx-auto px-4 leading-relaxed"
              style={{ color: colors.text.secondary }}
            >
              Uma coleção das minhas melhores APIs, demonstrando diferentes
              tecnologias e padrões arquiteturais
            </p>
          </motion.div>

          {/* Category Filter */}
          <div className="flex justify-center mb-8 sm:mb-12 px-2">
            <div className="w-full max-w-full overflow-x-auto">
              <div className="flex gap-2 bg-gray-900/50 backdrop-blur-sm p-2 rounded-xl border border-gray-800 min-w-max mx-auto">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={cn(
                      'px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap touch-manipulation',
                      selectedCategory === category
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    )}
                    style={{ minHeight: '40px' }}
                  >
                    {category === 'all' ? 'Todos' : category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={
                isMobile
                  ? 'grid grid-cols-1 gap-4 w-full'
                  : 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 w-full'
              }
            >
              {filteredProjects.map((project, index) => (
                <APICard key={project.id} project={project} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p style={{ color: colors.text.secondary }}>
                Nenhum projeto encontrado para esta categoria.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </ErrorBoundary>
  );
};
