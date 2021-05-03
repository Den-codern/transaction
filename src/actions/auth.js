const auth = (email, password, isLogin, service) => {
  return async (dispatch) => {
    const { postSingUp, postSingIn } = service;

    const authData = {
      email,
      password,
      returnSecureToken: true,
    };

    const response = isLogin
      ? await postSingIn(authData)
      : await postSingUp(authData);

    const expirationDate = new Date(
      new Date().getTime() + response.expiresIn * 1000
    );
    localStorage.setItem("token", response.idToken);
    localStorage.setItem("userId", response.localId);
    localStorage.setItem("expirationDate", expirationDate);

    dispatch(authSuccess(response.idToken));
    dispatch(autoLogout(response.expiresIn));
  };
};

const authSuccess = (token) => {
  return {
    type: "AUTH_SUCCESS",
    token,
  };
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expirationDate");
  return {
    type: "AUTH_LOGOUT",
  };
};

const autoLogin = () => {
  return dispatch => {
    const token = localStorage.getItem('token')
    if (!token) {
      dispatch(logout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      if (expirationDate <= new Date()) {
        dispatch(logout())
      } else {
        dispatch(authSuccess(token))
        dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
      }
    }
  }
};

const autoLogout = (time) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, time * 1000);
  };
};

export { auth, logout,autoLogin };
