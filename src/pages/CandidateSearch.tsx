import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import type { Candidate } from '../interfaces/Candidate.interface';
import '/src/index.css'

const CandidateSearch = () => { 

  const [user, setUser] = useState<Candidate>({
    name: '',
    username: '',
    location: '',
    avatar: '',
    email: '',
    html_url: '',
    company: '',
  });;

  useEffect(() => {
    gitHub();
  }, []);

  async function gitHub() {

    const start = Math.floor(Math.random() * 100000000) + 1;
    const response = await fetch(`https://api.github.com/users?since=${start}`)
    const data = await response.json();
    console.log(data[0]);
    const infoData = await fetch(data[0].url);
    const info = await infoData.json();
    console.log(info);
      setUser({
      name: info.name || 'N/A', 
      username: info.login || 'N/A',
      location: info.location || 'N/A', 
      avatar: info.avatar_url || 'N/A',
      email: info.email || 'N/A' ,
      html_url: info.html_url || 'N/A',
      company: info.company || 'N/A' 
    });
  }

  const saveUser = () => {

    if (!user.name || !user.email || !user.location) {
      alert('No Candidate to save');
      return;
    }
    else {
      const savedUser = JSON.parse(localStorage.getItem('savedUsers') || '[]');
    savedUser.push(user);
    localStorage.setItem('savedUsers', JSON.stringify(savedUser));
    }

    gitHub();
  };

return (
  <div>
    <h1>Candidate Search</h1>
    {user.avatar && <img src={user.avatar} alt={`${user.name}'s avatar`} width={100} />}
    <p>Name: {user.name}</p>
    <p>Username: {user.username}</p>
    <p>Location: {user.location}</p>
    <p>Email: {user.email}</p>
    <p>Company {user.company}</p>
    <button onClick={saveUser}>+</button>
    <button onClick={gitHub}>-</button>
    </div>
  );
};

export default CandidateSearch;

/*
const [user, setUser] = useState<Candidate>({
  name: '',
  username: '',
  location: '',
  avatar: '',
  email: '',
  html_url: '',
  company: '',
});;

async function findUser(){
  const Candidateid = await searchGithub();
  const canDetails = await searchGithubUser(Candidateid);
  setUser({ 
    name: canDetails.name || 'N/A',
    username: canDetails.login,
    location: canDetails.location || 'N/A',
    avatar: canDetails.avatar_url,
    email: canDetails.email || 'N/A',
    html_url: canDetails.html_url,
    company: canDetails.company});
}



 const [user, setUser] = useState({ name: '', location: '', email: '', company: '', bio: '', avatar: ''});

  async function gitHub() {

    const start = Math.floor(Math.random() * 100000000) + 1;
    const response = await fetch(`https://api.github.com/users?since=${start}`)
    const data = await response.json();
    console.log(data[1]);
    const infoData = await fetch(data[1].url);
    const info = await infoData.json();
    console.log(info);
      setUser({
      name: info.name || 'N/A', 
      location: info.location || 'N/A', 
      email: info.email || 'N/A' ,
      company: info.company || 'N/A' ,
      bio: info.bio || 'N/A',
      avatar: info.avatar || 'N/A'  
    });
  }

return (
  <div>
    <h1>Candidate Search</h1>
    <p>Name: {user.name}</p>
    <p>Location: {user.location}</p>
    <p>Email: {user.email}</p>
    <p>Company {user.company}</p>
    <p>Bio: {user.bio}</p>
    {user.avatar && <img src={user.avatar} alt={`${user.name}'s avatar`} width={100} />}
    <button onClick={gitHub}>+</button>
  </div>
);
};

export default CandidateSearch;

*/