import { useState } from "react";

const useCommentTree = (initialComments) => {
  const [comments, setComments] = useState(initialComments);

  // tree traversal
  const insertNode = (tree, parentCommentId, newComment) => {
    return tree.map((comment) => {
      if (comment.id === parentCommentId) {
        return {
          ...comment,
          replies: [...comment.replies, newComment],
        };
      } else if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: insertNode(comment.replies, parentCommentId, newComment),
        };
      }
      return comment;
    });
  };

  const insertComment = (parentCommentId, content) => {
    const newComment = {
      id: Date.now(),
      content,
      votes: 0,
      timestamp: new Date().toISOString(),
      replies: [],
    };

    if (parentCommentId) {
      setComments((prevComments) =>
        insertNode(prevComments, parentCommentId, newComment)
      );
    } else {
      setComments((prevComments) => [...prevComments, newComment]);
    }
  };

  const editNode = (tree, nodeId, content) => {
    return tree.map((node) => {
      if (node.id === nodeId) {
        return {
          ...node,
          content: content,
          timestamp: new Date().toISOString(),
        };
      } else if (node.replies && node.replies.length > 0) {
        return {
          ...node,
          replies: editNode(node.replies, nodeId, content),
        };
      }
      return node;
    });
  };

  const editComment = (commentId, content) => {
    setComments((prevComments) => editNode(prevComments, commentId, content));
  };

  const deleteNode = (tree, nodeId) => {
    return tree.reduce((acc, node) => {
      if (node.id === nodeId) {
        return acc;
      } else if (node.replies && node.replies.length > 0) {
        node.replies = deleteNode(node.replies, nodeId);
      }
      return [...acc, node];
    }, []);
  };

  const deleteComment = (commentId) => {
    setComments((prevComments) => deleteNode(prevComments, commentId));
  };

  const sortNodes = (tree, sortOrder) => {
    return tree.slice().sort((a, b) => {
      if (sortOrder === "newest") {
        return new Date(b.timestamp) - new Date(a.timestamp);
      } else if (sortOrder === "oldest") {
        return new Date(a.timestamp) - new Date(b.timestamp);
      } else if (sortOrder === "most-voted") {
        return b.votes - a.votes;
      }
      return 0;
    });
  };

  const sortComments = (sortOrder) => {
    setComments((prevComments) => sortNodes(prevComments, sortOrder));
  };

  const upDownVote = (tree, upvote, commentId) => {
    return tree.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          votes: upvote ? comment.votes + 1 : comment.votes - 1,
        };
      } else if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: upDownVote(comment.replies, upvote, commentId),
        };
      }
      return comment;
    });
  };

  const upDownVoteComment = (upvote = true, commentId) => {
    setComments((prevComments) => upDownVote(prevComments, upvote, commentId));
  };

  return {
    comments,
    insertComment,
    editComment,
    deleteComment,
    sortComments,
    upDownVoteComment,
  };
};

export default useCommentTree;
