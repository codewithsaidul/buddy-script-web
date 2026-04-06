"use client";
import PostOption from "@/components/shared/PostOption";
import { createPost } from "@/service/post/post.service";
import SendIcon from "@/svgIcon/SendIcon";
import { PostVisibility } from "@/types/post.types";
import Image from "next/image";
import { useActionState, useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";

export default function CreatePostArea() {
  const [state, formAction, isPending] = useActionState(createPost, null);
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
    } else if (state && !state.success) {
      toast.error(state.message);
    }
  }, [state]);


  const handleFinalSubmit = async (formData: FormData) => {
    formAction(formData);
    setContent("");
    setSelectedFile(null);
    setShowModal(false);
    formRef.current?.reset();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div
      className="_feed_inner_text_area _b_radious6 _padd_b24 _padd_t24 _padd_r24 _padd_l24 _mar_b16 relative"
    >
      <form action={handleFinalSubmit} ref={formRef}>
        <div className="_feed_inner_text_area_box">
          <div className="_feed_inner_text_area_box_image">
            <Image
              src="/assets/images/txt_img.png"
              alt="User"
              width={40}
              height={40}
              className="_txt_img"
            />
          </div>
          <div className="form-floating _feed_inner_text_area_box_form">
            <textarea
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="form-control _textarea"
              placeholder="Write something..."
              id="floatingTextarea"
              style={{ height: "100px" }}
            ></textarea>
            <label className="_feed_textarea_label" htmlFor="floatingTextarea">
              Write something ...
            </label>
          </div>
        </div>

        <input
          type="file"
          name="file"
          id="post-file"
          hidden
          onChange={handleFileChange}
        />

        {selectedFile && (
          <div className="mt-2 text-sm text-primary">
            Selected: <strong>{selectedFile.name}</strong>
          </div>
        )}

        <div className="_feed_inner_text_area_bottom">
          <div className="_feed_inner_text_area_item">
            <label htmlFor="post-file" style={{ cursor: "pointer" }}>
              <PostOption icon="photo" label="Photo" />
            </label>
            <PostOption icon="video" label="Video" />
            <PostOption icon="event" label="Event" />
            <PostOption icon="article" label="Article" />
          </div>

          <div className="_feed_inner_text_area_btn">
            <button
              type="button"
              disabled={isPending}
              onClick={() => setShowModal(true)}
              className="_feed_inner_text_area_btn_link"
            >
              <SendIcon /> <span>Post</span>
            </button>
          </div>
        </div>

        {/* --- Visibility Modal --- */}
        {showModal && (
          <div className="custom-modal-overlay">
            <div className="custom-modal-box">
              <h5 className="mb-3">Post Visibility</h5>
              <p className="text-muted small">Who can see your post?</p>

              <div className="_visibility_options my-3">
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="visibility"
                    value={PostVisibility.PUBLIC}
                    id="pub"
                    defaultChecked
                  />
                  <label className="form-check-label ms-2" htmlFor="pub">
                    🌍 Public
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="visibility"
                    value={PostVisibility.PRIVATE}
                    id="priv"
                  />
                  <label className="form-check-label ms-2" htmlFor="priv">
                    🔒 Private
                  </label>
                </div>
              </div>

              <div className="d-flex justify-content-end gap-2 mt-4">
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary px-4"
                  disabled={isPending}
                >
                  {isPending ? "Posting..." : "Confirm & Post"}
                </button>
              </div>
            </div>
          </div>
        )}
      </form>

      {/* কাস্টম সিএসএস যা নিশ্চিতভাবে মডালটিকে উপরে রাখবে */}
      <style jsx global>{`
        .custom-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 99999; /* অনেক হাই রাখা হয়েছে */
          backdrop-filter: blur(2px);
        }
        .custom-modal-box {
          background: #fff;
          padding: 30px;
          border-radius: 12px;
          width: 90%;
          max-width: 400px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          animation: slideUp 0.3s ease-out;
        }
        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        ._visibility_options .form-check-input:checked {
          background-color: #007bff;
          border-color: #007bff;
        }
      `}</style>
    </div>
  );
}
