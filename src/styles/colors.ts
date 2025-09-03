export const colors = {
  // Background gradients
  primary: {
    from: '#0f172a', // slate-900
    via: '#1e293b', // slate-800
    to: '#334155', // slate-700
  },
  secondary: {
    from: '#1e1b4b', // indigo-900
    via: '#312e81', // indigo-800
    to: '#3730a3', // indigo-700
  },
  accent: {
    from: '#581c87', // purple-900
    via: '#7c3aed', // violet-600
    to: '#a855f7', // purple-500
  },
  // UI colors
  surface: {
    primary: 'rgba(15, 23, 42, 0.9)', // slate-900 with opacity
    secondary: 'rgba(30, 41, 59, 0.8)', // slate-800 with opacity
    tertiary: 'rgba(51, 65, 85, 0.6)', // slate-700 with opacity
  },
  border: {
    primary: 'rgba(100, 116, 139, 0.3)', // slate-500 with opacity
    secondary: 'rgba(148, 163, 184, 0.2)', // slate-400 with opacity
    accent: 'rgba(59, 130, 246, 0.5)', // blue-500 with opacity
  },
  text: {
    primary: '#f8fafc', // slate-50
    secondary: '#cbd5e1', // slate-300
    muted: '#94a3b8', // slate-400
    accent: '#60a5fa', // blue-400
  },
} as const;
