import { useNavigate } from "react-router-dom";

const Movie = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1>잘못 들어왔어요</h1>
      <button onClick={() => navigate("/")}>홈으로 이동</button>
    </>
  );
};

export default Movie;
