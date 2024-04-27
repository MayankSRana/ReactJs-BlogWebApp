import React from "react";
import PostFormWithDevTool from "../components/post-form/PostForm";
import Container from "../components/Container";

function Addpost() {
  return (
    <div className="py-8">
      <Container>
        <PostFormWithDevTool />
      </Container>
    </div>
  );
}

export default Addpost;
