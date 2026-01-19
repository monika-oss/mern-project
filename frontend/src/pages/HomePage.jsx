import { useEffect, useState } from 'react';
import { useProductStore } from '../store/product';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();
  const [darkMode] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  console.log('products', products);

  const styles = {
    container: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '3rem 1rem',
    },
    vstack: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
    },
    heading: {
      fontSize: '30px',
      fontWeight: 'bold',
      textAlign: 'center',
      background: 'linear-gradient(to right, #00b5d8, #3182ce)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '2.5rem',
      width: '100%',
    },
    emptyState: {
      fontSize: '1.25rem',
      textAlign: 'center',
      fontWeight: 'bold',
      color: '#a0aec0',
    },
    link: {
      color: '#3182ce',
      textDecoration: 'none',
      cursor: 'pointer',
    },
    linkHover: {
      textDecoration: 'underline',
    },
  };

  // Responsive grid columns
  const getGridStyle = () => {
    const baseStyle = { ...styles.grid };
    if (window.innerWidth >= 1024) {
      baseStyle.gridTemplateColumns = 'repeat(3, 1fr)';
    } else if (window.innerWidth >= 768) {
      baseStyle.gridTemplateColumns = 'repeat(2, 1fr)';
    } else {
      baseStyle.gridTemplateColumns = '1fr';
    }
    return baseStyle;
  };

  const [gridStyle, setGridStyle] = useState(getGridStyle());

  useEffect(() => {
    const handleResize = () => {
      setGridStyle(getGridStyle());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.vstack}>
        <h1 style={styles.heading}>Current Products 🚀</h1>

        <div style={gridStyle}>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <p style={styles.emptyState}>
            No products found 😢{' '}
            <a
              href="/create"
              style={styles.link}
              onMouseEnter={(e) => {
                e.currentTarget.style.textDecoration = styles.linkHover.textDecoration;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.textDecoration = 'none';
              }}
            >
              Create a product
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default HomePage;