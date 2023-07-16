import React from 'react';

const Input = () => {
	return (
		<div className='chat-input'>
			<input type='text' name='text' placeholder='message' /> &nbsp;
			<input type='file' name='file' id='attachments' style={{ display: 'none' }} />
			<label htmlFor='attachments'>📂</label> &nbsp;
			<button type='button'>▶️</button>
		</div>
	);
};

export default Input;
