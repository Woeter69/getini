import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Grainient from './components/Grainient'
import { Home } from './pages/Home'
import { Docs } from './pages/Docs'

function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen">
        {/* Background Component - Persists across routes */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <Grainient 
            color1="#0F172A" 
            color2="#7C3AED" 
            color3="#06B6D4" 
            timeSpeed={0.1}
            warpStrength={0.5}
          />
          {/* Dark overlay to improve text readability */}
          <div className="absolute inset-0 bg-[#0F172A]/70 pointer-events-none" />
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/docs" element={<Docs />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
