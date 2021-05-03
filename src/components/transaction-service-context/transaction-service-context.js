import { createContext } from "react";

const {
  Provider: TransactionServiceProvider,
  Consumer: TransactionServiceConsumer,
} = createContext();

export { TransactionServiceProvider, TransactionServiceConsumer };
