import React, { useEffect, useState } from "react";
import Login from "./LOGIN/Login";
import Register from "./LOGIN/Register";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import DataTables from "./Components/Tables/DataTables";
import SnowflakeHeader from "./Components/Header/SnowflakeHeader";
import Hrpage from "./Components/Roles/Hrpage";
import PrivateRoute from "./LOGIN/PrivateRoute"; // Import the PrivateRoute component
import AdminPage from "./Components/Roles/AdminPage";
import Itdstaff from "./Components/Roles/Itdstaff";
import Finance from "./Components/Roles/Finance";
import 'bootstrap/dist/js/bootstrap.bundle';
import List from "./Components/Roles/List";
import HeaderAsideTable from "./Components/Tables/HeaderAsideTable";
import FixedLayout from "./Layout/FixedLayout";
import SnowflakeAside from "./Components/Aside/SnowflakeAside";
import Header from "./Components/Header/Header";
import EditScreen from "./Components/Tables/EditScreen";
import STT from "./Components/Playbook/STT";
import TTS from "./Components/Playbook/TTS";
import BSTT from "./Components/Playbook/BSTT";
// import SummarizationInformation from "./Components/Playbook/SummarizationInformation";
import SumInformation from "./Components/Playbook/SumInformation";
import Extract from "./Components/Playbook/Extract";
import DetectLanguage from "./Components/Playbook/DetectLanguage";
import DocumentTranslation from "./Components/Playbook/DocumentTranslation";
import AnalyzeSentiment from "./Components/Playbook/AnalyzeSentiment";
import Recognize_PII_Entities from "./Components/Playbook/Recognize_PII_Entities";
import "./style.css";
import Transcribe from "./Components/Playbook/Transcribe";

// import Layout from "./Layout/Layout";
const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  console.log("Authenticated in App.js:", authenticated);

  
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("authenticated") === "true";// Check for user authentication in local storage during each component render
    setAuthenticated(isAuthenticated);
    setLoading(false); // Once the authentication status is checked, set loading to false
  }, []);


  // Display loading screen until authentication status is checked
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      
      <Router>
      <Routes>
  {/* Public Routes */}
  <Route path="/" element={<Login setAuthenticated={setAuthenticated} />} />
  <Route path="/register" element={<Register />} />

  {/* Protected Routes with FixedLayout */}
  <Route element={<PrivateRoute element={<FixedLayout />} roles={["customer", "admin", "hr", "itdstaff", "finance", "businessaccount", "audit"]} />}>
    <Route path="/transcribe" element={<Transcribe />} />
    <Route path="/speechtotext" element={<STT />} />
    <Route path="/texttospeech" element={<TTS />} />
    <Route path="/Batchspeechtotext" element={<BSTT />} />
    <Route path="/LanguageSummerization" element={<Extract />} />
    <Route path="/DetectLanguage" element={<DetectLanguage />} />
    <Route path="/SentimentAnalysis" element={<AnalyzeSentiment />} />
    <Route path="/PII" element={<Recognize_PII_Entities />} />
    <Route path="/DocumentTranslation" element={<DocumentTranslation />} />
    <Route path="/:tableName" element={<HeaderAsideTable />} />
    <Route path="/Edit" element={<EditScreen />} />
  </Route>
</Routes>

      </Router>
      
    </div>
  );
};

export default App;


{/* <Routes>
<Route path="/" element={<Login setAuthenticated={setAuthenticated} />} />
<Route path="/register" element={<Register />} />

{/* Protected routes         
<Route path="/admin_page" element={<PrivateRoute element={<SnowflakeHeader />} roles={["admin"]} />} />
<Route path="/itdstaff" element={<PrivateRoute element={<Itdstaff />} roles={["itdstaff"]} />} />
<Route path="/finance" element={<PrivateRoute element={<Finance />} roles={["businessfinance"]} />} />
<Route path="/accounts" element={<PrivateRoute element={<DataTables />} roles={["businessaccount"]} />} />
<Route path="/audit" element={<PrivateRoute element={<DataTables />} roles={["audit"]} />} />
<Route path="/HRpage" element={<PrivateRoute element={<Hrpage />} roles={["hr"]} />} />
<Route path="/customer" element={<PrivateRoute element={<FixedLayout />} roles={["customer"]} />}>         
{/* <Route index element={<DataTables/>} /> 
 <Route path="/customer/:tableName" element={<PrivateRoute element={<DataTables/>} roles={["customer"]} />} /> 
</Route>
{/* <Route path="/transcribe" element={<PrivateRoute element={<SpeechToText/>} roles={["customer"]} />} /> 
<Route path="/transcribe" element={<PrivateRoute element={<Transcribe/>} roles={["customer"]} />} />
<Route path="/speechtotext" element={<PrivateRoute element={<STT />} roles={["customer"]} />} />
<Route path="/texttospeech" element={<PrivateRoute element={<TTS />} roles={["customer"]} />} />
{/* <Route path="" element={<PrivateRoute element={<BatchSpeechtoText/>} roles={["customer"]} />} /> 
<Route path="/Batchspeechtotext" element={<PrivateRoute element={<BSTT />} roles={["customer"]} />} />
{/* language studio 
<Route path="/LanguageSummerization" element={<PrivateRoute element={<Extract />} roles={["customer"]} />} />
<Route path="/DetectLanguage" element={<PrivateRoute element={<DetectLanguage />} roles={["customer"]} />} />
<Route path="/SentimentAnalysis" element={<PrivateRoute element={<AnalyzeSentiment />} roles={["customer"]} />} />
<Route path="/PII" element={<PrivateRoute element={<Recognize_PII_Entities />} roles={["customer"]} />} />
{/* translator 
<Route path="/DocumentTranslation" element={<PrivateRoute element={<DocumentTranslation />} roles={["customer"]} />} />
<Route path="/:tableName" element={<PrivateRoute element={<HeaderAsideTable />} roles={["customer"]} />} />
<Route path="/Edit" element={<PrivateRoute element={<EditScreen />} roles={["customer"]} />} />

</Routes> */}




{/* <Route path="/List"  element={<PrivateRoute element={<FixedLayout />} roles={["customer"]} />}>
<Route index element={<List />} />
</Route> */}