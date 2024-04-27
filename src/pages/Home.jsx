import React, { useEffect, useState } from "react";
import databaseservice from "../AppwriteAuthentication/database_service";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";
import parse from "html-react-parser";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    databaseservice.getAllPost().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="bg-gray-100 min-h-screen flex justify-center items-center">
        <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Welcome to Our Blog!</h2>
          <p className="text-gray-700 mb-4">
            Welcome to our blog, where we explore a wide range of topics, from
            technology and science to arts and culture. Our goal is to provide
            informative and engaging content that inspires curiosity and fosters
            learning.
          </p>
          <p className="text-gray-700 mb-4">
            We invite you to join our community of curious minds and passionate
            learners. Subscribe to our newsletter to receive updates on new
            articles, exclusive content, and community events. Follow us on
            social media to engage with fellow readers and share your thoughts
            on our latest posts.
          </p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            <Link to={"/signup"}>Sign Up</Link>
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-4">Latest Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post.$id} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-2">{post.title}</h3>
              <PostCard {...post} />
              <p className="text-gray-700">{parse(post.content)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
