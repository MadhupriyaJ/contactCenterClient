import React, { useState, useEffect, useCallback } from 'react';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import Header from '../Header/Header';
import SnowflakeAside from '../Aside/SnowflakeAside';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { franc } from 'franc';
import { Box, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@material-ui/core';


const BASE_URL = process.env.REACT_APP_API_URL;
const apikey = process.env.REACT_APP_SPEECH_API_SUBSCRIPTION_KEY;
const Region = process.env.REACT_APP_SPEECH_API_SERVICE_REGION;
const LanguageKey = process.env.REACT_APP_LANGUAGE_KEY;
const LanguageEndpoint = process.env.REACT_APP_LANGUAGE_ENDPOINT;






const STT = () => {
  const [audioInput, setAudioInput] = useState(null);
  const [textOutput, setTextOutput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [sentimentAnalysisResult, setSentimentAnalysisResult] = useState('');
  const [sentimentAnalysisResultconfidenceScores, setSentimentAnalysisResultconfidenceScores] = useState({ positive: 0, negative: 0, neutral: 0, });
  const [loading, setLoading] = useState(false);
  const [translatedText, setTranslatedText] = useState("");
  const [languages, setLanguages] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [error, setError] = useState(null);
  const [allTextOutput, setAllTextOutput] = useState('');
  const [summarizedText, setSummarizedText] = useState([]);
  const [recorder, setRecorder] = useState(null);
  const [audioFiles, setAudioFiles] = useState([]);





  const [asideOpen, setAsideOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState("");
  const [tableHistory, setTableHistory] = useState([]); // State to track table history
  const [username, setUsername] = useState("");
  const location = useLocation(); // Use the useLocation hook to access route parameters
  const [authenticated, setAuthenticated] = useState(true);

  const navigate = useNavigate();
// rishi

  const startRecord = async () => {
    const { TextAnalyticsClient, AzureKeyCredential } = require("@azure/ai-text-analytics");
    const textAnalyticsClient = new TextAnalyticsClient(LanguageEndpoint, new AzureKeyCredential(LanguageKey));
    // const apiKey = 'c33df036602346eda00e32a025178b58';
    const apiKey = apikey;
    const region = Region;
    const speechConfig = sdk.SpeechConfig.fromSubscription(apiKey, region);
    const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

    recognizer.recognizing = (s, e) => {
      console.log(`RECOGNIZING: Text=${e.result.text}`);
    };

    recognizer.recognized = async (s, e) => {
      if (e.result.reason === sdk.ResultReason.RecognizedSpeech) {
        console.log(`RECOGNIZED: Text=${e.result.text}`);
        const detectedLanguage = franc(e.result.text);

        if (detectedLanguage) {
          console.log(`Detected Language: ${detectedLanguage}`);
          speechConfig.speechRecognitionLanguage = detectedLanguage;
        } else {
          console.log(`Language detection confidence not high enough. Language is undefined.`);
        }
        setTextOutput(e.result.text);
        setAllTextOutput(prevText => prevText + e.result.text + ' ');

        // Perform sentiment analysis using Azure Text Analytics API
        const sentimentResult = await textAnalyticsClient.analyzeSentiment([e.result.text]);
        setSentimentAnalysisResult(sentimentResult[0].sentiment);
        setSentimentAnalysisResultconfidenceScores(sentimentResult[0].confidenceScores);
        console.log(`Sentiment analysis result: ${sentimentResult[0].sentiment}`);

        await sendSpeechTextToServer(allTextOutput); // Send speech text to server
      } else if (e.result.reason === sdk.ResultReason.NoMatch) {
        console.log('SPEECH RECOGNIZED');
      } else {
        console.log('NO SPEECH RECOGNIZED: ' + sdk.ResultReason[e.result.reason]);
      }
    };

    recognizer.startContinuousRecognitionAsync();
    setAudioInput(recognizer);
    setIsRecording(true);

    navigator.mediaDevices.getUserMedia({
      audio: {
        noiseSuppression: true,  // Enable noise suppression
        echoCancellation: true,  // Optionally enable echo cancellation
        autoGainControl: true    // Optionally enable auto gain control
      }
    })
      .then(stream => {
        const mediaRecorder = new MediaRecorder(stream);
        setRecorder(mediaRecorder);
        mediaRecorder.start();

        let chunks = [];
        mediaRecorder.ondataavailable = (event) => {
          chunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: 'audio/wav' });
          const url = URL.createObjectURL(blob);
          setAudioFiles(prevFiles => [...prevFiles, url]);
        };
      })
      .catch(err => console.error('Error accessing media devices.', err));
  };

  const stopRecord = async () => {
    try {
      if (audioInput) {
        await audioInput.stopContinuousRecognitionAsync();
        setAudioInput(null);
        setIsRecording(false);
        await sendSpeechTextToServer(allTextOutput); // Send speech text to server
      } else if (recorder) {
        recorder.stop();
      }

    } catch (error) {
      console.error('Error stopping continuous recognition:', error);
    }
  };


  const sendSpeechTextToServer = async (speechText) => {
    try {
      const response = await fetch(`${BASE_URL}/summarize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ speechText: allTextOutput }),
      });

      if (!response.ok) {
        console.log('Failed to send speech text to server', Error);
        throw new Error('Failed to send speech text to server');

      }

      const data = await response.json();
      console.log("Summarized data:", data);
      setSummarizedText(data.summaries); // Assuming the server returns the summaries as an array

    } catch (error) {
      console.error('Error sending speech text to server:', error);
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
          text: allTextOutput, // Assuming allTextOutput contains the text to translate
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

  const handlerefresh = async () => {
    try {
      if (audioInput) {
        console.log('Stopping audio input...');
        await audioInput.stopContinuousRecognitionAsync();
        setAudioInput(null);
        setIsRecording(false);
        setSentimentAnalysisResult(null);
      }
      console.log('Resetting allTextOutput...');
      setAllTextOutput('');
      setSentimentAnalysisResult(null);

      // setSummarizedText(false)
      // setDummyState(!dummyState); // Force a re-render
    } catch (error) {
      console.error('Error in handlerefresh:', error);
    }
  };

  // prediction



  // aside
  const userName = location.state ? location.state.userName : localStorage.getItem("userName");  // Extract the userName from the route parameters

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("authenticated");
    setAuthenticated(false);// Redirect to the login page
    navigate("/");
  };

  // Set the username in the component's state
  useEffect(() => {
    setUsername(userName || ""); // Set the default value to an empty string if userName is not provided
  }, [userName]);


  const handleTableSelect = (tableName) => {
    // Add the current selected table to the history
    setTableHistory([...tableHistory, selectedTable]);

    // Update the selected table
    setSelectedTable(tableName);
  };

  // Callback function to handle "Back" action
  const handleBack = () => {
    // Get the previous table from the history
    const previousTable = tableHistory.pop();

    // Update the selected table with the previous table
    setSelectedTable(previousTable);

    // Update the table history
    setTableHistory([...tableHistory]);
  };


  return (

    <div className='flex '>
      {/* <div >
        <SnowflakeAside asideOpen={asideOpen}
          selectedTable={selectedTable} // Pass selected table to AsideBk
          setSelectedTable={setSelectedTable}
          onTableSelect={handleTableSelect} // Pass callback function to AsideBk
        />
      </div>

      <div className='h-22 w-full '>
        {/* <Header /> 
        <div className='bg-sky-50 h-full w-full'>

          <div className=' h-full w-full'>
            <Header /> */}

            <div className="container grid grid-cols-2 gap-0 justify-center mt-6  h-5/6 min-w-full ml-2 bg-sky-50">

              <div className='card container ml-72 mr-0 mt-2 h-350px max-w-xl shadow-md shadow-slate-400 col-span-1 '
              //  className="card container bg-white shadow-md p-8 rounded-lg w-full max-w-md"
              >
                {/* rishi */}
                <h1 className="text-3xl font-bold mb-6 flex justify-center mt-4">Speech-to-Text</h1>
                {/* <button className='px-4 py-2 border rounded bg-blue-600 text-white hover:bg-blue-700' onClick={startRecord}>Start Record</button> */}
                <div className="flex items-center justify-center mb-4 mt-14">
                  <div className={`bg-${isRecording ? 'blue' : 'blue'}-700 text-white rounded-full p-2 cursor-pointer w-20 h-30 flex items-center justify-center`}
                    onClick={isRecording ? stopRecord : startRecord}>
                    <FontAwesomeIcon icon={faMicrophone} className={`text-white-600 bg-blue-600 text-3xl w-14 h-14 rounded-full ${isRecording ? 'animate-pulse' : ''}`}
                    />
                  </div>
                </div>
                <div className='text-primary flex justify-center mb-2'>
                  Click record your audio
                </div>
                <button className='mt-auto px-4 py-2 border rounded bg-red-600 text-white hover:bg-red-700 ml-2 mb-4 ' onClick={stopRecord}>Stop Record</button>
              </div>

              {/* recorded files */}
              <div className=' max-w-2xl h-350px mt-2 rounded-lg card container col-span-1 mr-48 shadow-md shadow-slate-400 text-center overflow-y-auto'>
                Recoreded file
                <div className='shadow-inner shadow-slate-400 mb-2'> {audioFiles.map((audioSrc, index) => (
                  <div key={index} className='flex justify-center mt-2 mb-2 '>
                    <audio className='w-4/5' controls src={audioSrc}></audio>
                  </div>
                ))}</div>

              </div>

              {/* textarea */}
              <div className='card container h-450px w-1000px shadow-2xl shadow-slate-400 mt-1 col-span-2 ml-80 flex items-center'>
                <div className='rounded-lg items-center w-full h-full mx-5 my-2 d-flex flex-column '>
                  {/* Tabs list */}
                  <ul className="nav nav-tabs shadow-inner shadow-slate-400" id="myTabs" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button className="nav-link active" id="analyze-tab" data-bs-toggle="tab" data-bs-target="#analyze" type="button" role="tab" aria-controls="analyze" aria-selected="true" >
                        Transcript
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
                        Language
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button className="nav-link" id="summary-tab" data-bs-toggle="tab" data-bs-target="#summary" type="button" role="tab" aria-controls="summary" aria-selected="false" >
                        Summary
                      </button>
                    </li>
                  </ul>
{/* rishi */}
                  <div className="tab-content h-400px w-1000px " id="myTabContent">
                    {/* transcript */}
                    <div className="tab-pane fade show active " id="analyze" role="tabpanel" aria-labelledby="analyze-tab" >
                      <div class="card-body container card-scroll h-400px w-1000px items-center justify-center  mt-4 shadow-2xl" >

                        <div className='h-full w-full bg-black relative overflow-y-scroll'>
                          <textarea
                            className="form-control h-full align-self-end space-y-72"
                            id="phraseDiv"
                            readOnly
                            // value={textOutput}
                            value={allTextOutput}
                          /></div>
                        <div className='absolute text-5xl  w-10 h-10 text-center inset-y-96 flex items-center justify-center'>
                          <button className=''
                            onClick={handlerefresh}>
                            <i class="bi bi-bootstrap-reboot " style={{ fontSize: '2rem', transition: 'transform 0.2s ease-in-out', cursor: 'pointer', color: '#0000FF', '&:hover': { color: 'red' } }} ></i>
                          </button>

                        </div>
                      </div></div>


                    {/* sentiment analysis */}
                    <div className="tab-pane fade  " id="json" role="tabpanel" aria-labelledby="json-tab" >
                      <div className="card card-custom container  h-350px w-900px mt-4 shadow-xl relative ">
                        <div className='card-scroll w-full h-full text-center'>
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
                          )}</div>


                        <div className='flex text-center  w-10 align-bottom absolute top-96  '>
                          <button className=''
                            onClick={handlerefresh}>
                            <i class="bi bi-bootstrap-reboot " style={{ fontSize: '2rem', transition: 'transform 0.2s ease-in-out', cursor: 'pointer', color: '#0000FF', '&:hover': { color: 'red' } }} ></i>
                          </button>

                        </div>
                      </div>
                    </div>

                    {/* VOICE analysis */}
                    <div className="tab-pane fade  " id="voice" role="tabpanel" aria-labelledby="voice-tab" >
                      <div className="card card-custom container mt-4 w-900px h-350px shadow-xl">
                        <strong>AnalyzeSentiment</strong>

                      </div>
                    </div>

                    {/* select language */}
                    <div className="tab-pane fade  h-350px w-1000px mb-4 " id="language" role="tabpanel" aria-labelledby="language-tab" >
                      <div className="card card-custom container mt-4 w-900px h-full p-1 shadow-xl  ">
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
                          <button className="btn btn-primary"
                            onClick={handleTranslate} disabled={loading || !allTextOutput}
                          >
                            {loading ? "Translating..." : "Translate Text"}
                          </button>
                        )}
                        {/* Display translated text */}
                        {translatedText && translatedText.length > 0 && (
                          <div className="card card-custom card-scroll container mt-4 w-full h-350px shadow-md ">
                            <strong>Translated Text</strong>
                            {translatedText.map((translation, index) => (
                              <div key={index}>
                                <p>Language: {translation.language}</p>
                                <textarea className="form-control card-scroll h-150px mt-2 " readOnly value={translation.translation} />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    {/* summary */}
                    <div className="tab-pane fade  h-full w-1000px mb-10" id="summary" role="tabpanel" aria-labelledby="summary-tab" >
                      {/* <div className="card card-custom container mt-1 w-900px h-full p-1 shadow-xl "> */}

                      <div className='container border border-slate-500 rounded-lg  items-center gap-2  w-900px h-full mb-2 d-flex flex-row'>

                        <div className="card scroll scroll-pull card-custom container mt-4  w-full h-full shadow-md hover:shadow-2xl hover:shadow-slate-500 text-center">
                          <strong>Abstract Summary:</strong>
                          {/* {summary.abstract_summary} */}
                        </div>
                        <div className="card scroll scroll-pull card-custom container mt-4 w-full h-full  shadow-md hover:shadow-2xl hover:shadow-slate-500 text-center">
                          <strong >Extract Summary:</strong>
                          {summarizedText.map((summary, index) => (
                            <p key={index}>{summary}</p>
                          ))}
                        </div>

                      </div>
                      {/* </div> */}
                    </div>

                  </div>



                </div>

              </div>

            </div>
          </div>
    //     </div>
    //     <Outlet />
    //   </div>
    // </div>


  );
}

export default STT;