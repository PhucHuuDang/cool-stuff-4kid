"use client";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import React, { useState } from "react";

interface Comment {
  id: number;
  username: string;
  content: string;
  date: string;
}

export const Comment = () => {
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, username: "Unknow", content: "unknow", date: "1000 ngày trước" },
    { id: 2, username: "Unknow", content: "unknow", date: "1000 ngày trước" },
    { id: 3, username: "Unknow", content: "unknow", date: "1000 ngày trước" },
  ]);
  const [replyInputs, setReplyInputs] = useState<{ [key: number]: boolean }>(
    {}
  );

  const handleReplyClick = (commentId: number) => {
    setReplyInputs((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
  };

  const handleSendReply = (commentId: number) => {
    // Xử lý gửi bình luận tại đây
    console.log(`Sending reply for comment ID: ${commentId}`);
  };

  return (
    <div>
      <div className="ml-72 mt-5 h-[900px] w-[900px] rounded-2xl bg-white">
        <div className="pt-3">
          <div className="ml-2 text-xl mb-2">Bình luận đánh giá sản phẩm</div>
          <div>
            <input
              type="text"
              placeholder="Nhập bình luận của bạn"
              className="mb-2 border w-[880px] ml-2 px-2 pb-20"
            />
          </div>
          <Button className="justify-center text-center w-20 ml-2 ">Gửi</Button>
        </div>

        <div className="ml-3 flex justify-between border-b-2 pb-5 text-lg">
          <div className="pt-4 font-bold">99 bình luận</div>
          <div className="pt-4">Xem bình luận có đánh giá</div>
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Tìm theo nội dụng người gửi"
              className=" w-60 border  p-2 pl-2 pr-8 text-sm"
            />
            <Search className="absolute right-2 text-gray-500" />
          </div>
        </div>
        <div className="ml-3 pt-6">
          {comments.map((comment) => (
            <div key={comment.id} className="mb-4">
              <div className="flex items-center">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwP-38HZT6Vl1LXeFxOsB0PS1SFOOtyu1XW_R-_cMW8VoQZInsRpCskTldMltmaq1bt3o&usqp=CAU"
                  alt=""
                  className="h-8 w-8"
                />
                <div className="ml-2 font-bold">{comment.username}</div>
              </div>
              <div className="max-w-full break-words">{comment.content}</div>
              <div className="flex w-[220px] items-center justify-between">
                <button
                  className="text-left text-blue-600"
                  onClick={() => handleReplyClick(comment.id)}
                >
                  Trả lời
                </button>
                <button className="text-left text-blue-600">Thích(2)</button>
                <div className="text-left text-xs text-gray-400 ">
                  {comment.date}
                </div>
              </div>
              {replyInputs[comment.id] && (
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Nhập bình luận của bạn"
                    className="mb-2 w-full border px-2 py-5"
                  />
                  <button
                    className="w-full border bg-blue-500 p-2 text-white"
                    onClick={() => handleSendReply(comment.id)}
                  >
                    Gửi
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
