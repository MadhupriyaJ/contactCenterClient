import React, { useRef, useState, useEffect, useCallback } from "react";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Header from "../Header/Header";
import SnowflakeAside from "../Aside/SnowflakeAside";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@material-ui/core";

const BASE_URL = process.env.REACT_APP_API_URL;

const BSTT = () => {
  const [subscriptionKey, setSubscriptionKey] = useState( "16aa5466ab0544c5b9126154ff41bd66" );
  const [serviceRegion, setServiceRegion] = useState("eastus");
  const [audioFile, setAudioFile] = useState([]);
  const [audioURL, setAudioURL] = useState(null); // State to store audio URL
  const [selectedFileName, setSelectedFileName] = useState("");
  const [selectedFileNames, setSelectedFileNames] = useState([]);
  const [jsonContent, setJsonContent] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const fileInputRef = useRef(null);
  const audioPlayerRef = useRef(null);
  const recognizerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [transcriptionStatuses, setTranscriptionStatuses] = useState({});
  const [transcriptionResult, setTranscriptionResult] = useState("");
  // const [sentimentAnalysisResult, setSentimentAnalysisResult] = useState({ sentiment: "", positive: 0, negative: 0, neutral: 0, });
  const [sentimentAnalysisResult, setSentimentAnalysisResult] = useState('');
  const [sentimentAnalysisResultconfidenceScores, setSentimentAnalysisResultconfidenceScores] = useState({ positive: 0, negative: 0, neutral: 0, });
  const [languages, setLanguages] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [error, setError] = useState(null);
  const [translatedText, setTranslatedText] = useState("");
  // State to store transcriptions for each audio file
  const [audioFileTranscriptions, setAudioFileTranscriptions] = useState({});
  const [summary, setSummary] = useState('');
  const [fileSummaries, setFileSummaries] = useState({});
  // state to store prediction for voice frequency
  const [prediction, setPrediction] = useState('');
  const [file, setFile] = useState(null);
  const [redactedtext, setRedactedText] = useState('');
  const [piiResult, setPiiResult] = useState([]);
  const [pronunciation, setPronunciation] = useState('')


  const [asideOpen, setAsideOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState("");
  const [tableHistory, setTableHistory] = useState([]);
  const [username, setUsername] = useState("");
  const location = useLocation();
  const [authenticated, setAuthenticated] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isPlaying && audioFile && audioFile.length > 0) {
      try {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          audioPlayerRef.current.src = fileReader.result;
          const playPromise = audioPlayerRef.current.play();
          playPromise.then(() => {
            console.log("Audio playback started successfully.");
          }).catch(error => {
            console.error("Error playing audio:", error);
          });
        };
        // Access the Blob object within FormData
        fileReader.readAsDataURL(audioFile[0].get('audioFile'));
      } catch (error) {
        console.error("Error converting Blob to data URL:", error);
      }
    } else {
      audioPlayerRef.current.pause();
      audioPlayerRef.current.currentTime = 0;
      console.log("Audio playback stopped.");
    }
  }, [isPlaying, audioFile]);

  useEffect(() => {
    if (audioURL && audioPlayerRef.current) {
      audioPlayerRef.current.src = audioURL;
      audioPlayerRef.current.play();
    }
  }, [audioURL]); // Play audio when audioURL changes

  useEffect(() => {
    fetchSupportedLanguages();
  }, []);

  const fetchSupportedLanguages = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/languages`);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch supported languages: ${response.status} ${response.statusText}`
        );
      }
      const data = await response.json();
      console.log('language data:', data);
      setLanguages(data.languages);
    } catch (error) {
      console.error("Error fetching supported languages:", error);
      setError("Failed to fetch supported languages. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLanguageChange = (event) => {
    // const { target: { value } } = event;
    // setSelectedLanguages(typeof value === 'string' ? value.split(',') : value);
    setSelectedLanguages(event.target.value);
  };

  // Update the useEffect hook to handle the response from the server
  const startRecognition = useCallback(async () => {
    if (!subscriptionKey || !audioFile.length) {
      alert('Please select audio files!');
      return;
    }
    setLoading(true);
    setIsPlaying(true);
    setTranscriptionResult('');
    setSummary('')
    setPrediction('')
    let firstFileProcessed = false;  // To ensure the first file's transcription is displayed only once
    for (const formData of audioFile) {
      const fileName = formData.get('audioFile').name;
      setTranscriptionStatuses(prevStatuses => ({ ...prevStatuses, [fileName]: 'inProgress' }));
      try {
        const response = await fetch(`${BASE_URL}/startRecognition`, {
          method: 'POST',
          body: formData,
        });
        if (response.ok) {
          const responseData = await response.json();
          console.log('responseData:', responseData);
          if (responseData.results && responseData.results.length > 0) {
            const { transcription, sentiment, confidenceScores, redactedText, piiEntities, pronunciationAssessment } = responseData.results[0];
            console.log('responsedata.result', responseData.results);
            setAudioFileTranscriptions(prevTranscriptions => ({
              ...prevTranscriptions,
              [fileName]: { transcription, sentiment, confidenceScores, redactedText, piiEntities, pronunciationAssessment }
            }));
            setTranscriptionStatuses(prevStatuses => ({ ...prevStatuses, [fileName]: 'completed' }));
            // Display the first transcription immediately
            if (!firstFileProcessed) {
              setTranscriptionResult(transcription);
              setSentimentAnalysisResult(sentiment);
              setSentimentAnalysisResultconfidenceScores(confidenceScores);
              setRedactedText(redactedText);
              setPiiResult(Array.isArray(piiEntities) ? piiEntities : []);
              setPronunciation(pronunciationAssessment);
              console.log('redactedtext:', redactedtext);
              console.log('piiresult:', Array.isArray(piiResult));
              console.log('Sentiment Analysis Result:', sentiment, confidenceScores.positive, confidenceScores.negative, confidenceScores.neutral); // Add this for debugging
              console.log('pronunciation:', pronunciation);

              firstFileProcessed = true;
            }
          }
        } else {
          console.error('Error from server:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error sending audio file to server:', error);
      }
    }
    setLoading(false);
    setIsPlaying(false);
  }, [subscriptionKey, audioFile]);


  useEffect(() => {
    if (jsonContent && jsonContent.results && jsonContent.results.length > 0) {
      const result = jsonContent.results[0]; // Assuming there's only one result
      setTranscriptionResult(result.transcription);
      setSentimentAnalysisResult(result.sentiment);
      setSentimentAnalysisResult(result.confidenceScores);
    }
  }, [jsonContent]);

  const handleFileChange = (event) => {
    try {
      const selectedFiles = event.target.files;

      if (selectedFiles.length > 0) {
        const formDataArray = [];
        // Loop through each selected file and create a FormData object for each
        for (let i = 0; i < selectedFiles.length; i++) {
          const formData = new FormData();
          formData.append("audioFile", selectedFiles[i]);
          // formData.append("file", selectedFiles[i]);
          formDataArray.push(formData);
          console.log("BSTT append audiofile", formData);
        }
        // Update the array of selected file names
        const fileNames = Array.from(selectedFiles).map((file) => file.name);
        setSelectedFileNames(fileNames);
        // Update the state with the array of FormData objects
        setAudioFile(formDataArray);
        // Close the previous SpeechRecognizer instance (if needed)
        if (recognizerRef.current) {
          recognizerRef.current.close();
          recognizerRef.current = null;
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while handling the files. Please try again.");
    }
  };

  const handleStoredFileClick = async (fileName) => {
    const selectedFile = audioFile.find(file => file.get('audioFile').name === fileName);

    if (selectedFile) {
      const audioBlob = selectedFile.get('audioFile');
      const audioURL = URL.createObjectURL(audioBlob);
      setAudioURL(audioURL);
    }

    const transcriptionData = audioFileTranscriptions[fileName];
    if (transcriptionData) {
      setTranscriptionResult(transcriptionData.transcription);
      setSentimentAnalysisResult(transcriptionData.sentiment);
      setSentimentAnalysisResultconfidenceScores(transcriptionData.confidenceScores);
      setRedactedText(transcriptionData.redactedText)
      setPiiResult(Array.isArray(transcriptionData.piiEntities) ? transcriptionData.piiEntities : [])
      setPronunciation(transcriptionData.pronunciationAssessment);
      // Check if summary is already fetched for this file
      if (fileSummaries[fileName]) {
        setSummary(fileSummaries[fileName]);
      } else {
        // Fetch summary if not already fetched
        setLoading(true);
        try {
          const response = await fetch('http://127.0.0.1:5000/api/generate-summary', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text_documents: [transcriptionData.transcription] }),
          });
          if (response.ok) {
            const result = await response.json();
            setSummary(result);

            // Update fileSummaries state with fetched summary
            setFileSummaries(prevState => ({
              ...prevState,
              [fileName]: result,
            }));
          } else {
            alert('Failed to generate summary');
          }
        } catch (error) {
          console.error('Error fetching summary:', error);
          alert('Failed to fetch summary. Please try again.');
        } finally {
          setLoading(false);
        }
      }
    } else {
      alert(`Transcription not available for ${fileName}`);
    }
  };


  const handleTranslate = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/translate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: transcriptionResult, // Assuming transcriptionResult contains the text to translate
          targetLanguages: selectedLanguages, // Array of language codes to translate to
        }),
      });
      if (!response.ok) {
        throw new Error(
          `Failed to translate text: ${response.status} ${response.statusText}`
        );
      }
      const data = await response.json();
      console.log("data:", data);

      // Assuming data.translations is an array of { language, translation }
      const translations = data.translationResults.map((result) => ({
        language: result.language,
        translation: result.translation,
      }));

      setTranslatedText(translations); // Assuming single translation result
    } catch (error) {
      console.error("Error translating text:", error);
      alert("Failed to translate text. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteFile = (index) => {
    try {
      // Copy the array of selected file names
      const updatedFileNames = [...selectedFileNames];
      // Remove the file name at the specified index
      updatedFileNames.splice(index, 1);
      // Update the state with the modified array
      setSelectedFileNames(updatedFileNames);
      // setAudioFile(null);
      setSelectedFileName("");
      setTranscriptionResult("");
      setSentimentAnalysisResult("");
      setTranslatedText("");
      setSummary("")

      setIsPlaying(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while delete the file. Please try again.");
    }
  };
  // Summary 
  const handleGenerateSummary = async () => {
    if (!transcriptionResult) {
      alert("No transcription result available to summarize.");
      return;
    }

    setLoading(true);

    try {
      // Generate summary only for the currently displayed transcription result
      const response = await fetch('http://127.0.0.1:5000/api/generate-summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text_documents: [transcriptionResult] }),
      });

      if (response.ok) {
        const result = await response.json();
        setSummary(result);

        console.log("result:", result);
        // Send the text content, abstract summary, and extract summary to the server
        const dataToSend = {
          textContent: JSON.stringify(transcriptionResult),
          abstractSummary: result.abstract_summaries.join('\n'),
          extractSummary: result.extract_summaries.join('\n')
        };
        console.log("abstract summary:", result.abstract_summaries);
        console.log("Extract summary:", result.extract_summaries);

        // Send the data to the server
        sendSummaryDataToServer(dataToSend);
      } else {
        alert('Failed to generate summary');
      }
    } catch (error) {
      console.error('Error generating summary:', error);
      alert('Failed to generate summary. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  const sendSummaryDataToServer = async (data) => {
    try {
      const response = await fetch(`${BASE_URL}/api/save-summary`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        alert('Failed to send summary data to the server');
      }
    } catch (error) {
      alert('Error sending summary data to the server:', error);
    }
  };

  //   const handleSubmit = async () => {
  //     if (!audioFile.length) {
  //         alert("Please select an audio file!");
  //         return;
  //     }

  //     setLoading(true);

  //     try {
  //         const formData = new FormData();
  //         formData.append("audioFile", audioFile[0].get('audioFile')); // Assuming you're sending one file at a time

  //         const response = await fetch('http://127.0.0.1:5000/api/predict', {
  //             method: "POST",
  //             body: formData,
  //         });

  //         if (response.ok) {
  //             const result = await response.json();
  //             setPrediction(result.prediction);
  //         } else {
  //             console.error("Error from server:", response.status, response.statusText);
  //         }
  //     } catch (error) {
  //         console.error("Error uploading file:", error);
  //     } finally {
  //         setLoading(false);
  //     }
  // };

  const handlePredictionSubmit = async () => {
    if (!audioFile.length) {
      alert('Please select audio files!');
      return;
    }

    setLoading(true);

    for (const formData of audioFile) {
      try {
        const response = await fetch('http://127.0.0.1:5000/predict', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Prediction result:', result);
          setPrediction(prevPredictions => [...prevPredictions, result]);

        } else {
          console.error('Error from server:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error sending audio file to server:', error);
      }
    }

    setLoading(false);
  };


  const handleButtonClick = async () => {
    handlePredictionSubmit();
    startRecognition();
  };



  // for prediction
  // for sidebar
  const userName = location.state ? location.state.userName : localStorage.getItem("userName");

  useEffect(() => {
    setUsername(userName || "");
  }, [userName]);

  const handleTableSelect = (tableName) => {
    setTableHistory([...tableHistory, selectedTable]);
    setSelectedTable(tableName);
  };

  const handleBack = () => {
    const previousTable = tableHistory.pop();
    setSelectedTable(previousTable);
    setTableHistory([...tableHistory]);
  };
  const handleLogout = () => {
    // Clear authentication state and navigate to login page
    setAuthenticated(false);
    navigate('/login');
  };


  return (
    // <div className="flex ">
    //   <div>
    //     <SnowflakeAside
    //       asideOpen={asideOpen}
    //       selectedTable={selectedTable}
    //       setSelectedTable={setSelectedTable}
    //       onTableSelect={handleTableSelect}
    //     />
    //   </div>

    //   <div className="h-22 w-full">
    //     <div>
    //       <div className="bg-gray-100 vh-100">
    //         <div>
    //           <Header username={username} onLogout={handleLogout} />
    //         </div>

            <div className="container d-flex ">
              <div className=" rounded-lg bg-gray-100  items-center  w-500px mx-5 d-flex flex-column ">
                {/* Upload files */}
                <div className="card card-custom container mt-4 w-500px h-200px shadow-md"
                  style={{ display: "flex", justifyContent: "center", alignItems: "center", }}>
                  <h1 className="text-4xl font-bold mb-4">Audio To Text</h1>
                  <div className="mb-2">
                    <CloudUploadIcon
                      fontSize="large"
                      style={{ color: "#007bff" }}
                    />
                  </div>
                  <div className="mb-5 custom-file-input">
                    <input className="form-control border-1 pt-2 pb-2 " type="file" id="filePicker" accept=".wav" onChange={handleFileChange} ref={fileInputRef} multiple />
                  </div>
                  <div className="btn btn-primary font-weight-bold px-10 mx-auto d-block opacity-50-hover  " onClick={handleButtonClick} disabled={!audioFile || loading} >
                    {loading
                      ? "Recognition in progress..."
                      : "Start recognition"}
                  </div>
                </div>
                {/* stored file */}
                <div className="card card-custom container mt-4 w-500px h-200px shadow-md" style={{ display: "flex", alignItems: "center" }} >
                  <h1 className="mt-2">Audio files</h1>
                  <div className="card card-scroll container shadow-md mt-2 mb-2 h-full bg-gray-100" style={{ display: "flex", alignItems: "center" }} >
                    {selectedFileNames.length > 0 ? (
                      <div className="flex flex-column w-full ">
                        {selectedFileNames.map((fileName, index) => (
                          <div key={index} className="mb-2 cursor-pointer bg-active-primary  " style={{ display: "flex", justifyContent: "space-between", alignItems: "center", }} >
                            <p
                              className="text-primary text-hover-gray-900 "
                              onClick={() => handleStoredFileClick(fileName)}
                            >
                              {fileName}
                              {transcriptionStatuses[fileName] === "inProgress" ? (
                                // Display spinner icon when transcription is in progress
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true">

                                </span>
                              ) : transcriptionStatuses[fileName] === "completed" ? (
                                // Display tick icon when transcription is completed
                                <span className="fas fa-check">

                                </span>
                              ) : null}
                            </p>
                            <button className="btn btn-danger btn-sm" onClick={() => handleDeleteFile(index)} title={`Delete ${fileName}`} >
                              <i className="fas fa-trash-alt "></i> Delete
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center my-auto ">No files here</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="card container h-440px w-800px shadow-md mt-2 ">
                <div className="rounded-lg items-center w-700px mx-5 d-flex flex-column ">
                  {/* <!-- Nav tabs --> */}
                  <ul className="nav nav-tabs" id="myTabs" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button className="nav-link active" id="analyze-tab" data-bs-toggle="tab" data-bs-target="#analyze" type="button" role="tab" aria-controls="analyze" aria-selected="true" >
                        TRANSCRIPT
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button className="nav-link " id="json-tab" data-bs-toggle="tab" data-bs-target="#json" type="button" role="tab" aria-controls="json" aria-selected="false" >
                        SENTIMENT ANALYSIS
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button className="nav-link " id="voice-tab" data-bs-toggle="tab" data-bs-target="#voice" type="button" role="tab" aria-controls="voice" aria-selected="false" >
                        VOICE ANALYSIS
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button className="nav-link" id="language-tab" data-bs-toggle="tab" data-bs-target="#language" type="button" role="tab" aria-controls="language" aria-selected="false" >
                        TRANSLATOR
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button className="nav-link" id="summary-tab" data-bs-toggle="tab" data-bs-target="#summary" type="button" role="tab" aria-controls="summary" aria-selected="false" >
                        SUMMARY
                      </button>
                    </li>
                    {/* <li className="nav-item" role="presentation">
                      <button className="nav-link" id="pii-tab" data-bs-toggle="tab" data-bs-target="#pii" type="button" role="tab" aria-controls="pii" aria-selected="false" >
                        Personally identified Entity
                      </button>
                    </li> */}

                    {/* Dropdown for additional tabs */}
                    <li className="nav-item dropdown" role="presentation">
                      <button className="nav-link dropdown-toggle" id="moreTabsDropdown" data-bs-toggle="dropdown" type="button" role="tab" aria-controls="moreTabsDropdownMenu" aria-selected="false" >
                        More
                      </button>
                      <ul className="dropdown-menu" aria-labelledby="moreTabsDropdown" >
                        <li>
                          <button className="dropdown-item" id="pii-tab" data-bs-toggle="tab" data-bs-target="#pii" type="button" role="tab" aria-controls="pii" aria-selected="false" >
                            PERSONALLY IDENTIFIED ENTITY
                          </button>
                        </li>
                        <li>
                          <button className="dropdown-item" id="pronunciation-tab" data-bs-toggle="tab" data-bs-target="#pronunciation" type="button" role="tab" aria-controls="pronunciation" aria-selected="false" >
                            PRONUNCIATION ASSESSMENT
                          </button>
                        </li>
                      </ul>
                    </li>
                  </ul>

                  <div className="tab-content" id="myTabContent">
                    {/* Transcript */}
                    <div className="tab-pane fade show active" id="analyze" role="tabpanel" aria-labelledby="analyze-tab" >
                      <div class="card-body container card-scroll h-400px w-700px items-center justify-center mx-5"
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <audio class="w-100" id="plyr-audio-player" controls ref={audioPlayerRef} >
                          <source src="" type="audio/wav" />
                        </audio>

                        <textarea className="form-control h-300px mt-4 z-0 align-self-end" id="phraseDiv" readOnly
                          value={transcriptionResult}
                        />
                      </div>
                    </div>
                    {/* sentiment analysis */}
                    <div className="tab-pane fade  " id="json" role="tabpanel" aria-labelledby="json-tab" >
                      <div className="card card-custom container mt-4 w-600px h-300px shadow-md">
                        <strong>AnalyzeSentiment</strong>
                        {sentimentAnalysisResult && sentimentAnalysisResultconfidenceScores ? (
                          <div>
                            <p> Sentiment: {sentimentAnalysisResult} </p>
                            <p>Positive Score: {sentimentAnalysisResultconfidenceScores.positive} </p>
                            <p>Negative Score:{" "} {sentimentAnalysisResultconfidenceScores.negative} </p>
                            <p>Neutral Score:{" "} {sentimentAnalysisResultconfidenceScores.neutral} </p>
                          </div>
                        ) : (
                          <p>No sentiment analysis data available</p>
                        )}
                      </div>
                    </div>

                    {/* VOICE analysis */}
                    <div className="tab-pane fade h-400px w-650px " id="voice" role="tabpanel" aria-labelledby="voice-tab" >
                      <div className="card container h-350px">
                        <div className="card card-custom container mt-4 w-600px h-300px shadow-md overflow-y-auto">
                          <strong>AnalyzeSentiment</strong>
                          {prediction.length === 0 ? (
                            <p>No predictions available</p>
                          ) : (
                            prediction.map((pred, index) => (
                              <div className="grid grid-cols-4 gap-0 justify-start items-center m-2" key={index}>

                                <div className="col-span-2"><p><strong className="text-blue-700 ">Filename:</strong> {pred.filename}</p></div>

                                <div> <p><strong className="text-orange-600 col-span-1">Emotion:</strong> {pred.emotion}</p></div>

                                <div>
                                  <p><strong className="text-green-600 col-span-1">Confidence:</strong> {pred.confidence.toFixed(3)}</p></div>
                              </div>
                            ))
                          )}
                        </div></div>

                    </div>

                    {/* select language */}
                    <div className="tab-pane fade  h-300px w-650px mb-4" id="language" role="tabpanel" aria-labelledby="language-tab" >
                      <div className="card card-custom container mt-4 w-650px h-350px p-1 shadow-md ">
                        {loading ? (
                          <p>Loading supported languages...</p>
                        ) : error ? (
                          <p>{error}</p>
                        ) : (
                          <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel id="language-select-label">
                              Select Language
                            </InputLabel>
                            <Select labelId="language-select-label" id="language-select" multiple value={selectedLanguages}
                              onChange={handleLanguageChange}
                              input={<OutlinedInput label="Select Language" />}
                              renderValue={(selected) => (
                                <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "nowrap", overflow: "hidden", whiteSpace: "nowrap", gap: 0.5, }} >
                                  {selected.map((value) => (
                                    <Chip
                                      key={value}
                                      label={
                                        languages.find(
                                          (lang) => lang.code === value
                                        )?.name || value
                                      }
                                    />
                                  ))}
                                </Box>
                              )}
                            >
                              {languages.map((language) => (
                                <MenuItem
                                  key={language.code}
                                  value={language.code}
                                >
                                  {language.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        )}
                        {selectedLanguages.length > 0 && (
                          <button className="btn btn-primary" onClick={handleTranslate} disabled={loading || !transcriptionResult} >
                            {loading ? "Translating..." : "Translate Text"}
                          </button>
                        )}
                        {/* Display translated text */}
                        {translatedText && translatedText.length > 0 && (
                          <div className="card card-custom card-scroll container mt-4 w-full h-350px shadow-md">
                            <strong>Translated Text</strong>
                            {translatedText.map((translation, index) => (
                              <div key={index}>
                                <p>Language: {translation.language}</p>
                                <textarea className="form-control h-200px mt-2" readOnly value={translation.translation} />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Extract Summary */}
                    <div className="tab-pane fade  h-300px w-850px mb-4" id="summary" role="tabpanel" aria-labelledby="summary-tab" >
                      <div className="card card-custom container mt-4 w-650px h-350px p-1 shadow-md ">

                        {/* <div className=' rounded-lg   items-center  w-500px mx-5 d-flex flex-column'> */}
                        <button className="btn btn-primary" onClick={handleGenerateSummary}  >
                          generate summary
                        </button>


                        <div className="card scroll scroll-pull card-custom container mt-4 w-full h-200px shadow-md">
                          <strong>Abstract Summary:</strong>
                          <textarea className="form-control h-200px mt-2" readOnly value={summary.abstract_summaries || ''} />
                        </div>

                        <div className="card scroll scroll-pull card-custom container mt-4 w-full h-200px shadow-md">
                          <strong>Extract Summary:</strong>
                          <textarea className="form-control h-200px mt-2" readOnly value={summary.extract_summaries || ''} />
                        </div>

                        {/* </div> */}
                      </div>
                    </div>
                    {/* Personaly identified information tab */}
                    <div className="tab-pane fade  h-350px w-650px mb-4 P-6" id="pii" role="tabpanel" aria-labelledby="pii-tab" >
                      <div className="card card-custom container mt-4 w-650px P-6 h-350px shadow-md overflow-y-auto ">
                        <p className="text-center text-xl "><strong>PII INFORMATION</strong></p>

                        <p className="overflow-y-auto">{redactedtext}</p>
                        {Array.isArray(piiResult) && piiResult.map((result, index) => (
                          <div className='grid grid-cols-2 ' key={index}>
                            <p><strong className='text-primary text-lg'>text:</strong>{result.text}</p>
                            <p><strong className='text-green-950 text-lg'>category:</strong>{result.category}</p>
                          </div>
                        ))}

                      </div>
                    </div>
                    {/* pronunciation assessment */}
                    <div className="tab-pane fade  h-350px w-650px mb-4 P-6" id="pronunciation" role="tabpanel" aria-labelledby="pronunciation-tab" >
                      <div className="card card-custom container mt-4 w-650px P-6 h-350px shadow-md">
                        <p className="text-center text-xl "><strong>PRONUNCIATION ASSESSMENT</strong></p>
                        <div className="grid grid-cols-5 mt-10 gap-2 text-center ">
                          <p className="col-span-1 text-lg"><strong className="text-primary" >Acurracy score  : </strong>{pronunciation.accuracyScore}</p>
                          <p className="col-span-1 text-lg"><strong className="text-primary">Complete score  : </strong>{pronunciation.compScore}</p>
                          <p className="col-span-1 text-lg"><strong className="text-primary">fluency score  : </strong>{pronunciation.fluencyScore}</p>
                          <p className="col-span-1 text-lg"><strong className="text-primary">prosody score  : </strong>{pronunciation.prosodyScore}</p>
                          <p className="col-span-1 text-lg"><strong className="text-primary">pronunciation score  :</strong>{pronunciation.pronScore}</p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

    //       </div>
    //       <Outlet />
    //     </div>
    //   </div>
    // </div>
  );
};

export default BSTT;
