from flask import Flask, Response, request
from flask_cors import CORS
from flask_socketio import SocketIO, emit
import tensorflow as tf
import numpy as np
import cv2

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

model = tf.keras.models.load_model('Models/CustomCNN.h5')

def preprocess_frame(frame):
    frame = cv2.resize(frame, (150, 150))
    frame = frame / 255.0
    return np.expand_dims(frame, axis=0)

def generate_frames(video_source):
    cap = cv2.VideoCapture(video_source)

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        preprocessed_frame = preprocess_frame(frame)
        prediction = model.predict(preprocessed_frame)
        label = 'Suspicious' if prediction[0] > 0.9 else 'Peaceful'
        
        print(f"Prediction: {prediction[0]}, Label: {label}")

        socketio.emit('prediction', {'prediction': float(prediction[0]), 'label': label}, namespace='/')

        cv2.putText(frame, label, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2, cv2.LINE_AA)

        ret, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

    cap.release()

@app.route('/upload', methods=['POST'])
def upload_video():
    file = request.files['file']
    file.save('uploaded_video.mp4')
    return '', 204

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(0), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/uploaded_video_feed')
def uploaded_video_feed():
    return Response(generate_frames('uploaded_video.mp4'), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    socketio.run(app, debug=True)
