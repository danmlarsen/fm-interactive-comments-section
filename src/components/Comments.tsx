/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import Comment from "./Comment";
import CommentReply from "./CommentReply";

import { comments as commentsJson } from "../assets/data.json";
import { convertToTimestamp, getCommentsLength } from "../utils/utils";

import { useUser } from "../context/UserContext";

type CommentsContextValue = {
  handleNewComment: (comment: string, replyId?: number) => void;
  handleEditComment: (id: number) => void;
  handleDeleteComment: (id: number) => void;
  handleScore: (id: number, value: number) => void;
};

const CommentsContext = createContext<CommentsContextValue | null>(null);

export function useComments() {
  const commentsContext = useContext(CommentsContext);

  if (commentsContext === null) {
    throw new Error("Comments context is null - that should not be the case");
  }

  return commentsContext;
}

export default function Comments() {
  // Convert relative createdAt strings to date strings
  const commentsData = commentsJson.map((comment) => {
    const replies = comment.replies.map((reply) => {
      return { ...reply, createdAt: convertToTimestamp(reply.createdAt) };
    });
    return {
      ...comment,
      createdAt: convertToTimestamp(comment.createdAt),
      replies,
    };
  });

  const { currentUser, votes, addVote } = useUser();

  const [comments, setComments] = useState(commentsData);

  return (
    <CommentsContext.Provider
      value={{
        handleNewComment(commentText, replyId) {
          if (replyId) {
            setComments((prevComments) =>
              prevComments.map((comment) => {
                if (comment.id !== replyId) return comment;
                return {
                  ...comment,
                  replies: [
                    ...comment.replies,
                    {
                      id: getCommentsLength(prevComments) + 1,
                      content: commentText,
                      createdAt: new Date().toISOString(),
                      score: 0,
                      user: currentUser,
                      replyingTo: comment.user.username,
                    },
                  ],
                };
              }),
            );
          } else {
            setComments((prevComments) => [
              ...prevComments,
              {
                id: getCommentsLength(prevComments) + 1,
                content: commentText,
                createdAt: new Date().toISOString(),
                score: 0,
                user: currentUser,
                replies: [],
              },
            ]);
          }
        },
        handleEditComment() {},
        handleDeleteComment(id) {
          setComments((prevComments) => {
            return prevComments
              .map((comment) => ({
                ...comment,
                replies: comment.replies.filter((reply) => reply.id !== id),
              }))
              .filter((comment) => comment.id !== id);
          });
        },
        handleScore(id, value) {
          if (votes.includes(id)) return;

          setComments((prevComments) =>
            prevComments.map((comment) => ({
              ...comment,
              score: comment.id === id ? comment.score + value : comment.score,
              replies: comment.replies.map((reply) =>
                reply.id === id
                  ? { ...reply, score: reply.score + value }
                  : reply,
              ),
            })),
          );
          addVote(id);
        },
      }}
    >
      <div className="space-y-5">
        {comments.map((comment) => (
          <Comment key={comment.id} data={comment} />
        ))}
        <CommentReply />
      </div>
    </CommentsContext.Provider>
  );
}
