import React, { useEffect, useRef, useState } from 'react';
import Header from '../Header/Header';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import SnowflakeAside from '../Aside/SnowflakeAside';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';


const TTS = () => {
  const audioRef = useRef(null);
  const [asideOpen, setAsideOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState("");
  const [tableHistory, setTableHistory] = useState([]); // State to track table history
  const [username, setUsername] = useState("");
  const location = useLocation(); // Use the useLocation hook to access route parameters
  const [authenticated, setAuthenticated] = useState(true);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('text');
  const [inputText, setInputText] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [textForSummary, SetTextForSummary] = useState('');
  const [sentimentAnalysisResult, setSentimentAnalysisResult] = useState('');
  const [sentimentAnalysisResultconfidenceScores, setSentimentAnalysisResultconfidenceScores] = useState({ positive: 0, negative: 0, neutral: 0, });
  const [piiResult, setPiiResult] = useState([]);
  const [redactedtext, setRedactedText] = useState('');

  const BASE_URL = process.env.REACT_APP_API_URL;

  const textToSpeech = async (text) => {
    console.log("text:", text);
    SetTextForSummary(text);

    try {
      const response = await fetch(`${BASE_URL}/text-to-speech`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      if (response.ok) {
        const { sentiment, confidenceScores, audioData, redactedText, piiEntities } = await response.json();

        // Update sentiment analysis state
        setSentimentAnalysisResult(sentiment);
        setSentimentAnalysisResultconfidenceScores(confidenceScores);
        // Ensure piiEntities is an array
        setPiiResult(Array.isArray(piiEntities) ? piiEntities : []);
        setRedactedText(redactedText);
        console.log(Array.isArray(piiResult)); // Should return true if piiResult is an array
        console.log('piiresult:', piiResult); // Check the actual content

        const audioUrl = `data:audio/wav;base64,${audioData}`; // Convert base64 string to audio URL

        if (audioRef.current) {
          if (!audioRef.current.paused) {
            audioRef.current.pause();
          }
          audioRef.current.src = audioUrl;
          audioRef.current.load();  // Ensure the new audio is loaded
          audioRef.current.play();  // Play the new audio
        }
      } else {
        alert('Failed to generate speech');
      }
    } catch (error) {
      alert('Error fetching audio:', error);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'text') {
      setInputText('');
    }
  };

  // const handleFileChange = (e) => {
  //   // setSelectedFiles(e.target.files);
  //   const files = Array.from(e.target.files);
  //   setSelectedFiles(files);
  //   // Ensure that each file has a temporary path set
  //   files.forEach(file => {
  //     file.tempFilePath = URL.createObjectURL(file);

  //     // Read the file content as text
  //     const reader = new FileReader();
  //     reader.onload = (event) => {
  //       const fileContent = event.target.result;
  //       // Call textToSpeech with the file content
  //       textToSpeech(fileContent, false);
  //     };
  //     reader.readAsText(file);
  //   });
  // };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files); // Update the state with the selected files
    setSummary('')

    for (const file of files) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const fileContent = event.target.result;
        await textToSpeech(fileContent); // Send each file content to the server for TTS
      };
      reader.readAsText(file);
    }
  };
  const handleStoredFileClick = async (index) => {
    const file = selectedFiles[index];

    // Check if the file is a text file by MIME type or extension
    if (file.type === "text/plain" || file.name.endsWith('.txt')) {
      const reader = new FileReader();

      // Read the content of the text file
      reader.onload = async (event) => {
        const fileContent = event.target.result;

        // Convert the file content to speech and play it
        await textToSpeech(fileContent);
      };

      // Start reading the file
      reader.readAsText(file);

    } else if (file.type.startsWith('audio/') || /\.(mp3|wav|ogg)$/i.test(file.name)) {
      // Handle audio files as before
      const audioUrl = URL.createObjectURL(file);

      if (audioRef.current) {
        try {
          if (!audioRef.current.paused) {
            audioRef.current.pause();
          }
          audioRef.current.src = audioUrl;
          audioRef.current.load();  // Ensure the new audio is loaded
          audioRef.current.play().catch(error => {
            console.error("Error playing audio:", error);
            alert("Failed to play the audio file. Please try a different format.");
          });
        } catch (error) {
          console.error("Error setting audio source:", error);
        }
      }
    } else {
      alert("Selected file is not a supported format.");
    }
  };

  const handleDeleteFile = (index) => {

    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
    setSummary('');

  };

  const handleGenerateSummary = async () => {
    try {
      if (!textForSummary) {
        console.error("No text available to summarize.");
        return;
      }

      // Prepare the data to send to the API
      const data = {
        text_documents: [textForSummary]  // Use the text stored in the global variable
      };

      console.log("Data to be sent to API:", data);

      // Send the request to the API
      const response = await fetch('http://127.0.0.1:5000/api/generate-summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),  // Convert the object to JSON
      })
      if (response.ok) {
        const result = await response.json();
        setSummary(result);


        console.log("result:", result);
        // Send the text content, abstract summary, and extract summary to the server
        const dataToSend = {
          textContent: JSON.stringify(data.text_documents),
          abstractSummary: result.abstract_summaries.join('\n'),
          extractSummary: result.extract_summaries.join('\n')
        };
        console.log("Data to be sent to the server:", dataToSend);
        console.log("abstract summary:", result.abstract_summaries);
        console.log("Extract summary:", result.extract_summaries);

        // Send the data to the server
        sendSummaryDataToServer(dataToSend);
      } else {
        alert("FAILED TO GENERATE")
      }
    } catch (error) {
      console.error("Caught error:", error);
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
        const errorDetails = await response.text(); // Get response text for debugging
        console.error('Failed to send summary data to the server:', errorDetails);
        alert('Failed to send summary data to the server');
      } else {
        console.log('Successfully sent summary data to the server');
      }
    } catch (error) {
      alert('Error sending summary data to the server:', error);
    }
  };


  // Aside
  const userName = location.state ? location.state.userName : localStorage.getItem("userName");  // Extract the userName from the route parameters
  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("authenticated");
    setAuthenticated(false);// Redirect to the login page
    navigate("/");
  };
  // const { userName } = location.state || {};
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
    <div className=''>
      {/* <div className={`h-[vh-100] bg-slate-900`}>
        <SnowflakeAside asideOpen={asideOpen}
          selectedTable={selectedTable} // Pass selected table to AsideBk
          setSelectedTable={setSelectedTable}
          onTableSelect={handleTableSelect} // Pass callback function to AsideBk
        />
      </div>

      <div className='h-22 w-full '>
        {/* <Header /> 
        <div>
          <div>
            <Header /> */}

      {/* <div className="bg-gray-100 flex justify-center h-max"> */}
        <div className="card container p-8 rounded-lg shadow-md w-full ">
          <div className="text-3xl font-bold text-center">Text to Audio</div>

          <div className="mt-4 flex justify-center">
            <audio ref={audioRef} className="w-800px mt-4" controls />
          </div>


          <div className="container d-flex shadow-lg rounded-lg mt-2 h-full bg-stone-200">
            <div className='d-flex flex-col'>
              <div className="container h-440px w-700px mt-4 mb-2 rounded-lg bg-stone-100">
                <div className="card-body container card-scroll items-center justify-center" style={{ display: 'flex', flexDirection: 'column' }}>
                  <ul className="nav nav-tabs" id="myTabs" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button className="nav-link active" id="text-tab" data-bs-toggle="tab" data-bs-target="#text" type="button" role="tab"
                        aria-controls="analyze" aria-selected="true"
                        onClick={() => handleTabChange('text')}>TEXT HERE</button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button className="nav-link " id="document-tab" data-bs-toggle="tab" data-bs-target="#document" type="button" role="tab" aria-controls="json" aria-selected="false">UPLOAD DOCUMENT</button>
                    </li>
                  </ul>
                  <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active " id="text" role="tabpanel" aria-labelledby="text-tab">
                      <div className="relative w-full h-full">
                        <textarea
                          placeholder="Type your text here..."
                          // className=" p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-700px  h-350px"
                          className="form-control scroll scroll-pull w-700px  h-350px mt-1 z-0 shadow-2xl position-relative pr-5"
                          value={inputText} // Bind the value to inputText state
                          onChange={(e) => setInputText(e.target.value)} // Update inputText state on change
                        />
                        <button onClick={() => textToSpeech(inputText)}
                          className=" right-96 top-90 bottom-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700
                                            focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4  absolute  ">
                          Play Audio

                        </button>

                      </div>
                    </div>

                    {/* upload document */}
                    <div className="tab-pane fade  " id="document" role="tabpanel" aria-labelledby="document-tab">
                      <div className='card card-custom container mt-4 w-700px  h-350px shadow-md'
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                      >
                        <h1 className="text-4xl font-bold mb-4">Document</h1>
                        <div className='mb-2'>
                          <CloudUploadIcon fontSize="inherit" style={{ color: '#007bff', fontSize: '5em' }} />
                        </div>
                        <div className="mb-5 custom-file-input">
                          <input
                            className="form-control border-1 pt-2 pb-2 w-400px "
                            type="file"
                            name='file'
                            id="filePicker"
                            accept=".txt"
                            onChange={handleFileChange}
                            // ref={fileInputRef}
                            multiple
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <button
                        onClick={() => textToSpeech(document.querySelector('textarea').value, false)}
                        className=" right-4 top-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4 "
                      >
                        Play Audio
                      </button> */}



                </div>
              </div>


              <div className="card card-custom container mt-0 w-700px h-200px shadow-md ">

                <strong>selected files</strong>
                <div className='flex flex-column w-full  '>
                  {selectedFiles.length > 0 ? (
                    selectedFiles.map((file, index) => (
                      <div key={index} className='mb-2 ' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p className='text-primary bg-slate-100 w-4/6 h-10 flex items-center shadow-md shadow-gray-600  '>{file.name}</p>
                        <div className='flex gap-1'>
                          <button
                            className='btn btn-danger btn-sm '
                            onClick={() => handleDeleteFile(index)}
                            title={`Delete ${file.name}`}
                          >
                            <i className='fas fa-trash-alt'></i>
                          </button>
                          <button className='btn btn-primary btn-sm' onClick={() => handleStoredFileClick(index)} ><i class="fa fa-play" aria-hidden="true"></i></button>
                          <button className='btn btn-success btn-sm'>open</button></div>


                      </div>
                    ))
                  ) : (
                    <p className='text-center my-auto'>No files here</p>
                  )}
                </div>


              </div>
            </div>


            <div className='rounded-lg items-center w-500px h-600px d-flex flex-column mt-4 mb-2 bg-stone-100 '>
              {/* <!-- Nav tabs --> */}
              <ul className="nav nav-tabs" id="myTabs" role="tablist">
                {/* <li className="nav-item" role="presentation">
                        <button className="nav-link active mb-2 mt-6" id="analyze-tab" data-bs-toggle="tab" data-bs-target="#analyze" type="button" role="tab" aria-controls="analyze" aria-selected="true">Selected files</button>
                      </li> */}
                <li className="nav-item" role="presentation">
                  <button className="nav-link mb-2 mt-6" id="json-tab" data-bs-toggle="tab" data-bs-target="#json" type="button" role="tab" aria-controls="json" aria-selected="false" >
                    SENTIMENT ANALYSIS
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link active mb-2 mt-6 " id="summary-tab" data-bs-toggle="tab" data-bs-target="#summary" type="button" role="tab" aria-controls="summary" aria-selected="false" >
                    Summary
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link  mb-2 mt-6 " id="pii-tab" data-bs-toggle="tab" data-bs-target="#pii" type="button" role="tab" aria-controls="pii" aria-selected="false" >
                    Personally identified information
                  </button>
                </li>

              </ul>

              {/* <!-- Tab panes --> */}
              <div className="tab-content  " id="myTabContent">


                {/* sentiment analysis */}
                <div className="tab-pane fade  " id="json" role="tabpanel" aria-labelledby="json-tab" >
                  <div className="card card-custom container mt-0 w-500px h-600px p-1 shadow-md ">
                    <strong className='text-center text-2xl'>AnalyzeSentiment</strong>
                    {sentimentAnalysisResult && sentimentAnalysisResultconfidenceScores ? (
                      <div className='grid grid-cols-4 mt-10 p-7 text-center'>
                        <p> <strong className='text-lime-700'>Sentiment  : </strong> {sentimentAnalysisResult} </p>
                        <p> <strong className='text-primary'>Positive Score :</strong> {sentimentAnalysisResultconfidenceScores.positive} </p>
                        <p><strong className='text-danger'>Negative Score : </strong>{sentimentAnalysisResultconfidenceScores.negative} </p>
                        <p> <strong className='text-warning'>Neutral Score : </strong>{sentimentAnalysisResultconfidenceScores.neutral} </p>
                      </div>
                    ) : (
                      <p>No sentiment analysis data available</p>
                    )}
                  </div>
                </div>

                <div className="tab-pane fade  show active mb-4" id="summary" role="tabpanel" aria-labelledby="summary-tab" >
                  <div className="card card-custom container mt-0 w-500px h-600px p-1 shadow-md ">

                    {/* <div className=' rounded-lg   items-center  w-500px mx-5 d-flex flex-column'> */}

                    <button className="btn btn-primary" onClick={handleGenerateSummary}  >
                      generate summary
                    </button>


                    <div className="card scroll scroll-pull card-custom container mt-4 w-full h-300px shadow-md">
                      <strong>Abstract Summary:</strong>
                      <textarea className="form-control h-200px mt-2" readOnly value={summary.abstract_summaries || ''} />
                    </div>

                    <div className="card scroll scroll-pull card-custom container mt-4 w-full h-210px shadow-md">
                      <strong>Extract Summary:</strong>
                      <textarea className="form-control h-200px mt-2" readOnly value={summary.extract_summaries || ''} />
                    </div>

                    {/* </div> */}
                  </div>
                </div>
              </div>
              <div className="tab-pane fade   mb-4" id="pii" role="tabpanel" aria-labelledby="pii-tab" >
                <div className="card card-custom container mt-0 w-500px h-400px p-1 shadow-md ">
                  personally identified information
                  <div className='overflow-y-auto'>
                    <p className='text-black'>{redactedtext}</p>
                    {Array.isArray(piiResult) && piiResult.map((result, index) => (
                      <div className='grid grid-cols-2 ' key={index}>
                        <p><strong className='text-primary text-lg'>text:</strong>{result.text}</p>
                        <p><strong className='text-green-950 text-lg'>category:</strong>{result.category}</p>
                      </div>
                    ))}

                  </div>



                </div>

              </div>
            </div>

          </div>

        </div>
      {/* </div> */}


      {/* </div>
          <Outlet />
        </div>
      </div> */}
    </div>

  );
};

export default TTS;