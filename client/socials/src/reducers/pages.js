const pages = (state=[], action) => {
    switch(action.type){
        case 'SPLICE':
            return action.posts;
            default: return state;
    }
}
export default pages;