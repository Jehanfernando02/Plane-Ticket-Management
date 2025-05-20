function ThemeToggle({ darkMode, setDarkMode }) {
    return (
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="p-2 rounded-full bg-secondary text-white hover:bg-accent transition"
      >
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
    );
  }
  
  export default ThemeToggle;