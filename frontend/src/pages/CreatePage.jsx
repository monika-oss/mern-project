import { useState } from 'react';
import { useProductStore } from '../store/product';

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
  });

  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    alert(message);
    if (success) {
      setNewProduct({ name: '', price: '', image: '' });
    }
  };

  const styles = {
    container: {
      padding: '3rem 0',
      maxWidth: '600px',
    },
    card: {
      backgroundColor: '#ffffff',
      borderRadius: '1rem',
      padding: '2rem',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
      border: 'none',
    },
    heading: {
      fontSize: '32px',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '2rem',
      color: '#1a202c',
    },
    input: {
      padding: '0.75rem 1rem',
      borderRadius: '0.5rem',
      border: '1px solid #e2e8f0',
      marginBottom: '1rem',
      width: '100%',
    },
    button: {
      backgroundColor: '#3182ce',
      color: '#ffffff',
      fontWeight: '600',
      padding: '0.75rem',
      borderRadius: '0.5rem',
      border: 'none',
      width: '100%',
      marginTop: '1rem',
      transition: 'all 0.2s',
      cursor: 'pointer',
    }
  };

  return (
    <div className="container" style={styles.container}>
      <h1 style={styles.heading}>Create New Product</h1>

      <div style={styles.card}>
        <div className="d-flex flex-column">
          <input
            type="text"
            placeholder="Product Name"
            className="form-control"
            style={styles.input}
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            className="form-control"
            style={styles.input}
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          />
          <input
            type='file'
            className='form-control'
            style={styles.input}
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })}
          />
          <button style={styles.button} onClick={handleAddProduct}>
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
