import { motion } from 'framer-motion';
import { ErrorBoundary } from './ErrorBoundary';
import { colors } from '../styles/colors';
import { cn } from '../utils/cn';

const FloatingParticle = ({ index }: { index: number }) => {
  const size = 4 + (index % 3) * 2;
  const duration = 15 + (index % 10);
  const delay = (index * 0.7) % 5;
  const left = `${(index * 37) % 100}%`;
  const top = `${(index * 53) % 100}%`;

  return (
    <motion.div
      className={cn('absolute rounded-full')}
      style={{
        width: size,
        height: size,
        background: `linear-gradient(45deg, ${colors.text.accent}, ${colors.accent.to})`,
        left,
        top,
        filter: 'blur(0.5px)',
        willChange: 'transform, opacity',
      }}
      animate={{
        x: [0, ((index * 13) % 200) - 100],
        y: [0, ((index * 17) % 200) - 100],
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

// GeometricShape otimizado: determinístico, mais formas, melhor performance
const GeometricShape = ({ index }: { index: number }) => {
  const shapes = ['circle', 'square', 'triangle', 'diamond', 'hexagon'];
  const shape = shapes[index % shapes.length];
  const size = 24 + (index % 6) * 8;
  const left = `${(index * 23) % 100}%`;
  const top = `${(index * 41) % 100}%`;

  return (
    <motion.div
      className={cn('absolute opacity-10')}
      style={{
        left,
        top,
        width: size,
        height: size,
        willChange: 'transform, opacity',
      }}
      animate={{
        rotate: [0, 360],
        scale: [0.8, 1.2, 0.8],
        opacity: [0.05, 0.15, 0.05],
      }}
      transition={{
        duration: 25 + (index % 10),
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
          className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[24px] border-transparent"
          style={{ borderBottomColor: colors.border.accent }}
        />
      )}
      {shape === 'diamond' && (
        <div
          className="w-full h-full border-2 rotate-45"
          style={{ borderColor: colors.accent.via }}
        />
      )}
      {shape === 'hexagon' && (
        <svg
          width={size}
          height={size}
          viewBox="0 0 40 40"
          className="absolute"
          style={{ left: 0, top: 0 }}
        >
          <polygon
            points="20,4 36,12 36,28 20,36 4,28 4,12"
            fill="none"
            stroke={colors.accent.to}
            strokeWidth="2"
          />
        </svg>
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

        {/* Floating particles (reduzido para 40 para performance) */}
        <div className="absolute inset-0">
          {[...Array(40)].map((_, i) => (
            <FloatingParticle key={`particle-${i}`} index={i} />
          ))}
        </div>

        {/* Geometric shapes (aumentado para 16, mais variedade) */}
        <div className="absolute inset-0">
          {[...Array(16)].map((_, i) => (
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
