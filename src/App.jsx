import { RouterProvider, Outlet, createBrowserRouter } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Contact from "./Components/Contact";
import Chat from "./Components/Chat";
import "./App.css";
import { AuthProvider, useAuth } from "./utils/AuthContext";
import SignUp from "./Components/Sign-up";
import { useEffect } from "react";
import Login from "./Components/Login";
import Validation from "./utils/Validation";
const Layout = () => {
 
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
    element: (
      <Validation>
        <Layout />
      </Validation>
    ),
    children: [
      {
        path: "/chat/:id",
        element: <Chat />,
      },
    ],
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
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
