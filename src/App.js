import React, { Component } from "react";
import Comments from "./Comments";
import NewComment from "./NewComment";
import Login from "./Login";
import User from "./User";

class App extends Component {
  state = {
    comments: {},
    isLoading: false,
    isAuth: false,
    isAuthError: false,
    authError: "",
    user: {}
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

  componentDidMount() {
    const { database, auth } = this.props;
    this.setState({ isLoading: true });
    this.comments = database.ref("comments");
    this.comments.on("value", snapshot => {
      this.setState({
        comments: snapshot.val(),
        isLoading: false
      });
    });

    auth.onAuthStateChanged(user => {
      console.log("user", user);
      if (user) {
        console.log("ok user");
        this.setState({
          isAuth: true,
          user
        });
      } else {
        console.log("falso user");
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

  render() {
    return (
      <div>
        {this.state.isAuth && (
          <User email={this.state.user.email} logout={this.logOut} />
        )}
        {!this.state.isAuth && (
          <Login
            login={this.login}
            authError={this.state.authError}
            isAuthError={this.state.isAuthError}
          />
        )}
        {this.state.isAuth && <NewComment sendComment={this.sendComment} />}
        <Comments comments={this.state.comments} />
        {this.state.isLoading && <p>Carregando...</p>}
      </div>
    );
  }
}

export default App;
