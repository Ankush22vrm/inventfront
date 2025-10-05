// import React, { useState, useEffect } from 'react';
// import Modal from '../shared/Modal';
// import Input from '../shared/Input';
// import Button from '../shared/Button';
// import Loader from '../shared/Loader';
// import { CATEGORIES } from '../../utils/constants';

// const ProductForm = ({ isOpen, onClose, onSubmit, warehouseId, product }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     category: 'electronics',
//     quantity: '',
//     pricePerUnit: '',
//     inStock: true,
//     image: null,
//   });

//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (product) {
//       setFormData({
//         name: product.name,
//         category: product.category,
//         quantity: product.quantity,
//         pricePerUnit: product.pricePerUnit,
//         inStock: product.inStock,
//         image: null,
//       });
//     } else {
//       setFormData({
//         name: '',
//         category: 'electronics',
//         quantity: '',
//         pricePerUnit: '',
//         inStock: true,
//         image: null,
//       });
//     }
//   }, [product]);

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.name || formData.name.length < 2)
//       newErrors.name = 'Name must be at least 2 characters';
//     if (!formData.quantity || formData.quantity < 0)
//       newErrors.quantity = 'Quantity must be zero or positive';
//     if (!formData.pricePerUnit || formData.pricePerUnit < 0)
//       newErrors.pricePerUnit = 'Price must be zero or positive';
//     if (!product && !formData.image)
//       newErrors.image = 'Product image is required';
//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newErrors = validate();

//     if (Object.keys(newErrors).length === 0) {
//       setLoading(true);

//       // Always use FormData
//       const data = new FormData();
//       data.append('name', formData.name);
//       data.append('category', formData.category);
//       data.append('quantity', formData.quantity);
//       data.append('pricePerUnit', formData.pricePerUnit);
//       data.append('inStock', formData.inStock);
//       data.append('warehouseId', warehouseId);
//       if (formData.image) data.append('image', formData.image);

//       await onSubmit(data);
//       setLoading(false);
//       setFormData({
//         name: '',
//         category: 'electronics',
//         quantity: '',
//         pricePerUnit: '',
//         inStock: true,
//         image: null,
//       });
//       setErrors({});
//     } else {
//       setErrors(newErrors);
//     }
//   };

//   return (
//     <Modal
//       isOpen={isOpen}
//       onClose={onClose}
//       title={product ? 'Edit Product' : 'Add Product'}
//     >
//       <form onSubmit={handleSubmit}>
//         <Input
//           label="Product Name"
//           value={formData.name}
//           onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//           error={errors.name}
//           placeholder="Enter product name"
//         />

//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Category
//           </label>
//           <select
//             value={formData.category}
//             onChange={(e) =>
//               setFormData({ ...formData, category: e.target.value })
//             }
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
//           >
//             {CATEGORIES.map((cat) => (
//               <option key={cat.value} value={cat.value}>
//                 {cat.label}
//               </option>
//             ))}
//           </select>
//         </div>

//         <Input
//           label="Quantity"
//           type="number"
//           value={formData.quantity}
//           onChange={(e) =>
//             setFormData({ ...formData, quantity: e.target.value })
//           }
//           error={errors.quantity}
//           placeholder="Enter quantity"
//           min="0"
//         />

//         <Input
//           label="Price Per Unit"
//           type="number"
//           step="0.01"
//           value={formData.pricePerUnit}
//           onChange={(e) =>
//             setFormData({ ...formData, pricePerUnit: e.target.value })
//           }
//           error={errors.pricePerUnit}
//           placeholder="Enter price"
//           min="0"
//         />

//         <div className="mb-4">
//           <label className="flex items-center gap-2">
//             <input
//               type="checkbox"
//               checked={formData.inStock}
//               onChange={(e) =>
//                 setFormData({ ...formData, inStock: e.target.checked })
//               }
//               className="w-4 h-4 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
//             />
//             <span className="text-sm font-medium text-gray-700">In Stock</span>
//           </label>
//         </div>

//         <Input
//           label={product ? 'Product Image (Optional)' : 'Product Image'}
//           type="file"
//           accept="image/*"
//           onChange={(e) =>
//             setFormData({ ...formData, image: e.target.files[0] })
//           }
//           error={errors.image}
//         />

