import React, { createContext, useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getPosts} from '../actions/posts';
import gsap from 'gsap';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const dispatch = useDispatch();
    const currentID = useSelector(state => state.id);
    const tl = gsap.timeline();
    useEffect(() => {
     dispatch(getPosts());
    }, [currentID, dispatch])



    const data = useSelector((state) => state.posts);
    const [filterData, setFilterData] = useState(data);
    const [tagData, setTagData] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [searchTags, setSearchTags] = useState("");

    useEffect(() => {
    const handleFilter = () => {
        const regex = new RegExp(searchValue, "i", "g");
    const filtering = data.filter((post) => post.title.match(regex));
    setFilterData(filtering);
    }
handleFilter();
    }, [searchValue, data])

  const handleTagSearch = (value, stateChanger, navigate) => {
      const tags = value.split(" ");
      const check = data.filter((post) => 
     post.tags.some(item => tags.includes(item)));
      stateChanger(check);
    if(navigate) return  navigate(`/searchtags/${value}`);
  }
    

    return (
        <DataContext.Provider value={{searchTags, searchValue, setSearchValue, setSearchTags, filterData, handleTagSearch, tagData, setTagData}}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;