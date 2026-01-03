import { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import EditModal from './components/EditModal';
import { getContacts, createContact, updateContact, deleteContact } from './services/api';

function App() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingContact, setEditingContact] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [newContactIds, setNewContactIds] = useState(new Set());
  const contactsPerPage = 5;

  // Fetch contacts on component mount
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const data = await getContacts();
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort contacts
  useEffect(() => {
    let filtered = [...contacts];

    // Apply search filter
  //   if (searchQuery.trim()) {
  //     const query = searchQuery.toLowerCase();
  //     filtered = filtered.filter(contact =>
  //       contact.name.toLowerCase().includes(query) ||
  //       contact.email.toLowerCase().includes(query) ||
  //       contact.phone.includes(query)
  //     );
  //   }

  //   // Apply sorting
  //   filtered.sort((a, b) => {
  //     let comparison = 0;
      
  //     switch (sortBy) {
  //       case 'name':
  //         comparison = a.name.localeCompare(b.name);
  //         return sortOrder === 'asc' ? comparison : -comparison;
  //       case 'phone':
  //         comparison = a.phone.localeCompare(b.phone);
  //         return sortOrder === 'asc' ? comparison : -comparison;
  //       case 'date':
  //       default:
  //         const dateA = new Date(a.createdAt);
  //         const dateB = new Date(b.createdAt);
  //         comparison = dateB - dateA;
  //         return sortOrder === 'newest' ? comparison : -comparison;
  //     }
  //   });

  //   setFilteredContacts(filtered);
  //   setCurrentPage(1); // Reset to first page when filter/sort changes
  // }, [contacts, searchQuery, sortBy, sortOrder]);

  const handleSubmit = async (contactData) => {
    try {
      const newContact = await createContact(contactData);
      setContacts([newContact, ...contacts]);
      setNewContactIds(new Set([newContact._id]));
      setSuccessMessage('Contact added successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      // Remove highlight after 3 seconds
      setTimeout(() => {
        setNewContactIds(new Set());
      }, 3000);
    } catch (error) {
      console.error('Error creating contact:', error);
      throw error;
    }
  };

  const handleUpdate = async (id, contactData) => {
    try {
      const updatedContact = await updateContact(id, contactData);
      setContacts(contacts.map(contact => 
        contact._id === id ? updatedContact : contact
      ));
      setSuccessMessage('Contact updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error updating contact:', error);
      throw error;
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteContact(id);
      setContacts(contacts.filter(contact => contact._id !== id));
      setSuccessMessage('Contact deleted successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
  };

  const handleSortChange = (newSortBy) => {
    if (sortBy === newSortBy) {
      // Toggle order
      if (newSortBy === 'date') {
        setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest');
      } else {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
      }
    } else {
      // Set new sort field with default order
      setSortBy(newSortBy);
      setSortOrder(newSortBy === 'date' ? 'newest' : 'asc');
    }
  };

  // Pagination
  const totalPages = Math.ceil(filteredContacts.length / contactsPerPage);
  const startIndex = (currentPage - 1) * contactsPerPage;
  const paginatedContacts = filteredContacts.slice(startIndex, startIndex + contactsPerPage);

  return (
    <div className="app-container">
      <div className="app-wrapper">
        <header className="app-header">
          <h1 className="app-title">Contact Manager</h1>
          <p className="app-subtitle">Manage your contacts efficiently</p>
        </header>

        {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}

        <div className="grid-container">
          <div className="card">
            <h2 className="card-title">Add New Contact</h2>
            <ContactForm onSubmit={handleSubmit} />
          </div>

          <div className="card">
            <div className="card-header">
              <h2 className="card-title" style={{ marginBottom: 0 }}>Contacts</h2>
            </div>

            {/* Search Bar */}
            <div className="search-container">
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>

            {/* Sort Options */}
            <div className="sort-container">
              <label className="sort-label">Sort by:</label>
              <div className="sort-buttons">
                <button
                  onClick={() => handleSortChange('name')}
                  className={`sort-option ${sortBy === 'name' ? 'active' : ''}`}
                >
                  Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                </button>
                <button
                  onClick={() => handleSortChange('phone')}
                  className={`sort-option ${sortBy === 'phone' ? 'active' : ''}`}
                >
                  Phone {sortBy === 'phone' && (sortOrder === 'asc' ? '↑' : '↓')}
                </button>
                <button
                  onClick={() => handleSortChange('date')}
                  className={`sort-option ${sortBy === 'date' ? 'active' : ''}`}
                >
                  Date {sortBy === 'date' && (sortOrder === 'newest' ? '↓' : '↑')}
                </button>
              </div>
            </div>

            {loading ? (
              <div className="loading-text">Loading contacts...</div>
            ) : (
              <>
                <ContactList 
                  contacts={paginatedContacts} 
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  newContactIds={newContactIds}
                />
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="pagination">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="pagination-button"
                    >
                      Previous
                    </button>
                    <span className="pagination-info">
                      Page {currentPage} of {totalPages} ({filteredContacts.length} contacts)
                    </span>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="pagination-button"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Edit Modal */}
        {editingContact && (
          <EditModal
            contact={editingContact}
            onClose={() => setEditingContact(null)}
            onSave={handleUpdate}
          />
        )}
      </div>
    </div>
  );
}

export default App;

