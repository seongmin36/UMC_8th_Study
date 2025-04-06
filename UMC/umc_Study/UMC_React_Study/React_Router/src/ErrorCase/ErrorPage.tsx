import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col p-4">
      <span className="flex justify-center text-2xl font-bold text-red-600">
        ⚠️Warning! Page Not Found..⚠️
      </span>
      <button
        onClick={() => navigate("/")}
        className="flex justify-center p-4 font-bold text-red-600 border-black"
      >
        홈으로 이동🏠
      </button>
    </div>
  );
};

export default ErrorPage;
