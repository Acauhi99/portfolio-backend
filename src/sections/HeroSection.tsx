import { motion } from 'framer-motion';
import { Activity, Zap, Shield, Server, Database, Mail } from 'lucide-react';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { colors } from '../styles/colors';

const features = [
  { icon: Server, text: 'APIs REST & GraphQL' },
  { icon: Database, text: 'Arquitetura de Dados' },
  { icon: Shield, text: 'Segurança & Performance' },
  { icon: Zap, text: 'Microserviços' },
];

export const HeroSection: React.FC = () => (
  <ErrorBoundary>
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20">
      <div className="relative z-10 text-center w-full max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight"
            style={{
              background: `linear-gradient(135deg, ${colors.text.primary} 0%, ${colors.text.accent} 50%, ${colors.accent.to} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Backend Developer
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-2xl mx-auto px-2 leading-relaxed"
            style={{ color: colors.text.secondary }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Construindo APIs robustas e escaláveis que impulsionam aplicações
            modernas
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-12 px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {features.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full border backdrop-blur-sm touch-manipulation"
                style={{
                  backgroundColor: colors.surface.secondary,
                  borderColor: colors.border.primary,
                }}
              >
                <Icon
                  size={14}
                  className="sm:w-4 sm:h-4"
                  style={{ color: colors.text.accent }}
                />
                <span
                  style={{ color: colors.text.secondary }}
                  className="text-xs sm:text-sm whitespace-nowrap"
                >
                  {text}
                </span>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 w-full max-w-md sm:max-w-none mx-auto px-4 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <a href="#api-projects" className="w-full sm:w-auto min-w-0">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 px-6 py-4 sm:py-3 rounded-lg font-medium transition-colors w-full text-base sm:text-sm touch-manipulation active:scale-95"
                style={{
                  background: `linear-gradient(135deg, ${colors.text.accent} 0%, ${colors.accent.via} 100%)`,
                  color: colors.text.primary,
                  minHeight: '48px', // Minimum touch target
                }}
              >
                <Activity size={18} />
                Ver APIs
              </motion.button>
            </a>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 px-6 py-4 sm:py-3 rounded-lg font-medium transition-colors border backdrop-blur-sm w-full sm:w-auto text-base sm:text-sm touch-manipulation active:scale-95"
              style={{
                borderColor: colors.border.primary,
                color: colors.text.secondary,
                backgroundColor: colors.surface.tertiary,
                minHeight: '48px', // Minimum touch target
              }}
            >
              <Mail size={18} />
              Contato
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  </ErrorBoundary>
);
