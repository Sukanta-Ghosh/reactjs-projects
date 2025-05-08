//import Folder from "./components/Folder";
import Folder from "./components-ts/Folder";
import folderData from "./data/folderData.json";
import "./App.css";

function App() {
  return (
    <>
      <Folder folders={folderData[0]} />
    </>
  );
}

export default App;
