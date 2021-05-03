import React from "react";
import "./transaction-list-item.css";
const TransactionListItem = ({ item }) => {
  const { bankId, amount } = item;
  return (
    <li
      className={'AnswerItem '}
    >
      <div>
        Сумма:{amount} сом
      </div>
      <div>
        Название:{bankId}
      </div>
    </li>
  );
};

export default TransactionListItem;
