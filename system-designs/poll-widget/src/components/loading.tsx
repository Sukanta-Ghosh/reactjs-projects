import "../styles/loading.css";

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-box">
        <div className="loading-pulse">
          <div className="loading-bar bar-1"></div>
          <div className="loading-bar bar-2"></div>
          <div className="loading-bar bar-3"></div>
          <div className="loading-bar bar-4"></div>
          <div className="loading-bar bar-5"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
