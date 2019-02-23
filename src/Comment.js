import React from "react";

const Comment = ({ c }) => {
  return (
    <div>
      Comentários: {c.comment}
      <br />
      Email: {c.email}
      <hr />
    </div>
  );
};

export default Comment;
