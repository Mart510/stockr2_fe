import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { SparklesCore } from './components/sparkles.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <div className="w-full absolute inset-0 h-screen">
      <SparklesCore
        id="tsparticlesfullpage"
        background="transparent"
        minSize={0.2}
        maxSize={0.9}
        particleDensity={80}
        className="w-full h-full"
        particleColor="#FFFFFF"
      />
      </div>
    <App />
  </StrictMode>,
)
