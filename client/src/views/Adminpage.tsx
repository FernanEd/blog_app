import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { currentUserContext } from "../App";
import Layout from "../components/Layout";
import PostCard from "../components/PostCard";
import PostForm from "./AddPostpage";
import useApiResource from "../hooks/useApiResource";
import { IPost } from "../utils/interfaces";

interface Props {}

const Adminpage: React.FunctionComponent = ({}) => {
  const {
    resource: posts,
    isLoading,
    error,
    updateResource,
  } = useApiResource<IPost>("posts");

  const togglePublish = (post: IPost & { _id: string }) => {
    const toggled = post.isPublished ? false : true;
    updateResource(post._id, { ...post, isPublished: toggled });
  };

  return (
    <Layout>
      <>
        <h1 className="text-3xl">Admin portal</h1>
        <section className="my-4">
          <div>
            <Link to="admin/addpost">
              <button className="btn btn-primary">Write new post</button>
            </Link>
          </div>
        </section>
        <section className="flex flex-col gap-4">
          <h2 className="text-xl">Posts visibility</h2>
          {posts.map((post) => (
            <article
              key={post._id}
              className="bg-dark-100 shadow-md rounded-sm p-4"
            >
              <header className="flex justify-between">
                <h3>{post.title}</h3>
                <div className="flex gap-4">
                  {post.isPublished ? (
                    <button
                      className="btn btn-secondary"
                      onClick={() => togglePublish(post)}
                    >
                      Unpublish
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary"
                      onClick={() => togglePublish(post)}
                    >
                      Publish
                    </button>
                  )}
                </div>
              </header>
              {post.isPublished ? (
                <p className="text-success">Published</p>
              ) : (
                <p className="text-danger">Not published</p>
              )}
            </article>
          ))}
        </section>
      </>
    </Layout>
  );
};

export default Adminpage;
