import { useState, useEffect } from 'react';
import '/src/index.css';

const SavedCandidates = () => {
  const [savedUsers, setSavedUsers] = useState([]);

  const clearSavedUsers = () => {
    localStorage.removeItem('savedUsers');
    setSavedUsers([]);
  };

  const rejectUser = (index: number) => {
    const updatedUsers = savedUsers.filter((_, i) => i !== index);
    setSavedUsers(updatedUsers);
    localStorage.setItem('savedUsers', JSON.stringify(updatedUsers));
  };


  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedUsers') || '[]');
    setSavedUsers(saved);
  }, []);

  return (
    <div className="table-container">
      <h1>Potential Candidates</h1>
      {savedUsers.length === 0 ? (
        <p>No saved candidates yet.</p>
      ) : (
        <table className="custom-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Username</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>Bio</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {savedUsers.map((user: any, index) => (
              <tr key={index}>
                <td>
                  {user.avatar && (
                    <img
                      src={user.avatar}
                      alt={`${user.name}'s avatar`}
                      className="avatar"
                    />
                  )}
                </td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.location}</td>
                <td>{user.email}</td>
                <td>{user.company}</td>
                <td>
                  <button  className="reject-button"
                    onClick={() => rejectUser(index)}>➖</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button onClick={clearSavedUsers} className="clear-button">
        Clear All Saved Candidates
      </button>
    </div>
  );
};

export default SavedCandidates;