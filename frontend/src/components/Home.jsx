function Home() {
  let images = ["hotel1.jpg", "hotel2.jpg", "hotel3.jpg", "hotel4.jpg"];
  return (
    <div className="grid grid-cols-2 gap-4">
      {images.map((ele, index) => {
        return <img src={ele} key={index}></img>;
      })}
    </div>
  );
}

export default Home;
