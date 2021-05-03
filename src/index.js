import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app";
import { Provider } from "react-redux";
import store from "./store";
import ErrorBoundary from "./components/error-boundary/error-boundary";
import { TransactionServiceProvider } from "./components/transaction-service-context";
import TransactionService from "./service/transaction-service";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";

const transactionsService = new TransactionService();

const app = (
  <Provider store={store}>
    <ErrorBoundary>
      <TransactionServiceProvider value={transactionsService}>
        <Router>
          <App />
        </Router>
      </TransactionServiceProvider>
    </ErrorBoundary>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

