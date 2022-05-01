import React, { createContext, useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getPosts} from '../actions/posts';


const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const dispatch = useDispatch();
    const currentID = useSelector(state => state.id);
    
    useEffect(() => {
     dispatch(getPosts());
    }, [currentID, dispatch])

const[loading, setLoading] = useState(true);

    const data = useSelector((state) => state.posts);
    
    const [filterData, setFilterData] = useState(data);
    const [tagData, setTagData] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [searchTags, setSearchTags] = useState("");

    useEffect(() => {
    setFilterData(data);
    if(data.length){
      setLoading(false);
    }
    }, [data])
    


  const handleTagSearch = (tagValue, searchValue, stateChanger, navigate) => {
      let SearchCheck = [];
      let TagCheck = [];
      if(searchValue !== ""){
        SearchCheck = data.filter((post) => (post.title.toLowerCase()) === (searchValue.toLowerCase()))
      }
      if(tagValue !== ""){
        const tags = tagValue.split(" ");
        TagCheck = data.filter((post) => 
      post.tags.some(item => tags.includes(item)));
      }
      stateChanger([...SearchCheck, ...TagCheck]);
    if(navigate) return  navigate(`/search/${searchValue}${tagValue}`);
  }
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  
const handleRecommendedTagSearch =(value, stateChanger) => {
  const tags = value.split(" ");
  let check = data.filter((post) => 
post.tags.some(item => tags.includes(item)));
stateChanger(check);




}
    return (
        <DataContext.Provider value={{searchTags, searchValue, setSearchValue, setSearchTags, filterData, handleTagSearch, tagData, setTagData, handleRecommendedTagSearch, user, setUser, loading, setLoading}}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;