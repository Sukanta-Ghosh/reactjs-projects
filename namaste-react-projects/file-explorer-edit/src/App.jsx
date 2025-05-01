//import Folder from "./components/Folder";
import Folder from "./components-ts/Folder";
import folderData from "./components/folderData.json";
import "./App.css";

function App() {
  return (
    <>
      <Folder folders={folderData[0]} />
    </>
  );
}

export default App;
