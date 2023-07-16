import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, storage, db } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { setDoc, doc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
	const [displayName, setdisplayName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmpassword, setConfirmpassword] = useState('');
	const [err, setErr] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const displayName = e.target[0].value;
		const email = e.target[1].value;
		const password = e.target[2].value;
		const file = e.target[4].files[0];

		if (password !== confirmpassword) {
			setErr(true);
			return;
		}

		try {
			setErr(false);
			const res = await createUserWithEmailAndPassword(auth, email, password);

			// Upload the file to Firebase Storage and wait for the upload to complete
			const date = new Date().getTime();
			const storageRef = ref(storage, `${displayName + date}`);

			const uploadTask = await uploadBytesResumable(storageRef, file); // Wait for the upload to complete and get the download URL

			const downloadURL = await getDownloadURL(uploadTask.ref);

			// Update Firestore with user data
			await updateProfile(res.user, {
				displayName,
				photoURL: downloadURL,
			});

			await setDoc(doc(db, 'users', res.user.uid), {
				uid: res.user.uid,
				displayName,
				email,
				photoURL: downloadURL,
			});

			await setDoc(doc(db, 'userChat', res.user.uid), {});

			navigate('/');
			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='form-container'>
			<h2>Register Your Account</h2>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					name='name'
					placeholder='Enter User Name'
					value={displayName}
					onChange={(e) => setdisplayName(e.target.value)}
					required
				/>
				<input
					type='email'
					name='email'
					placeholder='Enter your email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<input
					type='password'
					name='password'
					placeholder='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<input
					type='password'
					name='confirmpassword'
					placeholder='confirm password'
					value={confirmpassword}
					onChange={(e) => setConfirmpassword(e.target.value)}
					required
				/>
				{!err ? '' : <p>passwords do not match!!😥</p>}
				<input type='file' name='file' id='avatar' />
				<label htmlFor='avatar'>
					<p>📷</p>
				</label>

				<button type='submit'>Register</button>
				<span>
					Already have an account? <Link to='/login'>Login</Link>{' '}
				</span>
			</form>
		</div>
	);
};

export default Signup;
