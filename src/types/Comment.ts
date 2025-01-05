export type TComment = {
  id: string;
  content: string;
  createdAt: string;
  score: number;
  user: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
  replies?: TComment[];
  replyingTo?: string;
};
