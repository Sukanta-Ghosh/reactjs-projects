import { useState } from "react";
import "./App.css";
import Folder from "./components/Folder";
import explorer from "./data/folderData";

function App() {
  return (
    <>
      <Folder explorer={explorer} />
    </>
  );
}

export default App;
