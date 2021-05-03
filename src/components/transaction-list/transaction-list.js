import React, { Component } from "react";
import { withTransactionService } from "../hoc";
import TransactionListItem from "../transaction-list-item";
import { connect } from "react-redux";
import { compose } from "../../utils/index";
import { fetchTransaction } from "../../actions";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";
import "./transaction-list.css";

const TransactionList = ({ items }) => {
  return items.map((item, idx) => {
    const { id } = item;
    return <TransactionListItem key={id + idx} item={item} />;
  });
};

class TransactionListContainer extends Component {
  componentDidMount() {
    this.props.fetchTransaction();
    this.props.transactionService.deleteItem('-MZkWJRqd0NEu-3crPLB')
  }

  render() {
    const { loading, transactions, error } = this.props;
    if (loading) {
      return <Spinner />;
    }

    if (error) {
      return <ErrorIndicator />;
    }

    return (
      <ul>
        <TransactionList items={transactions} />
      </ul>
    );
  }
}

const mapStateToProps = ({ transaction: { transactions, loading, error } }) => {
  
  return {
    transactions,
    loading,
    error,
  };
};

const mapDispatchToProps = (dispatch, { transactionService }) => {
  return {
    fetchTransaction: fetchTransaction(transactionService, dispatch),
  };
};

export default compose(
  withTransactionService(),
  connect(mapStateToProps, mapDispatchToProps)
)(TransactionListContainer);
