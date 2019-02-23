import React from "react";
import Comment from "./Comment";

const Comments = ({ comments, removerComentario }) => {
  const keys = Object.keys(comments || []);

  return (
    <div>
      {keys.map(key => (
        <Comment
          key={key}
          c={comments[key]}
          chave={key}
          removerComentario={removerComentario}
        />
      ))}
    </div>
  );
};
export default Comments;
