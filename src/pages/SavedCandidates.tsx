import { useState, useEffect } from 'react';
import '/src/index.css'

const SavedCandidates = () => {
  
   const [savedUsers, setSavedUsers] = useState([]);

   const clearSavedUsers = () => {
    localStorage.removeItem('savedUsers');
    setSavedUsers([]);
  };  

   useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedUsers') || '[]');
    setSavedUsers(saved);
  }, []);

  return (
    <div>
      <h1>Potential Candidates</h1>
      {savedUsers.length === 0 ? (
        <p>No saved candidates yet.</p>
      ) : (
        <ul>
          {savedUsers.map((user, index) => (
            <li key={index}>
              {user.avatar && <img src={user.avatar} alt={`${user.name}'s avatar`} width={50} />}
              <p>Name: {user.name}</p>
              <p>Username: {user.username}</p>
              <p>Location: {user.location}</p>
            </li>
          ))}
        </ul>
      )}
      <button onClick={clearSavedUsers}>Clear All Saved Candidates</button>
    </div>
  );
};

export default SavedCandidates;