//         <div className="flex gap-3 justify-end">
//           <Button variant="secondary" onClick={onClose} disabled={loading}>
//             Cancel
//           </Button>
//           <Button type="submit" disabled={loading}>
//             {loading ? <Loader /> : product ? 'Update Product' : 'Add Product'}
//           </Button>
//         </div>
//       </form>
//     </Modal>
//   );
// };

// export default ProductForm;
import React, { useState, useEffect } from 'react';
import Modal from '../shared/Modal';
import Input from '../shared/Input';
import Button from '../shared/Button';
import Loader from '../shared/Loader';
import { CATEGORIES } from '../../utils/constants';

const ProductForm = ({ isOpen, onClose, onSubmit, warehouseId, product }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'electronics',
    quantity: '',
    pricePerUnit: '',
    inStock: true,
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        category: product.category,
        quantity: String(product.quantity),
        pricePerUnit: String(product.pricePerUnit),
        inStock: product.inStock,
        image: null,
      });
    } else {
      setFormData({
        name: '',
        category: 'electronics',
        quantity: '',
        pricePerUnit: '',
        inStock: true,
        image: null,
      });
    }
    setErrors({});
  }, [product, isOpen]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name || formData.name.length < 2)
      newErrors.name = 'Name must be at least 2 characters';
    if (formData.quantity === '' || Number(formData.quantity) < 0)
      newErrors.quantity = 'Quantity must be zero or positive';
    if (formData.pricePerUnit === '' || Number(formData.pricePerUnit) < 0)
      newErrors.pricePerUnit = 'Price must be zero or positive';
    if (!product && !formData.image)
      newErrors.image = 'Product image is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        const data = new FormData();
        
        // Log what we're sending
        console.log('Submitting product data:', {
          name: formData.name,
          category: formData.category,
          quantity: formData.quantity,
          pricePerUnit: formData.pricePerUnit,
          inStock: formData.inStock,
          warehouseId: warehouseId,
          hasImage: !!formData.image,
          isEdit: !!product
        });
        
        data.append('name', formData.name);
        data.append('category', formData.category);
        data.append('quantity', formData.quantity);
        data.append('pricePerUnit', formData.pricePerUnit);
        data.append('inStock', formData.inStock ? 'true' : 'false');
        data.append('warehouseId', warehouseId);
        
        if (formData.image) {
          data.append('image', formData.image);
        }

        await onSubmit(data);
        
        setFormData({
          name: '',
          category: 'electronics',
          quantity: '',
          pricePerUnit: '',
          inStock: true,
          image: null,
        });
        setErrors({});
      } catch (error) {
        console.error('Form submission error:', error);
        setErrors({ submit: error.message || 'Failed to submit form' });
      } finally {
        setLoading(false);
      }
    } else {
      console.log('Validation errors:', newErrors);
      setErrors(newErrors);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={product ? 'Edit Product' : 'Add Product'}
    >
      <form onSubmit={handleSubmit}>
        {errors.submit && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {errors.submit}
          </div>
        )}
        
        <Input
          label="Product Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={errors.name}
          placeholder="Enter product name"
        />
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
        
        <Input
          label="Quantity"
          type="number"
          value={formData.quantity}
          onChange={(e) =>
            setFormData({ ...formData, quantity: e.target.value })
          }
          error={errors.quantity}
          placeholder="Enter quantity"
          min="0"
        />
        
        <Input
          label="Price Per Unit"
          type="number"
          step="0.01"
          value={formData.pricePerUnit}
          onChange={(e) =>
            setFormData({ ...formData, pricePerUnit: e.target.value })
          }
          error={errors.pricePerUnit}
          placeholder="Enter price"
          min="0"
        />
        
        <div className="mb-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.inStock}
              onChange={(e) =>
                setFormData({ ...formData, inStock: e.target.checked })
              }
              className="w-4 h-4 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
            />
            <span className="text-sm font-medium text-gray-700">In Stock</span>
          </label>
        </div>
        
        <Input
          label={product ? 'Product Image (Optional)' : 'Product Image'}
          type="file"
          accept="image/*"
          onChange={(e) =>
            setFormData({ ...formData, image: e.target.files[0] })
          }
          error={errors.image}
        />
        
        {product && !formData.image && (
          <p className="text-sm text-gray-500 mb-4">
            Current image will be kept if no new image is uploaded
          </p>
        )}
        
        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? <Loader /> : product ? 'Update Product' : 'Add Product'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ProductForm;
