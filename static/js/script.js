// Get the video element
const video = document.getElementById('video');

// Prompt the user for permission to access the webcam
navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
        // Set the video source to the webcam stream
        video.srcObject = stream;
    })
    .catch((err) => {
        console.error('Error accessing the webcam: ', err);
    });
