import React from "react";
import { useState } from "react";

const useTree = ({ initialComments }) => {
  const [comments, setComments] = useState([]);

  const insertComment = (parentCommentId, content) => {
    const newComment = {
      id: Date.now(),
      content: content,
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

  const insertNode = (tree, parentCommentId, newComment) => {
    return tree.map((node) => {
      if (node.id === parentCommentId) {
        return { ...node, replies: [...node.replies, newComment] };
      } else {
        if (node.replies && node.replies.length > 0) {
          return {
            ...node,
            replies: insertNode(node.replies, parentCommentId, newComment),
          };
        }
      }

      return node;
    });
  };

  const editNode = (tree, commentId, content) => {
    return tree.map((node) => {
      if (node.id === commentId) {
        return {
          ...node,
          content: content,
          timestamp: new Date().toISOString(),
        };
      } else if (node.replies && node.replies.length > 0) {
        return { ...node, replies: editNode(node.replies, commentId, content) };
      }
      return node;
    });
  };

  const editComment = (commentId, content) => {
    setComments((prevComments) => editNode(prevComments, commentId, content));
  };

  const deleteNode = (tree, commentId) => {
    return tree.reduce((acc, node) => {
      if (node.id === commentId) {
        return acc;
      } else if (node.replies && node.replies.length > 0) {
        node.replies = deleteNode(node.replies, commentId);
      }

      return [...acc, node];
    }, []);
  };

  const deleteComment = (commentId) => {
    setComments((prevComments) => deleteNode(prevComments, commentId));
  };

  return { comments };
};

export default useTree;
