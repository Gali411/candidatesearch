import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import type { Candidate } from '../interfaces/Candidate.interface';
import '/src/index.css';

const CandidateSearch = () => {
  const [user, setUser] = useState<Candidate>({
    name: '',
    username: '',
    location: '',
    avatar: '',
    email: '',
    html_url: '',
    company: '',
  });

  useEffect(() => {
    gitHub();
  }, []);

  async function gitHub() {
    try {
      const data = await searchGithub();
      const user = data && data[0] ? await searchGithubUser(data[0].login) : null;
      const info = user || {};

      setUser({
        name: info.name || 'N/A',
        username: info.login || 'N/A',
        location: info.location || 'N/A',
        avatar: info.avatar_url || 'N/A',
        email: info.email || 'N/A',
        html_url: info.html_url || 'N/A',
        company: info.company || 'N/A',
      });
    } catch (error) {
      console.error(error);
    }
  }

  const saveUser = () => {
    if (!user.name || !user.email || !user.location) {
      alert('No Candidate to save');
      return;
    } else {
      const savedUser = JSON.parse(localStorage.getItem('savedUsers') || '[]');
      savedUser.push(user);
      localStorage.setItem('savedUsers', JSON.stringify(savedUser));
    }
    gitHub();
  };

  return (
    <main className="candidate-search-container">
      <h1 className="candidate-search-title">Candidate Search</h1>
      <div className="candidate-card">
        {user.avatar && <img src={user.avatar} alt={`${user.name}'s avatar`} className="candidate-avatar" />}
        <div className="candidate-info">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Location:</strong> {user.location}</p>
          <p><strong>Email:</strong> <a href={`mailto:${user.email}`}>{user.email}</a></p>
          <p><strong>Company:</strong> {user.company}</p>
        </div>
        <div className="button-group">
          <button onClick={saveUser} className="action-button add-button">+</button>
          <button onClick={gitHub} className="action-button refresh-button">-</button>
        </div>
      </div>
    </main>
  );
};

export default CandidateSearch;