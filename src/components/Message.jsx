import React from 'react';
import DP from '../assets/DP.jpg';

const Message = () => {
	return (
		<div className='message'>
			<div>
				<img id='dp' src={DP} alt='' />
				<span>time</span>
			</div>

			<span>
				<p>hello guys, nice to meet you all</p>
				<img src={DP} alt='' />
			</span>
		</div>
	);
};

export default Message;
