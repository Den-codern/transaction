import React, { Component } from "react";
import { connect } from "react-redux";
import Navigation from "../navigation";
import ToggleMenu from "../toggle-menu";
import "./layout.css";

class Layout extends Component {
  state = {
    menu: false,
  };

  toggleMenuHandler = () => {
    this.setState({
      menu: !this.state.menu,
    });
  };

  menuCloseHandler = () => {
    this.setState({
      menu: false,
    });
  };

  render() {
    return (
      <div className="Layout">
        <Navigation
          isAuthenticated={this.props.isAuthenticated}
          isOpen={this.state.menu}
          onClose={this.menuCloseHandler}
        />

        <ToggleMenu
          onToggle={this.toggleMenuHandler}
          isOpen={this.state.menu}
        />
        <main>{this.props.children}</main>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token,
  };
}

export default connect(mapStateToProps)(Layout);
