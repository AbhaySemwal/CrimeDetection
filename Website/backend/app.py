from flask import Flask, Response, request
from flask_cors import CORS
from flask_socketio import SocketIO, emit
import tensorflow as tf
import numpy as np
import cv2

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# Load your trained .h5 model
model = tf.keras.models.load_model('/home/shobhits/Documents/Mini Project/CrimeDetection/Website/backend/Models/1717240268.h5')

def preprocess_frame(frame):
    # Resize and normalize the frame as required by your model
    frame = cv2.resize(frame, (150, 150))  # Example size, adjust to your model's input size
    frame = frame / 255.0
    return np.expand_dims(frame, axis=0)

def generate_frames():
    cap = cv2.VideoCapture('uploaded_video.mp4')

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        preprocessed_frame = preprocess_frame(frame)
        prediction = model.predict(preprocessed_frame)
        label = 'Suspicious' if prediction[0] > 0.85 else 'Normal'

        # Print prediction value to the console
        print(f"Prediction: {prediction[0]}, Label: {label}")

        # Send prediction to the frontend via WebSocket
        socketio.emit('prediction', {'prediction': float(prediction[0]), 'label': label}, namespace='/')

        # Overlay the prediction on the frame
        cv2.putText(frame, label, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2, cv2.LINE_AA)

        # Convert frame to JPEG
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
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    socketio.run(app, debug=True)
