const videoElement = document.getElementById('videoElement');

// 카메라 스트림 가져오기
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        videoElement.srcObject = stream;
    })
    .catch(error => {
        console.error('Error accessing camera:', error);
    });

// 이미지 캡처 및 서버로 전송
function captureAndSendImage() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/jpeg');

    // 이미지 데이터를 서버로 전송
    fetch('/upload_image', {
        method: 'POST',
        body: JSON.stringify({ image_data: imageData }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        console.log('Image sent successfully');
    })
    .catch(error => {
        console.error('Error sending image:', error);
    });
}

// 이미지 캡처 및 전송 이벤트 핸들러
setInterval(captureAndSendImage, 1000); // 1초마다 이미지 캡처 및 전송
