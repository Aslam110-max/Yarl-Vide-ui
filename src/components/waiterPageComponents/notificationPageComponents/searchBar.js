
import './searchBar.css'; // Import CSS for search bar styles
/*import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
<FontAwesomeIcon icon={faSearch} className="search-icon" />*/
const WaiterSearchBar = ({setSearchText}) => {
    

  return (
    <div className="waiter-search-container">
      <input
        type="text"
        className="waiter-search-input"
        placeholder="Search Order ID"
        onChange={(e)=>setSearchText(e.target.value)}
        
      />
      
    </div>
  );
};

export default WaiterSearchBar;
