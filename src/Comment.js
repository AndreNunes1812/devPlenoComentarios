import React from "react";

const Comment = ({ c }) => {
  return (
    <div className="card mt-2">
      <div className="card-body">
        {c.comment}
        <br />
        <span className="text-muted">Email: {c.email} </span>
      </div>
    </div>
  );
};

export default Comment;
