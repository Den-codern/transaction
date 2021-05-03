import is from "is_js";
import React, { Component } from "react";

import Button from "../../button";
import { withTransactionService } from "../../hoc";
import Input from "../../input";
import "./dashboard-home.css";

function createControl(config, validation) {
  return {
    ...config,
    validation,
    valid: !validation,
    touched: false,
    value: "",
  };
}

const createOptionControl = (number) => (validProp, errorMessage, label) => {
  return createControl(
    {
      label,
      errorMessage,
      id: number,
    },

    { required: true, ...validProp }
  );
};

function createFormControls() {
  return {
    option1: createOptionControl(1)({ num: true }, "Введите число", "Сумма"),
    option2: createOptionControl(2)(
      { string: true },
      "Значение не может быть пустым",
      "Название банка"
    ),
  };
}

class TransactionCreator extends Component {
  state = {
    isControlsValid: false,
    formControls: createFormControls(),
  };

  sibmitHandler = (event) => {
    event.preventDefault();
  };

  createTransactionHandler = (event) => {
    event.preventDefault();
    const { formControls } = this.state;
    const { transactionService } = this.props;
    const transactionItem = [
      {
        id: 1,
        amount: formControls.option1.value,
        bankId: formControls.option2.value,
      },
    ];

    transactionService.postTransaction(transactionItem).then(() => {
      this.setState({
        isControlsValid: false,
        formControls: createFormControls(),
      });
    });
  };

  validateControls = (value, validation) => {
    if (!validation) {
      return true;
    }

    let isValid = true;

    const { required, num, string } = validation;

    if (required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (num) {
      isValid = is.number(Number(value)) && isValid;
    }

    if (string) {
      isValid = is.string(value) && isValid;
    }
    return isValid;
  };

  changeHandler = (value, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = formControls[controlName];

    control.value = value;
    control.touched = true;
    control.valid = this.validateControls(control.value, control.validation);

    formControls[controlName] = control;

    let isControlsValid = true;
    Object.keys(formControls).forEach((name) => {
      isControlsValid = formControls[name].valid && isControlsValid;
    });

    this.setState({
      formControls,
      isControlsValid,
    });
  };

  renderControls() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <Input
          key={index + controlName}
          label={control.label}
          value={control.value}
          valid={control.valid}
          shouldValidate={!!control.validation}
          touched={control.touched}
          errorMessage={control.errorMessage}
          onChange={(event) =>
            this.changeHandler(event.target.value, controlName)
          }
        />
      );
    });
  }

  render() {
    const { isControlsValid } = this.state;
    return (
      <div className={"TransactionCreator"}>
        <div>
          <h1>Создать</h1>

          <form onSubmit={this.submitHandler}>
            {this.renderControls()}

            <Button
              type="success"
              onClick={this.createTransactionHandler}
              disabled={!isControlsValid}
            >
              Создать
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default withTransactionService()(TransactionCreator);
