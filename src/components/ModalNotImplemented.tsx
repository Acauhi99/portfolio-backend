import { motion, AnimatePresence } from 'framer-motion';
import { X, Server, Zap, Shield, Database } from 'lucide-react';
import { cn } from '../utils/cn';
import { colors } from '../styles/colors';

interface ModalNotImplementedProps {
  open: boolean;
  onClose: () => void;
  projectName: string;
}

export const ModalNotImplemented: React.FC<ModalNotImplementedProps> = ({
  open,
  onClose,
  projectName,
}) => (
  <AnimatePresence>
    {open && (
      <motion.div
        className={cn(
          'fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm'
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <motion.div
          className={cn(
            'relative w-full max-w-sm sm:max-w-md md:max-w-lg bg-gradient-to-br from-purple-900 via-violet-800 to-blue-900 rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col items-center'
          )}
          initial={{ scale: 0.95, y: 40, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 40, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {/* Botão de fechar no topo superior direito */}
          <button
            onClick={onClose}
            className={cn(
              'absolute top-4 right-4 flex items-center justify-center p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors',
              'cursor-pointer'
            )}
            aria-label="Fechar modal"
          >
            <span className="flex items-center justify-center w-6 h-6">
              <X size={24} style={{ color: colors.text.primary }} />
            </span>
          </button>
          <motion.div
            className="mb-4 flex items-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Server size={28} style={{ color: colors.text.accent }} />
            <Zap size={24} style={{ color: colors.text.accent }} />
            <Shield size={24} style={{ color: colors.text.accent }} />
            <Database size={24} style={{ color: colors.text.accent }} />
          </motion.div>
          <h3
            className="text-xl sm:text-2xl font-bold mb-2 text-center"
            style={{
              background: `linear-gradient(135deg, ${colors.text.accent} 0%, ${colors.accent.to} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {projectName}
          </h3>
          <p
            className="text-base sm:text-lg text-center mb-2"
            style={{ color: colors.text.secondary }}
          >
            Em breve você poderá testar esta API diretamente aqui! <br />
            Enquanto isso, explore o código e a documentação.
          </p>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);
