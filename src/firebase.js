// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyDLNTyCyctJ28KhWXE9CP8E7pAkpsEDbJY',
	authDomain: 'chat-app-88a42.firebaseapp.com',
	projectId: 'chat-app-88a42',
	storageBucket: 'chat-app-88a42.appspot.com',
	messagingSenderId: '409448459696',
	appId: '1:409448459696:web:84688fd0da2483d1007a75',
	measurementId: 'G-JYJ4PVNELM',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
const analytics = getAnalytics(app);
