import React from "react";
import databaseservice from "../AppwriteAuthentication/database_service";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import Container from "../components/Container";

function Allposts() {
  const [post, setPost] = useState([]);

  useEffect(() => {
    databaseservice.getAllPost([]).then((posts) => {
      if (posts) {
        setPost(posts.documents);
      }
    });
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {post.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Allposts;
