const transactionLoaded = (newTransactions) => {
    return {
      type: "FETCH_TRANSACTIONS_SUCCESS",
      payload: newTransactions,
    };
  };
  
  const transactionRequested = () => {
    return {
      type: "FETCH_TRANSACTIONS_REQUEST",
    };
  };
  
  const transactionError = (error) => {
    return {
      type: "FETCH_TRANSACTIONS_FAILURE",
      payload: error,
    };
  };
  
  const fetchTransaction = (service, dispatch) => () => {
    dispatch(transactionRequested());
    service
      .getTransactions()
      .then((data) => {
        const transactions = [];
        Object.keys(data).forEach((transaction) => {
          const item = data[transaction][0];
          item.id = transaction;
          transactions.push(item);
        });
        dispatch(transactionLoaded(transactions));
      })
      .catch((error) => {
        dispatch(transactionError(error));
      });
  };



  
  export default  fetchTransaction;
  