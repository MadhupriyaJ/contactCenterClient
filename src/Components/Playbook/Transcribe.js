import React, { useEffect, useState } from "react";
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
import Text from "./Text";

const Transcribe = () => {
    const [asideOpen, setAsideOpen] = useState(false);
    const [selectedTable, setSelectedTable] = useState("");
    const [tableHistory, setTableHistory] = useState([]);
    const [username, setUsername] = useState("");
    const location = useLocation();
    const [authenticated, setAuthenticated] = useState(true);
    const navigate = useNavigate();

  

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
        setAuthenticated(false);
        navigate('/login');
    };

    return (
    //     <div className="flex ">
    //     <div>
    //       <SnowflakeAside
    //         asideOpen={asideOpen}
    //         selectedTable={selectedTable}
    //         setSelectedTable={setSelectedTable}
    //         onTableSelect={handleTableSelect}
    //       />
    //     </div>
  
    //     <div className="h-22 w-full ">
    //       <div>
    //         <div className="bg-gray-100 vh-100 w-full">            
    //             {/* <Header username={username} onLogout={handleLogout} />              */}
    //             <div className="m-8 bg-slate-500">
    //             <Text/>
    //             </div>
    //           </div>
    //       <Outlet />
    //     </div>
    //   </div>
    // </div>
    <div className="bg-gray-100 vh-100 w-full">
    <div className="m-8 bg-slate-500">
      <Text />
    </div>
  </div>
    );
}

export default Transcribe;
