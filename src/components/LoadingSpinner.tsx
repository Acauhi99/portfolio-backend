import { motion } from 'framer-motion';
import { colors } from '../styles/colors';

export const LoadingSpinner: React.FC<{ size?: number }> = ({ size = 24 }) => {
  return (
    <motion.div
      className="border-2 rounded-full"
      style={{
        width: size,
        height: size,
        borderColor: colors.border.primary,
        borderTopColor: colors.text.accent,
      }}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
  );
};
