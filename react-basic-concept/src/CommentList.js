import React from "react";
const CommentList = (props) => {
  const [content, setContent] = React.useState("");
  const [item, setItem] = React.useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setItem([...item, content]);
    setContent("");
  };

  return (
    <div>
      <form>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input type="button" value="Post" onClick={handleSubmit} />
      </form>
      <ul>
        {item.map((i) => (
          <li>{i}</li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
