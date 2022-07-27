import React, { Component } from "react";
import firebase from "../service/firebase";

export const AuthContext = React.createContext();

export const AuthProvider = class extends Component {
  state = {
    currentUser: null,
  };
  componentDidMount() {
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }
  onAuthStateChanged = (user) => {
    this.setState({
      currentUser: user,
    });
  };
  render() {
    const { children } = this.props;
    const contextValue = {
      currentUser: this.state.currentUser,
    };
    return (
      <AuthContext.Provider value={contextValue}>
        {children}
      </AuthContext.Provider>
    );
  }
};
