import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { MobileNav } from './components/MobileNav'
import ClickSpark from './components/ClickSpark'
import CustomCursor from './components/CustomCursor'
import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import DocumentsPage from './pages/DocumentsPage'
import SettingsPage from './pages/SettingsPage'
import TransparencyPage from './pages/TransparencyPage'
import AdminPage from './pages/AdminPage'
import DocumentationPage from './pages/DocumentationPage'

function App() {
  return (
    <Router>
      <CustomCursor />
      <ClickSpark
        sparkColor="#00d9ff"
        sparkSize={12}
        sparkRadius={20}
        sparkCount={8}
        duration={500}
        easing="ease-out"
      >
        <div className="min-h-screen bg-background text-foreground">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/transparency" element={<TransparencyPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/documentation" element={<DocumentationPage />} />
          </Routes>
          <MobileNav />
        </div>
      </ClickSpark>
    </Router>
  )
}

export default App
