import React, { useState } from 'react';
import { FaSpinner, FaCheck, FaPlay, FaPause, FaPlayCircle, FaPauseCircle } from 'react-icons/fa';
import confetti from 'canvas-confetti';
import logo from '././../../../../metronics_v8.2.0-main/src/Asset/playbook/Call center image.png'
import DownloadComponent from './ReusableComponent/DownloadComponent';
import Loader from './ReusableComponent/Loader';

const BASE_URL = process.env.REACT_APP_API_URL;

const Text = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [transcriptions, setTranscriptions] = useState({});
  const [processingStatus, setProcessingStatus] = useState({});
  const [loading, setLoading] = useState(false);
  const [emotionResults, setEmotionResults] = useState({});
  const [topicModel, setTopicModel] = useState({})
  const [viewMode, setViewMode] = useState('transcription'); // 'transcription' or 'sentiment'
  const [showLogo, setShowLogo] = useState(false);
  const [audioStatus, setAudioStatus] = useState({});

  const filesPerPage = 10;

  const handleFileChange = (e) => {
    setShowLogo(true);
    const filesArray = Array.from(e.target.files);
    setSelectedFiles(filesArray);

    // Initialize audio status for each file
    const initialAudioStatus = {};
    filesArray.forEach(file => {
      initialAudioStatus[file.name] = { isPlaying: false, audio: new Audio(URL.createObjectURL(file)) };
    });
    setAudioStatus(initialAudioStatus);
  };

  const togglePlayPause = (fileName) => {
    const audioData = audioStatus[fileName];

    if (audioData.isPlaying) {
      audioData.audio.pause();
    } else {
      audioData.audio.play();
    }

    setAudioStatus(prevStatus => ({
      ...prevStatus,
      [fileName]: { ...audioData, isPlaying: !audioData.isPlaying }
    }));
  };

  // const handleFileUpload = async () => {
  //   setLoading(true);
  //   const results = {};
  //   const statusUpdates = {};
  //   const emotionResults = {};

  //   for (const file of selectedFiles) {
  //     const formData = new FormData();
  //     formData.append('audioFile', file);
  //     statusUpdates[file.name] = 'loading';
  //     setProcessingStatus({ ...statusUpdates });

  //     try {
  //       //Call /startRecognition
  //       const recognitionResponse = await fetch(`${BASE_URL}/startRecognition`, {
  //         method: 'POST',
  //         body: formData,
  //       });
  //       const recognitionResult = await recognitionResponse.json();

  //       if (recognitionResult.results && recognitionResult.results.length > 0) {
  //         const fileData = recognitionResult.results[0];
  //         results[fileData.fileName] = fileData;
  //         statusUpdates[fileData.fileName] = 'done';
  //       }

  //       // Call /predict for emotion detection
  //       const predictResponse = await fetch(`http://127.0.0.1:5000/predict`, {
  //         method: 'POST',
  //         body: formData,
  //       });
  //       const predictResult = await predictResponse.json();

  //       if (predictResult.emotion) {
  //         emotionResults[file.name] = {
  //           emotion: predictResult.emotion,
  //           confidence: predictResult.confidence,
  //         };
  //       }

  //     } catch (error) {
  //       console.error('Error processing file:', file.name, error);
  //       statusUpdates[file.name] = 'error';
  //     }
  //     setProcessingStatus({ ...statusUpdates });
  //   }
  //   setTranscriptions(results);
  //   setEmotionResults(emotionResults); // Assuming you have a state for this
  //   setLoading(false);
  //   confetti({
  //     particleCount: 100,
  //     spread: 70,
  //     origin: { y: 0.6 },
  //   });
  // };



  const handleFileUpload = async () => {
    setShowLogo(true); // Show the logo when processing starts
    setLoading(true);
    const results = {};
    const statusUpdates = {};
    const emotionResults = {};

    for (const file of selectedFiles) {
      const formData = new FormData();
      formData.append('audioFile', file);
      statusUpdates[file.name] = 'loading';
      setProcessingStatus({ ...statusUpdates });

      try {
        // Call /startRecognition
        const recognitionResponse = await fetch(`${BASE_URL}/startRecognition`, {
          method: 'POST',
          body: formData,
        });
        const recognitionResult = await recognitionResponse.json();

        if (recognitionResult.results && recognitionResult.results.length > 0) {
          const fileData = recognitionResult.results[0];
          results[fileData.fileName] = fileData;
          statusUpdates[fileData.fileName] = 'done';
        }

        // Call /predict for emotion detection
        const predictResponse = await fetch(`http://127.0.0.1:5000/predict`, {
          method: 'POST',
          body: formData,
        });
        const predictResult = await predictResponse.json();

        if (predictResult.emotion) {
          emotionResults[file.name] = {
            emotion: predictResult.emotion,
            confidence: predictResult.confidence,
          };
        }

      } catch (error) {
        console.error('Error processing file:', file.name, error);
        statusUpdates[file.name] = 'error';
      }

      // Update processing status and results after each file is processed
      setProcessingStatus({ ...statusUpdates });
      setTranscriptions(results);
      setEmotionResults(emotionResults);
    }
    // After processing all files, send transcriptions to /topic-modeling
    try {

      const topicModelingResponse = await fetch(`http://127.0.0.1:5000/topic-modeling`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({ textDocuments: Object.values(results) }),
      });
      const topicModelingResult = await topicModelingResponse.json();
      console.log('Topic Modeling Result:', topicModelingResult);

      // Store the topic modeling result in the topicModel state
      setTopicModel(topicModelingResult); // Ensure the response is stored in topicModel state
    } catch (error) {
      console.error('Error sending to topic modeling:', error);
    }

    setLoading(false);
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, });
  };

  const handleOutputClick = () => {
    const allProcessed = selectedFiles.every(file => processingStatus[file.name] === 'done');

    if (allProcessed) {
      setViewMode('transcription'); // Show transcriptions when Output button is clicked
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } else {
      alert('Processing not completed yet. Please wait until all files are processed.');
    }
  };

  const handleSentimentClick = () => {
    try {
      setViewMode('sentiment'); // Switch to sentiment view 
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (error) {
      alert('sentiment data not available');
    }
  };

  const handleClickProununciation = () => {
    const allProcessed = selectedFiles.every(file => processingStatus[file.name] === 'done');
    if (allProcessed) {
      setViewMode('PronunciationAssessment')
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } else {
      alert('Processing not completed yet.please wait untill all files are processed.')
    }
  }
  const handleClickPIIentity = () => {
    const allProcessed = selectedFiles.every(file => processingStatus[file.name] === 'done');
    if (allProcessed) {
      setViewMode('PII')
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } else {
      alert('Processing not completed yet.please wait untill all files are processed.')
    }
  }

  // const handleSummaryClick = async () => {
  //   setLoading(true); // Show the spinner
  //   const summaries = {};

  //   console.log("Transcriptions before sending:", transcriptions);

  //   for (const file of selectedFiles) {
  //     const transcriptionText = transcriptions[file.name]?.transcription;

  //     if (!transcriptionText) {
  //       console.warn(`No transcription available for file: ${file.name}`);
  //       continue; // Skip this file if there's no transcription
  //     }

  //     try {
  //       console.log(`Sending transcription for file: ${file.name}`, transcriptionText);

  //       const response = await fetch('http://127.0.0.1:5000/api/generate-summary', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ text_documents: [transcriptionText] }),

  //       });

  //       console.log(`Sending transcription for file: ${file.name}`, {
  //         textDocuments: [transcriptionText]
  //       });

  //       const result = await response.json();
  //       console.log(`Received summary for file: ${file.name}`, result);

  //       // Assuming the backend returns arrays of summaries
  //       summaries[file.name] = {
  //         extractSummary: result.extract_summaries?.[0] || '[No extract summary available]',
  //         abstractSummary: result.abstract_summaries?.[0] || '[No abstract summary available]',
  //       };

  //     } catch (error) {
  //       console.error('Error generating summaries for file:', file.name, error);
  //     }
  //   }

  //   // Update transcriptions state to include the new summaries
  //   setTranscriptions(prevState => {
  //     const updatedTranscriptions = { ...prevState };
  //     for (const fileName in summaries) {
  //       updatedTranscriptions[fileName].extractSummary = summaries[fileName].extractSummary;
  //       updatedTranscriptions[fileName].abstractSummary = summaries[fileName].abstractSummary;
  //     }
  //     return updatedTranscriptions;
  //   });
  //   setLoading(false); // Hide the spinner after the process completes
  //   setViewMode('summary');
  //   confetti({
  //     particleCount: 100,
  //     spread: 70,
  //     origin: { y: 0.6 },
  //   });
  // };
  const handleSummaryClick = async () => {
    setViewMode('summary'); // Set the view mode to 'summary' when the summary tab is clicked
    setLoading(true); // Show the spinner
  
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    const summaries = {};
    console.log("Transcriptions before sending:", transcriptions);
  
    for (const file of selectedFiles) {
      const transcriptionText = transcriptions[file.name]?.transcription;
  
      if (!transcriptionText) {
        console.warn(`No transcription available for file: ${file.name}`);
        continue; // Skip this file if there's no transcription
      }
  
      try {
        console.log(`Sending transcription for file: ${file.name}`, transcriptionText);
  
        const response = await fetch('http://127.0.0.1:5000/api/generate-summary', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text_documents: [transcriptionText] }),
        });
  
        console.log(`Sending transcription for file: ${file.name}`, {
          textDocuments: [transcriptionText]
        });
  
        const result = await response.json();
        console.log(`Received summary for file: ${file.name}`, result);
  
        summaries[file.name] = {
          extractSummary: result.extract_summaries?.[0] || '[No extract summary available]',
          abstractSummary: result.abstract_summaries?.[0] || '[No abstract summary available]',
        };
  
      } catch (error) {
        console.error('Error generating summaries for file:', file.name, error);
      }
    }
  
    // Update transcriptions state to include the new summaries
    setTranscriptions(prevState => {
      const updatedTranscriptions = { ...prevState };
      for (const fileName in summaries) {
        updatedTranscriptions[fileName].extractSummary = summaries[fileName].extractSummary;
        updatedTranscriptions[fileName].abstractSummary = summaries[fileName].abstractSummary;
      }
      return updatedTranscriptions;
    });
    
    setLoading(false); // Hide the spinner after the process completes
  };
  
  const handleEmotionalToneClick = async () => {
    try {
      setViewMode('DetectEmotionalTone')
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (error) {
      alert('sentiment data not available');
    }

  }

  const handleClickTopicModel = async () => {
    const allProcessed = selectedFiles.every(file => processingStatus[file.name] === 'done');
    if (allProcessed) {
      setViewMode('topicModel');  // Set the viewMode to topicModel for display
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, });
    } else {
      alert('Processing not completed yet. Please wait until all files are processed.');
    }
  };


  // pagination
  const indexOfLastFile = currentPage * filesPerPage;
  const indexOfFirstFile = indexOfLastFile - filesPerPage;
  const currentFiles = selectedFiles.slice(indexOfFirstFile, indexOfLastFile);

  const handleClick = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(selectedFiles.length / filesPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Set up props for DownloadComponent based on viewMode
  const fileName = viewMode === 'sentiment' ? 'sentiment_analysis'
    : viewMode === 'PronunciationAssessment' ? 'pronunciation_assessment'
      : viewMode === 'summary' ? 'summarization'
        : viewMode === 'DetectEmotionalTone' ? 'emotion detection'
          : viewMode === "PII" ? 'topic'
            : viewMode === 'topicModel' ? 'topic_modeling_results'
              : 'transcriptions';
  const headers = viewMode === 'sentiment'
    ? ['File Name', 'Sentiment', 'Confidence Scores (Positive)', 'Confidence Scores (Neutral)', 'Confidence Scores (Negative)']
    : viewMode === 'PronunciationAssessment'
      ? ['File Name', 'Accuracy Score', 'Fluency Score', 'Comprehensibility Score', 'Prosody Score', 'Pronunciation Score']
      : viewMode === 'summary'
        ? ['File Name', 'Abstract Summary', 'Extract Summary']
        : viewMode === 'DetectEmotionalTone'
          ? ['fileName', 'emotion', 'confidence']
          : viewMode === "PII"
            ? ['fileName', 'Topics']
            : viewMode === 'topicModel' ? ['File Name', 'Topics']
              : ['File Name', 'Transcription'];


  const data = selectedFiles.map((file) => {
    if (viewMode === 'sentiment') {
      const sentimentData = transcriptions[file.name]?.sentiment || 'N/A';
      const confidenceScores = transcriptions[file.name]?.confidenceScores || {};
      return [
        file.name,
        sentimentData,
        confidenceScores.positive || 'N/A',
        confidenceScores.neutral || 'N/A',
        confidenceScores.negative || 'N/A'
      ];
    } else if (viewMode === 'PronunciationAssessment') {
      const assessment = transcriptions[file.name]?.pronunciationAssessment || {};
      return [
        file.name,
        assessment.accuracyScore || 'N/A',
        assessment.fluencyScore || 'N/A',
        assessment.compScore || 'N/A',
        assessment.prosodyScore || 'N/A',
        assessment.pronScore || 'N/A'
      ];
    } else if (viewMode === 'summary') {
      const abstractSummary = transcriptions[file.name]?.abstractSummary || '[No abstract summary available]';
      const extractSummary = transcriptions[file.name]?.extractSummary || '[No extract summary available]';
      return [
        file.name,
        abstractSummary,
        extractSummary,
      ];
    } else if (viewMode === 'DetectEmotionalTone') {
      const emotion = emotionResults[file.name]?.emotion || '[No emotion]'
      const confidence = emotionResults[file.name]?.confidence || '[No emotion]';
      return [
        file.name,
        emotion,
        confidence
      ]
    } else if (viewMode === "PII") {
      const topic = transcriptions[file.name]?.piiEntities || '[No Entities]'
      return [
        file.name,
        topic
      ]
    } else if (viewMode === 'topicModel') {
      const topics = topicModel[file.name] || '[No Topics]';
      return [file.name, Array.isArray(topics) ? topics.join(', ') : '[No Topics]'];
    } else {
      return [
        file.name,
        transcriptions[file.name]?.transcription || 'No transcription available'
      ];
    }
  });

  return (
    <div className='p-4 bg-white'>
      {/* file selection and buttons */}
      <div className='flex justify-around items-center'>
        {/* select files */}
        <div className='mb-4'>
          <label htmlFor='file-input' className='bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:[background:linear-gradient(45deg,#9369c7,theme(colors.blue.500)_50%,#c9bdd9)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.yellow.200/.48)_80%,_theme(colors.pink.500)_86%,_theme(colors.pink.300)_90%,_theme(colors.pink.500)_94%,_theme(colors.red.200/.48))_border-box]
           border-2 border-transparent animate-border'>
            Select Files
          </label>
          <input
            id="file-input"
            type="file"
            accept=".wav"
            multiple
            className='hidden'
            onChange={handleFileChange}
          />
          <span className='ml-2 text-gray-500'>{selectedFiles.length} file(s) selected</span>
        </div>
        {/* button */}
        <div className='mb-4'>
          <button onClick={handleFileUpload} className='bg-green-500 text-white px-4 py-2 rounded mr-4 hover:[background:linear-gradient(45deg,#9369c7,theme(colors.green.500)_50%,#c9bdd9)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.yellow.200/.48)_80%,_theme(colors.red.500)_86%,_theme(colors.red.300)_90%,_theme(colors.red.500)_95%,_theme(colors.yellow.200/.48))_border-box]
           border-2 border-transparent animate-border '>
            Process
          </button>
        </div>
        <div className='mb-4 '>
          <button onClick={handleOutputClick}
            className='bg-red-500 text-white px-4 py-2 rounded 
          hover:[background:linear-gradient(45deg,#9369c7,theme(colors.red.500)_50%,#c9bdd9)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.yellow.200/.48)_80%,_theme(colors.blue.500)_86%,_theme(colors.blue.300)_90%,_theme(colors.blue.500)_94%,_theme(colors.red.200/.48))_border-box]
           border-2 border-transparent animate-border'>
            Transcribe
          </button>
        </div>
        <div className='mb-4'>
          <button onClick={handleSentimentClick} className='bg-purple-500 text-white px-4 py-2 rounded hover:[background:linear-gradient(45deg,#7fb9e3,theme(colors.purple.500)_50%,#99e8a0)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.yellow.200/.48)_80%,_theme(colors.pink.500)_86%,_theme(colors.pink.300)_90%,_theme(colors.pink.500)_94%,_theme(colors.red.200/.48))_border-box]
           border-2 border-transparent animate-border'>
            Sentiment
          </button>
        </div>
        <div className='mb-4'>
          <button onClick={handleClickProununciation} className='bg-orange-500 text-white px-4 py-2 rounded hover:[background:linear-gradient(45deg,#7fb9e3,theme(colors.purple.500)_50%,#99e8a0)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.yellow.200/.48)_80%,_theme(colors.pink.500)_86%,_theme(colors.pink.300)_90%,_theme(colors.pink.500)_94%,_theme(colors.red.200/.48))_border-box]
           border-2 border-transparent animate-border'>
            pronunciationAssessment
          </button>
        </div>
        <div className='mb-4'>
          <button onClick={handleSummaryClick} className='bg-cyan-500 text-white px-4 py-2 rounded hover:[background:linear-gradient(45deg,#7fb9e3,theme(colors.purple.500)_50%,#99e8a0)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.yellow.200/.48)_80%,_theme(colors.pink.500)_86%,_theme(colors.pink.300)_90%,_theme(colors.pink.500)_94%,_theme(colors.red.200/.48))_border-box]
           border-2 border-transparent animate-border'>
            summary
          </button>
        </div>
        <div className='mb-4'>
          <button onClick={handleEmotionalToneClick} className='bg-pink-500 text-white px-4 py-2 rounded hover:[background:linear-gradient(45deg,#7fb9e3,theme(colors.purple.500)_50%,#99e8a0)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.yellow.200/.48)_80%,_theme(colors.pink.500)_86%,_theme(colors.pink.300)_90%,_theme(colors.pink.500)_94%,_theme(colors.red.200/.48))_border-box]
           border-2 border-transparent animate-border'>
            Detect Emotional Tone
          </button>
        </div>
        <div className='mb-4'>
          <button onClick={handleClickPIIentity} className='bg-red-500 text-white px-4 py-2 rounded hover:[background:linear-gradient(45deg,#7fb9e3,theme(colors.purple.500)_50%,#99e8a0)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.yellow.200/.48)_80%,_theme(colors.pink.500)_86%,_theme(colors.pink.300)_90%,_theme(colors.pink.500)_94%,_theme(colors.red.200/.48))_border-box]
           border-2 border-transparent animate-border'>
            PII
          </button>
        </div>
        <div className='mb-4'>
          <button onClick={handleClickTopicModel} className='bg-red-500 text-white px-4 py-2 rounded hover:[background:linear-gradient(45deg,#7fb9e3,theme(colors.purple.500)_50%,#99e8a0)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.yellow.200/.48)_80%,_theme(colors.pink.500)_86%,_theme(colors.pink.300)_90%,_theme(colors.pink.500)_94%,_theme(colors.red.200/.48))_border-box]
           border-2 border-transparent animate-border'>
            Topic Modeling
          </button>
        </div>
      </div>

      {/* grid table */}
      {/* {`flex flex-row gap-4 container relative ${showLogo ? 'bg-center bg-cover' : ''}`}
      style={{
        backgroundImage: showLogo ? `url(${logo})` : 'none',
        height: '70vh', // Adjust the height as needed
      }}
    > */}
      <div className={`flex flex-row gap-4 container relative `}
        style={{
          backgroundImage: showLogo ? `url(${logo})` : 'none', backgroundPosition: 'center', backgroundSize: 'cover', height: '70vh', // Adjust height as needed
        }}
      >

        <div className='absolute inset-0 z-0'>
          <img
            src={logo}
            alt="call center logo"
            className={`w-full h-full object-contain transition-opacity duration-500 ${showLogo ? 'opacity-20' : 'opacity-0'}`}
          />
        </div>

        <div className='grid grid-cols-2 gap-4 mt-4 mb-4 container shadow-2xl shadow-slate-500 h-[70vh] overflow-y-auto backdrop-blur-sm'>
          {selectedFiles.length === 0 && (
            // call center logo image
            <div className="flex justify-center items-center h-full w-full ml-96 sm:ml-40 md:ml-56">
              <img
                className="max-w-[100%] max-h-[100%] object-contain opacity-50 transition-opacity duration-500 hover:opacity-100  contrast-100"
                src={logo}
                alt="call center logo"
              />
            </div>
          )}

          {currentFiles.map((file, index) => (
            <React.Fragment key={index}>
              <div className="border border-gray-300 px-4 py-4 mb-1 hover:bg-white hover:shadow-md transition transform hover:-translate-y-1 flex justify-between items-center">
                <div className="flex items-center"><strong>
                  <span className="font-bold mr-2">{indexOfFirstFile + index + 1}.</span>
                  <span className="mr-4">{file.name}</span></strong>
                </div>

                {/* Processing Status Icons */}
                <div className="flex items-center justify-between w-60">
                  {/* Play/Pause Button */}
                  <button onClick={() => togglePlayPause(file.name)} className="text-blue-500 hover:text-blue-700 ml-2">
                    {audioStatus[file.name]?.isPlaying ? <FaPauseCircle size={25} /> : <FaPlayCircle size={25} />}
                  </button>
                  {processingStatus[file.name] === 'loading' && (
                    <FaSpinner className="animate-spin text-gray-500 mr-2" />
                  )}
                  {processingStatus[file.name] === 'done' && (
                    <FaCheck className="text-green-500 mr-2" />
                  )}
                  {processingStatus[file.name] === 'error' && (
                    <span className="text-red-500">Error</span>
                  )}
                </div>
              </div>

              <div className='border border-gray-300 px-4 py-2 mb-1 hover:bg-white hover:shadow-md '><strong>
                {viewMode === 'transcription' ? (
                  transcriptions[file.name]?.transcription || '[No transcription available yet]'
                ) : viewMode === 'sentiment' ? (
                  transcriptions[file.name]?.sentiment && transcriptions[file.name]?.confidenceScores ? (
                    <div className='h-full flex flex-col items-center justify-center'>
                      <p>Sentiment: {transcriptions[file.name].sentiment}</p> <br />
                      <p>Confidence Scores: Positive - {transcriptions[file.name].confidenceScores.positive}, Neutral - {transcriptions[file.name].confidenceScores.neutral}, Negative - {transcriptions[file.name].confidenceScores.negative}</p>

                    </div>
                  ) : (
                    '[No sentiment data available yet]'
                  )
                ) : viewMode === 'PronunciationAssessment' ? (
                  transcriptions[file.name]?.pronunciationAssessment ? (
                    <div className='text-center flex gap-5 items-center h-full '>

                      <p className=''> <strong className='text-blue-600'>accuracyScore </strong> {transcriptions[file.name].pronunciationAssessment.accuracyScore}</p>
                      <p > <strong className='text-blue-600'>fluencyScore</strong> {transcriptions[file.name].pronunciationAssessment.fluencyScore}</p>
                      <p> <strong className='text-blue-600'>compScore</strong> {transcriptions[file.name].pronunciationAssessment.compScore}</p>
                      <p> <strong className='text-blue-600'>prosodyScore</strong> {transcriptions[file.name].pronunciationAssessment.prosodyScore}</p>
                      <p> <strong className='text-blue-600'>pronScore </strong> {transcriptions[file.name].pronunciationAssessment.pronScore}</p>
                    </div>
                  ) : (
                    '[No pronunciation available yet]'
                  )
                ) : viewMode === 'summary' ?  (
                  <div className='h-full flex flex-col items-center'>
                    {loading ? (
                      // Display spinner while processing
                      <div className="flex justify-center items-center">
                        <FaSpinner className="animate-spin text-blue-500 text-4xl" />
                        <p className="ml-2">Summarizing, please wait...</p>
                      </div>
                    ) : (
                      // Show summaries once summarization is complete
                      <>
                        <p><strong>Abstract Summary:</strong> {transcriptions[file.name]?.abstractSummary || '[No abstract summary available]'}</p>
                        <p><strong>Extract Summary:</strong> {transcriptions[file.name]?.extractSummary || '[No extract summary available]'}</p>
                      </>
                    )}
                  </div>
                ) : loading ? (
                  <Loader />
                ) : 
                    viewMode === 'DetectEmotionalTone' ? (
                      <div>
                        {/* <p>{file.name}</p> */}
                        {emotionResults[file.name] ? (
                          <div className='flex flex-col items-center justify-center'>
                            <p> <strong>Emotion:</strong> {emotionResults[file.name].emotion}</p>
                            <p> <strong>Confidence:</strong> {emotionResults[file.name].confidence}</p>
                          </div>
                        ) : (
                          <p>No emotion data available</p>
                        )}
                      </div>

                    ) :
                      viewMode === "PII" ? (
                        <div className='flex flex-col justify-center items-center'>
                          <p><strong className=''>Topics:</strong></p>
                          {Array.isArray(transcriptions[file.name]?.piiEntities) ? (
                            transcriptions[file.name].piiEntities.map((entity, index) => (
                              <div className='flex justify-between items-center  w-1/2'>
                                <p key={index}>text : {entity.text}</p>
                                <p key={index}>category : {entity.category}</p>
                              </div>

                            ))
                          ) : (
                            <p>No entities available</p>
                          )}
                        </div>
                      ) :
                        viewMode === 'topicModel' ? (
                          <div className="mt-4">
                            <h3 className="text-xl font-bold mb-2">Topic Modeling Results</h3>
                            <div className="border border-gray-300 p-4 rounded-lg shadow">
                              {Object.keys(topicModel).length === 0 ? (
                                <p>No topics available. Please ensure the files are processed correctly.</p>
                              ) : (
                                <ul>
                                  {Object.entries(topicModel).map(([fileName, topics], index) => (
                                    <li key={index} className="mb-2">
                                      <strong>{fileName}:</strong>
                                      <ul className="ml-4">
                                        {/* Split the topics string into an array and map over them */}
                                        {typeof topics === 'string' ? (
                                          topics.split('\n').map((topic, i) => <li key={i}>{topic}</li>)
                                        ) : (
                                          <li>No topics found for this file.</li>
                                        )}
                                      </ul>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          </div>
                        ) : null}

              </strong>
              </div>
            </React.Fragment>
          ))}
          {/* {loading && <Loader/>} */}
        </div>

      </div>

      <div className='mb-4'>
        <DownloadComponent fileName={fileName} headers={headers} data={data} />
      </div>

      {selectedFiles.length > filesPerPage && (
        <div className='flex justify-center mt-4'>
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => handleClick(number)}
              className={`px-4 py-2 mx-1 border border-gray-300 rounded ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
            >
              {number}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Text;

















// import React, { useState } from 'react';
// import { FaSpinner, FaCheck } from 'react-icons/fa';
// import confetti from 'canvas-confetti';
// import logo from '././../../../../metronics_v8.2.0-main/src/Asset/playbook/Call center image.png'
// import DownloadComponent from './ReusableComponent/DownloadComponent';
// import Loader from './ReusableComponent/Loader';

// const BASE_URL = process.env.REACT_APP_API_URL;

// const Text = () => {
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [transcriptions, setTranscriptions] = useState({});
//   const [processingStatus, setProcessingStatus] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [emotionResults, setEmotionResults] = useState({});
//   const [topicModel, setTopicModel] = useState({})
//   const [viewMode, setViewMode] = useState('transcription'); // 'transcription' or 'sentiment'
//   const [showLogo, setShowLogo] = useState(false);

//   const filesPerPage = 10;

//   const handleFileChange = (e) => {
//     setShowLogo(true);
//     const filesArray = Array.from(e.target.files);
//     setSelectedFiles(filesArray);
//   };
//   // const handleFileUpload = async () => {
//   //   setLoading(true);
//   //   const results = {};
//   //   const statusUpdates = {};
//   //   const emotionResults = {};

//   //   for (const file of selectedFiles) {
//   //     const formData = new FormData();
//   //     formData.append('audioFile', file);
//   //     statusUpdates[file.name] = 'loading';
//   //     setProcessingStatus({ ...statusUpdates });

//   //     try {
//   //       //Call /startRecognition
//   //       const recognitionResponse = await fetch(`${BASE_URL}/startRecognition`, {
//   //         method: 'POST',
//   //         body: formData,
//   //       });
//   //       const recognitionResult = await recognitionResponse.json();

//   //       if (recognitionResult.results && recognitionResult.results.length > 0) {
//   //         const fileData = recognitionResult.results[0];
//   //         results[fileData.fileName] = fileData;
//   //         statusUpdates[fileData.fileName] = 'done';
//   //       }

//   //       // Call /predict for emotion detection
//   //       const predictResponse = await fetch(`http://127.0.0.1:5000/predict`, {
//   //         method: 'POST',
//   //         body: formData,
//   //       });
//   //       const predictResult = await predictResponse.json();

//   //       if (predictResult.emotion) {
//   //         emotionResults[file.name] = {
//   //           emotion: predictResult.emotion,
//   //           confidence: predictResult.confidence,
//   //         };
//   //       }

//   //     } catch (error) {
//   //       console.error('Error processing file:', file.name, error);
//   //       statusUpdates[file.name] = 'error';
//   //     }
//   //     setProcessingStatus({ ...statusUpdates });
//   //   }
//   //   setTranscriptions(results);
//   //   setEmotionResults(emotionResults); // Assuming you have a state for this
//   //   setLoading(false);
//   //   confetti({
//   //     particleCount: 100,
//   //     spread: 70,
//   //     origin: { y: 0.6 },
//   //   });
//   // };


//   const handleFileUpload = async () => {
//     setShowLogo(true); // Show the logo when processing starts
//     setLoading(true);
//     const results = {};
//     const statusUpdates = {};
//     const emotionResults = {};

//     for (const file of selectedFiles) {
//       const formData = new FormData();
//       formData.append('audioFile', file);
//       statusUpdates[file.name] = 'loading';
//       setProcessingStatus({ ...statusUpdates });

//       try {
//         // Call /startRecognition
//         const recognitionResponse = await fetch(`${BASE_URL}/startRecognition`, {
//           method: 'POST',
//           body: formData,
//         });
//         const recognitionResult = await recognitionResponse.json();

//         if (recognitionResult.results && recognitionResult.results.length > 0) {
//           const fileData = recognitionResult.results[0];
//           results[fileData.fileName] = fileData;
//           statusUpdates[fileData.fileName] = 'done';
//         }

//         // Call /predict for emotion detection
//         const predictResponse = await fetch(`http://127.0.0.1:5000/predict`, {
//           method: 'POST',
//           body: formData,
//         });
//         const predictResult = await predictResponse.json();

//         if (predictResult.emotion) {
//           emotionResults[file.name] = {
//             emotion: predictResult.emotion,
//             confidence: predictResult.confidence,
//           };
//         }

//       } catch (error) {
//         console.error('Error processing file:', file.name, error);
//         statusUpdates[file.name] = 'error';
//       }

//       // Update processing status and results after each file is processed
//       setProcessingStatus({ ...statusUpdates });
//       setTranscriptions(results);
//       setEmotionResults(emotionResults);
//     }


//     // After processing all files, send transcriptions to /topic-modeling
//     try {
//       // const textDocuments = Object.values(results).map(fileData => fileData.transcription);
//       const topicModelingResponse = await fetch(`http://127.0.0.1:5000/topic-modeling`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ textDocuments: Object.values(results) }),
//       });
//       const topicModelingResult = await topicModelingResponse.json();
//       console.log('Topic Modeling Result:', topicModelingResult);

//       // Store the topic modeling result in the topicModel state
//       setTopicModel(topicModelingResult); // Ensure the response is stored in topicModel state
//     } catch (error) {
//       console.error('Error sending to topic modeling:', error);
//     }

//     setLoading(false);
//     confetti({
//       particleCount: 100,
//       spread: 70,
//       origin: { y: 0.6 },
//     });
//   };

//   const handleOutputClick = () => {
//     const allProcessed = selectedFiles.every(file => processingStatus[file.name] === 'done');

//     if (allProcessed) {
//       setViewMode('transcription'); // Show transcriptions when Output button is clicked
//       confetti({
//         particleCount: 100,
//         spread: 70,
//         origin: { y: 0.6 },
//       });
//     } else {
//       alert('Processing not completed yet. Please wait until all files are processed.');
//     }
//   };

//   const handleSentimentClick = () => {
//     try {
//       setViewMode('sentiment'); // Switch to sentiment view
//       confetti({
//         particleCount: 100,
//         spread: 70,
//         origin: { y: 0.6 },
//       });
//     } catch (error) {
//       alert('sentiment data not available');
//     }
//   };

//   const handleClickProununciation = () => {
//     const allProcessed = selectedFiles.every(file => processingStatus[file.name] === 'done');
//     if (allProcessed) {
//       setViewMode('PronunciationAssessment')
//       confetti({
//         particleCount: 100,
//         spread: 70,
//         origin: { y: 0.6 },
//       });
//     } else {
//       alert('Processing not completed yet.please wait untill all files are processed.')
//     }
//   }
//   const handleClickPIIentity = () => {
//     const allProcessed = selectedFiles.every(file => processingStatus[file.name] === 'done');
//     if (allProcessed) {
//       setViewMode('PII')
//       confetti({
//         particleCount: 100,
//         spread: 70,
//         origin: { y: 0.6 },
//       });
//     } else {
//       alert('Processing not completed yet.please wait untill all files are processed.')
//     }
//   }

//   const handleSummaryClick = async () => {
//     setLoading(true); // Show the spinner
//     const summaries = {};

//     console.log("Transcriptions before sending:", transcriptions);

//     for (const file of selectedFiles) {
//       const transcriptionText = transcriptions[file.name]?.transcription;

//       if (!transcriptionText) {
//         console.warn(`No transcription available for file: ${file.name}`);
//         continue; // Skip this file if there's no transcription
//       }

//       try {
//         console.log(`Sending transcription for file: ${file.name}`, transcriptionText);

//         const response = await fetch('http://127.0.0.1:5000/api/generate-summary', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ text_documents: [transcriptionText] }),

//         });

//         console.log(`Sending transcription for file: ${file.name}`, {
//           textDocuments: [transcriptionText]
//         });

//         const result = await response.json();
//         console.log(`Received summary for file: ${file.name}`, result);

//         // Assuming the backend returns arrays of summaries
//         summaries[file.name] = {
//           extractSummary: result.extract_summaries?.[0] || '[No extract summary available]',
//           abstractSummary: result.abstract_summaries?.[0] || '[No abstract summary available]',
//         };

//       } catch (error) {
//         console.error('Error generating summaries for file:', file.name, error);
//       }
//     }

//     // Update transcriptions state to include the new summaries
//     setTranscriptions(prevState => {
//       const updatedTranscriptions = { ...prevState };
//       for (const fileName in summaries) {
//         updatedTranscriptions[fileName].extractSummary = summaries[fileName].extractSummary;
//         updatedTranscriptions[fileName].abstractSummary = summaries[fileName].abstractSummary;
//       }
//       return updatedTranscriptions;
//     });
//     setLoading(false); // Hide the spinner after the process completes
//     setViewMode('summary');
//     confetti({
//       particleCount: 100,
//       spread: 70,
//       origin: { y: 0.6 },
//     });
//   };

//   const handleEmotionalToneClick = async () => {
//     try {
//       setViewMode('DetectEmotionalTone')
//       confetti({
//         particleCount: 100,
//         spread: 70,
//         origin: { y: 0.6 },
//       });
//     } catch (error) {
//       alert('sentiment data not available');
//     }

//   }

//   const handleClickTopicModel = async () => {
//     const allProcessed = selectedFiles.every(file => processingStatus[file.name] === 'done');

//     if (allProcessed) {
//       setViewMode('topicModel');  // Set the viewMode to topicModel for display
//       confetti({
//         particleCount: 100,
//         spread: 70,
//         origin: { y: 0.6 },
//       });
//     } else {
//       alert('Processing not completed yet. Please wait until all files are processed.');
//     }
//   };


//   // pagination
//   const indexOfLastFile = currentPage * filesPerPage;
//   const indexOfFirstFile = indexOfLastFile - filesPerPage;
//   const currentFiles = selectedFiles.slice(indexOfFirstFile, indexOfLastFile);

//   const handleClick = (pageNumber) => setCurrentPage(pageNumber);

//   const totalPages = Math.ceil(selectedFiles.length / filesPerPage);
//   const pageNumbers = [];
//   for (let i = 1; i <= totalPages; i++) {
//     pageNumbers.push(i);
//   }

//   // Set up props for DownloadComponent based on viewMode
//   const fileName = viewMode === 'sentiment' ? 'sentiment_analysis'
//     : viewMode === 'PronunciationAssessment' ? 'pronunciation_assessment'
//       : viewMode === 'summary' ? 'summarization'
//         : viewMode === 'DetectEmotionalTone' ? 'emotion detection'
//           : viewMode === "PII" ? 'topic'
//             : viewMode === 'topicModel' ? 'topic_modeling_results'
//               : 'transcriptions';
//   const headers = viewMode === 'sentiment'
//     ? ['File Name', 'Sentiment', 'Confidence Scores (Positive)', 'Confidence Scores (Neutral)', 'Confidence Scores (Negative)']
//     : viewMode === 'PronunciationAssessment'
//       ? ['File Name', 'Accuracy Score', 'Fluency Score', 'Comprehensibility Score', 'Prosody Score', 'Pronunciation Score']
//       : viewMode === 'summary'
//         ? ['File Name', 'Abstract Summary', 'Extract Summary']
//         : viewMode === 'DetectEmotionalTone'
//           ? ['fileName', 'emotion', 'confidence']
//           : viewMode === "PII"
//             ? ['fileName', 'Topics']
//             : viewMode === 'topicModel' ? ['File Name', 'Topics']
//               : ['File Name', 'Transcription'];


//   const data = selectedFiles.map((file) => {
//     if (viewMode === 'sentiment') {
//       const sentimentData = transcriptions[file.name]?.sentiment || 'N/A';
//       const confidenceScores = transcriptions[file.name]?.confidenceScores || {};
//       return [
//         file.name,
//         sentimentData,
//         confidenceScores.positive || 'N/A',
//         confidenceScores.neutral || 'N/A',
//         confidenceScores.negative || 'N/A'
//       ];
//     } else if (viewMode === 'PronunciationAssessment') {
//       const assessment = transcriptions[file.name]?.pronunciationAssessment || {};
//       return [
//         file.name,
//         assessment.accuracyScore || 'N/A',
//         assessment.fluencyScore || 'N/A',
//         assessment.compScore || 'N/A',
//         assessment.prosodyScore || 'N/A',
//         assessment.pronScore || 'N/A'
//       ];
//     } else if (viewMode === 'summary') {
//       const abstractSummary = transcriptions[file.name]?.abstractSummary || '[No abstract summary available]';
//       const extractSummary = transcriptions[file.name]?.extractSummary || '[No extract summary available]';
//       return [
//         file.name,
//         abstractSummary,
//         extractSummary,
//       ];
//     } else if (viewMode === 'DetectEmotionalTone') {
//       const emotion = emotionResults[file.name]?.emotion || '[No emotion]'
//       const confidence = emotionResults[file.name]?.confidence || '[No emotion]';
//       return [
//         file.name,
//         emotion,
//         confidence
//       ]
//     } else if (viewMode === "PII") {
//       const topic = transcriptions[file.name]?.piiEntities || '[No Entities]'
//       return [
//         file.name,
//         topic
//       ]
//     } else if (viewMode === 'topicModel') {
//       const topics = topicModel[file.name] || '[No Topics]';
//       return [file.name, Array.isArray(topics) ? topics.join(', ') : '[No Topics]'];
//     } else {
//       return [
//         file.name,
//         transcriptions[file.name]?.transcription || 'No transcription available'
//       ];
//     }
//   });

//   return (
//     <div className='p-4 bg-white'>
//       {/* file selection and buttons */}
//       <div className='flex justify-around items-center'>
//         {/* select files */}
//         <div className='mb-4'>
//           <label htmlFor='file-input' className='bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:[background:linear-gradient(45deg,#9369c7,theme(colors.blue.500)_50%,#c9bdd9)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.yellow.200/.48)_80%,_theme(colors.pink.500)_86%,_theme(colors.pink.300)_90%,_theme(colors.pink.500)_94%,_theme(colors.red.200/.48))_border-box]
//            border-2 border-transparent animate-border'>
//             Select Files
//           </label>
//           <input
//             id="file-input"
//             type="file"
//             accept=".wav"
//             multiple
//             className='hidden'
//             onChange={handleFileChange}
//           />
//           <span className='ml-2 text-gray-500'>{selectedFiles.length} file(s) selected</span>
//         </div>
//         {/* button */}
//         <div className='mb-4'>
//           <button onClick={handleFileUpload} className='bg-green-500 text-white px-4 py-2 rounded mr-4 hover:[background:linear-gradient(45deg,#9369c7,theme(colors.green.500)_50%,#c9bdd9)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.yellow.200/.48)_80%,_theme(colors.red.500)_86%,_theme(colors.red.300)_90%,_theme(colors.red.500)_95%,_theme(colors.yellow.200/.48))_border-box]
//            border-2 border-transparent animate-border '>
//             Process
//           </button>
//         </div>
//         <div className='mb-4 '>
//           <button onClick={handleOutputClick}
//             className='bg-red-500 text-white px-4 py-2 rounded
//           hover:[background:linear-gradient(45deg,#9369c7,theme(colors.red.500)_50%,#c9bdd9)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.yellow.200/.48)_80%,_theme(colors.blue.500)_86%,_theme(colors.blue.300)_90%,_theme(colors.blue.500)_94%,_theme(colors.red.200/.48))_border-box]
//            border-2 border-transparent animate-border'>
//             Transcribe
//           </button>
//         </div>
//         <div className='mb-4'>
//           <button onClick={handleSentimentClick} className='bg-purple-500 text-white px-4 py-2 rounded hover:[background:linear-gradient(45deg,#7fb9e3,theme(colors.purple.500)_50%,#99e8a0)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.yellow.200/.48)_80%,_theme(colors.pink.500)_86%,_theme(colors.pink.300)_90%,_theme(colors.pink.500)_94%,_theme(colors.red.200/.48))_border-box]
//            border-2 border-transparent animate-border'>
//             Sentiment
//           </button>
//         </div>
//         <div className='mb-4'>
//           <button onClick={handleClickProununciation} className='bg-orange-500 text-white px-4 py-2 rounded hover:[background:linear-gradient(45deg,#7fb9e3,theme(colors.purple.500)_50%,#99e8a0)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.yellow.200/.48)_80%,_theme(colors.pink.500)_86%,_theme(colors.pink.300)_90%,_theme(colors.pink.500)_94%,_theme(colors.red.200/.48))_border-box]
//            border-2 border-transparent animate-border'>
//             pronunciationAssessment
//           </button>
//         </div>
//         <div className='mb-4'>
//           <button onClick={handleSummaryClick} className='bg-cyan-500 text-white px-4 py-2 rounded hover:[background:linear-gradient(45deg,#7fb9e3,theme(colors.purple.500)_50%,#99e8a0)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.yellow.200/.48)_80%,_theme(colors.pink.500)_86%,_theme(colors.pink.300)_90%,_theme(colors.pink.500)_94%,_theme(colors.red.200/.48))_border-box]
//            border-2 border-transparent animate-border'>
//             summary
//           </button>
//         </div>
//         <div className='mb-4'>
//           <button onClick={handleEmotionalToneClick} className='bg-pink-500 text-white px-4 py-2 rounded hover:[background:linear-gradient(45deg,#7fb9e3,theme(colors.purple.500)_50%,#99e8a0)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.yellow.200/.48)_80%,_theme(colors.pink.500)_86%,_theme(colors.pink.300)_90%,_theme(colors.pink.500)_94%,_theme(colors.red.200/.48))_border-box]
//            border-2 border-transparent animate-border'>
//             Detect Emotional Tone
//           </button>
//         </div>
//         <div className='mb-4'>
//           <button onClick={handleClickPIIentity} className='bg-red-500 text-white px-4 py-2 rounded hover:[background:linear-gradient(45deg,#7fb9e3,theme(colors.purple.500)_50%,#99e8a0)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.yellow.200/.48)_80%,_theme(colors.pink.500)_86%,_theme(colors.pink.300)_90%,_theme(colors.pink.500)_94%,_theme(colors.red.200/.48))_border-box]
//            border-2 border-transparent animate-border'>
//             PII
//           </button>
//         </div>
//         <div className='mb-4'>
//           <button onClick={handleClickTopicModel} className='bg-red-500 text-white px-4 py-2 rounded hover:[background:linear-gradient(45deg,#7fb9e3,theme(colors.purple.500)_50%,#99e8a0)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.yellow.200/.48)_80%,_theme(colors.pink.500)_86%,_theme(colors.pink.300)_90%,_theme(colors.pink.500)_94%,_theme(colors.red.200/.48))_border-box]
//            border-2 border-transparent animate-border'>
//             Topic Modeling
//           </button>
//         </div>
//       </div>

//       {/* grid table */}
//       {/* {`flex flex-row gap-4 container relative ${showLogo ? 'bg-center bg-cover' : ''}`}
//       style={{
//         backgroundImage: showLogo ? `url(${logo})` : 'none',
//         height: '70vh', // Adjust the height as needed
//       }}
//     > */}
//       <div className={`flex flex-row gap-4 container relative `}
//         style={{
//           backgroundImage: showLogo ? `url(${logo})` : 'none', backgroundPosition: 'center', backgroundSize: 'cover', height: '70vh', // Adjust height as needed
//         }}
//       >

//         <div className='absolute inset-0 z-0'>
//           <img
//             src={logo}
//             alt="call center logo"
//             className={`w-full h-full object-contain transition-opacity duration-500 ${showLogo ? 'opacity-20' : 'opacity-0'}`}
//           />
//         </div>

//         <div className='grid grid-cols-2 gap-4 mt-4 mb-4 container shadow-2xl shadow-slate-500 h-[70vh] overflow-y-auto backdrop-blur-sm'>
//           {selectedFiles.length === 0 && (
//             // call center logo image
//             <div className="flex justify-center items-center h-full w-full ml-96 sm:ml-40 md:ml-56">
//               <img
//                 className="max-w-[100%] max-h-[100%] object-contain opacity-50 transition-opacity duration-500 hover:opacity-100  contrast-100"
//                 src={logo}
//                 alt="call center logo"
//               />
//             </div>
//           )}

//           {currentFiles.map((file, index) => (
//             <React.Fragment key={index}>
//               <div className='border border-gray-300 px-4 py-2 mb-1 hover:bg-white hover:shadow-md transition transform hover:-translate-y-1 flex flex-col '><strong>
//                 {indexOfFirstFile + index + 1}. {file.name}
//                 {processingStatus[file.name] === 'loading' && <FaSpinner className='animate-spin ml-96 ' />}
//                 {processingStatus[file.name] === 'done' && <FaCheck className='text-green-500 ml-96 ' />}
//                 {processingStatus[file.name] === 'error' && <span className='ml-96 text-red-500'>Error</span>}</strong>
//               </div>
//               <div className='border border-gray-300 px-4 py-2 mb-1 hover:bg-white hover:shadow-md '><strong>
//                 {viewMode === 'transcription' ? (
//                   transcriptions[file.name]?.transcription || '[No transcription available yet]'
//                 ) : viewMode === 'sentiment' ? (
//                   transcriptions[file.name]?.sentiment && transcriptions[file.name]?.confidenceScores ? (
//                     <div className='h-full flex flex-col items-center justify-center'>
//                       <p>Sentiment: {transcriptions[file.name].sentiment}</p> <br />
//                       <p>Confidence Scores: Positive - {transcriptions[file.name].confidenceScores.positive}, Neutral - {transcriptions[file.name].confidenceScores.neutral}, Negative - {transcriptions[file.name].confidenceScores.negative}</p>

//                     </div>
//                   ) : (
//                     '[No sentiment data available yet]'
//                   )
//                 ) : viewMode === 'PronunciationAssessment' ? (
//                   transcriptions[file.name]?.pronunciationAssessment ? (
//                     <div className='text-center flex gap-5 items-center h-full '>

//                       <p className=''> <strong className='text-blue-600'>accuracyScore </strong> {transcriptions[file.name].pronunciationAssessment.accuracyScore}</p>
//                       <p > <strong className='text-blue-600'>fluencyScore</strong> {transcriptions[file.name].pronunciationAssessment.fluencyScore}</p>
//                       <p> <strong className='text-blue-600'>compScore</strong> {transcriptions[file.name].pronunciationAssessment.compScore}</p>
//                       <p> <strong className='text-blue-600'>prosodyScore</strong> {transcriptions[file.name].pronunciationAssessment.prosodyScore}</p>
//                       <p> <strong className='text-blue-600'>pronScore </strong> {transcriptions[file.name].pronunciationAssessment.pronScore}</p>
//                     </div>
//                   ) : (
//                     '[No pronunciation available yet]'
//                   )
//                 ) : viewMode === 'summary' ? (
//                   loading ? (
//                     <div className="flex justify-center items-center">
//                       <FaSpinner className="animate-spin text-blue-500 text-4xl" />
//                       <p className="ml-2">Summarizing, please wait...</p>
//                     </div>
//                   ) : (
//                     <div className='h-full flex flex-col items-center'>
//                       <p><strong>Abstract Summary:</strong> {transcriptions[file.name]?.abstractSummary || '[No abstract summary available]'}</p>
//                       <p><strong>Extract Summary:</strong> {transcriptions[file.name]?.extractSummary || '[No extract summary available]'}</p>
//                     </div>
//                   )
//                 ) : loading ? (
//                   <Loader />
//                 ) :
//                   viewMode === 'DetectEmotionalTone' ? (
//                     <div>
//                       {/* <p>{file.name}</p> */}
//                       {emotionResults[file.name] ? (
//                         <div className='flex flex-col items-center justify-center'>
//                           <p> <strong>Emotion:</strong> {emotionResults[file.name].emotion}</p>
//                           <p> <strong>Confidence:</strong> {emotionResults[file.name].confidence}</p>
//                         </div>
//                       ) : (
//                         <p>No emotion data available</p>
//                       )}
//                     </div>

//                   ) :
//                     viewMode === "PII" ? (
//                       <div className='flex flex-col justify-center items-center'>
//                         <p><strong className=''>Topics:</strong></p>
//                         {Array.isArray(transcriptions[file.name]?.piiEntities) ? (
//                           transcriptions[file.name].piiEntities.map((entity, index) => (
//                             <div className='flex justify-between items-center  w-1/2'>
//                               <p key={index}>text : {entity.text}</p>
//                               <p key={index}>category : {entity.category}</p>
//                             </div>

//                           ))
//                         ) : (
//                           <p>No entities available</p>
//                         )}
//                       </div>
//                     ) :
//                       viewMode === 'topicModel' ? (
//                         <div className="mt-4">
//                           <h3 className="text-xl font-bold mb-2">Topic Modeling Results</h3>
//                           <div className="border border-gray-300 p-4 rounded-lg shadow">
//                             {Object.keys(topicModel).length === 0 ? (
//                               <p>No topics available. Please ensure the files are processed correctly.</p>
//                             ) : (
//                               <ul>
//                                 {Object.entries(topicModel).map(([fileName, topics], index) => (
//                                   <li key={index} className="mb-2">
//                                     <strong>{fileName}:</strong>
//                                     <ul className="ml-4">
//                                       {Array.isArray(topics) && topics.length > 0 ? (
//                                         topics.map((topic, i) => (
//                                           <li key={i}><strong>{topic}</strong></li>
//                                         ))
//                                       ) : (
//                                         <li>No topics found for this file.</li>
//                                       )}
//                                     </ul>
//                                   </li>
//                                 ))}
//                               </ul>
//                             )}

//                           </div>
//                         </div>
//                       ) : null}
//               </strong>
//               </div>
//             </React.Fragment>
//           ))}
//           {/* {loading && <Loader/>} */}
//         </div>

//       </div>

//       <div className='mb-4'>
//         <DownloadComponent fileName={fileName} headers={headers} data={data} />
//       </div>

//       {selectedFiles.length > filesPerPage && (
//         <div className='flex justify-center mt-4'>
//           {pageNumbers.map((number) => (
//             <button
//               key={number}
//               onClick={() => handleClick(number)}
//               className={`px-4 py-2 mx-1 border border-gray-300 rounded ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
//             >
//               {number}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Text;