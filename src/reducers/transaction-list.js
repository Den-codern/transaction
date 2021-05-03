const initState = {
    transactions: [],
    loading: true,
    error: null,
  };
  
  const transactioListReducer = (state = initState, action) => {
    switch (action.type) {
      case "FETCH_TRANSACTIONS_REQUEST":
        return {
          transactions: [],
          loading: true,
          error: null
        };
  
      case "FETCH_TRANSACTIONS_SUCCESS":
        return {
          transactions: action.payload,
          loading: false,
          error: null
        };
      case "FETCH_TRANSACTIONS_FAILURE":
        return {
          transactions: [],
          loading: false,
          error: action.payload
        }
  
      default:
        return state;
    }
  };

export default transactioListReducer