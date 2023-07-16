import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	// const [err, setErr] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const navigate = useNavigate();

	const handleTogglePassword = () => {
		setShowPassword(!showPassword);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const email = e.target[0].value;
		const password = e.target[1].value;

		try {
			signInWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					const user = userCredential.user;
					setErrorMessage('');
					navigate('/');
				})
				.catch((error) => {
					const errorMessage = error.message;
					setErrorMessage(errorMessage);
				});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='form-container'>
			<h2>Login to your Account</h2>
			<form onSubmit={handleSubmit}>
				<input
					type='email'
					name='email'
					placeholder='Enter your email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<div>
					{' '}
					<input
						type={showPassword ? 'text' : 'password'}
						name='password'
						placeholder='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<button onClick={handleTogglePassword}>{showPassword ? '👁️‍🗨️' : '👁️‍🗨️'}</button>
				</div>
				{!errorMessage ? '' : <p>{errorMessage}</p>}

				<button type='submit'>Login</button>
				<span>
					Dont have an account? <Link to='/signup'>Register</Link>{' '}
				</span>
			</form>
		</div>
	);
}
