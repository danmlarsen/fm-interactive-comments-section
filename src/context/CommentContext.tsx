import { createContext, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import useLocalStorageState from "use-local-storage-state";

import { comments as commentsJson } from "../assets/data.json";
import { convertToTimestamp } from "../utils/utils";
import { useUser } from "./UserContext";
import { TComment } from "../types/Comment";

type CommentsContextValue = {
  comments: TComment[];
  scoreVotes: string[];
  handleNewComment: (comment: string, replyId?: string) => void;
  handleNewReply: (replyText: string, replyId: string) => void;
  handleEditComment: (id: string, newContent: string) => void;
  handleDeleteComment: (id: string) => void;
  handleScore: (id: string, value: number) => void;
};

const CommentsContext = createContext<CommentsContextValue | null>(null);

export function useComments() {
  const commentsContext = useContext(CommentsContext);

  if (commentsContext === null) {
    throw new Error("Comments context is null - that should not be the case");
  }

  return commentsContext;
}

export default function CommentsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Convert relative createdAt strings to date strings
  const commentsData = commentsJson.map((comment) => {
    const replies = comment.replies.map((reply) => {
      return {
        ...reply,
        id: uuidv4(),
        createdAt: convertToTimestamp(reply.createdAt),
      };
    });
    return {
      ...comment,
      id: uuidv4(),
      createdAt: convertToTimestamp(comment.createdAt),
      replies,
    };
  });

  const { currentUser } = useUser();

  const [comments, setComments] = useLocalStorageState("comments", {
    defaultValue: commentsData,
  });

  const [scoreVotes, setScoreVotes] = useLocalStorageState<string[]>(
    "scoreVotes",
    { defaultValue: [] },
  );

  return (
    <CommentsContext.Provider
      value={{
        comments,
        scoreVotes,
        handleNewComment(commentText) {
          setComments((prevComments) => [
            ...prevComments,
            {
              id: uuidv4(),
              content: commentText,
              createdAt: new Date().toISOString(),
              score: 0,
              user: currentUser,
              replies: [],
            },
          ]);
        },
        handleNewReply(replyText, replyId) {
          let parentId: string;
          let replyTo: string;
          if (comments.find((comment) => comment.id === replyId)) {
            const comment = comments.find((comment) => comment.id === replyId)!;
            parentId = comment.id;
            replyTo = comment.user.username;
          } else {
            const commentIndex = comments.findIndex((comment) =>
              comment.replies.find((reply) => reply.id === replyId),
            )!;
            parentId = comments[commentIndex].id;
            replyTo = comments[commentIndex].replies.find(
              (reply) => reply.id === replyId,
            )!.user.username;
          }

          setComments((prevComments) =>
            prevComments.map((comment) => {
              if (comment.id !== parentId) return comment;
              return {
                ...comment,
                replies: [
                  ...comment.replies,
                  {
                    id: uuidv4(),
                    content: replyText,
                    createdAt: new Date().toISOString(),
                    score: 0,
                    user: currentUser,
                    replyingTo: replyTo,
                  },
                ],
              };
            }),
          );
        },
        handleEditComment(id, newContent) {
          setComments((prevComments) =>
            prevComments.map((comment) => {
              if (comment.id === id) return { ...comment, content: newContent };
              else {
                return {
                  ...comment,
                  replies: comment.replies.map((reply) =>
                    reply.id === id ? { ...reply, content: newContent } : reply,
                  ),
                };
              }
            }),
          );
        },
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
          if (scoreVotes.includes(id)) return;

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

          setScoreVotes((prevVotes) => [...prevVotes, id]);
        },
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
}
