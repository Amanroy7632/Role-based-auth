
import { useAuth } from "../../context/authContext";
import {Navigate, Outlet} from "react-router-dom";
function ProtectedPage({children}) {
  const { currentUser, isLoading } = useAuth();
  if (isLoading) {
    return<FloatingCirclesLoader/>;
  }
  if (!currentUser) {
    return <Navigate to={"/login"} replace/>
  }
  return children||<Outlet/>;
}

export default ProtectedPage;

function FloatingCirclesLoader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex space-x-2">
        {[0, 1, 2].map((i) => (
          <div 
            key={i}
            className="w-4 h-4 bg-blue-600 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    </div>
  );
};