import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-blue-100 p-2 text-blue-600">
      <div className="container mx-auto text-center text-gray-600 dark:text-gray-600">
        <p>
          &copy; {new Date().getFullYear()} SpinningSpinning Dolimpan. All right
          reserved.
        </p>
        <div className={"flex justify-center space-x-4 mt-4"}>
          <Link to={"#"}>Privacy Policy</Link>
          <Link to={"#"}>Terms of Service</Link>
          <Link to={"#"}>Contact</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
