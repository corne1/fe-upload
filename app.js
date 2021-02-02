import firebase from 'firebase/app';
import 'firebase/storage';
import { upload } from './upload.js';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCL78uHDLCA5w6jzX5eSciTnAEKTseXSIw",
    authDomain: "fe-upload-e01a5.firebaseapp.com",
    projectId: "fe-upload-e01a5",
    storageBucket: "fe-upload-e01a5.appspot.com",
    messagingSenderId: "9735548737",
    appId: "1:9735548737:web:5f0963120ec8afa9fd3bc0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage()

upload('#file', {
    multi: true,
    accept: ['.png', '.jpg', 'jpeg', '.gif'],
    onUpload(files, blocks) {
        files.forEach((file, index) => {
            const ref = storage.ref(`images/${file.name}`)
            const task = ref.put(file);
            task.on('state_changed', (snapshot) => {
                const percentage = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0) + '%';
                const block = blocks[index].querySelector('.preview-info-progres');
                block.textContent = percentage;
                block.style.width = percentage;
            }, err => {
                console.log(err);
            }, () => {
                task.snapshot.ref.getDownloadURL().then(url => {
                    console.log('Download url: ', url);
                })
            })
        })
    }
})
console.log('hello-world');