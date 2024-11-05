import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => { 

  const user = searchGithubUser('Gali411');
  console.log(user);
 

return <h1>Candidate Search</h1>
};

export default CandidateSearch;

/*

const [currentUser, setCurrentUser] = useState<Candidate>({
  name: '',
  username: '',
  location: '',
  avatar: '',
  email: '',
  html_url: '',
  company: '',
});
*/