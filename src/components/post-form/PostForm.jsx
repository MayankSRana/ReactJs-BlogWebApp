import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";
import { DevTool } from "@hookform/devtools";
import { useCallback, useEffect } from "react";
import databaseservice from "../../AppwriteAuthentication/database_service";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PostForm = ({ post }) => {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.userData);

  const submit = async (data) => {
    if (post) {
      const file = (await data.image[0]) ? databaseservice.uploadFile : null;
      if (file) {
        databaseservice.deleteFile(post.featuredImage);
      }
      const dbPost = await databaseservice.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await databaseservice.uploadFile(data.image[0]);
      // console.log(file);
      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await databaseservice.createPost({
          ...data,
          userId: userData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    } else return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title, { shoukdValidate: true }));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
    <div className="flex flex-col md:flex-row">
      <form className="md:w-2/3 md:px-2">
        <Input
          label="Title"
          type="text"
          className="mb-4"
          id="title-postform"
          {...register("title", { required: true })}
        />

        <Input
          label="Slug"
          type="text"
          className="mb-4"
          id="slug-postform"
          {...register("slug", { required: true })}
          onInput={() => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />

        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
          id="rte-postform"
        />
      </form>

      <div className="md:w-1/3 md:px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          id="image-postform"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />

        {post && (
          <div className="w-full mb-4">
            <img
              src={databaseservice.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />

        <Button type="submit" bgColor={post ? "bg-green-500" : undefined}>
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </div>
  );
};

const PostFormWithDevTool = () => {
  const { control } = useForm();
  return (
    <div>
      <PostForm />
      <DevTool control={control} />
    </div>
  );
};

export default PostFormWithDevTool;
