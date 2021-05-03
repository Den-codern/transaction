import React, { Component } from "react";
import Button from "../../button";
import Input from "../../input";
import is from "is_js";
import "./auth-page.css";
import { withTransactionService } from "../../hoc";
import { compose } from "../../../utils";
import { connect } from "react-redux";
import { auth } from "../../../actions";

class AuthPage extends Component {
  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: "",
        type: "email",
        label: "Email",
        errorMessage: "Введите корректный email",
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        },
      },
      password: {
        value: "",
        type: "password",
        label: "Пароль",
        errorMessage: "Введите корректный пароль",
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6,
        },
      },
    },
  };

  loginHandler = () => {
    const { email, password } = this.state.formControls;
    this.props.auth(email.value, password.value, true);
  };

  registerHandler = () => {
    const { email, password } = this.state.formControls;
    this.props.auth(email.value, password.value, false);
  };

  submitHandler = (event) => {
    event.preventDefault();
  };

  validateControl(value, validation) {
    if (!validation) {
      return true;
    }

    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (validation.email) {
      isValid = is.email(value) && isValid;
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }

    return isValid;
  }

  onChangeHandler = (event, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);

    formControls[controlName] = control;

    let isFormValid = true;
    Object.keys(formControls).forEach((name) => {
      isFormValid = formControls[name].valid && isFormValid;
    });

    this.setState({
      formControls,
      isFormValid,
    });
  };

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={(event) => this.onChangeHandler(event, controlName)}
        />
      );
    });
  }

  render() {
    const { isFormValid } = this.state;
    return (
      <div className={"Auth"}>
        <div>
          <h1>Авторизация</h1>

          <form onSubmit={this.submitHandler} className="AuthForm">
            {this.renderInputs()}

            <Button
              type="success"
              disabled={!isFormValid}
              onClick={this.loginHandler}
            >
              Войти
            </Button>

            <Button
              type="primary"
              disabled={!isFormValid}
              onClick={this.registerHandler}
            >
              Зарегистрироваться
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, { transactionService }) => {
  return {
    auth: (email, password, isLogin) => {
      return dispatch(auth(email, password, isLogin, transactionService));
    },
  };
};

export default compose(
  withTransactionService(),
  connect(null, mapDispatchToProps)
)(AuthPage);
