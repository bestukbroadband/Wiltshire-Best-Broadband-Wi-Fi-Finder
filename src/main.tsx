import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import {ErrorBoundary} from './components/ErrorBoundary.tsx';
import {runPostcodeTests} from './utils/postcodeTests.ts';
import './index.css';

// Run automated tests for postcode matching rules
try {
  runPostcodeTests();
} catch (e) {
  console.error("Failed to run postcode test suite:", e);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);

