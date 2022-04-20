import React from 'react';
import ReactPaginate from 'react-paginate';

 const Pagination = ({pageCount, handlePageClick}) => {
   

  return (
    <div>
<ReactPaginate
previousLabel={"<- Previous"}
nextLabel={"Next ->"}
pageCount={pageCount}
onPageChange={handlePageClick}
containerClassName={"pagination"}
previousLinkClassName={"pagination__link"}
nextLinkClassName={"pagination__link"}
disapledClassName={"pagination__link--disabled"}
activeClassName={"pagination__link--active"}
/>

    </div>
  )
}
export default Pagination;