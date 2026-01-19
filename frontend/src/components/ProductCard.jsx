import { useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useProductStore } from '../store/product';

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode] = useState(false);

  const { deleteProduct, updateProduct } = useProductStore();

  const showToast = (title, message, type) => {
    // Simple toast implementation - you can replace with a library like react-toastify
    alert(`${title}: ${message}`);
  };

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (!success) {
      showToast('Error', message, 'error');
    } else {
      showToast('Success', message, 'success');
    }
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
    setIsOpen(false);
    if (!success) {
      showToast('Error', message, 'error');
    } else {
      showToast('Success', 'Product updated successfully', 'success');
    }
  };

  const styles = {
    card: {
      backgroundColor: darkMode ? '#1a202c' : '#ffffff',
      borderRadius: '0.5rem',
      overflow: 'hidden',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s',
      cursor: 'pointer',
    },
    cardHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    },
    image: {
      width: '100%',
      height: '12rem',
      objectFit: 'cover',
    },
    cardBody: {
      padding: '1rem',
    },
    heading: {
      fontSize: '1.25rem',
      fontWeight: '600',
      marginBottom: '0.5rem',
      color: darkMode ? '#e2e8f0' : '#1a202c',
    },
    price: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      color: darkMode ? '#a0aec0' : '#4a5568',
      marginBottom: '1rem',
    },
    buttonGroup: {
      display: 'flex',
      gap: '0.5rem',
    },
    iconButton: {
      padding: '0.5rem',
      border: 'none',
      borderRadius: '0.375rem',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s',
    },
    editButton: {
      backgroundColor: '#3182ce',
      color: '#ffffff',
    },
    deleteButton: {
      backgroundColor: '#e53e3e',
      color: '#ffffff',
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: isOpen ? 'flex' : 'none',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    },
    modalContent: {
      backgroundColor: darkMode ? '#2d3748' : '#ffffff',
      borderRadius: '0.5rem',
      width: '90%',
      maxWidth: '500px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    },
    modalHeader: {
      padding: '1rem 1.5rem',
      borderBottom: '1px solid #e2e8f0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: darkMode ? '#e2e8f0' : '#1a202c',
    },
    closeButton: {
      background: 'none',
      border: 'none',
      fontSize: '1.5rem',
      cursor: 'pointer',
      color: darkMode ? '#a0aec0' : '#4a5568',
    },
    modalBody: {
      padding: '1.5rem',
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    },
    input: {
      padding: '0.5rem 1rem',
      border: '1px solid #e2e8f0',
      borderRadius: '0.375rem',
      fontSize: '1rem',
      width: '100%',
      backgroundColor: darkMode ? '#1a202c' : '#ffffff',
      color: darkMode ? '#e2e8f0' : '#1a202c',
    },
    modalFooter: {
      padding: '1rem 1.5rem',
      borderTop: '1px solid #e2e8f0',
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '0.5rem',
    },
    button: {
      padding: '0.5rem 1rem',
      border: 'none',
      borderRadius: '0.375rem',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '500',
      transition: 'all 0.2s',
    },
    updateButton: {
      backgroundColor: '#3182ce',
      color: '#ffffff',
    },
    cancelButton: {
      backgroundColor: 'transparent',
      color: darkMode ? '#a0aec0' : '#4a5568',
    },
  };

  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div
        style={{
          ...styles.card,
          ...(isHovered ? styles.cardHover : {}),
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={product.image} alt={product.name} style={styles.image} />

        <div style={styles.cardBody}>
          <h3 style={styles.heading}>{product.name}</h3>

          <p style={styles.price}>${product.price}</p>

          <div style={styles.buttonGroup}>
            <button
              style={{ ...styles.iconButton, ...styles.editButton }}
              onClick={() => setIsOpen(true)}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              <FiEdit size={20} />
            </button>
            <button
              style={{ ...styles.iconButton, ...styles.deleteButton }}
              onClick={() => handleDeleteProduct(product._id)}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              <FiTrash2 size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div style={styles.modal} onClick={() => setIsOpen(false)}>
        <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <div style={styles.modalHeader}>
            <h2 style={styles.modalTitle}>Update Product</h2>
            <button style={styles.closeButton} onClick={() => setIsOpen(false)}>
              ×
            </button>
          </div>

          <div style={styles.modalBody}>
            <div style={styles.inputGroup}>
              <input
                style={styles.input}
                type="text"
                placeholder="Product Name"
                name="name"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                }
              />
              <input
                style={styles.input}
                type="number"
                placeholder="Price"
                name="price"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, price: e.target.value })
                }
              />
              <input
                style={styles.input}
                type="text"
                placeholder="Image URL"
                name="image"
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, image: e.target.value })
                }
              />
            </div>
          </div>

          <div style={styles.modalFooter}>
            <button
              style={{ ...styles.button, ...styles.updateButton }}
              onClick={() => handleUpdateProduct(product._id, updatedProduct)}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              Update
            </button>
            <button
              style={{ ...styles.button, ...styles.cancelButton }}
              onClick={() => setIsOpen(false)}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;