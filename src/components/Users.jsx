import React from 'react';
import DP from '../assets/DP.jpg';

const Users = () => {
	return (
		<div className='users'>
			<img src={DP} alt='' />
			<div>
				<span>Name</span>
				<p>latest message</p>
			</div>
		</div>
	);
};

export default Users;
