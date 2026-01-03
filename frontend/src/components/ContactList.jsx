import ContactCard from './ContactCard';

const ContactList = ({ contacts, onDelete, onEdit, newContactIds }) => {
  if (contacts.length === 0) {
    return (
      <div className="empty-state">
        <p>No contacts found. {newContactIds.size === 0 && 'Add your first contact using the form!'}</p>
      </div>
    );
  }

  return (
    <div className="contact-list">
      {contacts.map((contact) => (
        <ContactCard 
          key={contact._id} 
          contact={contact} 
          onDelete={onDelete}
          onEdit={onEdit}
          isNew={newContactIds.has(contact._id)}
        />
      ))}
    </div>
  );
};

export default ContactList;

