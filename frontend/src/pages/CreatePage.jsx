import { useState } from 'react';
import { useProductStore } from '../store/product';

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
  });
  const [darkMode] = useState(false);

  const { createProduct } = useProductStore();

  const showToast = (title, message, type) => {
    // Simple toast implementation - you can replace with react-toastify
    alert(`${title}: ${message}`);
  };

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if (!success) {
      showToast('Error', message, 'error');
    } else {
      showToast('Success', message, 'success');
    }
    setNewProduct({ name: '', price: '', image: '' });
  };

  const styles = {
    container: {
      maxWidth: '640px',
      margin: '0 auto',
      padding: '2rem 1rem',
    },
    vstack: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
    },
    heading: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '2rem',
      color: darkMode ? '#e2e8f0' : '#1a202c',
    },
    box: {
      width: '100%',
      backgroundColor: darkMode ? '#1a202c' : '#ffffff',
      padding: '1.5rem',
      borderRadius: '0.5rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    },
    input: {
      padding: '0.75rem 1rem',
      border: '1px solid #e2e8f0',
      borderRadius: '0.375rem',
      fontSize: '1rem',
      width: '100%',
      backgroundColor: darkMode ? '#2d3748' : '#ffffff',
      color: darkMode ? '#e2e8f0' : '#1a202c',
      outline: 'none',
      transition: 'all 0.2s',
    },
    inputFocus: {
      borderColor: '#3182ce',
      boxShadow: '0 0 0 1px #3182ce',
    },
    button: {
      width: '100%',
      padding: '0.75rem 1.5rem',
      backgroundColor: '#3182ce',
      color: '#ffffff',
      border: 'none',
      borderRadius: '0.375rem',
      fontSize: '1rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s',
    },
    buttonHover: {
      backgroundColor: '#2c5282',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.vstack}>
        <h1 style={styles.heading}>Create New Product</h1>

        <div style={styles.box}>
          <div style={styles.inputGroup}>
            <input
              style={styles.input}
              type="text"
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              onFocus={(e) => {
                e.target.style.borderColor = styles.inputFocus.borderColor;
                e.target.style.boxShadow = styles.inputFocus.boxShadow;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.boxShadow = 'none';
              }}
            />
            <input
              style={styles.input}
              type="number"
              placeholder="Price"
              name="price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              onFocus={(e) => {
                e.target.style.borderColor = styles.inputFocus.borderColor;
                e.target.style.boxShadow = styles.inputFocus.boxShadow;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.boxShadow = 'none';
              }}
            />
            <input
              style={styles.input}
              type="text"
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
              onFocus={(e) => {
                e.target.style.borderColor = styles.inputFocus.borderColor;
                e.target.style.boxShadow = styles.inputFocus.boxShadow;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.boxShadow = 'none';
              }}
            />

            <button
              style={styles.button}
              onClick={handleAddProduct}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = styles.button.backgroundColor;
              }}
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;