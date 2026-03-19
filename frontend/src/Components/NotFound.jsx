import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      
      <h1 className="text-8xl font-bold text-blue-500">404</h1>
      
      <h2 className="text-2xl md:text-3xl font-semibold mt-4 text-gray-800">
        Page Not Found
      </h2>

      <p className="text-gray-500 mt-2 text-center max-w-md">
        Sorry, the page you are looking for doesn’t exist or has been moved.
      </p>

      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-300"
      >
        Go Back Home
      </Link>

    </div>
  );
};

export default NotFound;