import React, { Component } from "react";

class Comment extends Component {
  remover = () => {
    this.props.removerComentario(this.props.chave);
  };
  render() {
    const { c, chave } = this.props;
    console.log("Key:", chave);
    return (
      <div className="card mt-2">
        <div className="card-body">
          {c.comment}
          <br />
          <span className="text-muted">Email: {c.email} </span>
          <button
            type="button"
            className="btn btn-danger"
            onClick={this.remover}
          >
            Excluir
          </button>
        </div>
      </div>
    );
  }
}

export default Comment;
