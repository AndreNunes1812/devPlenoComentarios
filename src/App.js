import React, { Component } from "react";

import Comments from "./Comments";
import NewComment from "./NewComment";
import Login from "./Login";

import { database, auth } from "./firebase";

class App extends Component {
  state = {
    comments: {},
    isLoading: false,
    isAuth: false,
    isAuthError: false,
    authError: ""
  };

  // prestar atenção no props de envio / recebimento
  // nesse caso no APP esta recendo o valor de NewComment
  sendComment = comment => {
    const id = database
      .ref()
      .child("comments")
      .push().key;
    const comments = {};
    comments["comments/" + id] = {
      comment
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
      /*O meu codigo so funciona se tiver essa linha abaixo*/
      this.setState({ isAuth: true, isAuthError: false });
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
        isLoading: false,
        isAuth: false
      });
    });

    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          isAuth: true,
          user
        });
      }
    });
  }

  render() {
    return (
      <div>
        {/*Uma duvida aki, quando digito um comentario ele envia a salva, 
        porem isAuth= false , nao consegui entender onde ele troca. */}
        {"qq:" + this.state.isAuth}
        {!this.state.isAuth && <Login login={this.login} />}
        {this.state.isAuth && <NewComment sendComment={this.sendComment} />}
        <Comments comments={this.state.comments} />
        {this.state.isLoading && <p>Carregando...</p>}
      </div>
    );
  }
}

export default App;
