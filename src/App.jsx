import {
  RouterProvider,
  Outlet,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import Navbar from "./Components/Navbar";
import Contact from "./Components/Contact";
import Chat from "./Components/Chat";
import "./App.css";
import { AuthProvider, useAuth } from "./utils/AuthContext";
import SignUp from "./Components/Sign-up";
import { useEffect } from "react";
const Layout = () => {
  const { token } = useAuth();
  const navi = useNavigate();
  useEffect(() => {
    if (!token) {
      navi("/sign-up");
    }
  }, []);
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="chat-nav">
        <Outlet />
      </div>
    </div>
  );
};
const route = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/chat/:id",
        element: <Chat />, // Now Chat is independent
      },
    ],
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
]);

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={route} />
    </AuthProvider>
  );
};

export default App;
