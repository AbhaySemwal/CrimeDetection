"use client";
import React, { useRef, useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const CrimeDetector = () => {
    const [prediction, setPrediction] = useState('');
    const [videoUploaded, setVideoUploaded] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [source, setSource] = useState('');
    const [cameras, setCameras] = useState([]);
    const [selectedCamera, setSelectedCamera] = useState('');
    const iframeRef = useRef(null);

    useEffect(() => {
        socket.on('prediction', (data) => {
            setPrediction(`Prediction: ${data.prediction}, Label: ${data.label}`);
        });

        navigator.mediaDevices.enumerateDevices().then(devices => {
            const videoDevices = devices.filter(device => device.kind === 'videoinput');
            setCameras(videoDevices);
            if (videoDevices.length > 0) {
                setSelectedCamera(videoDevices[0].deviceId);
            }
        });

        return () => {
            socket.off('prediction');
        };
    }, []);

    const handleVideoUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            await fetch('http://localhost:5000/upload', {
                method: 'POST',
                body: formData,
            });

            setVideoUploaded(true);
            setSource('uploaded');
            startVideo();
        }
    };

    const startVideo = () => {
        if (iframeRef.current) {
            if (source === 'live') {
                iframeRef.current.src = `http://localhost:5000/video_feed?cameraId=${selectedCamera}`;
            } else if (source === 'uploaded') {
                iframeRef.current.src = 'http://localhost:5000/uploaded_video_feed';
            }
            setIsPlaying(true);
        }
    };

    const pauseVideo = () => {
        if (iframeRef.current) {
            iframeRef.current.src = '';
            setIsPlaying(false);
        }
    };

    const handleStopVideo = () => {
        setVideoUploaded(false);
        setPrediction('');
        setSource('');
        if (iframeRef.current) {
            iframeRef.current.src = '';
        }
        setIsPlaying(false);
    };

    return (
        <section id='cd' className="flex flex-col items-center py-10 text-white">
            <h1 className='text-4xl font-semibold text-center pb-10'>Crime Detector</h1>
            <div className="flex items-center gap-4 py-5 bg-slate-800 px-5 rounded-md mb-5">
                {cameras.length > 0 && (
                    <div className="flex gap-2 items-center">
                        <label className="text-white text-xl font-medium">Select Camera: </label>
                        <select
                            className="px-4 py-2 bg-slate-500 rounded-md"
                            value={selectedCamera}
                            onChange={(e) => setSelectedCamera(e.target.value)}
                        >
                            {cameras.map((camera) => (
                                <option key={camera.deviceId} value={camera.deviceId}>
                                    {camera.label || `Camera ${camera.deviceId}`}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                <button 
                    onClick={() => { setSource('live'); startVideo(); }} 
                    className="bg-green-600 hover:bg-green-800 rounded-md px-10 py-2 "
                >
                    Start Live Feed
                </button>
                <h4 className='px-5'>OR</h4>
                <label className='px-10 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 cursor-pointer' htmlFor="uploadvdo">Upload Video</label>
                <input 
                    id='uploadvdo'
                    name='uploadvdo'
                    type="file" 
                    accept="video/*" 
                    onChange={handleVideoUpload} 
                    className="hidden"
                />
            </div>
            {(videoUploaded || source === 'live') && (
                <div className="w-full max-w-[680px] overflow-x-hidden p-4 rounded-lg shadow-md bg-slate-800">
                    <iframe 
                        ref={iframeRef}
                        width="100%" 
                        height="500"
                        allow="autoplay"
                        className="mb-4"
                    ></iframe>
                    <div className="flex justify-between">
                        <button 
                            onClick={startVideo} 
                            className={`px-4 py-2 flex gap-1 justify-center items-center rounded-md ${isPlaying ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-700'} text-white`}
                            disabled={isPlaying}
                        >
                            Play 
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 4.5L17.5 12L6 19.5Z" />
                            </svg>
                        </button>
                        <button 
                            onClick={pauseVideo} 
                            className={`px-4 py-2 rounded-md flex justify-center items-center gap-1 ${!isPlaying ? 'bg-gray-500' : 'bg-yellow-500 hover:bg-yellow-700'} text-white`}
                            disabled={!isPlaying}
                        >
                            Pause
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                            <rect x="6" y="6" width="4" height="12" />
                            <rect x="14" y="6" width="4" height="12" />
                            </svg>

                        </button>
                        <button 
                            onClick={handleStopVideo} 
                            className="px-4 py-2 flex justify-center items-center gap-1 bg-red-500 text-white rounded-md hover:bg-red-700"
                        >
                            Cancel Video
                        </button>
                    </div>
                </div>
            )}
            {prediction && (
                <p className="mt-4 p-4 bg-slate-700 rounded-md shadow-md text-white font-medium">{prediction}</p>
            )}
        </section>
    );
};

export default CrimeDetector;
