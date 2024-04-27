import React, { useEffect, useState } from "react";
import PostForm from "../components/post-form/PostForm";
import databaseservice from "../AppwriteAuthentication/database_service";
import { useNavigate, useParams } from "react-router-dom";
import Container from "../components/Container";

function EditPost() {
  const [post, setPosts] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      databaseservice.getSinglePost(slug).then((post) => {
        if (post) {
          setPosts(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);
  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
