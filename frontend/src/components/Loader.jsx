const Loader = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center ">
      <div className="relative w-12 h-12 inline-block">
        <div className="absolute w-12 h-12 border-2 border-white rounded-full animate-ping"></div>
        <div
          className="absolute w-12 h-12 border-2 border-white rounded-full animate-ping"
          style={{ animationDelay: "1s" }} // use inline delay if no plugin
        ></div>
      </div>
    </div>
  );
};

export default Loader;
