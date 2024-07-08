import { useState } from "react";
import { CiFolderOn } from "react-icons/ci";

function Folder({ explorer }) {
  const [expand, setExpand] = useState(false);

  return explorer.isFolder ? (
    <div>
      <div className="folder">
        <CiFolderOn />
        <span onClick={() => setExpand(!expand)}>
          {explorer.name}
          <br />
        </span>
      </div>

      <div style={{ display: expand ? "block" : "none", paddingLeft: 15 }}>
        {explorer.items.map((exp) => {
          return <Folder explorer={exp} key={exp.name} />;
        })}
      </div>
    </div>
  ) : (
    <span>
      {explorer.name}
      <br />
    </span>
  );
}

export default Folder;
