import { Link, useLocation } from 'react-router-dom';
import '/src/index.css';

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  const currentPage = useLocation().pathname;

  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <Link
          to="/"
          className={currentPage === '/' ? 'nav-link active' : 'nav-link'}
        >
          Candidate Search
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/SavedCandidates"
          className={currentPage === '/SavedCandidates' ? 'nav-link active' : 'nav-link'}
        >
          Potential Candidates
        </Link>
      </li>
      </ul>
  )
};

export default Nav;
