import React from "react";
import { shallow } from "enzyme";
import Comments from "./Comments";
import Comment from "./Comment";

describe("<Commensts />", () => {
  it("should render Comments", () => {
    const comments = [
      { id: "a", comment: "Comment 1" },
      { id: "b", comment: "Comment 2" }
    ];
    const wrapper = shallow(<Comments comments={comments} />);
    console.log(wrapper.find(Comment).length);
  });
});
