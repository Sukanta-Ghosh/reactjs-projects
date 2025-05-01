import React, { useState } from "react";
import { FolderNode, FolderProps } from "./types";

const Folder: React.FC<FolderProps> = ({ folders }) => {
  const [explorer, setExplorer] = useState<FolderNode>(folders);
  const [expand, setExpand] = useState<boolean>(false);

  const addNodeToList = () => {
    const newItemName = prompt("Enter name:");
    if (!newItemName) {
      return;
    }

    const updateTree = (node: FolderNode) => {
      return {
        ...node,
        children: [
          ...node.children,
          {
            id: Date.now(),
            name: newItemName,
            isFolder: newItemName.includes(".") ? false : true,
            children: [],
          },
        ],
      };
    };

    setExplorer((explorer) => updateTree(explorer));
  };

  const deleteNodeToList = () => {
    setExplorer({} as FolderNode);
  };

  return explorer?.isFolder ? (
    <div>
      <div className="folder">
        <span onClick={() => setExpand(!expand)}>
          {expand ? "📂" : "📁"}&nbsp;
          {explorer.name}
        </span>
        &nbsp;
        <span onClick={addNodeToList}>➕</span>
        &nbsp;
        <div onClick={() => deleteNodeToList()}>🗑️</div>
      </div>

      {/* Folder Child */}
      <div
        className="folder-child"
        style={{ display: expand ? "block" : "none" }}
      >
        {explorer.children?.map((obj) => (
          <Folder folders={obj} key={obj.id} />
        ))}
      </div>
    </div>
  ) : (
    <div style={{ display: explorer.name ? "block" : "none" }}>
      {explorer.name}
      &nbsp;
      <span onClick={() => deleteNodeToList()}>🗑️</span>
    </div>
  );
};

export default Folder;
