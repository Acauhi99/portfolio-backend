/* eslint-disable @typescript-eslint/no-unused-vars */
import { motion } from 'framer-motion';
import { ErrorBoundary } from './ErrorBoundary';
import { colors } from '../styles/colors';

const FloatingParticle = ({ index }: { index: number }) => {
  const size = Math.random() * 3 + 1;
  const duration = Math.random() * 20 + 10;
  const delay = Math.random() * 5;

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(45deg, ${colors.text.accent}, ${colors.accent.to})`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        filter: 'blur(0.5px)',
      }}
      animate={{
        x: [0, Math.random() * 200 - 100],
        y: [0, Math.random() * 200 - 100],
        opacity: [0, 0.8, 0],
        scale: [0.5, 1, 0.5],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    />
  );
};

const GeometricShape = ({ index }: { index: number }) => {
  const shapes = ['circle', 'square', 'triangle'];
  const shape = shapes[index % shapes.length];
  const size = Math.random() * 40 + 20;

  return (
    <motion.div
      className="absolute opacity-10"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: size,
        height: size,
      }}
      animate={{
        rotate: [0, 360],
        scale: [0.8, 1.2, 0.8],
        opacity: [0.05, 0.15, 0.05],
      }}
      transition={{
        duration: Math.random() * 30 + 20,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {shape === 'circle' && (
        <div
          className="w-full h-full rounded-full border-2"
          style={{ borderColor: colors.border.accent }}
        />
      )}
      {shape === 'square' && (
        <div
          className="w-full h-full border-2 rotate-45"
          style={{ borderColor: colors.text.accent }}
        />
      )}
      {shape === 'triangle' && (
        <div
          className="w-0 h-0 border-l-[10px] border-r-[10px] border-b-[20px] border-transparent"
          style={{ borderBottomColor: colors.border.accent }}
        />
      )}
    </motion.div>
  );
};

const GridPattern = () => (
  <div
    className="absolute inset-0 opacity-20"
    style={{
      backgroundImage: `
        linear-gradient(${colors.border.secondary} 1px, transparent 1px),
        linear-gradient(90deg, ${colors.border.secondary} 1px, transparent 1px)
      `,
      backgroundSize: '50px 50px',
    }}
  />
);

const RadialGradient = () => (
  <div
    className="absolute inset-0"
    style={{
      background: `
        radial-gradient(circle at 20% 20%, ${colors.accent.from}40 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, ${colors.secondary.from}40 0%, transparent 50%),
        radial-gradient(circle at 40% 60%, ${colors.accent.via}20 0%, transparent 50%)
      `,
    }}
  />
);

export const Background = () => {
  return (
    <ErrorBoundary>
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Base gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${colors.primary.from} 0%, ${colors.secondary.via} 50%, ${colors.accent.from} 100%)`,
          }}
        />

        {/* Radial gradients for depth */}
        <RadialGradient />

        {/* Grid pattern */}
        <GridPattern />

        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              `linear-gradient(45deg, ${colors.accent.from}10, ${colors.secondary.from}10)`,
              `linear-gradient(135deg, ${colors.secondary.from}10, ${colors.accent.via}10)`,
              `linear-gradient(225deg, ${colors.accent.via}10, ${colors.primary.via}10)`,
              `linear-gradient(315deg, ${colors.primary.via}10, ${colors.accent.from}10)`,
            ],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <FloatingParticle key={`particle-${i}`} index={i} />
          ))}
        </div>

        {/* Geometric shapes */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <GeometricShape key={`shape-${i}`} index={i} />
          ))}
        </div>

        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 opacity-20 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>
    </ErrorBoundary>
  );
};
