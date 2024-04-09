import Login from './pages/login/Login';
import SignUpPage from './pages/signup/Signup';
import UploadFile from './pages/upload/UploadFile';
import Notes from './pages/notes/Notes';
import AuthContext from "./pages/context/AuthContext";
import ProtectedRoute  from './pages/routes/ProtectedRoute'
import Error from './pages/Error';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'



function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute><Notes /></ProtectedRoute>
    },
    {
      path: "/login",
      element:<Login/>
    },
    {
      path: "/signup",
      element: <SignUpPage/>
    },
    {
      path: "/upload",
      element: <ProtectedRoute><UploadFile /></ProtectedRoute>
    },
    {
      path: "/home",
      element: <ProtectedRoute><Notes /></ProtectedRoute>
      
    }
  ])
  return (
    <AuthContext>
      <RouterProvider router={router}></RouterProvider>
    </AuthContext>
  );
}

export default App;
