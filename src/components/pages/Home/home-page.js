import React, { Component } from "react";
import "./home-page.css";
import TransactionList from "../../transaction-list";
import Button from "../../button";
import { connect } from "react-redux";
import { compose } from "../../../utils";
import { withTransactionService } from "../../hoc";

class HomePage extends Component {
  onDeleteHandler = () => {
    const { transactions, transactionService } = this.props;
    const lastTransactionItem = transactions[transactions.length - 1];
    transactionService.deleteItem(lastTransactionItem.id);
  };

  render() {
    return (
      <div className={"Transaction"}>
        <div className={"TransactionWrapper"}>
          <h1>Транзакция</h1>
          <TransactionList />
          <Button type="error" onClick={this.onDeleteHandler}>
            Удалить
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ transaction: { transactions } }) => {
  return {
    transactions,
  };
};

export default compose(
  withTransactionService(),
  connect(mapStateToProps)
)(HomePage);
