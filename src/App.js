import React, { Component } from "react";
import Comments from "./Comments";
import NewComment from "./NewComment";
import Login from "./Login";
import User from "./User";
import SignUp from "./SignUp";
import "bootstrap-css-only";

class App extends Component {
  state = {
    comments: {},
    isLoading: false,
    isAuth: false,
    isAuthError: false,
    authError: "",
    isSignUpError: false,
    signUpError: "",
    user: {},
    userScreen: "login", //signup
    commentsId: ""
  };

  // prestar atenção no props de envio / recebimento
  // nesse caso no APP esta recendo o valor de NewComment
  sendComment = comment => {
    const { database } = this.props;
    const id = database
      .ref()
      .child("comments")
      .push().key;
    const comments = {};
    comments["comments/" + id] = {
      comment,
      email: this.state.user.email,
      userid: this.state.user.uid
    };
    database.ref().update(comments);
    /*
    console.log("id:", id);
    this.setState({
      comments: [...this.state.comments, comment + " " + id]
    });
    */
  };

  login = async (email, passwd) => {
    const { auth } = this.props;
    this.setState({
      authError: "",
      isAuthError: false
    });

    try {
      await auth.signInWithEmailAndPassword(email, passwd);
    } catch (err) {
      this.setState({
        authError: err.code,
        isAuthError: true
      });
    }
  };

  removerComentario = uiid => {
    console.log("removerComentario:", uiid);
    const { database } = this.props;
    try {
      database.ref("comments/" + uiid).remove();
      // database.ref("comments/").remove(); esse caso excliu
    } catch (err) {
      console.log("error:", err);
    }
  };

  createAccount = async (email, passwd) => {
    const { auth } = this.props;
    this.setState({
      signUpError: "",
      isSignUpError: false
    });

    try {
      await auth.createUserWithEmailAndPassword(email, passwd);
    } catch (err) {
      this.setState({
        signUpError: err.code,
        isSignUpError: true
      });
    }
  };

  componentDidMount() {
    const { database, auth } = this.props;
    this.setState({ isLoading: true });
    this.comments = database.ref("comments");
    this.comments.on("value", snapshot => {
      //   console.log("camino:", Object.keys(snapshot.val()));
      console.log("caminho:", snapshot.val());
      // Object.keys(this.props.decks).map((id) => this.props.decks[id])}
      this.setState({
        comments: snapshot.val(),
        isLoading: false
      });
    });

    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          isAuth: true,
          user
        });
      } else {
        this.setState({
          isAuth: false,
          user: {}
        });
      }
    });
  }

  logOut = () => {
    const { auth } = this.props;
    auth.signOut();
  };

  changeScreen = screen => {
    this.setState({
      userScreen: screen
    });
  };

  render() {
    return (
      <div className="container mt-3">
        {this.state.isAuth && (
          <User email={this.state.user.email} logout={this.logOut} />
        )}
        {!this.state.isAuth && this.state.userScreen === "login" && (
          <Login
            login={this.login}
            authError={this.state.authError}
            isAuthError={this.state.isAuthError}
            changeScreen={this.changeScreen}
          />
        )}
        {!this.state.isAuth && this.state.userScreen === "signup" && (
          <SignUp
            createAccount={this.createAccount}
            signUpError={this.state.signUpError}
            isSignUpError={this.state.isSignUpError}
            changeScreen={this.changeScreen}
          />
        )}
        {this.state.isAuth && <NewComment sendComment={this.sendComment} />}
        <Comments
          comments={this.state.comments}
          removerComentario={this.removerComentario}
        />
        {this.state.isLoading && <p>Carregando...</p>}
      </div>
    );
  }
}

export default App;
