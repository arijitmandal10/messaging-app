import React, { useContext } from 'react';
import Signup from './pages/signup';
import Login from './pages/login';
import Home from './pages/home';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

const App = () => {
	const { currentUser } = useContext(AuthContext);

	const ProctectedRoute = ({ children }) => {
		if (!currentUser) {
			return <Navigate to='/login' />;
		}
		return children;
	};

	const router = createBrowserRouter([
		{
			path: '/',
			element: (
				<ProctectedRoute>
					<Home />
				</ProctectedRoute>
			),
		},
		{
			path: '/login',
			element: <Login />,
		},
		{
			path: '/signup',
			element: <Signup />,
		},
	]);

	return <RouterProvider router={router} />;
};
export default App;
