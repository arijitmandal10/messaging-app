import React, { useContext } from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { AuthContext } from '../context/AuthContext';
const Navbar = () => {
	const { currentUser } = useContext(AuthContext);
	console.log(currentUser);
	return (
		<div className='nav'>
			<span>Ari-Chat💬</span>
			<div>
				<img src={currentUser.photoURL} alt='' />
				<p>{currentUser.displayName}</p>
				<button onClick={() => signOut(auth)}>Logout</button>
			</div>
		</div>
	);
};

export default Navbar;
