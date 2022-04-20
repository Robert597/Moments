import React, {useEffect}  from 'react';
import {useDispatch} from 'react-redux';
import {getPosts} from '../actions/posts';
import Form from './form';
import Posts from './posts';
import { useSelector } from 'react-redux';


const Home = () => {
    const dispatch = useDispatch();
  const currentID = useSelector(state => state.id);
  useEffect(() => {
   dispatch(getPosts());
  }, [currentID, dispatch])

  const data = useSelector((state) => state.posts);

  return (
    <div>
         <Posts data={data}/>
     <Form/>
    </div>
  )
}

export default Home