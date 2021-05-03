import { Component } from "react";
import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./navigation.css";
import Backdrop from "../backdrop";

import "./navigation.css";

export default class Navigation extends Component {
  renderLinks(links) {
    return links.map((link, idx) => {
      const { to, label, exact } = link;
      return (
        <li key={idx}>
          <NavLink to={to} exact={exact} activeClassName={classes.active}>
            {label}
          </NavLink>
        </li>
      );
    });
  }
  render() {
    const cls = ["Navigation"];
    const { isAuthenticated } = this.props;
 
    if (!this.props.isOpen) {
      cls.push("close");
    }

    const links = [{ to: "/", label: "Список", exact: true }];

    if (isAuthenticated) {
      links.push({
        to: "/transaction-creator",
        label: "Создать транзакцию",
        exact: false,
      });
      links.push({ to: "/logout", label: "Выйти", exact: false });
    } else {
      links.push({ to: "/auth", label: "Авторизация", exact: false });
    }

    return (
      <React.Fragment>
        <nav className={cls.join(" ")}>
          <ul>{this.renderLinks(links)}</ul>
        </nav>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
      </React.Fragment>
    );
  }
}
