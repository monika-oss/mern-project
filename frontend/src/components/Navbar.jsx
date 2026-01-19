import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlusSquare } from 'react-icons/fi';
import { IoMoon } from 'react-icons/io5';
import { LuSun } from 'react-icons/lu';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleColorMode = () => {
    setDarkMode(!darkMode);
    document.body.style.backgroundColor = !darkMode ? '#1a202c' : '#ffffff';
    document.body.style.color = !darkMode ? '#ffffff' : '#000000';
  };

  const styles = {
    navbar: {
      padding: '1rem 0',
      marginBottom: '2rem',
    },
    brand: {
      fontSize: '28px',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      background: 'linear-gradient(to right, #00b5d8, #3182ce)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textDecoration: 'none',
      cursor: 'pointer',
    },
    navLinks: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
    },
    button: {
      backgroundColor: darkMode ? '#2d3748' : '#edf2f7',
      color: darkMode ? '#ffffff' : '#1a202c',
      border: 'none',
      padding: '0.5rem 1rem',
      borderRadius: '0.5rem',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s',
    }
  };

  return (
    <nav className="container" style={styles.navbar}>
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3">
        <Link to="/" style={styles.brand}>
          Product Store 🛒
        </Link>

        <div style={styles.navLinks}>
          <Link to="/create">
            <button style={styles.button}>
              <FiPlusSquare size={24} />
            </button>
          </Link>
          <button style={styles.button} onClick={toggleColorMode}>
            {darkMode ? <LuSun size={24} /> : <IoMoon size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
