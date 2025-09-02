import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from './components/ErrorBoundary';
import APIShowcase from './pages/APIShowcase';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <APIShowcase />
  </ErrorBoundary>
);
