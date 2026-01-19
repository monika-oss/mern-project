import { useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useProductStore } from '../store/product';

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode] = useState(false);

  const { deleteProduct, updateProduct } = useProductStore();

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
    alert(message);
    if (success) {
      setIsOpen(false);
    }
  };

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    alert(message);
  };

  const styles = {
    card: {
      backgroundColor: '#ffffff',
      borderRadius: '1rem',
      overflow: 'hidden',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      border: 'none',
      transition: 'transform 0.3s ease',
      cursor: 'pointer',
    },
    image: {
      width: '100%',
      height: '200px',
      objectFit: 'cover',
    },
    cardBody: {
      padding: '1.25rem',
    },
    title: {
      fontSize: '1.25rem',
      fontWeight: '600',
      marginBottom: '0.5rem',
      color: '#1a202c',
    },
    price: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#4a5568',
      marginBottom: '1rem',
    },
    btnGroup: {
      display: 'flex',
      gap: '0.5rem',
    },
    iconBtn: {
      padding: '0.5rem',
      border: 'none',
      borderRadius: '0.5rem',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'opacity 0.2s',
    },
    editBtn: {
      backgroundColor: '#3182ce',
      color: '#ffffff',
    },
    deleteBtn: {
      backgroundColor: '#e53e3e',
      color: '#ffffff',
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: isOpen ? 'flex' : 'none',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1050,
    },
    modalContent: {
      backgroundColor: '#ffffff',
      padding: '2rem',
      borderRadius: '1rem',
      width: '90%',
      maxWidth: '500px',
      boxShadow: '0 20px 25px rgba(0,0,0,0.2)',
    },
    input: {
      padding: '0.75rem 1rem',
      borderRadius: '0.5rem',
      border: '1px solid #e2e8f0',
      marginBottom: '1rem',
      width: '100%',
    }
  };

  return (
    <>
      <div className="card h-100" style={styles.card} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
        <img src={product.image} alt={product.name} style={styles.image} />
        <div style={styles.cardBody}>
          <h3 style={styles.title}>{product.name}</h3>
          <p style={styles.price}>${product.price}</p>
          <div style={styles.btnGroup}>
            <button style={{ ...styles.iconBtn, ...styles.editBtn }} onClick={() => setIsOpen(true)}>
              <FiEdit size={20} />
            </button>
            <button style={{ ...styles.iconBtn, ...styles.deleteBtn }} onClick={() => handleDeleteProduct(product._id)}>
              <FiTrash2 size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Internal Modal */}
      <div style={styles.modalOverlay} onClick={() => setIsOpen(false)}>
        <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <h2 className="mb-4">Update Product</h2>
          <input
            type="text"
            placeholder="Product Name"
            className="form-control"
            style={styles.input}
            value={updatedProduct.name}
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            className="form-control"
            style={styles.input}
            value={updatedProduct.price}
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
          />
          <input
            type="text"
            placeholder="Image URL"
            className="form-control"
            style={styles.input}
            value={updatedProduct.image}
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
          />
          <div className="d-flex gap-2">
            <button className="btn btn-primary w-100" onClick={() => handleUpdateProduct(product._id, updatedProduct)}>
              Update
            </button>
            <button className="btn btn-outline-secondary w-100" onClick={() => setIsOpen(false)}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
