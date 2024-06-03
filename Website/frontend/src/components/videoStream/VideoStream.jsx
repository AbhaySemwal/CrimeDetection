"use client";
import React, { useRef, useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const VideoStream = () => {
    const [prediction, setPrediction] = useState('');
    const [videoUploaded, setVideoUploaded] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [source, setSource] = useState('');
    const iframeRef = useRef(null);

    useEffect(() => {
        socket.on('prediction', (data) => {
            setPrediction(`Prediction: ${data.prediction}, Label: ${data.label}`);
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
                iframeRef.current.src = 'http://localhost:5000/video_feed';
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
        <div className="flex flex-col items-center min-h-screen py-8">
            <h1 className="text-4xl font-bold mb-8 text-gray-800">Crime Detection through CCTV Surveillance</h1>
            <div className="flex flex-col mb-4">
                <button 
                    onClick={() => { setSource('live'); startVideo(); }} 
                    className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                >
                    Start Live Feed
                </button>
                <input 
                    type="file" 
                    accept="video/*" 
                    onChange={handleVideoUpload} 
                    className="p-2 border border-gray-300 rounded-md"
                />
            </div>
            {(videoUploaded || source === 'live') && (
                <div className="w-full max-w-4xl p-4 rounded-lg shadow-md">
                    <iframe 
                        ref={iframeRef}
                        width="100%" 
                        height="400"
                        frameBorder="0"
                        allow="autoplay"
                        className="mb-4"
                    ></iframe>
                    <div className="flex justify-between">
                        <button 
                            onClick={startVideo} 
                            className={`px-4 py-2 rounded-md ${isPlaying ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-700'} text-white`}
                            disabled={isPlaying}
                        >
                            Play Video
                        </button>
                        <button 
                            onClick={pauseVideo} 
                            className={`px-4 py-2 rounded-md ${!isPlaying ? 'bg-gray-500' : 'bg-yellow-500 hover:bg-yellow-700'} text-white`}
                            disabled={!isPlaying}
                        >
                            Pause Video
                        </button>
                        <button 
                            onClick={handleStopVideo} 
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
                        >
                            Cancel Video
                        </button>
                    </div>
                </div>
            )}
            {prediction && (
                <p className="mt-4 p-4 bg-green-100 text-green-700 rounded-md shadow-md">{prediction}</p>
            )}
        </div>
    );
};

export default VideoStream;
