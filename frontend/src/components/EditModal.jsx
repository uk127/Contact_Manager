import { useState, useEffect } from 'react';

const EditModal = ({ contact, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (contact) {
      setFormData({
        name: contact.name || '',
        email: contact.email || '',
        phone: contact.phone || '',
        message: contact.message || ''
      });
      setErrors({});
    }
  }, [contact]);

  const validateEmail = (email) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Form submit triggered');
    console.log('Current formData:', formData);
    console.log('Current contact:', contact);
    
    if (!validate()) {
      console.log('Validation failed');
      return;
    }

    if (!contact || !contact._id) {
      alert('Error: Contact ID is missing. Please try again.');
      return;
    }

    setIsSubmitting(true);
    try {
      console.log('Calling onSave with:', {
        id: contact._id,
        data: formData
      });
      
      // Call the onSave function passed from parent (handleUpdate)
      await onSave(contact._id, formData);
      
      console.log('Contact updated successfully, closing modal');
      onClose();
    } catch (error) {
      console.error('Error updating contact:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      // Show error message to user
      alert(error.response?.data?.message || error.message || 'Failed to update contact. Please try again.');
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.name.trim() && 
                     formData.email.trim() && 
                     validateEmail(formData.email) &&
                     formData.phone.trim() && 
                     validatePhone(formData.phone);

  if (!contact) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Edit Contact</h2>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="form-container" style={{ padding: '1.5rem' }}>
          <div className="form-group">
            <label htmlFor="edit-name" className="form-label">
              Name <span className="required-asterisk">*</span>
            </label>
            <input
              type="text"
              id="edit-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`form-input ${errors.name ? 'error' : ''}`}
              placeholder="Enter your name"
              required
            />
            {errors.name && (
              <p className="error-message">{errors.name}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="edit-email" className="form-label">
              Email <span className="required-asterisk">*</span>
            </label>
            <input
              type="email"
              id="edit-email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? 'error' : ''}`}
              placeholder="Enter your email"
              required
            />
            {errors.email && (
              <p className="error-message">{errors.email}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="edit-phone" className="form-label">
              Phone <span className="required-asterisk">*</span>
            </label>
            <input
              type="tel"
              id="edit-phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`form-input ${errors.phone ? 'error' : ''}`}
              placeholder="Enter your phone number"
              required
            />
            {errors.phone && (
              <p className="error-message">{errors.phone}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="edit-message" className="form-label">
              Message <span className="optional-text">(Optional)</span>
            </label>
            <textarea
              id="edit-message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="form-textarea"
              placeholder="Enter your message (optional)"
            />
          </div>

          <div className="modal-actions">
            <button
              type="button"
              onClick={onClose}
              className="cancel-button"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`submit-button ${isFormValid && !isSubmitting ? 'enabled' : 'disabled'}`}
              onClick={(e) => {
                // Ensure form submission happens
                if (!isSubmitting && contact && contact._id) {
                  // Form will handle submission via onSubmit
                  console.log('Save button clicked, form will submit');
                }
              }}
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;

