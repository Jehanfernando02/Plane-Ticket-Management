import { useState } from 'react';
import Home from './pages/Home.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
      <header className="bg-primary text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Plane Management</h1>
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </header>
      <main className="container mx-auto p-4">
        <Home />
      </main>
      <footer className="bg-primary text-white text-center p-4">
        <p>© 2025 Plane Management App</p>
      </footer>
    </div>
  );
}

export default App;