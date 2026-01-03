const ContactCard = ({ contact, onDelete, onEdit, isNew }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`contact-card ${isNew ? 'contact-card-new' : ''}`}>
      <div className="contact-header">
        <div className="contact-info">
          <h3 className="contact-name">{contact.name}</h3>
          <p className="contact-date">{formatDate(contact.createdAt)}</p>
        </div>
        <div className="contact-actions">
          <button
            onClick={() => onEdit(contact)}
            className="edit-button"
            aria-label="Edit contact"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(contact._id)}
            className="delete-button"
            aria-label="Delete contact"
          >
            Delete
          </button>
        </div>
      </div>
      
      <div className="contact-details">
        <div className="contact-detail-row">
          <span className="contact-detail-label">Email:</span>
          <span className="contact-detail-value">{contact.email}</span>
        </div>
        <div className="contact-detail-row">
          <span className="contact-detail-label">Phone:</span>
          <span className="contact-detail-value">{contact.phone}</span>
        </div>
        {contact.message && (
          <div className="contact-message">
            <p className="contact-message-text">
              <span className="contact-message-label">Message: </span>
              <span className="contact-message-content">{contact.message}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactCard;

