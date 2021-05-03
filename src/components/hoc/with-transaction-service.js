import React from "react";
import { TransactionServiceConsumer } from "../transaction-service-context";

const withTransactionService = () => (Wrapped) => {
  return (props) => {
    return (
      <TransactionServiceConsumer>
        {(transactionService) => {
          return (
            <Wrapped {...props} transactionService={transactionService} />
          );
        }}
      </TransactionServiceConsumer>
    );
  };
};


export default withTransactionService