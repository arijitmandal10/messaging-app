import React, { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Search = () => {
	const [username, setUsername] = useState('');
	const [user, setUSer] = useState(null);
	const [err, setErr] = useState(false);

	const handleSearch = async () => {
		const q = query(collection(db, 'users'), where('displayName', '==', username));
		try {
			const querySnapshot = await getDocs(q);
			querySnapshot.forEach((doc) => {
				// doc.data() is never undefined for query doc snapshots
				setUSer(doc.data());
			});
		} catch (error) {
			setErr(true);
		}
	};

	const handleKey = (e) => {
		e.code === 'Enter' && handleSearch();
	};
	return (
		<div className='search'>
			<input type='text' name='text' placeholder='search user' onChange={(e) => setUsername(e.target.value)} onKeyDown={handleKey} />
			{err && <span>user not found!</span>}
			{user && (
				<div className='users'>
					<img src={user.photoURL} alt='' />
					<div>
						<span>{user.displayName}</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default Search;
