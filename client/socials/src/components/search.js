import React, { useContext } from 'react';
import DataContext from "../context/datacontext";
import { useNavigate } from 'react-router-dom';


const Search = () => {
   const navigate = useNavigate();
    const {searchValue, searchTags, setSearchValue, setSearchTags, handleTagSearch, setTagData} = useContext(DataContext);
  
 return (
        <div className='SearchContainer'>
          <div className='cont'>
        <input name="search" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder=""/>
        <label for='search' className='SearchLabel'>Search by title</label>
        </div>
        <div className='tags'>
        <input name='tags' value={searchTags} onChange={(e) => setSearchTags(e.target.value)} placeholder=""/>
        <label for='tags' className="tagsLabel">Search by tags</label>
        <button onClick={() => handleTagSearch(searchTags, setTagData, navigate)}>Search</button>
        </div>
        </div>
  )
}

export default Search