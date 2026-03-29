import { useEffect, useState } from 'react';

const useVoice = () => {
    const [transcript, setTranscript] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    let recognition;

    useEffect(() => {
        // Check if browser supports speech recognition
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognition = new SpeechRecognition();
            recognition.interimResults = true;

            recognition.onresult = (event) => {
                const { transcript: result } = event.results[0];
                setTranscript(result);
            };

            recognition.onend = () => {
                setIsRecording(false);
            };
        } else {
            console.error('Speech recognition not supported in this browser.');
        }
    }, []);

    const startRecording = () => {
        if (recognition) {
            setIsRecording(true);
            recognition.start();
        }
    };

    const stopRecording = () => {
        if (recognition) {
            setIsRecording(false);
            recognition.stop();
        }
    };

    return { transcript, isRecording, startRecording, stopRecording };
};

export default useVoice;
