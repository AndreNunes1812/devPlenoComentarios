import React, { Component } from "react";

class NewComment extends Component {
  state = {
    newComment: ""
  };

  handleChange = event => {
    this.setState({
      newComment: event.target.value
    });
  };

  // Envio o conteúdo para a funcao sendComment do APP
  sendComment = () => {
    this.props.sendComment(this.state.newComment); //Enviando para o componente PAI
    this.setState({
      newComment: ""
    });
  };

  render() {
    return (
      <div>
        <textarea value={this.state.newComment} onChange={this.handleChange} />
        <button onClick={this.sendComment}>Enviar</button>
      </div>
    );
  }
}

export default NewComment;
