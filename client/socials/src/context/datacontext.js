import React, { createContext, useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getPosts} from '../actions/posts';


const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const dispatch = useDispatch();
    const[loading, setLoading] = useState(true);
    const [getError, setGetError] = useState(false);
    const[GetErrorMessage, setGetErrorMessage] = useState("");
    useEffect(() => {
    dispatch(getPosts(setLoading, setGetError, setGetErrorMessage));
    }, [ dispatch]);



    const data = useSelector((state) => state.posts);
    
    const [filterData, setFilterData] = useState(data);
    const [tagData, setTagData] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [searchTags, setSearchTags] = useState("");

    useEffect(() => {
    setFilterData(data);
    }, [data])
    


  const handleTagSearch = (tagValue, searchValue, stateChanger, navigate) => {
      let SearchCheck = [];
      let TagCheck = [];
      if(searchValue !== ""){
        SearchCheck = data.filter((post) => (post.title.toLowerCase()) === (searchValue.toLowerCase()))
      }
      if(tagValue !== ""){
        
        const tags = tagValue.toLowerCase().trim().split(" ");
        TagCheck = data.filter((post) => 
      post.tags.some(item => tags.includes((item.toLowerCase()))));
      }
      stateChanger([...SearchCheck, ...TagCheck]);
    if(navigate) return  navigate(`/search/${searchValue}${tagValue}`);
  }
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  
const handleRecommendedTagSearch =(value, stateChanger) => {
  const tags = value.toLowerCase().trim().split(" ");
  let check = data.filter((post) => 
post.tags.some(item => tags.includes((item.toLowerCase()))));
stateChanger(check);




}
    return (
        <DataContext.Provider value={{searchTags, searchValue, setSearchValue, setSearchTags, filterData, handleTagSearch, tagData, setTagData, handleRecommendedTagSearch, user, setUser, loading, setLoading, getError, GetErrorMessage}}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;