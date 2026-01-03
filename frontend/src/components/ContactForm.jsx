import { useState } from 'react';

const ContactForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    // Allow various phone formats
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

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      // Reset form on success
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      setErrors({});
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.name.trim() && 
                     formData.email.trim() && 
                     validateEmail(formData.email) &&
                     formData.phone.trim() && 
                     validatePhone(formData.phone);

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label htmlFor="name" className="form-label">
          Name <span className="required-asterisk">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`form-input ${errors.name ? 'error' : ''}`}
          placeholder="Enter your name"
        />
        {errors.name && (
          <p className="error-message">{errors.name}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Email <span className="required-asterisk">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`form-input ${errors.email ? 'error' : ''}`}
          placeholder="Enter your email"
        />
        {errors.email && (
          <p className="error-message">{errors.email}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="phone" className="form-label">
          Phone <span className="required-asterisk">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={`form-input ${errors.phone ? 'error' : ''}`}
          placeholder="Enter your phone number"
        />
        {errors.phone && (
          <p className="error-message">{errors.phone}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="message" className="form-label">
          Message <span className="optional-text">(Optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="4"
          className="form-textarea"
          placeholder="Enter your message (optional)"
        />
      </div>

      <button
        type="submit"
        disabled={!isFormValid || isSubmitting}
        className={`submit-button ${isFormValid && !isSubmitting ? 'enabled' : 'disabled'}`}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Contact'}
      </button>
    </form>
  );
};

export default ContactForm;

