export default class TransactionService {
  // data = [
  //   { id: 1, amount: 100, bankId: 1 },
  //   { id: 2, amount: 200, bankId: 2 },
  // ];

  _dbbase =
    "https://react-transaction-default-rtdb.firebaseio.com/transaction.json";
  _dbsingup =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyALXNOYAbH6hf5kVXFj4WU53u_-MUQHsM8";
  _dbsingin =
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyALXNOYAbH6hf5kVXFj4WU53u_-MUQHsM8";
  getOrPost = async (url, mode, contentBody = {}) => {
    const method = mode === "POST" ? "POST" : "GET";
    let config = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (contentBody && mode === "POST") {
      config = {
        ...config,
        body: JSON.stringify(contentBody),
      };
    }

    const res = await fetch(url, config);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }

    return res.json();
  };

  getTransactions = async () => {
    const res = await this.getOrPost(this._dbbase, "GET");
    return res;
  };

  postTransaction = async (transactions = {}) => {
    return await this.getOrPost(this._dbbase, "POST", transactions);
  };

  postSingUp = async (body) => {
    return await this.getOrPost(this._dbsingup, "POST", body).then((data) => {
      return data;
    });
  };

  postSingIn = async (body) => {
    return await this.getOrPost(this._dbsingin, "POST", body).then((data) => {
      return data;
    });
  };

  deleteItem = async (id) => {
    await fetch(
      `https://react-transaction-default-rtdb.firebaseio.com/transaction/${id}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      res.json();
    });
  };
}
