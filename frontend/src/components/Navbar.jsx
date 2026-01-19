import { useState } from 'react';
import { IoMoon } from 'react-icons/io5';
import { LuSun } from 'react-icons/lu';
import { FiPlusSquare } from 'react-icons/fi';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleColorMode = () => {
    setDarkMode(!darkMode);
    document.body.style.backgroundColor = !darkMode ? '#1a202c' : '#ffffff';
    document.body.style.color = !darkMode ? '#ffffff' : '#000000';
  };

  const styles = {
    navbar: {
      maxWidth: '1140px',
      margin: '0 auto',
      padding: '0 1rem',
    },
    navbarFlex: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      minHeight: '64px',
      flexDirection: window.innerWidth < 576 ? 'column' : 'row',
    },
    brandText: {
      fontSize: window.innerWidth < 576 ? '22px' : '28px',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      textAlign: 'center',
      background: 'linear-gradient(to right, #00b5d8, #3182ce)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      textDecoration: 'none',
      margin: 0,
      cursor: 'pointer',
    },
    link: {
      textDecoration: 'none',
      color: 'inherit',
    },
    button: {
      padding: '0.5rem 1rem',
      border: '1px solid #e2e8f0',
      borderRadius: '0.375rem',
      backgroundColor: darkMode ? '#2d3748' : '#ffffff',
      color: darkMode ? '#ffffff' : '#000000',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '16px',
      transition: 'all 0.2s',
    },
    buttonHover: {
      backgroundColor: darkMode ? '#4a5568' : '#f7fafc',
    },
    buttonGroup: {
      display: 'flex',
      gap: '0.5rem',
      alignItems: 'center',
    },
  };

  return (
    <nav style={styles.navbar}>
      <div className="container-fluid">
        <div style={styles.navbarFlex}>
          <h1 style={styles.brandText}>
            <a href="/" style={styles.link}>
              Product Store 🛒
            </a>
          </h1>

          <div style={styles.buttonGroup}>
            <a href="/create">
              <button 
                style={styles.button}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = styles.button.backgroundColor;
                }}
              >
                <FiPlusSquare size={20} />
              </button>
            </a>

            <button 
              style={styles.button}
              onClick={toggleColorMode}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = styles.button.backgroundColor;
              }}
            >
              {darkMode ? <LuSun size={20} /> : <IoMoon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;