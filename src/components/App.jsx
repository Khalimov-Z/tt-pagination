import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import _ from "lodash";
import {
  changeOnSort,
  changeSearch,
  loadComments,
  currentPageSelected,
} from "../redux/ducks/comments";
import Search from "./Search";
import Table from "./Table";

function App() {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.loading);
  const comments = useSelector((state) => state.comments);
  const pageSize = useSelector((state) => state.pageSize);
  const searchTerm = useSelector((state) => state.searchTerm);
  const currentPage = useSelector((state) => state.currentPage);
  const sort = useSelector((state) => state.sort);
  const sortField = useSelector((state) => state.sortField);

  useEffect(() => {
    dispatch(loadComments());
  }, [dispatch]);

  const onSort = (sortField) => {
    const sortReverse = sort === "asc" ? "desc" : "asc";
    let ordered = _.orderBy(comments, sortField, sortReverse);
    dispatch(changeOnSort(sortReverse, ordered, sortField));
  };

  const getPaginatedComments = () => {
    if (comments.length === 0) return [];
    const filteredComments = getFilteredComments();
    return _.chunk(filteredComments, pageSize)[currentPage];
  };

  const getPageCount = (comments) => {
    return Math.ceil(comments.length / pageSize);
  };

  const getFilteredComments = () => {
    if (comments.length === 0) return [];
    if (!searchTerm) return comments;

    const search = searchTerm.toLowerCase();

    return comments.filter(({ name, email }) => {
      return (
        name.toLowerCase().includes(search) ||
        email.toLowerCase().includes(search)
      );
    });
  };

  const handlePageClick = (comments) => {
    let selected = comments.selected;
    dispatch(currentPageSelected(selected));
  };

  const onSearch = (searchTerm) => {
     dispatch(changeSearch(searchTerm));
  };

  return (
    <div className="container">
      {loading ? (
        <div>Загрузка</div>
      ) : (
        <>
          <Search onSearch={onSearch} />
          <Table
            onSort={onSort}
            comments={getPaginatedComments()}
            sort={sort}
            sortField={sortField}
          />
          {getFilteredComments().length > pageSize && (
            <ReactPaginate
              previousLabel="предыдущий"
              nextLabel="следующий"
              breakLabel="..."
              pageCount={getPageCount(getFilteredComments())}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName="pagination"
              activeClassName="active"
              breakClassName={"page-item"}
              breakLinkClassName={"page-link"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
