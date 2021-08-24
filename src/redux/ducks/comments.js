const initialState = {
  comments: [],
  loading: false,
  currentPage: 0,
  pageSize: 50,
  searchTerm: null,
  sort: "asc",
  sortField: "",
};

export function comments(state = initialState, action) {
  switch (action.type) {
    case COMMENTS_LOAD_START:
      return {
        ...state,
        loading: true,
      };

    case COMMENTS_LOAD_SUCCESS:
      return {
        ...state,
        comments: action.payload,
        loading: false,
      };
    case CHANGE_CURRENT:
      return {
        ...state,
        currentPage: action.payload,
      };
    case CHANGE_SEARCH:
      return {
        ...state,
        currentPage: 0,
        searchTerm: action.payload,
      };
    case CHANGE_SORT:
      return {
        ...state,
        sort: action.payload.sortReverse,
        comments: action.payload.ordered,
        sortField: action.payload.sortField,
      };

    default:
      return state;
  }
}

const COMMENTS_LOAD_START = "comments/load/start";
const COMMENTS_LOAD_SUCCESS = "comments/load/success";
const CHANGE_CURRENT = "change/curr";
const CHANGE_SEARCH = "change/search";
const CHANGE_SORT = "change/sort";

export const currentPageSelected = (selected) => {
  return {
    type: CHANGE_CURRENT,
    payload: selected,
  };
};

export const changeSearch = (searchTerm) => {
  return {
    type: CHANGE_SEARCH,
    payload: searchTerm,
  };
};

export const changeOnSort = (sortReverse, ordered, sortField) => {
  return {
    type: CHANGE_SORT,
    payload: { sortReverse, ordered, sortField },
  };
};

export const loadComments = () => {
  return (dispatch) => {
    dispatch({ type: COMMENTS_LOAD_START });

    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((response) => response.json())
      .then((json) => {
        dispatch({
          type: COMMENTS_LOAD_SUCCESS,
          payload: json,
        });
      });
  };
};
