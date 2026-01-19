import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/product';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();
  const [darkMode] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const styles = {
    container: {
      padding: '3rem 0',
    },
    heading: {
      fontSize: '32px',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '3rem',
      background: 'linear-gradient(to right, #00b5d8, #3182ce)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    emptyText: {
      fontSize: '20px',
      textAlign: 'center',
      fontWeight: 'bold',
      color: '#a0aec0',
      marginTop: '2rem',
    },
    createLink: {
      color: '#3182ce',
      textDecoration: 'none',
      marginLeft: '0.5rem',
    }
  };

  return (
    <div className="container" style={styles.container}>
      <h1 style={styles.heading}>Current Products 🚀</h1>

      <div className="row g-4">
        {products.map((product) => (
          <div key={product._id} className="col-12 col-md-6 col-lg-4">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div style={styles.emptyText}>
          No products found 😢
          <Link to="/create" style={styles.createLink}>
            Create a product
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomePage;
