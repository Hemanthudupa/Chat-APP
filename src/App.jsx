import { RouterProvider, Outlet, createBrowserRouter } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Contact from "./Components/Contact";
import Chat from "./Components/Chat";
import "./App.css";
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
    element: <Layout />,
    children: [
      {
        path: "/chat/:id",
        element: <Chat />, // Now Chat is independent
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={route} />;
};

export default App;
