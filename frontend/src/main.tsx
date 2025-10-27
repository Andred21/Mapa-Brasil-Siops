import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'primereact/resources/themes/lara-light-blue/theme.css';
import "leaflet/dist/leaflet.css";
import "tailwindcss";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const client = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={client}>
       <App />
    </QueryClientProvider>
    
  </StrictMode>,
)
