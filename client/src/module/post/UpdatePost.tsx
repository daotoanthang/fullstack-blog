import React, { useEffect, useRef, useState } from "react";
import "react-quill/dist/quill.snow.css";
import {
  createPost,
  getCategory,
  getPost,
  handleUploadImage,
  handleUploadImageSingle,
  updatePost,
} from "../../redux/apiRequest";

// CKEditor 5
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Spinner from "../../components/icon/Spinner";

type Props = {};

function MyCustomUploadAdapterPlugin(editor: any) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader: any) => {
    return new MyUploadAdapter(loader);
  };
}

class MyUploadAdapter {
  private loader: any;

  constructor(loader: any) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then(
      (file: File) =>
        new Promise((resolve, reject) => {
          const formData = new FormData();
          formData.append("image", file);

          handleUploadImage(file)
            .then((imageUrl) => {
              if (typeof imageUrl === "string") {
                resolve({
                  default: imageUrl,
                });
              } else {
                reject("Image upload failed");
              }
            })
            .catch((err) => {
              reject(err);
            });
        })
    );
  }

  abort() {
    // Handle abort if needed
  }
}

const UpdatePost = (props: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const post = useSelector((state: any) => state.post?.onePost.post);
  const { slug } = useParams();
  const currentUser = useSelector(
    (state: any) => state.auth?.login.currentUser
  );
  const pending = useSelector((state: any) => state.post?.createPost?.pending);
  const [listCategory, setListCategory] = useState<[]>([]);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [categoryId, setCategoryId] = useState("2");
  const [content, setContent] = useState("");

  // Use ref to clear file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle image preview
  useEffect(() => {
    if (image) {
      const imagePreviewUrl = URL.createObjectURL(image);
      setImageUrl(imagePreviewUrl);

      // Clean up the object URL when component unmounts or image changes
      return () => {
        URL.revokeObjectURL(imagePreviewUrl);
      };
    } else {
      setImageUrl("");
    }
  }, [image]);

  useEffect(() => {
    async function fetchData() {
      if (!slug) return;
      const post = await getPost(slug, dispatch);
      if (post) {
        setTitle(post.title || "");
        setImageUrl(post.image || "");
        setCategoryId(post.categoryId);
        setContent(post.content || ""); // Provide a fallback for post.content
      }
    }
    fetchData();
  }, [slug, dispatch]);

  const handleDeleteImage = () => {
    setImage(null); // Clear the image
    setImageUrl(""); // Clear the preview URL
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the file input field
    }
  };

  const handleUpdatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    let pathImage = imageUrl;
    if (image) {
      pathImage = await handleUploadImageSingle(image);
    }
  
    const postInfo = {
      title,
      image: pathImage,
      categoryId,
      userId: currentUser?.userInfo.id,
      content,
      slug,
    };
    await updatePost(postInfo, dispatch, navigate, currentUser?.accessToken);
  };

  useEffect(() => {
    const fetchCategory = async () => {
      const categoryList = await getCategory("ALL");
      setListCategory(categoryList);
    };
    fetchCategory();
  }, []);

  return (
    <form
      onSubmit={handleUpdatePost}
      className="max-w-3xl mx-auto p-4 bg-white shadow-md rounded-md"
    >
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
          Image
        </label>
        <input
          type="file"
          id="image"
          name="img"
          accept="image/*"
          ref={fileInputRef}
          onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
        {imageUrl && (
          <div className="relative mt-4">
            <img
              src={imageUrl}
              alt="Preview"
              className="max-w-xs max-h-48 object-cover rounded-md"
            />
            <button
              type="button"
              onClick={handleDeleteImage}
              className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white text-sm rounded-full"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="category"
          className="block text-gray-700 font-bold mb-2"
        >
          Category
        </label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          required
        >
          <option hidden>Choose here</option>
          {listCategory &&
            listCategory.map((category: any, index) => (
              <option key={index} value={category?.id}>
                {category?.name}
              </option>
            ))}
        </select>
      </div>

      <div className="mb-4">
        <CKEditor
          editor={ClassicEditor}
          config={{
            extraPlugins: [MyCustomUploadAdapterPlugin],
          }}
          data={content}
          onChange={(event, editor) => {
            const data = editor.getData();
            setContent(data);
          }}
        />
      </div>

      <div className="mb-4">
        <button
          disabled={pending}
          type="submit"
          className={`relative w-full px-4 py-4 font-bold rounded-md focus:outline-none focus:ring focus:border-blue-300 flex items-center justify-center 
      ${
        pending
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-500 hover:bg-blue-600 text-white"
      }`}
        >
          {pending ? <Spinner /> : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default UpdatePost;
