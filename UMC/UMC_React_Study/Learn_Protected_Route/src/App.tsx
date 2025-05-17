import { Outlet, useNavigate } from "react-router-dom";

export default function App() {
  const nav = useNavigate();

  const handleClick = (path: string) => {
    nav(path);
  };

  return (
    <div>
      Home
      <div>
        <button onClick={() => handleClick("public")}>Public Page</button>
        <button onClick={() => handleClick("private")}>Private Page</button>
      </div>
      <Outlet />
    </div>
  );
}
