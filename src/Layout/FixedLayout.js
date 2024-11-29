// // Create a container component for the fixed Header and Aside
// import React from 'react';


// import { Outlet } from 'react-router-dom';
// import SnowflakeAside from '../Components/Aside/SnowflakeAside';
// import Header from '../Components/Header/Header';

// const FixedLayout = () => {
//   return (
//     <div className="flex">
//       <SnowflakeAside />
//       <div className="h-22 w-full">
//         <Header />
//         <div>
//           <Outlet /> {/* This will render the matched child route component */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FixedLayout;

import React, { useEffect, useState } from 'react'


// import List from '../Roles/List'
// import DataTables from './DataTables'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import SnowflakeAside from '../Components/Aside/SnowflakeAside'
import Header from '../Components/Header/Header'
import DataTables from '../Components/Tables/DataTables'

const FixedLayout = () => {
  const [asideOpen, setAsideOpen] = useState(true);
  const [selectedTable, setSelectedTable] = useState("");
  const [tableHistory, setTableHistory] = useState([]); // State to track table history
  const [username, setUsername] = useState("");
  const location = useLocation(); // Use the useLocation hook to access route parameters
  const [authenticated, setAuthenticated] = useState(true);
  const navigate = useNavigate();


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
    // <div className='flex'>
    //   <div>
    //     <SnowflakeAside asideOpen={asideOpen}
    //       selectedTable={selectedTable} // Pass selected table to AsideBk
    //       setSelectedTable={setSelectedTable}
    //       onTableSelect={handleTableSelect} // Pass callback function to AsideBk
    //     />
    //   </div>

    //   <div className='h-22 w-full'>
    //     <Header />
    //     <div>
    //       {/* <Content/> */}
    //       {/* <DataTables
    //         selectedTable={selectedTable} // Pass selected table to DataTables
    //         setSelectedTable={setSelectedTable}
    //         onTableSelect={handleTableSelect}
    //         onBack={handleBack} // Pass the handleBack callback to DataTables
    //       /> */}
    //       <Outlet />
    //     </div>
    //   </div>


    // </div>
    <div className="flex">
    <SnowflakeAside 
      onToggle ={setAsideOpen}
      asideOpen={asideOpen}
      selectedTable={selectedTable}
      setSelectedTable={setSelectedTable}
      onTableSelect={handleTableSelect}
    />
    <div className="h-22  flex justify-end">
      <Header username={username} onLogout={handleLogout} asideOpen={asideOpen} />
      <main className={`mt-[70px] ${
            asideOpen ? "ml-[230px]" : "ml-[80px]"
          } p-0 bg-metronics_white flex-1 overflow-y-auto`}
        >
        <Outlet /> {/* This renders the matched route component */}
      </main>
    </div>
  </div>
  )
}

export default FixedLayout
