import { motion } from 'framer-motion';
import { Mail, Linkedin, Github } from 'lucide-react';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { colors } from '../styles/colors';
import { cn } from '../utils/cn';

export const ContactSection: React.FC = () => {
  const loading = false;
  const error = null;

  if (loading) return <LoadingSpinner size={48} />;
  if (error) return <div style={{ color: 'rgb(239, 68, 68)' }}>{error}</div>;

  return (
    <ErrorBoundary>
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: colors.text.primary }}
            >
              Vamos trabalhar juntos?
            </h2>
            <p className="mb-8" style={{ color: colors.text.secondary }}>
              Entre em contato para discutir seu próximo projeto de API
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4 w-full">
              <motion.a
                href="mailto:acauhi.mateus@gmail.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  'flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors w-full md:w-auto'
                )}
                style={{
                  background: `linear-gradient(135deg, ${colors.text.accent} 0%, ${colors.accent.via} 100%)`,
                  color: colors.text.primary,
                }}
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
                className={cn(
                  'flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors border backdrop-blur-sm w-full md:w-auto'
                )}
                style={{
                  borderColor: colors.border.primary,
                  color: colors.text.secondary,
                  backgroundColor: colors.surface.tertiary,
                }}
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
                className={cn(
                  'flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors border backdrop-blur-sm w-full md:w-auto'
                )}
                style={{
                  borderColor: colors.border.primary,
                  color: colors.text.secondary,
                  backgroundColor: colors.surface.tertiary,
                }}
              >
                <Github size={18} />
                GitHub
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </ErrorBoundary>
  );
};
