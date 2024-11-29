import { React, useState, useEffect, useContext } from "react";
import SnowflakeAside from "../Aside/SnowflakeAside";
import "./SnowFlakeHeader.css";
import DataTables from "../Tables/DataTables";
import AsideBk from "../Aside/AsideBk";
import { Outlet, Route, Router, Routes, useLocation, useNavigate } from "react-router-dom";
import menu from "../../../src/Components/js/components/menu.js"
import KTMenu from "../../../src/Components/js/components/menu.js";
import KTSwapper from "../js/components/swapper";
import KTDrawer from "../js/components/drawer";
import KTSearch from "../js/components/search";

import TraialAside from "../Aside/TraialAside";
import List from "../Roles/List";


// import { useAuth } from "../../LOGIN/AuthContext";



const Header = ({asideOpen}) => {
  // const [asideOpen, setAsideOpen] = useState(false);
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

  // const handleTableSelect = (tableName) => {
  //   setSelectedTable(tableName); 
  // };

  KTMenu.createInstances();
  var menuElement = document.querySelector("#kt_menu");
  var menu = KTMenu.getInstance(menuElement);
  KTMenu.updateDropdowns();
  KTMenu.updateByLinkAttribute("/users/group/add");
  KTMenu.hideDropdowns();

  KTSwapper.createInstances();
  var swapperElement = document.querySelector("#kt_swapper_control");
  var swapper = KTSwapper.getInstance(swapperElement);

  KTDrawer.createInstances();
  var drawerElement = document.querySelector("#kt_drawer_example_1");
  var drawer = KTDrawer.getInstance(drawerElement);

  var searchElement = document.querySelector("#kt_search_example_1");
  var search = KTSearch.getInstance(searchElement);
  
  // search.show();
  // search.hide();

  return (
    <div className={`${
      asideOpen ? "left-[210px] w-[88%]" : "left-[50px] w-[97%]"
    } flex justify-start fixed bg-slate-200  `}>
      
 {/* <TraialAside asideOpen={asideOpen} 
        selectedTable={selectedTable} // Pass selected table to AsideBk
        setSelectedTable={setSelectedTable}
        onTableSelect={handleTableSelect} // Pass callback function to AsideBk
 /> */}
      {/* <SnowflakeAside asideOpen={asideOpen} 
        selectedTable={selectedTable} // Pass selected table to AsideBk
        setSelectedTable={setSelectedTable}
        onTableSelect={handleTableSelect} // Pass callback function to AsideBk
        /> */}
      {/* <AsideBk asideOpen={asideOpen} 
        selectedTable={selectedTable} // Pass selected table to AsideBk
        setSelectedTable={setSelectedTable}
        onTableSelect={handleTableSelect} // Pass callback function to AsideBk
        /> */}


      
      {/* <div className="w-full flex justify-start bg-blue-700  "> */}
        {/* <div
          id="kt_header"
          className="card header w-full border-bottom h-20 bg-slate-200"
        > */}
          {/* <!--begin::Container--> */}
          {/* <div className="d-flex align-items-stretch"> */}
            {/* <i className="menu-icon fas fa-bars mt-5" id="menu-icon" 
			   ></i>  */}
            <div className="d-flex align-items-stretch justify-content-between flex-lg-grow-1">
              <div className="d-flex align-items-stretch" id="kt_header_nav">
                {/* <!--begin::Menu wrapper--> */}
                <div
                  className="header-menu align-items-stretch"
                  data-kt-drawer="false"
                  data-kt-drawer-name="header-menu"
                  data-kt-drawer-activate="{default: true, lg: false}"
                  data-kt-drawer-overlay="true"
                  data-kt-drawer-width="{default:'200px', '300px': '250px'}"
                  data-kt-drawer-direction="end"
                  data-kt-drawer-toggle="#kt_header_menu_mobile_toggle"
                  data-kt-swapper="true"
                  data-kt-swapper-mode="prepend"
                  data-kt-swapper-parent="{default: '#kt_body', lg: '#kt_header_nav'}"
                >{/* <!--begin::Menu--> */}
                  <div
                    className="menu menu-lg-rounded menu-column menu-lg-row menu-state-bg menu-title-gray-700 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-400 fw-bold my-5 my-lg-0 align-items-stretch"
                    id="#kt_header_menu"
                    data-kt-menu="true"
                  >
                    <div className="menu-item me-lg-1">
                      <a
                        className="menu-link py-3"
                        href="/customer"
                      >
                        <span className="menu-title text-black">Dashboard</span>
                      </a>
                    </div>
                    <div
                      data-kt-menu-trigger="click"
                      data-kt-menu-placement="bottom-start"
                      className="menu-item menu-lg-down-accordion me-lg-1"
                    >
                      <span className="menu-link py-3">
                        <span className="menu-title">DataTable</span>
                        <span className="menu-arrow d-lg-none"></span>
                      </span>
                      <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-rounded-0 py-lg-4 w-lg-225px">
                        <div
                          data-kt-menu-trigger="{default:'click', lg: 'hover'}"
                          data-kt-menu-placement="right-start"
                          className="menu-item menu-lg-down-accordion"
                        >
                          <span className="menu-link py-3">
                            <span className="menu-icon">
                              {/* <!--begin::Svg Icon | path: icons/duotune/ecommerce/ecm007.svg--> */}
                              <span className="svg-icon svg-icon-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    d="M21 9V11C21 11.6 20.6 12 20 12H14V8H20C20.6 8 21 8.4 21 9ZM10 8H4C3.4 8 3 8.4 3 9V11C3 11.6 3.4 12 4 12H10V8Z"
                                    fill="black"
                                  ></path>
                                  <path
                                    d="M15 2C13.3 2 12 3.3 12 5V8H15C16.7 8 18 6.7 18 5C18 3.3 16.7 2 15 2Z"
                                    fill="black"
                                  ></path>
                                  <path
                                    opacity="0.3"
                                    d="M9 2C10.7 2 12 3.3 12 5V8H9C7.3 8 6 6.7 6 5C6 3.3 7.3 2 9 2ZM4 12V21C4 21.6 4.4 22 5 22H10V12H4ZM20 12V21C20 21.6 19.6 22 19 22H14V12H20Z"
                                    fill="black"
                                  ></path>
                                </svg>
                              </span>
                            </span>
                            <span className="menu-title">Pages</span>
                            <span className="menu-arrow"></span>
                          </span>
                          <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                            <div
                              data-kt-menu-trigger="{default:'click', lg: 'hover'}"
                              data-kt-menu-placement="right-start"
                              className="menu-item menu-lg-down-accordion"
                            >
                              <span className="menu-link py-3">
                                <span className="menu-bullet">
                                  <span className="bullet bullet-dot"></span>
                                </span>
                                <span className="menu-title">Profile</span>
                                <span className="menu-arrow"></span>
                              </span>
                              <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/pages/profile/overview.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">Overview</span>
                                  </a>
                                </div>
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/pages/profile/projects.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">Projects</span>
                                  </a>
                                </div>
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/pages/profile/campaigns.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">
                                      Campaigns
                                    </span>
                                  </a>
                                </div>
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/pages/profile/documents.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">
                                      Documents
                                    </span>
                                  </a>
                                </div>
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/pages/profile/connections.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">
                                      Connections
                                    </span>
                                  </a>
                                </div>
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/pages/profile/activity.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">Activity</span>
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div
                              data-kt-menu-trigger="{default:'click', lg: 'hover'}"
                              data-kt-menu-placement="right-start"
                              className="menu-item menu-lg-down-accordion"
                            >
                              <span className="menu-link py-3">
                                <span className="menu-bullet">
                                  <span className="bullet bullet-dot"></span>
                                </span>
                                <span className="menu-title">Projects</span>
                                <span className="menu-arrow"></span>
                              </span>
                              <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/pages/projects/list.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">
                                      My Projects
                                    </span>
                                  </a>
                                </div>
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/pages/projects/project.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">
                                      View Project
                                    </span>
                                  </a>
                                </div>
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/pages/projects/targets.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">Targets</span>
                                  </a>
                                </div>
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/pages/projects/budget.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">Budget</span>
                                  </a>
                                </div>
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/pages/projects/users.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">Users</span>
                                  </a>
                                </div>
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/pages/projects/files.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">Files</span>
                                  </a>
                                </div>
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/pages/projects/activity.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">Activity</span>
                                  </a>
                                </div>
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/pages/projects/settings.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">Settings</span>
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div
                              data-kt-menu-trigger="{default:'click', lg: 'hover'}"
                              data-kt-menu-placement="right-start"
                              className="menu-item menu-lg-down-accordion"
                            >
                              <span className="menu-link py-3">
                                <span className="menu-bullet">
                                  <span className="bullet bullet-dot"></span>
                                </span>
                                <span className="menu-title">Wizards</span>
                                <span className="menu-arrow"></span>
                              </span>
                              <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/pages/wizards/horizontal.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">
                                      Horizontal
                                    </span>
                                  </a>
                                </div>
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/pages/wizards/vertical.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">Vertical</span>
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div
                              data-kt-menu-trigger="{default:'click', lg: 'hover'}"
                              data-kt-menu-placement="right-start"
                              className="menu-item menu-lg-down-accordion"
                            >
                              <span className="menu-link py-3">
                                <span className="menu-bullet">
                                  <span className="bullet bullet-dot"></span>
                                </span>
                                <span className="menu-title">Search</span>
                                <span className="menu-arrow"></span>
                              </span>
                              <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/pages/search/horizontal.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">
                                      Horizontal
                                    </span>
                                  </a>
                                </div>
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/pages/search/vertical.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">Vertical</span>
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div
                              data-kt-menu-trigger="{default:'click', lg: 'hover'}"
                              data-kt-menu-placement="right-start"
                              className="menu-item menu-lg-down-accordion"
                            >
                              <span className="menu-link py-3">
                                <span className="menu-bullet">
                                  <span className="bullet bullet-dot"></span>
                                </span>
                                <span className="menu-title">Blog</span>
                                <span className="menu-arrow"></span>
                              </span>
                              <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/pages/blog/home.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">
                                      Blog Home
                                    </span>
                                  </a>
                                </div>
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/pages/blog/post.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">
                                      Blog Post
                                    </span>
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div
                              data-kt-menu-trigger="{default:'click', lg: 'hover'}"
                              data-kt-menu-placement="right-start"
                              className="menu-item menu-lg-down-accordion"
                            >
                              <span className="menu-link py-3">
                                <span className="menu-bullet">
                                  <span className="bullet bullet-dot"></span>
                                </span>
                                <span className="menu-title">Company</span>
                                <span className="menu-arrow"></span>
                              </span>
                              <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/pages/company/about.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">About Us</span>
                                  </a>
                                </div>
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/pages/company/pricing.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">Pricing</span>
                                  </a>
                                </div>
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/pages/company/contact.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">
                                      Contact Us
                                    </span>
                                  </a>
                                </div>
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/pages/company/team.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">Our Team</span>
                                  </a>
                                </div>
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/pages/company/licenses.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">Licenses</span>
                                  </a>
                                </div>
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/pages/company/sitemap.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">Sitemap</span>
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div
                              data-kt-menu-trigger="{default:'click', lg: 'hover'}"
                              data-kt-menu-placement="right-start"
                              className="menu-item menu-lg-down-accordion"
                            >
                              <span className="menu-link py-3">
                                <span className="menu-bullet">
                                  <span className="bullet bullet-dot"></span>
                                </span>
                                <span className="menu-title">Careers</span>
                                <span className="menu-arrow"></span>
                              </span>
                              <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/pages/careers/list.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">
                                      Careers List
                                    </span>
                                  </a>
                                </div>
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/pages/careers/apply.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">
                                      Careers Apply
                                    </span>
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div
                              data-kt-menu-trigger="{default:'click', lg: 'hover'}"
                              data-kt-menu-placement="right-start"
                              className="menu-item menu-lg-down-accordion"
                            >
                              <span className="menu-link py-3">
                                <span className="menu-bullet">
                                  <span className="bullet bullet-dot"></span>
                                </span>
                                <span className="menu-title">FAQ</span>
                                <span className="menu-arrow"></span>
                              </span>
                              <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/pages/faq/classic.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">Classic</span>
                                  </a>
                                </div>
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/pages/faq/extended.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">Extended</span>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          data-kt-menu-trigger="{default:'click', lg: 'hover'}"
                          data-kt-menu-placement="right-start"
                          className="menu-item menu-lg-down-accordion"
                        >
                          <span className="menu-link py-3">
                            <span className="menu-icon">
                              {/* <!--begin::Svg Icon | path: icons/duotune/communication/com013.svg--> */}
                              <span className="svg-icon svg-icon-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    d="M6.28548 15.0861C7.34369 13.1814 9.35142 12 11.5304 12H12.4696C14.6486 12 16.6563 13.1814 17.7145 15.0861L19.3493 18.0287C20.0899 19.3618 19.1259 21 17.601 21H6.39903C4.87406 21 3.91012 19.3618 4.65071 18.0287L6.28548 15.0861Z"
                                    fill="black"
                                  ></path>
                                  <rect
                                    opacity="0.3"
                                    x="8"
                                    y="3"
                                    width="8"
                                    height="8"
                                    rx="4"
                                    fill="black"
                                  ></rect>
                                </svg>
                              </span>
                            </span>
                            <span className="menu-title">Account</span>
                            <span className="menu-arrow"></span>
                          </span>
                          <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                            <div className="menu-item">
                              <a
                                className="menu-link py-3"
                                href="../../demo1/dist/account/overview.html"
                              >
                                <span className="menu-bullet">
                                  <span className="bullet bullet-dot"></span>
                                </span>
                                <span className="menu-title">Overview</span>
                              </a>
                            </div>
                            <div className="menu-item">
                              <a
                                className="menu-link py-3"
                                href="../../demo1/dist/account/settings.html"
                              >
                                <span className="menu-bullet">
                                  <span className="bullet bullet-dot"></span>
                                </span>
                                <span className="menu-title">Settings</span>
                              </a>
                            </div>
                            <div className="menu-item">
                              <a
                                className="menu-link py-3"
                                href="../../demo1/dist/account/security.html"
                              >
                                <span className="menu-bullet">
                                  <span className="bullet bullet-dot"></span>
                                </span>
                                <span className="menu-title">Security</span>
                              </a>
                            </div>
                            <div className="menu-item">
                              <a
                                className="menu-link py-3"
                                href="../../demo1/dist/account/billing.html"
                              >
                                <span className="menu-bullet">
                                  <span className="bullet bullet-dot"></span>
                                </span>
                                <span className="menu-title">Billing</span>
                              </a>
                            </div>
                            <div className="menu-item">
                              <a
                                className="menu-link py-3"
                                href="../../demo1/dist/account/statements.html"
                              >
                                <span className="menu-bullet">
                                  <span className="bullet bullet-dot"></span>
                                </span>
                                <span className="menu-title">Statements</span>
                              </a>
                            </div>
                            <div className="menu-item">
                              <a
                                className="menu-link py-3"
                                href="../../demo1/dist/account/referrals.html"
                              >
                                <span className="menu-bullet">
                                  <span className="bullet bullet-dot"></span>
                                </span>
                                <span className="menu-title">Referrals</span>
                              </a>
                            </div>
                            <div className="menu-item">
                              <a
                                className="menu-link py-3"
                                href="../../demo1/dist/account/api-keys.html"
                              >
                                <span className="menu-bullet">
                                  <span className="bullet bullet-dot"></span>
                                </span>
                                <span className="menu-title">API Keys</span>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div
                          data-kt-menu-trigger="{default:'click', lg: 'hover'}"
                          data-kt-menu-placement="right-start"
                          className="menu-item menu-lg-down-accordion"
                        >
                          <span className="menu-link py-3">
                            <span className="menu-icon">
                              {/* <!--begin::Svg Icon | path: icons/duotune/technology/teh004.svg--> */}
                              <span className="svg-icon svg-icon-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    opacity="0.3"
                                    d="M21 10.7192H3C2.4 10.7192 2 11.1192 2 11.7192C2 12.3192 2.4 12.7192 3 12.7192H6V14.7192C6 18.0192 8.7 20.7192 12 20.7192C15.3 20.7192 18 18.0192 18 14.7192V12.7192H21C21.6 12.7192 22 12.3192 22 11.7192C22 11.1192 21.6 10.7192 21 10.7192Z"
                                    fill="black"
                                  ></path>
                                  <path
                                    d="M11.6 21.9192C11.4 21.9192 11.2 21.8192 11 21.7192C10.6 21.4192 10.5 20.7191 10.8 20.3191C11.7 19.1191 12.3 17.8191 12.7 16.3191C12.8 15.8191 13.4 15.4192 13.9 15.6192C14.4 15.7192 14.8 16.3191 14.6 16.8191C14.2 18.5191 13.4 20.1192 12.4 21.5192C12.2 21.7192 11.9 21.9192 11.6 21.9192ZM8.7 19.7192C10.2 18.1192 11 15.9192 11 13.7192V8.71917C11 8.11917 11.4 7.71917 12 7.71917C12.6 7.71917 13 8.11917 13 8.71917V13.0192C13 13.6192 13.4 14.0192 14 14.0192C14.6 14.0192 15 13.6192 15 13.0192V8.71917C15 7.01917 13.7 5.71917 12 5.71917C10.3 5.71917 9 7.01917 9 8.71917V13.7192C9 15.4192 8.4 17.1191 7.2 18.3191C6.8 18.7191 6.9 19.3192 7.3 19.7192C7.5 19.9192 7.7 20.0192 8 20.0192C8.3 20.0192 8.5 19.9192 8.7 19.7192ZM6 16.7192C6.5 16.7192 7 16.2192 7 15.7192V8.71917C7 8.11917 7.1 7.51918 7.3 6.91918C7.5 6.41918 7.2 5.8192 6.7 5.6192C6.2 5.4192 5.59999 5.71917 5.39999 6.21917C5.09999 7.01917 5 7.81917 5 8.71917V15.7192V15.8191C5 16.3191 5.5 16.7192 6 16.7192ZM9 4.71917C9.5 4.31917 10.1 4.11918 10.7 3.91918C11.2 3.81918 11.5 3.21917 11.4 2.71917C11.3 2.21917 10.7 1.91916 10.2 2.01916C9.4 2.21916 8.59999 2.6192 7.89999 3.1192C7.49999 3.4192 7.4 4.11916 7.7 4.51916C7.9 4.81916 8.2 4.91918 8.5 4.91918C8.6 4.91918 8.8 4.81917 9 4.71917ZM18.2 18.9192C18.7 17.2192 19 15.5192 19 13.7192V8.71917C19 5.71917 17.1 3.1192 14.3 2.1192C13.8 1.9192 13.2 2.21917 13 2.71917C12.8 3.21917 13.1 3.81916 13.6 4.01916C15.6 4.71916 17 6.61917 17 8.71917V13.7192C17 15.3192 16.8 16.8191 16.3 18.3191C16.1 18.8191 16.4 19.4192 16.9 19.6192C17 19.6192 17.1 19.6192 17.2 19.6192C17.7 19.6192 18 19.3192 18.2 18.9192Z"
                                    fill="black"
                                  ></path>
                                </svg>
                              </span>
                            </span>
                            <span className="menu-title">Authentication</span>
                            <span className="menu-arrow"></span>
                          </span>
                          <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                            <div
                              data-kt-menu-trigger="{default:'click', lg: 'hover'}"
                              data-kt-menu-placement="right-start"
                              className="menu-item menu-lg-down-accordion"
                            >
                              <span className="menu-link py-3">
                                <span className="menu-bullet">
                                  <span className="bullet bullet-dot"></span>
                                </span>
                                <span className="menu-title">Basic Flow</span>
                                <span className="menu-arrow"></span>
                              </span>
                              <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/authentication/flows/basic/sign-in.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">Sign-in</span>
                                  </a>
                                </div>
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/authentication/flows/basic/sign-up.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">Sign-up</span>
                                  </a>
                                </div>
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/authentication/flows/basic/two-steps.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">
                                      Two-steps
                                    </span>
                                  </a>
                                </div>
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/authentication/flows/basic/password-reset.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">
                                      Password Reset
                                    </span>
                                  </a>
                                </div>
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/authentication/flows/basic/new-password.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">
                                      New Password
                                    </span>
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div
                              data-kt-menu-trigger="{default:'click', lg: 'hover'}"
                              data-kt-menu-placement="right-start"
                              className="menu-item menu-lg-down-accordion"
                            >
                              <span className="menu-link py-3">
                                <span className="menu-bullet">
                                  <span className="bullet bullet-dot"></span>
                                </span>
                                <span className="menu-title">Aside Flow</span>
                                <span className="menu-arrow"></span>
                              </span>
                              <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/authentication/flows/aside/sign-in.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">Sign-in</span>
                                  </a>
                                </div>
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/authentication/flows/aside/sign-up.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">Sign-up</span>
                                  </a>
                                </div>
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/authentication/flows/aside/two-steps.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">
                                      Two-steps
                                    </span>
                                  </a>
                                </div>
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/authentication/flows/aside/password-reset.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">
                                      Password Reset
                                    </span>
                                  </a>
                                </div>
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/authentication/flows/aside/new-password.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">
                                      New Password
                                    </span>
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div
                              data-kt-menu-trigger="{default:'click', lg: 'hover'}"
                              data-kt-menu-placement="right-start"
                              className="menu-item menu-lg-down-accordion"
                            >
                              <span className="menu-link py-3">
                                <span className="menu-bullet">
                                  <span className="bullet bullet-dot"></span>
                                </span>
                                <span className="menu-title">Dark Flow</span>
                                <span className="menu-arrow"></span>
                              </span>
                              <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/authentication/flows/dark/sign-in.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">Sign-in</span>
                                  </a>
                                </div>
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/authentication/flows/dark/sign-up.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">Sign-up</span>
                                  </a>
                                </div>
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/authentication/flows/dark/two-steps.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">
                                      Two-steps
                                    </span>
                                  </a>
                                </div>
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/authentication/flows/dark/password-reset.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">
                                      Password Reset
                                    </span>
                                  </a>
                                </div>
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/authentication/flows/dark/new-password.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">
                                      New Password
                                    </span>
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div
                              data-kt-menu-trigger="{default:'click', lg: 'hover'}"
                              data-kt-menu-placement="right-start"
                              className="menu-item menu-lg-down-accordion"
                            >
                              <span className="menu-link py-3">
                                <span className="menu-bullet">
                                  <span className="bullet bullet-dot"></span>
                                </span>
                                <span className="menu-title">Extended</span>
                                <span className="menu-arrow"></span>
                              </span>
                              <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/authentication/extended/multi-steps-sign-up.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">
                                      Multi-steps Sign-up
                                    </span>
                                  </a>
                                </div>
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/authentication/extended/free-trial-sign-up.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">
                                      Free Trial Sign-up
                                    </span>
                                  </a>
                                </div>
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/authentication/extended/coming-soon.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">
                                      Coming Soon
                                    </span>
                                  </a>
                                </div>
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/authentication/general/welcome.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">
                                      Welcome Message
                                    </span>
                                  </a>
                                </div>
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/authentication/general/verify-email.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">
                                      Verify Email
                                    </span>
                                  </a>
                                </div>
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/authentication/general/password-confirmation.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">
                                      Password Confirmation
                                    </span>
                                  </a>
                                </div>
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/authentication/general/deactivation.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">
                                      Account Deactivation
                                    </span>
                                  </a>
                                </div>
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/authentication/general/error-404.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">
                                      Error 404
                                    </span>
                                  </a>
                                </div>
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/authentication/general/error-500.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">
                                      Error 500
                                    </span>
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div
                              data-kt-menu-trigger="{default:'click', lg: 'hover'}"
                              data-kt-menu-placement="right-start"
                              className="menu-item menu-lg-down-accordion"
                            >
                              <span className="menu-link py-3">
                                <span className="menu-bullet">
                                  <span className="bullet bullet-dot"></span>
                                </span>
                                <span className="menu-title">
                                  Email Templates
                                </span>
                                <span className="menu-arrow"></span>
                              </span>
                              <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/authentication/email/verify-email.html"
                                    target="blank"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">
                                      Verify Email
                                    </span>
                                  </a>
                                </div>
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/authentication/email/invitation.html"
                                    target="blank"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">
                                      Account Invitation
                                    </span>
                                  </a>
                                </div>
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/authentication/email/password-reset.html"
                                    target="blank"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">
                                      Password Reset
                                    </span>
                                  </a>
                                </div>
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/authentication/email/password-change.html"
                                    target="blank"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">
                                      Password Changed
                                    </span>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          data-kt-menu-trigger="{default:'click', lg: 'hover'}"
                          data-kt-menu-placement="right-start"
                          className="menu-item menu-lg-down-accordion"
                        >
                          <span className="menu-link py-3">
                            <span className="menu-icon">
                              {/* <!--begin::Svg Icon | path: icons/duotune/art/art009.svg--> */}
                              <span className="svg-icon svg-icon-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    opacity="0.3"
                                    d="M21 18.3V4H20H5C4.4 4 4 4.4 4 5V20C10.9 20 16.7 15.6 19 9.5V18.3C18.4 18.6 18 19.3 18 20C18 21.1 18.9 22 20 22C21.1 22 22 21.1 22 20C22 19.3 21.6 18.6 21 18.3Z"
                                    fill="black"
                                  ></path>
                                  <path
                                    d="M22 4C22 2.9 21.1 2 20 2C18.9 2 18 2.9 18 4C18 4.7 18.4 5.29995 18.9 5.69995C18.1 12.6 12.6 18.2 5.70001 18.9C5.30001 18.4 4.7 18 4 18C2.9 18 2 18.9 2 20C2 21.1 2.9 22 4 22C4.8 22 5.39999 21.6 5.79999 20.9C13.8 20.1 20.1 13.7 20.9 5.80005C21.6 5.40005 22 4.8 22 4Z"
                                    fill="black"
                                  ></path>
                                </svg>
                              </span>
                            </span>
                            <span className="menu-title">Modals</span>
                            <span className="menu-arrow"></span>
                          </span>
                          <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                            <div
                              data-kt-menu-trigger="{default:'click', lg: 'hover'}"
                              data-kt-menu-placement="right-start"
                              className="menu-item menu-lg-down-accordion"
                            >
                              <span className="menu-link py-3">
                                <span className="menu-bullet">
                                  <span className="bullet bullet-dot"></span>
                                </span>
                                <span className="menu-title">General</span>
                                <span className="menu-arrow"></span>
                              </span>
                              <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/modals/general/invite-friends.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">
                                      Invite Friends
                                    </span>
                                  </a>
                                </div>
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/modals/general/view-users.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">
                                      View Users
                                    </span>
                                  </a>
                                </div>
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/modals/general/upgrade-plan.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">
                                      Upgrade Plan
                                    </span>
                                  </a>
                                </div>
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/modals/general/share-earn.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">
                                      Share &amp; Earn
                                    </span>
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div
                              data-kt-menu-trigger="{default:'click', lg: 'hover'}"
                              data-kt-menu-placement="right-start"
                              className="menu-item menu-lg-down-accordion"
                            >
                              <span className="menu-link py-3">
                                <span className="menu-bullet">
                                  <span className="bullet bullet-dot"></span>
                                </span>
                                <span className="menu-title">Forms</span>
                                <span className="menu-arrow"></span>
                              </span>
                              <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/modals/forms/new-target.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">
                                      New Target
                                    </span>
                                  </a>
                                </div>
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/modals/forms/new-card.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">New Card</span>
                                  </a>
                                </div>
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/modals/forms/new-address.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">
                                      New Address
                                    </span>
                                  </a>
                                </div>
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/modals/forms/create-api-key.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">
                                      Create API Key
                                    </span>
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div
                              data-kt-menu-trigger="{default:'click', lg: 'hover'}"
                              data-kt-menu-placement="right-start"
                              className="menu-item menu-lg-down-accordion"
                            >
                              <span className="menu-link py-3">
                                <span className="menu-bullet">
                                  <span className="bullet bullet-dot"></span>
                                </span>
                                <span className="menu-title">Wizards</span>
                                <span className="menu-arrow"></span>
                              </span>
                              <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/modals/wizards/two-factor-authentication.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">
                                      Two Factor Auth
                                    </span>
                                  </a>
                                </div>
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/modals/wizards/create-app.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">
                                      Create App
                                    </span>
                                  </a>
                                </div>
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/modals/wizards/create-account.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">
                                      Create Account
                                    </span>
                                  </a>
                                </div>
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/modals/wizards/create-project.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">
                                      Create Project
                                    </span>
                                  </a>
                                </div>
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/modals/wizards/offer-a-deal.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">
                                      Offer a Deal
                                    </span>
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div
                              data-kt-menu-trigger="{default:'click', lg: 'hover'}"
                              data-kt-menu-placement="right-start"
                              className="menu-item menu-lg-down-accordion"
                            >
                              <span className="menu-link py-3">
                                <span className="menu-bullet">
                                  <span className="bullet bullet-dot"></span>
                                </span>
                                <span className="menu-title">Search</span>
                                <span className="menu-arrow"></span>
                              </span>
                              <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/modals/search/users.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">Users</span>
                                  </a>
                                </div>
                                <div className="menu-item">
                                  <a
                                    className="menu-link py-3"
                                    href="../../demo1/dist/modals/search/select-location.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">
                                      Select Location
                                    </span>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          data-kt-menu-trigger="{default:'click', lg: 'hover'}"
                          data-kt-menu-placement="right-start"
                          className="menu-item menu-lg-down-accordion"
                        >
                          <span className="menu-link py-3">
                            <span className="menu-icon">
                              {/* <!--begin::Svg Icon | path: icons/duotune/general/gen022.svg--> */}
                              <span className="svg-icon svg-icon-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    d="M11.2929 2.70711C11.6834 2.31658 12.3166 2.31658 12.7071 2.70711L15.2929 5.29289C15.6834 5.68342 15.6834 6.31658 15.2929 6.70711L12.7071 9.29289C12.3166 9.68342 11.6834 9.68342 11.2929 9.29289L8.70711 6.70711C8.31658 6.31658 8.31658 5.68342 8.70711 5.29289L11.2929 2.70711Z"
                                    fill="black"
                                  ></path>
                                  <path
                                    d="M11.2929 14.7071C11.6834 14.3166 12.3166 14.3166 12.7071 14.7071L15.2929 17.2929C15.6834 17.6834 15.6834 18.3166 15.2929 18.7071L12.7071 21.2929C12.3166 21.6834 11.6834 21.6834 11.2929 21.2929L8.70711 18.7071C8.31658 18.3166 8.31658 17.6834 8.70711 17.2929L11.2929 14.7071Z"
                                    fill="black"
                                  ></path>
                                  <path
                                    opacity="0.3"
                                    d="M5.29289 8.70711C5.68342 8.31658 6.31658 8.31658 6.70711 8.70711L9.29289 11.2929C9.68342 11.6834 9.68342 12.3166 9.29289 12.7071L6.70711 15.2929C6.31658 15.6834 5.68342 15.6834 5.29289 15.2929L2.70711 12.7071C2.31658 12.3166 2.31658 11.6834 2.70711 11.2929L5.29289 8.70711Z"
                                    fill="black"
                                  ></path>
                                  <path
                                    opacity="0.3"
                                    d="M17.2929 8.70711C17.6834 8.31658 18.3166 8.31658 18.7071 8.70711L21.2929 11.2929C21.6834 11.6834 21.6834 12.3166 21.2929 12.7071L18.7071 15.2929C18.3166 15.6834 17.6834 15.6834 17.2929 15.2929L14.7071 12.7071C14.3166 12.3166 14.3166 11.6834 14.7071 11.2929L17.2929 8.70711Z"
                                    fill="black"
                                  ></path>
                                </svg>
                              </span>
                            </span>
                            <span className="menu-title">Widgets</span>
                            <span className="menu-arrow"></span>
                          </span>
                          <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                            <div className="menu-item">
                              <a
                                className="menu-link py-3"
                                href="../../demo1/dist/widgets/lists.html"
                              >
                                <span className="menu-bullet">
                                  <span className="bullet bullet-dot"></span>
                                </span>
                                <span className="menu-title">Lists</span>
                              </a>
                            </div>
                            <div className="menu-item">
                              <a
                                className="menu-link py-3"
                                href="../../demo1/dist/widgets/statistics.html"
                              >
                                <span className="menu-bullet">
                                  <span className="bullet bullet-dot"></span>
                                </span>
                                <span className="menu-title">Statistics</span>
                              </a>
                            </div>
                            <div className="menu-item">
                              <a
                                className="menu-link py-3"
                                href="../../demo1/dist/widgets/charts.html"
                              >
                                <span className="menu-bullet">
                                  <span className="bullet bullet-dot"></span>
                                </span>
                                <span className="menu-title">Charts</span>
                              </a>
                            </div>
                            <div className="menu-item">
                              <a
                                className="menu-link py-3"
                                href="../../demo1/dist/widgets/mixed.html"
                              >
                                <span className="menu-bullet">
                                  <span className="bullet bullet-dot"></span>
                                </span>
                                <span className="menu-title">Mixed</span>
                              </a>
                            </div>
                            <div className="menu-item">
                              <a
                                className="menu-link py-3"
                                href="../../demo1/dist/widgets/tables.html"
                              >
                                <span className="menu-bullet">
                                  <span className="bullet bullet-dot"></span>
                                </span>
                                <span className="menu-title">Tables</span>
                              </a>
                            </div>
                            <div className="menu-item">
                              <a
                                className="menu-link py-3"
                                href="../../demo1/dist/widgets/feeds.html"
                              >
                                <span className="menu-bullet">
                                  <span className="bullet bullet-dot"></span>
                                </span>
                                <span className="menu-title">Feeds</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      
                      data-kt-menu-trigger="click"
                      data-kt-menu-placement="bottom-start"
                      className="menu-item menu-lg-down-accordion me-lg-1"
                    >
                      <span className="menu-link py-3">
                        <span className="menu-title">Apps</span>
                        <span className="menu-arrow d-lg-none"></span>
                      </span>
                      <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-rounded-0 py-lg-4 w-lg-225px">
                        <div data-kt-menu-trigger="{default:'click', lg: 'hover'}" data-kt-menu-placement="right-start"
                          className="menu-item menu-lg-down-accordion"
                        >
                          <span className="menu-link py-3">
                            <span className="menu-icon">
                              {/* <!--begin::Svg Icon | path: icons/duotune/general/gen051.svg--> */}
                              <span className="svg-icon svg-icon-2">
                                <svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" viewBox="0 0 24 24" fill="none"
                                ><path opacity="0.3" d="M20.5543 4.37824L12.1798 2.02473C12.0626 1.99176 11.9376 1.99176 11.8203 2.02473L3.44572 4.37824C3.18118 4.45258 3 4.6807 3 4.93945V13.569C3 14.6914 3.48509 15.8404 4.4417 16.984C5.17231 17.8575 6.18314 18.7345 7.446 19.5909C9.56752 21.0295 11.6566 21.912 11.7445 21.9488C11.8258 21.9829 11.9129 22 12.0001 22C12.0872 22 12.1744 21.983 12.2557 21.9488C12.3435 21.912 14.4326 21.0295 16.5541 19.5909C17.8169 18.7345 18.8277 17.8575 19.5584 16.984C20.515 15.8404 21 14.6914 21 13.569V4.93945C21 4.6807 20.8189 4.45258 20.5543 4.37824Z"
                                    fill="black"></path>
                                  <path d="M14.854 11.321C14.7568 11.2282 14.6388 11.1818 14.4998 11.1818H14.3333V10.2272C14.3333 9.61741 14.1041 9.09378 13.6458 8.65628C13.1875 8.21876 12.639 8 12 8C11.361 8 10.8124 8.21876 10.3541 8.65626C9.89574 9.09378 9.66663 9.61739 9.66663 10.2272V11.1818H9.49999C9.36115 11.1818 9.24306 11.2282 9.14583 11.321C9.0486 11.4138 9 11.5265 9 11.6591V14.5227C9 14.6553 9.04862 14.768 9.14583 14.8609C9.24306 14.9536 9.36115 15 9.49999 15H14.5C14.6389 15 14.7569 14.9536 14.8542 14.8609C14.9513 14.768 15 14.6553 15 14.5227V11.6591C15.0001 11.5265 14.9513 11.4138 14.854 11.321ZM13.3333 11.1818H10.6666V10.2272C10.6666 9.87594 10.7969 9.57597 11.0573 9.32743C11.3177 9.07886 11.6319 8.9546 12 8.9546C12.3681 8.9546 12.6823 9.07884 12.9427 9.32743C13.2031 9.57595 13.3333 9.87594 13.3333 10.2272V11.1818Z"
                                    fill="black"></path></svg></span>
                            </span>
                            <span className="menu-title">User Management</span>
                            <span className="menu-arrow"></span>
                          </span>
                          <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                            <div data-kt-menu-trigger="{default:'click', lg: 'hover'}" data-kt-menu-placement="right-start"
                              className="menu-item menu-lg-down-accordion"
                            >
                              <span className="menu-link py-3">
                                <span className="menu-bullet">
                                  <span className="bullet bullet-dot"></span>
                                </span>
                                <span className="menu-title">Users</span>
                                <span className="menu-arrow"></span>
                              </span>
                              <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                                <div className="menu-item">
                                  <a className="menu-link py-3" href="../../demo1/dist/apps/user-management/users/list.html">
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">
                                      Users List
                                    </span></a>
                                </div>
                                <div className="menu-item">
                                  <a className="menu-link py-3" href="../../demo1/dist/apps/user-management/users/view.html">
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">
                                      View User
                                    </span></a></div></div></div>
                            <div
                              data-kt-menu-trigger="{default:'click', lg: 'hover'}"
                              data-kt-menu-placement="right-start"
                              className="menu-item menu-lg-down-accordion"
                            >
                              <span className="menu-link py-3">
                                <span className="menu-bullet">
                                  <span className="bullet bullet-dot"></span>
                                </span>
                                <span className="menu-title">Roles</span>
                                <span className="menu-arrow"></span>
                              </span>
                              <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                                <div className="menu-item">
                                  <a className="menu-link py-3" href="../../demo1/dist/apps/user-management/roles/list.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">
                                      Roles List
                                    </span></a>
                                </div>
                                <div className="menu-item">
                                  <a className="menu-link py-3" href="../../demo1/dist/apps/user-management/roles/view.html">
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">
                                      View Roles
                                    </span></a></div></div>
                            </div>
                            <div className="menu-item">
                              <a className="menu-link py-3" href="../../demo1/dist/apps/user-management/permissions.html">
                                <span className="menu-bullet">
                                  <span className="bullet bullet-dot"></span>
                                </span>
                                <span className="menu-title">Permissions</span></a></div></div>
                        </div>
                        <div data-kt-menu-trigger="{default:'click', lg: 'hover'}" data-kt-menu-placement="right-start" className="menu-item menu-lg-down-accordion"
                        >
                          <span className="menu-link py-3">
                            <span className="menu-icon">
                              {/* <!--begin::Svg Icon | path: icons/duotune/finance/fin002.svg--> */}
                              <span className="svg-icon svg-icon-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                >
                                  <path d="M22 7H2V11H22V7Z" fill="black"></path>
                                  <path opacity="0.3" d="M21 19H3C2.4 19 2 18.6 2 18V6C2 5.4 2.4 5 3 5H21C21.6 5 22 5.4 22 6V18C22 18.6 21.6 19 21 19ZM14 14C14 13.4 13.6 13 13 13H5C4.4 13 4 13.4 4 14C4 14.6 4.4 15 5 15H13C13.6 15 14 14.6 14 14ZM16 15.5C16 16.3 16.7 17 17.5 17H18.5C19.3 17 20 16.3 20 15.5C20 14.7 19.3 14 18.5 14H17.5C16.7 14 16 14.7 16 15.5Z"
                                    fill="black"></path></svg></span>
                            </span>
                            <span className="menu-title">
                              Invoice Management
                            </span>
                            <span className="menu-arrow"></span>
                          </span>
                          <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                            <div data-kt-menu-trigger="{default:'click', lg: 'hover'}"data-kt-menu-placement="right-start" className="menu-item menu-lg-down-accordion"
                            >
                              <span className="menu-link py-3">
                                <span className="menu-bullet">
                                  <span className="bullet bullet-dot"></span>
                                </span>
                                <span className="menu-title">Profile</span>
                                <span className="menu-arrow"></span>
                              </span>
                              <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                                <div className="menu-item">
                                  <a className="menu-link py-3" href="../../demo1/dist/apps/invoices/view/invoice-1.html">
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">
                                      Invoice 1
                                    </span></a>
                                </div>
                                <div className="menu-item">
                                  <a className="menu-link py-3" href="../../demo1/dist/apps/invoices/view/invoice-2.html">
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">
                                      Invoice 2
                                    </span></a></div></div>
                            </div>
                            <div className="menu-item">
                              <a className="menu-link py-3" href="../../demo1/dist/apps/invoices/create.html">
                                <span className="menu-bullet">
                                  <span className="bullet bullet-dot"></span>
                                </span>
                                <span className="menu-title">
                                  Create Invoice
                                </span></a></div></div>
                        </div>
                        <div data-kt-menu-trigger="{default:'click', lg: 'hover'}" data-kt-menu-placement="right-start"className="menu-item menu-lg-down-accordion"
                        >
                          <span className="menu-link py-3">
                            <span className="menu-icon">
                              {/* <!--begin::Svg Icon | path: icons/duotune/graphs/gra006.svg--> */}
                              <span className="svg-icon svg-icon-2">
                                <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                  <path d="M13 5.91517C15.8 6.41517 18 8.81519 18 11.8152C18 12.5152 17.9 13.2152 17.6 13.9152L20.1 15.3152C20.6 15.6152 21.4 15.4152 21.6 14.8152C21.9 13.9152 22.1 12.9152 22.1 11.8152C22.1 7.01519 18.8 3.11521 14.3 2.01521C13.7 1.91521 13.1 2.31521 13.1 3.01521V5.91517H13Z"
                                    fill="black"
                                  ></path>
                                  <path opacity="0.3" d="M19.1 17.0152C19.7 17.3152 19.8 18.1152 19.3 18.5152C17.5 20.5152 14.9 21.7152 12 21.7152C9.1 21.7152 6.50001 20.5152 4.70001 18.5152C4.30001 18.0152 4.39999 17.3152 4.89999 17.0152L7.39999 15.6152C8.49999 16.9152 10.2 17.8152 12 17.8152C13.8 17.8152 15.5 17.0152 16.6 15.6152L19.1 17.0152ZM6.39999 13.9151C6.19999 13.2151 6 12.5152 6 11.8152C6 8.81517 8.2 6.41515 11 5.91515V3.01519C11 2.41519 10.4 1.91519 9.79999 2.01519C5.29999 3.01519 2 7.01517 2 11.8152C2 12.8152 2.2 13.8152 2.5 14.8152C2.7 15.4152 3.4 15.7152 4 15.3152L6.39999 13.9151Z"
                                    fill="black"
                                  ></path></svg></span>
                            </span>
                            <span className="menu-title">Support Center</span>
                            <span className="menu-arrow"></span>
                          </span>
                          <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                            <div className="menu-item">
                              <a className="menu-link py-3" href="../../demo1/dist/apps/support-center/overview.html">
                                <span className="menu-bullet">
                                  <span className="bullet bullet-dot"></span>
                                </span>
                                <span className="menu-title">Overview</span>
                              </a>
                            </div>
                            <div data-kt-menu-trigger="{default:'click', lg: 'hover'}" data-kt-menu-placement="right-start" className="menu-item menu-lg-down-accordion"
                            >
                              <span className="menu-link py-3">
                                <span className="menu-bullet">
                                  <span className="bullet bullet-dot"></span>
                                </span>
                                <span className="menu-title">Tickets</span>
                                <span className="menu-arrow"></span>
                              </span>
                              <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                                <div className="menu-item">
                                  <a className="menu-link py-3" href="../../demo1/dist/apps/support-center/tickets/list.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">
                                      Ticket List
                                    </span></a></div>
                                <div className="menu-item">
                                  <a className="menu-link py-3" href="../../demo1/dist/apps/support-center/tickets/view.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">
                                      Ticket View
                                    </span></a></div> </div>
                            </div>
                            <div data-kt-menu-trigger="{default:'click', lg: 'hover'}" data-kt-menu-placement="right-start" className="menu-item menu-lg-down-accordion"
                            >
                              <span className="menu-link py-3">
                                <span className="menu-bullet">
                                  <span className="bullet bullet-dot"></span>
                                </span>
                                <span className="menu-title">Tutorials</span>
                                <span className="menu-arrow"></span>
                              </span>
                              <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                                <div className="menu-item">
                                  <a className="menu-link py-3" href="../../demo1/dist/apps/support-center/tutorials/list.html"
                                  >
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">
                                      Tutorials List
                                    </span></a></div>
                                <div className="menu-item">
                                  <a className="menu-link py-3" href="../../demo1/dist/apps/support-center/tutorials/post.html">
                                    <span className="menu-bullet">
                                      <span className="bullet bullet-dot"></span>
                                    </span>
                                    <span className="menu-title">
                                      Tutorials Post
                                    </span></a></div></div>
                            </div>
                            <div className="menu-item">
                              <a className="menu-link py-3" href="../../demo1/dist/apps/support-center/faq.html">
                                <span className="menu-bullet">
                                  <span className="bullet bullet-dot"></span>
                                </span>
                                <span className="menu-title">FAQ</span></a>
                            </div>
                            <div className="menu-item">
                              <a className="menu-link py-3" href="../../demo1/dist/apps/support-center/licenses.html">
                                <span className="menu-bullet">
                                  <span className="bullet bullet-dot"></span>
                                </span>
                                <span className="menu-title">Licenses</span>
                              </a></div>
                            <div className="menu-item">
                              <a className="menu-link py-3" href="../../demo1/dist/apps/support-center/contact.html">
                                <span className="menu-bullet">
                                  <span className="bullet bullet-dot"></span>
                                </span><span className="menu-title">Contact Us</span></a></div></div></div>
                        <div data-kt-menu-trigger="{default:'click', lg: 'hover'}" data-kt-menu-placement="right-start" className="menu-item menu-lg-down-accordion"
                        >
                          <span className="menu-link py-3">
                            <span className="menu-icon">
                              {/* <!--begin::Svg Icon | path: icons/duotune/finance/fin006.svg--> */}
                              <span className="svg-icon svg-icon-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                  <path opacity="0.3" d="M20 15H4C2.9 15 2 14.1 2 13V7C2 6.4 2.4 6 3 6H21C21.6 6 22 6.4 22 7V13C22 14.1 21.1 15 20 15ZM13 12H11C10.5 12 10 12.4 10 13V16C10 16.5 10.4 17 11 17H13C13.6 17 14 16.6 14 16V13C14 12.4 13.6 12 13 12Z"
                                    fill="black"></path>
                                  <path d="M14 6V5H10V6H8V5C8 3.9 8.9 3 10 3H14C15.1 3 16 3.9 16 5V6H14ZM20 15H14V16C14 16.6 13.5 17 13 17H11C10.5 17 10 16.6 10 16V15H4C3.6 15 3.3 14.9 3 14.7V18C3 19.1 3.9 20 5 20H19C20.1 20 21 19.1 21 18V14.7C20.7 14.9 20.4 15 20 15Z"
                                    fill="black"></path></svg></span></span>
                            <span className="menu-title">Customers</span>
                            <span className="menu-arrow"></span>
                          </span>
                          <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                            <div className="menu-item">
                              <a
                                className="menu-link py-3"
                                href="../../demo1/dist/apps/customers/getting-started.html"
                              >
                                <span className="menu-bullet">
                                  <span className="bullet bullet-dot"></span>
                                </span>
                                <span className="menu-title">
                                  Getting Started
                                </span>
                              </a>
                            </div>
                            <div className="menu-item">
                              <a
                                className="menu-link py-3"
                                href="../../demo1/dist/apps/customers/list.html"
                              >
                                <span className="menu-bullet">
                                  <span className="bullet bullet-dot"></span>
                                </span>
                                <span className="menu-title">
                                  Customer Listing
                                </span>
                              </a>
                            </div>
                            <div className="menu-item">
                              <a
                                className="menu-link py-3"
                                href="../../demo1/dist/apps/customers/view.html"
                              >
                                <span className="menu-bullet">
                                  <span className="bullet bullet-dot"></span>
                                </span>
                                <span className="menu-title">
                                  Customer Details
                                </span> </a></div></div></div>
                        <div data-kt-menu-trigger="{default:'click', lg: 'hover'}" data-kt-menu-placement="right-start" className="menu-item menu-lg-down-accordion"
                        >
                          <span className="menu-link py-3">
                            <span className="menu-icon">
                              {/* <!--begin::Svg Icon | path: icons/duotune/ecommerce/ecm002.svg--> */}
                              <span className="svg-icon svg-icon-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                  <path d="M21 10H13V11C13 11.6 12.6 12 12 12C11.4 12 11 11.6 11 11V10H3C2.4 10 2 10.4 2 11V13H22V11C22 10.4 21.6 10 21 10Z"
                                    fill="black"
                                  ></path>
                                  <path opacity="0.3" d="M12 12C11.4 12 11 11.6 11 11V3C11 2.4 11.4 2 12 2C12.6 2 13 2.4 13 3V11C13 11.6 12.6 12 12 12Z"
                                    fill="black"
                                  ></path>
                                  <path opacity="0.3" d="M18.1 21H5.9C5.4 21 4.9 20.6 4.8 20.1L3 13H21L19.2 20.1C19.1 20.6 18.6 21 18.1 21ZM13 18V15C13 14.4 12.6 14 12 14C11.4 14 11 14.4 11 15V18C11 18.6 11.4 19 12 19C12.6 19 13 18.6 13 18ZM17 18V15C17 14.4 16.6 14 16 14C15.4 14 15 14.4 15 15V18C15 18.6 15.4 19 16 19C16.6 19 17 18.6 17 18ZM9 18V15C9 14.4 8.6 14 8 14C7.4 14 7 14.4 7 15V18C7 18.6 7.4 19 8 19C8.6 19 9 18.6 9 18Z"
                                    fill="black"
                                  ></path></svg></span>
                            </span>
                            <span className="menu-title">Subscriptions</span>
                            <span className="menu-arrow"></span>
                          </span>
                          <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                            <div className="menu-item">
                              <a className="menu-link py-3" href="../../demo1/dist/apps/subscriptions/getting-started.html">
                                <span className="menu-bullet">
                                  <span className="bullet bullet-dot"></span>
                                </span>
                                <span className="menu-title">
                                  Getting Started
                                </span></a></div>
                            <div className="menu-item">
                              <a className="menu-link py-3" href="../../demo1/dist/apps/subscriptions/list.html">
                                <span className="menu-bullet">
                                  <span className="bullet bullet-dot"></span>
                                </span>
                                <span className="menu-title">
                                  Subscription List
                                </span></a>
                            </div>
                            <div className="menu-item">
                              <a className="menu-link py-3" href="../../demo1/dist/apps/subscriptions/add.html" >
                                <span className="menu-bullet">
                                  <span className="bullet bullet-dot"></span>
                                </span>
                                <span className="menu-title">
                                  Add Subscription
                                </span></a>
                            </div>
                            <div className="menu-item">
                              <a className="menu-link py-3" href="../../demo1/dist/apps/subscriptions/view.html">
                                <span className="menu-bullet">
                                  <span className="bullet bullet-dot"></span>
                                </span>
                                <span className="menu-title">
                                  View Subscription
                                </span></a></div></div>
                        </div>
                        <div data-kt-menu-trigger="{default:'click', lg: 'hover'}" data-kt-menu-placement="right-start" className="menu-item menu-lg-down-accordion"
                        >
                          <span className="menu-link py-3">
                            <span className="menu-icon">
                              {/* <!--begin::Svg Icon | path: icons/duotune/communication/com012.svg--> */}
                              <span className="svg-icon svg-icon-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                  <path opacity="0.3" d="M20 3H4C2.89543 3 2 3.89543 2 5V16C2 17.1046 2.89543 18 4 18H4.5C5.05228 18 5.5 18.4477 5.5 19V21.5052C5.5 22.1441 6.21212 22.5253 6.74376 22.1708L11.4885 19.0077C12.4741 18.3506 13.6321 18 14.8167 18H20C21.1046 18 22 17.1046 22 16V5C22 3.89543 21.1046 3 20 3Z"
                                    fill="black"></path>
                                  <rect x="6" y="12" width="7" height="2" rx="1" fill="black"></rect>
                                  <rect x="6" y="7" width="12" height="2" rx="1" fill="black"></rect>
                                </svg>
                              </span>
                            </span>
                            <span className="menu-title">Chat</span>
                            <span className="menu-arrow"></span>
                          </span>
                          <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                            <div className="menu-item">
                              <a className="menu-link py-3" href="../../demo1/dist/apps/chat/private.html">
                                <span className="menu-bullet">
                                  <span className="bullet bullet-dot"></span>
                                </span>
                                <span className="menu-title">Private Chat</span></a>
                            </div>
                            <div className="menu-item">
                              <a className="menu-link py-3" href="../../demo1/dist/apps/chat/group.html">
                                <span className="menu-bullet">
                                  <span className="bullet bullet-dot"></span>
                                </span>
                                <span className="menu-title">Group Chat</span></a>
                            </div>
                            <div className="menu-item">
                              <a className="menu-link py-3" href="../../demo1/dist/apps/chat/drawer.html">
                                <span className="menu-bullet">
                                  <span className="bullet bullet-dot"></span>
                                </span><span className="menu-title">Drawer Chat</span></a></div></div></div></div></div>
                    <div
                      data-kt-menu-trigger="click"
                      data-kt-menu-placement="bottom-start"
                      className="menu-item menu-lg-down-accordion me-lg-1"
                    >
                      <span className="menu-link py-3">
                        <span className="menu-title">Layouts</span>
                        <span className="menu-arrow d-lg-none"></span>
                      </span>
                      <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-rounded-0 py-lg-4 w-lg-225px">
                        <div
                          data-kt-menu-trigger="{default:'click', lg: 'hover'}"
                          data-kt-menu-placement="right-start"
                          className="menu-item menu-lg-down-accordion"
                        >
                          <span className="menu-link py-3">
                            <span className="menu-icon">
                              {/* <!--begin::Svg Icon | path: icons/duotune/abstract/abs042.svg--> */}
                              <span className="svg-icon svg-icon-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    d="M18 21.6C16.6 20.4 9.1 20.3 6.3 21.2C5.7 21.4 5.1 21.2 4.7 20.8L2 18C4.2 15.8 10.8 15.1 15.8 15.8C16.2 18.3 17 20.5 18 21.6ZM18.8 2.8C18.4 2.4 17.8 2.20001 17.2 2.40001C14.4 3.30001 6.9 3.2 5.5 2C6.8 3.3 7.4 5.5 7.7 7.7C9 7.9 10.3 8 11.7 8C15.8 8 19.8 7.2 21.5 5.5L18.8 2.8Z"
                                    fill="black"
                                  ></path>
                                  <path
                                    opacity="0.3"
                                    d="M21.2 17.3C21.4 17.9 21.2 18.5 20.8 18.9L18 21.6C15.8 19.4 15.1 12.8 15.8 7.8C18.3 7.4 20.4 6.70001 21.5 5.60001C20.4 7.00001 20.2 14.5 21.2 17.3ZM8 11.7C8 9 7.7 4.2 5.5 2L2.8 4.8C2.4 5.2 2.2 5.80001 2.4 6.40001C2.7 7.40001 3.00001 9.2 3.10001 11.7C3.10001 15.5 2.40001 17.6 2.10001 18C3.20001 16.9 5.3 16.2 7.8 15.8C8 14.2 8 12.7 8 11.7Z"
                                    fill="black"
                                  ></path>
                                </svg>
                              </span>
                            </span>
                            <span className="menu-title">Toolbars</span>
                            <span className="menu-arrow"></span>
                          </span>
                          <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                            <div className="menu-item">
                              <a
                                className="menu-link py-3"
                                href="../../demo1/dist/layouts/toolbars/toolbar-1.html"
                              >
                                <span className="menu-bullet">
                                  <span className="bullet bullet-dot"></span>
                                </span>
                                <span className="menu-title">Toolbar 1</span>
                              </a>
                            </div>
                            <div className="menu-item">
                              <a
                                className="menu-link py-3"
                                href="../../demo1/dist/layouts/toolbars/toolbar-2.html"
                              >
                                <span className="menu-bullet">
                                  <span className="bullet bullet-dot"></span>
                                </span>
                                <span className="menu-title">Toolbar 2</span>
                              </a>
                            </div>
                            <div className="menu-item">
                              <a
                                className="menu-link py-3"
                                href="../../demo1/dist/layouts/toolbars/toolbar-3.html"
                              >
                                <span className="menu-bullet">
                                  <span className="bullet bullet-dot"></span>
                                </span>
                                <span className="menu-title">Toolbar 3</span>
                              </a>
                            </div>
                            <div className="menu-item">
                              <a
                                className="menu-link py-3"
                                href="../../demo1/dist/layouts/toolbars/toolbar-4.html"
                              >
                                <span className="menu-bullet">
                                  <span className="bullet bullet-dot"></span>
                                </span>
                                <span className="menu-title">Toolbar 4</span>
                              </a>
                            </div>
                            <div className="menu-item">
                              <a
                                className="menu-link py-3"
                                href="../../demo1/dist/layouts/toolbars/toolbar-5.html"
                              >
                                <span className="menu-bullet">
                                  <span className="bullet bullet-dot"></span>
                                </span>
                                <span className="menu-title">Toolbar 5</span>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div
                          data-kt-menu-trigger="{default:'click', lg: 'hover'}"
                          data-kt-menu-placement="right-start"
                          className="menu-item menu-lg-dropdown"
                        >
                          <span className="menu-link py-3">
                            <span className="menu-icon">
                              {/* <!--begin::Svg Icon | path: icons/duotune/general/gen009.svg--> */}
                              <span className="svg-icon svg-icon-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    opacity="0.3"
                                    d="M21 22H14C13.4 22 13 21.6 13 21V3C13 2.4 13.4 2 14 2H21C21.6 2 22 2.4 22 3V21C22 21.6 21.6 22 21 22Z"
                                    fill="black"
                                  ></path>
                                  <path
                                    d="M10 22H3C2.4 22 2 21.6 2 21V3C2 2.4 2.4 2 3 2H10C10.6 2 11 2.4 11 3V21C11 21.6 10.6 22 10 22Z"
                                    fill="black"
                                  ></path>
                                </svg>
                              </span>
                            </span>
                            <span className="menu-title">Aside</span>
                            <span className="menu-arrow"></span>
                          </span>
                          <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                            <div className="menu-item">
                              <a
                                className="menu-link py-3"
                                href="../../demo1/dist/layouts/aside/light.html"
                              >
                                <span className="menu-bullet">
                                  <span className="bullet bullet-dot"></span>
                                </span>
                                <span className="menu-title">Light Skin</span>
                              </a>
                            </div>
                            <div className="menu-item">
                              <a
                                className="menu-link py-3"
                                href="../../demo1/dist/layouts/aside/font-icons.html"
                              >
                                <span className="menu-bullet">
                                  <span className="bullet bullet-dot"></span>
                                </span>
                                <span className="menu-title">Font Icons</span>
                              </a>
                            </div>
                            <div className="menu-item">
                              <a
                                className="menu-link py-3"
                                href="../../demo1/dist/layouts/aside/minimized.html"
                              >
                                <span className="menu-bullet">
                                  <span className="bullet bullet-dot"></span>
                                </span>
                                <span className="menu-title">Minimized</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div></div>
{/* <!--end::Menu--> */}
                </div>
{/* <!--end::Menu wrapper--> */}
              </div>

              <div className="d-flex align-items-stretch flex-shrink-0">
                {/* <!--begin::Toolbar wrapper--> */}
                <div className="d-flex align-items-stretch flex-shrink-0">
                  {/* <!--begin::Search--> */}
                  <div className="d-flex align-items-stretch ms-1 ms-lg-3">
                    {/* <!--begin::Search--> */}
                    <div
                      id="kt_header_search"
                      className="d-flex align-items-stretch"
                      data-kt-search-keypress="true"
                      data-kt-search-min-length="2"
                      data-kt-search-enter="enter"
                      data-kt-search-layout="menu"
                      data-kt-menu-trigger="auto"
                      data-kt-menu-overflow="false"
                      data-kt-menu-permanent="true"
                      data-kt-menu-placement="bottom-end"
                      data-kt-search="true"
                    >
                      {/* <!--begin::Search toggle--> */}
                      <div
                        className="d-flex align-items-center"
                        data-kt-search-element="toggle"
                        id="kt_header_search_toggle"
                      >
                        <div className="btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px">
                          {/* <!--begin::Svg Icon | path: icons/duotune/general/gen021.svg--> */}
                          <span className="svg-icon svg-icon-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <rect
                                opacity="0.5"
                                x="17.0365"
                                y="15.1223"
                                width="8.15546"
                                height="2"
                                rx="1"
                                transform="rotate(45 17.0365 15.1223)"
                                fill="black"
                              ></rect>
                              <path
                                d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z"
                                fill="black"
                              ></path>
                            </svg>
                          </span>
                        </div>
                      </div>
                      {/* <!--end::Search toggle--> */}
                      {/* <!--begin::Menu--> */}
                      <div
                        data-kt-search-element="content"
                        className="menu menu-sub menu-sub-dropdown p-7 w-325px w-md-375px"
                        data-kt-menu="true"
                      >
                        {/* <!--begin::Wrapper--> */}
                        <div data-kt-search-element="wrapper">
                          {/* <!--begin::Form--> */}
                          <form
                            data-kt-search-element="form"
                            className="w-100 position-relative mb-3"
                            autocomplete="off"
                          >
                            {/* <!--begin::Icon--> */}
                            {/* <!--begin::Svg Icon | path: icons/duotune/general/gen021.svg--> */}
                            <span className="svg-icon svg-icon-2 svg-icon-lg-1 svg-icon-gray-500 position-absolute top-50 translate-middle-y ms-0">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <rect
                                  opacity="0.5"
                                  x="17.0365"
                                  y="15.1223"
                                  width="8.15546"
                                  height="2"
                                  rx="1"
                                  transform="rotate(45 17.0365 15.1223)"
                                  fill="black"
                                ></rect>
                                <path
                                  d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z"
                                  fill="black"
                                ></path>
                              </svg>
                            </span>

                            {/* <!--end::Icon--> */}
                            {/* <!--begin::Input--> */}
                            <input
                              type="text"
                              className="form-control form-control-flush ps-10"
                              name="search"
                              value=""
                              placeholder="Search..."
                              data-kt-search-element="input"
                            />
                            {/* <!--end::Input--> */}
                            {/* <!--begin::Spinner--> */}
                            <span
                              className="position-absolute top-50 end-0 translate-middle-y lh-0 d-none me-1"
                              data-kt-search-element="spinner"
                            >
                              <span className="spinner-border h-15px w-15px align-middle text-gray-400"></span>
                            </span>
                            {/* <!--end::Spinner--> */}
                            {/* <!--begin::Reset--> */}
                            <span
                              className="btn btn-flush btn-active-color-primary position-absolute top-50 end-0 translate-middle-y lh-0 d-none"
                              data-kt-search-element="clear"
                            >
                              {/* <!--begin::Svg Icon | path: icons/duotune/arrows/arr061.svg--> */}
                              <span className="svg-icon svg-icon-2 svg-icon-lg-1 me-0">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <rect
                                    opacity="0.5"
                                    x="6"
                                    y="17.3137"
                                    width="16"
                                    height="2"
                                    rx="1"
                                    transform="rotate(-45 6 17.3137)"
                                    fill="black"
                                  ></rect>
                                  <rect
                                    x="7.41422"
                                    y="6"
                                    width="16"
                                    height="2"
                                    rx="1"
                                    transform="rotate(45 7.41422 6)"
                                    fill="black"
                                  ></rect>
                                </svg>
                              </span>
                            </span>
                            {/* <!--end::Reset--> */}
                            {/* <!--begin::Toolbar--> */}
                            <div
                              className="position-absolute top-50 end-0 translate-middle-y"
                              data-kt-search-element="toolbar"
                            >
                              {/* <!--begin::Preferences toggle--> */}
                              <div
                                data-kt-search-element="preferences-show"
                                className="btn btn-icon w-20px btn-sm btn-active-color-primary me-1"
                                data-bs-toggle="tooltip"
                                title=""
                                data-bs-original-title="Show search preferences"
                              >
                                {/* <!--begin::Svg Icon | path: icons/duotune/coding/cod001.svg--> */}
                                <span className="svg-icon svg-icon-1">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                  >
                                    <path
                                      opacity="0.3"
                                      d="M22.1 11.5V12.6C22.1 13.2 21.7 13.6 21.2 13.7L19.9 13.9C19.7 14.7 19.4 15.5 18.9 16.2L19.7 17.2999C20 17.6999 20 18.3999 19.6 18.7999L18.8 19.6C18.4 20 17.8 20 17.3 19.7L16.2 18.9C15.5 19.3 14.7 19.7 13.9 19.9L13.7 21.2C13.6 21.7 13.1 22.1 12.6 22.1H11.5C10.9 22.1 10.5 21.7 10.4 21.2L10.2 19.9C9.4 19.7 8.6 19.4 7.9 18.9L6.8 19.7C6.4 20 5.7 20 5.3 19.6L4.5 18.7999C4.1 18.3999 4.1 17.7999 4.4 17.2999L5.2 16.2C4.8 15.5 4.4 14.7 4.2 13.9L2.9 13.7C2.4 13.6 2 13.1 2 12.6V11.5C2 10.9 2.4 10.5 2.9 10.4L4.2 10.2C4.4 9.39995 4.7 8.60002 5.2 7.90002L4.4 6.79993C4.1 6.39993 4.1 5.69993 4.5 5.29993L5.3 4.5C5.7 4.1 6.3 4.10002 6.8 4.40002L7.9 5.19995C8.6 4.79995 9.4 4.39995 10.2 4.19995L10.4 2.90002C10.5 2.40002 11 2 11.5 2H12.6C13.2 2 13.6 2.40002 13.7 2.90002L13.9 4.19995C14.7 4.39995 15.5 4.69995 16.2 5.19995L17.3 4.40002C17.7 4.10002 18.4 4.1 18.8 4.5L19.6 5.29993C20 5.69993 20 6.29993 19.7 6.79993L18.9 7.90002C19.3 8.60002 19.7 9.39995 19.9 10.2L21.2 10.4C21.7 10.5 22.1 11 22.1 11.5ZM12.1 8.59998C10.2 8.59998 8.6 10.2 8.6 12.1C8.6 14 10.2 15.6 12.1 15.6C14 15.6 15.6 14 15.6 12.1C15.6 10.2 14 8.59998 12.1 8.59998Z"
                                      fill="black"
                                    ></path>
                                    <path
                                      d="M17.1 12.1C17.1 14.9 14.9 17.1 12.1 17.1C9.30001 17.1 7.10001 14.9 7.10001 12.1C7.10001 9.29998 9.30001 7.09998 12.1 7.09998C14.9 7.09998 17.1 9.29998 17.1 12.1ZM12.1 10.1C11 10.1 10.1 11 10.1 12.1C10.1 13.2 11 14.1 12.1 14.1C13.2 14.1 14.1 13.2 14.1 12.1C14.1 11 13.2 10.1 12.1 10.1Z"
                                      fill="black"
                                    ></path>
                                  </svg>
                                </span>
                              </div>
                              {/* <!--end::Preferences toggle--> */}
                              {/* <!--begin::Advanced search toggle--> */}
                              <div
                                data-kt-search-element="advanced-options-form-show"
                                className="btn btn-icon w-20px btn-sm btn-active-color-primary"
                                data-bs-toggle="tooltip"
                                title=""
                                data-bs-original-title="Show more search options"
                              >
                                {/* <!--begin::Svg Icon | path: icons/duotune/arrows/arr072.svg--> */}
                                <span className="svg-icon svg-icon-2">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                  >
                                    <path
                                      d="M11.4343 12.7344L7.25 8.55005C6.83579 8.13583 6.16421 8.13584 5.75 8.55005C5.33579 8.96426 5.33579 9.63583 5.75 10.05L11.2929 15.5929C11.6834 15.9835 12.3166 15.9835 12.7071 15.5929L18.25 10.05C18.6642 9.63584 18.6642 8.96426 18.25 8.55005C17.8358 8.13584 17.1642 8.13584 16.75 8.55005L12.5657 12.7344C12.2533 13.0468 11.7467 13.0468 11.4343 12.7344Z"
                                      fill="black"
                                    ></path>
                                  </svg>
                                </span>
                              </div>
                              {/* <!--end::Advanced search toggle--> */}
                            </div>
                            {/* <!--end::Toolbar--> */}
                          </form>
                          {/* <!--end::Form--> */}
                          {/* <!--begin::Separator--> */}
                          <div className="separator border-gray-200 mb-6"></div>
                          {/* <!--end::Separator--> */}
                          {/* <!--begin::Recently viewed--> */}
                          <div
                            data-kt-search-element="results"
                            className="d-none"
                          >
                            {/* <!--begin::Items--> */}
                            <div className="scroll-y mh-200px mh-lg-350px">
                              {/* <!--begin::Category title--> */}
                              <h3
                                className="fs-5 text-muted m-0 pb-5"
                                data-kt-search-element="category-title"
                              >
                                User
                              </h3>
                              {/* <!--end::Category title--> */}
                              {/* <!--begin::Item--> */}
                            </div>
                            {/* <!--end::Items--> */}
                          </div>
                          {/* <!--end::Recently viewed--> */}
                          {/* <!--begin::Recently viewed--> */}
                          <div className="mb-4" data-kt-search-element="main">
                            {/* <!--begin::Heading--> */}
                            <div className="d-flex flex-stack fw-bold mb-4">
                              {/* <!--begin::Label--> */}
                              <span className="text-muted fs-6 me-2">
                                Recently Searched:
                              </span>
                              {/* <!--end::Label--> */}
                            </div>
                            {/* <!--end::Heading--> */}
                            {/* <!--begin::Items--> */}
                            <div className="scroll-y mh-200px mh-lg-325px">
                              {/* <!--begin::Item--> */}
                              <div className="d-flex align-items-center mb-5">
                                {/* <!--begin::Symbol--> */}
                                <div className="symbol symbol-40px me-4">
                                  <span className="symbol-label bg-light">
                                    {/* <!--begin::Svg Icon | path: icons/duotune/electronics/elc004.svg--> */}
                                    <span className="svg-icon svg-icon-2 svg-icon-primary">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <path
                                          d="M2 16C2 16.6 2.4 17 3 17H21C21.6 17 22 16.6 22 16V15H2V16Z"
                                          fill="black"
                                        ></path>
                                        <path
                                          opacity="0.3"
                                          d="M21 3H3C2.4 3 2 3.4 2 4V15H22V4C22 3.4 21.6 3 21 3Z"
                                          fill="black"
                                        ></path>
                                        <path
                                          opacity="0.3"
                                          d="M15 17H9V20H15V17Z"
                                          fill="black"
                                        ></path>
                                      </svg>
                                    </span>
                                  </span>
                                </div>
                                {/* <!--end::Symbol--> */}
                                {/* <!--begin::Title--> */}
                                <div className="d-flex flex-column">
                                  <a
                                    href="#"
                                    className="fs-6 text-gray-800 text-hover-primary fw-bold"
                                  >
                                    BoomApp by Keenthemes
                                  </a>
                                  <span className="fs-7 text-muted fw-bold">
                                    #45789
                                  </span>
                                </div>
                                {/* <!--end::Title--> */}
                              </div>
                              {/* <!--end::Item--> */}
                              {/* <!--begin::Item--> */}
                              <div className="d-flex align-items-center mb-5">
                                {/* <!--begin::Symbol--> */}
                                <div className="symbol symbol-40px me-4">
                                  <span className="symbol-label bg-light">
                                    {/* <!--begin::Svg Icon | path: icons/duotune/graphs/gra001.svg--> */}
                                    <span className="svg-icon svg-icon-2 svg-icon-primary">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <path
                                          opacity="0.3"
                                          d="M14 3V21H10V3C10 2.4 10.4 2 11 2H13C13.6 2 14 2.4 14 3ZM7 14H5C4.4 14 4 14.4 4 15V21H8V15C8 14.4 7.6 14 7 14Z"
                                          fill="black"
                                        ></path>
                                        <path
                                          d="M21 20H20V8C20 7.4 19.6 7 19 7H17C16.4 7 16 7.4 16 8V20H3C2.4 20 2 20.4 2 21C2 21.6 2.4 22 3 22H21C21.6 22 22 21.6 22 21C22 20.4 21.6 20 21 20Z"
                                          fill="black"
                                        ></path>
                                      </svg>
                                    </span>
                                  </span>
                                </div>
                                {/* <!--end::Symbol--> */}
                                {/* <!--begin::Title--> */}
                                <div className="d-flex flex-column">
                                  <a
                                    href="#"
                                    className="fs-6 text-gray-800 text-hover-primary fw-bold"
                                  >
                                    "Kept API Project Meeting
                                  </a>
                                  <span className="fs-7 text-muted fw-bold">
                                    #84050
                                  </span>
                                </div>
                                {/* <!--end::Title--> */}
                              </div>
                              {/* <!--end::Item--> */}
                              {/* <!--begin::Item--> */}
                              <div className="d-flex align-items-center mb-5">
                                {/* <!--begin::Symbol--> */}
                                <div className="symbol symbol-40px me-4">
                                  <span className="symbol-label bg-light">
                                    {/* <!--begin::Svg Icon | path: icons/duotune/graphs/gra006.svg--> */}
                                    <span className="svg-icon svg-icon-2 svg-icon-primary">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <path
                                          d="M13 5.91517C15.8 6.41517 18 8.81519 18 11.8152C18 12.5152 17.9 13.2152 17.6 13.9152L20.1 15.3152C20.6 15.6152 21.4 15.4152 21.6 14.8152C21.9 13.9152 22.1 12.9152 22.1 11.8152C22.1 7.01519 18.8 3.11521 14.3 2.01521C13.7 1.91521 13.1 2.31521 13.1 3.01521V5.91517H13Z"
                                          fill="black"
                                        ></path>
                                        <path
                                          opacity="0.3"
                                          d="M19.1 17.0152C19.7 17.3152 19.8 18.1152 19.3 18.5152C17.5 20.5152 14.9 21.7152 12 21.7152C9.1 21.7152 6.50001 20.5152 4.70001 18.5152C4.30001 18.0152 4.39999 17.3152 4.89999 17.0152L7.39999 15.6152C8.49999 16.9152 10.2 17.8152 12 17.8152C13.8 17.8152 15.5 17.0152 16.6 15.6152L19.1 17.0152ZM6.39999 13.9151C6.19999 13.2151 6 12.5152 6 11.8152C6 8.81517 8.2 6.41515 11 5.91515V3.01519C11 2.41519 10.4 1.91519 9.79999 2.01519C5.29999 3.01519 2 7.01517 2 11.8152C2 12.8152 2.2 13.8152 2.5 14.8152C2.7 15.4152 3.4 15.7152 4 15.3152L6.39999 13.9151Z"
                                          fill="black"
                                        ></path>
                                      </svg>
                                    </span>
                                  </span>
                                </div>
                                {/* <!--end::Symbol--> */}
                                {/* <!--begin::Title--> */}
                                <div className="d-flex flex-column">
                                  <a
                                    href="#"
                                    className="fs-6 text-gray-800 text-hover-primary fw-bold"
                                  >
                                    "KPI Monitoring App Launch
                                  </a>
                                  <span className="fs-7 text-muted fw-bold">
                                    #84250
                                  </span>
                                </div>
                                {/* <!--end::Title--> */}
                              </div>
                              {/* <!--end::Item--> */}
                              {/* <!--begin::Item--> */}
                              <div className="d-flex align-items-center mb-5">
                                {/* <!--begin::Symbol--> */}
                                <div className="symbol symbol-40px me-4">
                                  <span className="symbol-label bg-light">
                                    {/* <!--begin::Svg Icon | path: icons/duotune/graphs/gra002.svg--> */}
                                    <span className="svg-icon svg-icon-2 svg-icon-primary">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <path
                                          opacity="0.3"
                                          d="M20 8L12.5 5L5 14V19H20V8Z"
                                          fill="black"
                                        ></path>
                                        <path
                                          d="M21 18H6V3C6 2.4 5.6 2 5 2C4.4 2 4 2.4 4 3V18H3C2.4 18 2 18.4 2 19C2 19.6 2.4 20 3 20H4V21C4 21.6 4.4 22 5 22C5.6 22 6 21.6 6 21V20H21C21.6 20 22 19.6 22 19C22 18.4 21.6 18 21 18Z"
                                          fill="black"
                                        ></path>
                                      </svg>
                                    </span>
                                  </span>
                                </div>
                                {/* <!--end::Symbol--> */}
                                {/* <!--begin::Title--> */}
                                <div className="d-flex flex-column">
                                  <a
                                    href="#"
                                    className="fs-6 text-gray-800 text-hover-primary fw-bold"
                                  >
                                    Project Reference FAQ
                                  </a>
                                  <span className="fs-7 text-muted fw-bold">
                                    #67945
                                  </span>
                                </div>
                                {/* <!--end::Title--> */}
                              </div>
                              {/* <!--end::Item--> */}
                              {/* <!--begin::Item--> */}
                              <div className="d-flex align-items-center mb-5">
                                {/* <!--begin::Symbol--> */}
                                <div className="symbol symbol-40px me-4">
                                  <span className="symbol-label bg-light">
                                    {/* <!--begin::Svg Icon | path: icons/duotune/communication/com010.svg--> */}
                                    <span className="svg-icon svg-icon-2 svg-icon-primary">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <path
                                          d="M6 8.725C6 8.125 6.4 7.725 7 7.725H14L18 11.725V12.925L22 9.725L12.6 2.225C12.2 1.925 11.7 1.925 11.4 2.225L2 9.725L6 12.925V8.725Z"
                                          fill="black"
                                        ></path>
                                        <path
                                          opacity="0.3"
                                          d="M22 9.72498V20.725C22 21.325 21.6 21.725 21 21.725H3C2.4 21.725 2 21.325 2 20.725V9.72498L11.4 17.225C11.8 17.525 12.3 17.525 12.6 17.225L22 9.72498ZM15 11.725H18L14 7.72498V10.725C14 11.325 14.4 11.725 15 11.725Z"
                                          fill="black"
                                        ></path>
                                      </svg>
                                    </span>
                                  </span>
                                </div>
                                {/* <!--end::Symbol--> */}
                                {/* <!--begin::Title--> */}
                                <div className="d-flex flex-column">
                                  <a
                                    href="#"
                                    className="fs-6 text-gray-800 text-hover-primary fw-bold"
                                  >
                                    "FitPro App Development
                                  </a>
                                  <span className="fs-7 text-muted fw-bold">
                                    #84250
                                  </span>
                                </div>
                                {/* <!--end::Title--> */}
                              </div>
                              {/* <!--end::Item--> */}
                              {/* <!--begin::Item--> */}
                              <div className="d-flex align-items-center mb-5">
                                {/* <!--begin::Symbol--> */}
                                <div className="symbol symbol-40px me-4">
                                  <span className="symbol-label bg-light">
                                    {/* <!--begin::Svg Icon | path: icons/duotune/finance/fin001.svg--> */}
                                    <span className="svg-icon svg-icon-2 svg-icon-primary">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <path
                                          d="M20 19.725V18.725C20 18.125 19.6 17.725 19 17.725H5C4.4 17.725 4 18.125 4 18.725V19.725H3C2.4 19.725 2 20.125 2 20.725V21.725H22V20.725C22 20.125 21.6 19.725 21 19.725H20Z"
                                          fill="black"
                                        ></path>
                                        <path
                                          opacity="0.3"
                                          d="M22 6.725V7.725C22 8.325 21.6 8.725 21 8.725H18C18.6 8.725 19 9.125 19 9.725C19 10.325 18.6 10.725 18 10.725V15.725C18.6 15.725 19 16.125 19 16.725V17.725H15V16.725C15 16.125 15.4 15.725 16 15.725V10.725C15.4 10.725 15 10.325 15 9.725C15 9.125 15.4 8.725 16 8.725H13C13.6 8.725 14 9.125 14 9.725C14 10.325 13.6 10.725 13 10.725V15.725C13.6 15.725 14 16.125 14 16.725V17.725H10V16.725C10 16.125 10.4 15.725 11 15.725V10.725C10.4 10.725 10 10.325 10 9.725C10 9.125 10.4 8.725 11 8.725H8C8.6 8.725 9 9.125 9 9.725C9 10.325 8.6 10.725 8 10.725V15.725C8.6 15.725 9 16.125 9 16.725V17.725H5V16.725C5 16.125 5.4 15.725 6 15.725V10.725C5.4 10.725 5 10.325 5 9.725C5 9.125 5.4 8.725 6 8.725H3C2.4 8.725 2 8.325 2 7.725V6.725L11 2.225C11.6 1.925 12.4 1.925 13.1 2.225L22 6.725ZM12 3.725C11.2 3.725 10.5 4.425 10.5 5.225C10.5 6.025 11.2 6.725 12 6.725C12.8 6.725 13.5 6.025 13.5 5.225C13.5 4.425 12.8 3.725 12 3.725Z"
                                          fill="black"
                                        ></path>
                                      </svg>
                                    </span>
                                  </span>
                                </div>
                                {/* <!--end::Symbol--> */}
                                {/* <!--begin::Title--> */}
                                <div className="d-flex flex-column">
                                  <a
                                    href="#"
                                    className="fs-6 text-gray-800 text-hover-primary fw-bold"
                                  >
                                    Shopix Mobile App
                                  </a>
                                  <span className="fs-7 text-muted fw-bold">
                                    #45690
                                  </span>
                                </div>
                                {/* <!--end::Title--> */}
                              </div>
                              {/* <!--end::Item--> */}
                              {/* <!--begin::Item--> */}
                              <div className="d-flex align-items-center mb-5">
                                {/* <!--begin::Symbol--> */}
                                <div className="symbol symbol-40px me-4">
                                  <span className="symbol-label bg-light">
                                    {/* <!--SVG file not found: icons/duotune/graphs/gra002.svg
--> */}
                                  </span>
                                </div>
                                {/* <!--end::Symbol--> */}
                                {/* <!--begin::Title--> */}
                                <div className="d-flex flex-column">
                                  <a
                                    href="#"
                                    className="fs-6 text-gray-800 text-hover-primary fw-bold"
                                  >
                                    "Landing UI Design" Launch
                                  </a>
                                  <span className="fs-7 text-muted fw-bold">
                                    #24005
                                  </span>
                                </div>
                                {/* <!--end::Title--> */}
                              </div>
                              {/* <!--end::Item--> */}
                            </div>
                            {/* <!--end::Items--> */}
                          </div>
                          {/* <!--end::Recently viewed--> */}
                          {/* <!--begin::Empty--> */}
                          <div
                            data-kt-search-element="empty"
                            className="text-center d-none"
                          >
                            {/* <!--begin::Icon--> */}
                            <div className="pt-10 pb-10">
                              {/* <!--begin::Svg Icon | path: icons/duotune/files/fil024.svg--> */}
                              <span className="svg-icon svg-icon-4x opacity-50">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    opacity="0.3"
                                    d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z"
                                    fill="black"
                                  ></path>
                                  <path
                                    d="M20 8L14 2V6C14 7.10457 14.8954 8 16 8H20Z"
                                    fill="black"
                                  ></path>
                                  <rect
                                    x="13.6993"
                                    y="13.6656"
                                    width="4.42828"
                                    height="1.73089"
                                    rx="0.865447"
                                    transform="rotate(45 13.6993 13.6656)"
                                    fill="black"
                                  ></rect>
                                  <path
                                    d="M15 12C15 14.2 13.2 16 11 16C8.8 16 7 14.2 7 12C7 9.8 8.8 8 11 8C13.2 8 15 9.8 15 12ZM11 9.6C9.68 9.6 8.6 10.68 8.6 12C8.6 13.32 9.68 14.4 11 14.4C12.32 14.4 13.4 13.32 13.4 12C13.4 10.68 12.32 9.6 11 9.6Z"
                                    fill="black"
                                  ></path>
                                </svg>
                              </span>
                            </div>
                            {/* <!--end::Icon--> */}
                            {/* <!--begin::Message--> */}
                            <div className="pb-15 fw-bold">
                              <h3 className="text-gray-600 fs-5 mb-2">
                                No result found
                              </h3>
                              <div className="text-muted fs-7">
                                Please try again with a different query
                              </div>
                            </div>
                            {/* <!--end::Message--> */}
                          </div>
                          {/* <!--end::Empty--> */}
                        </div>
                        {/* <!--end::Wrapper--> */}
                        {/* <!--begin::Preferences--> */}
                        <form
                          data-kt-search-element="advanced-options-form"
                          className="pt-1 d-none"
                        >
                          {/* <!--begin::Heading--> */}
                          <h3 className="fw-bold text-dark mb-7">
                            Advanced Search
                          </h3>
                          {/* <!--end::Heading--> */}
                          {/* <!--begin::Input group--> */}
                          <div className="mb-5">
                            <input
                              type="text"
                              className="form-control form-control-sm form-control-solid"
                              placeholder="Contains the word"
                              name="query"
                            />
                          </div>
                          {/* <!--end::Input group--> */}
                          {/* <!--begin::Input group--> */}
                          <div className="mb-5">
                            {/* <!--begin::Radio group--> */}
                            <div className="nav-group nav-group-fluid">
                              {/* <!--begin::Option--> */}
                              <label>
                                <input
                                  type="radio"
                                  className="btn-check"
                                  name="type"
                                  value="has"
                                  checked="checked"
                                />
                                <span className="btn btn-sm btn-color-muted btn-active btn-active-primary">
                                  All
                                </span>
                              </label>
                              {/* <!--end::Option--> */}
                              {/* <!--begin::Option--> */}
                              <label>
                                <input
                                  type="radio"
                                  className="btn-check"
                                  name="type"
                                  value="users"
                                />
                                <span className="btn btn-sm btn-color-muted btn-active btn-active-primary px-4">
                                  Users
                                </span>
                              </label>
                              {/* <!--end::Option--> */}
                              {/* <!--begin::Option--> */}
                              <label>
                                <input
                                  type="radio"
                                  className="btn-check"
                                  name="type"
                                  value="orders"
                                />
                                <span className="btn btn-sm btn-color-muted btn-active btn-active-primary px-4">
                                  Orders
                                </span>
                              </label>
                              {/* <!--end::Option--> */}
                              {/* <!--begin::Option--> */}
                              <label>
                                <input
                                  type="radio"
                                  className="btn-check"
                                  name="type"
                                  value="projects"
                                />
                                <span className="btn btn-sm btn-color-muted btn-active btn-active-primary px-4">
                                  Projects
                                </span>
                              </label>
                              {/* <!--end::Option--> */}
                            </div>
                            {/* <!--end::Radio group--> */}
                          </div>
                          {/* <!--end::Input group--> */}
                          {/* <!--begin::Input group--> */}
                          <div className="mb-5">
                            <input
                              type="text"
                              name="assignedto"
                              className="form-control form-control-sm form-control-solid"
                              placeholder="Assigned to"
                              value=""
                            />
                          </div>
                          {/* <!--end::Input group--> */}
                          {/* <!--begin::Input group--> */}
                          <div className="mb-5">
                            <input
                              type="text"
                              name="collaborators"
                              className="form-control form-control-sm form-control-solid"
                              placeholder="Collaborators"
                              value=""
                            />
                          </div>
                          {/* <!--end::Input group--> */}
                          {/* <!--begin::Input group--> */}
                          <div className="mb-5">
                            {/* <!--begin::Radio group--> */}
                            <div className="nav-group nav-group-fluid">
                              {/* <!--begin::Option--> */}
                              <label>
                                <input
                                  type="radio"
                                  className="btn-check"
                                  name="attachment"
                                  value="has"
                                  checked="checked"
                                />
                                <span className="btn btn-sm btn-color-muted btn-active btn-active-primary">
                                  Has attachment
                                </span>
                              </label>
                              {/* <!--end::Option--> */}
                              {/* <!--begin::Option--> */}
                              <label>
                                <input
                                  type="radio"
                                  className="btn-check"
                                  name="attachment"
                                  value="any"
                                />
                                <span className="btn btn-sm btn-color-muted btn-active btn-active-primary px-4">
                                  Any
                                </span>
                              </label>
                              {/* <!--end::Option--> */}
                            </div>
                            {/* <!--end::Radio group--> */}
                          </div>
                          {/* <!--end::Input group--> */}
                          {/* <!--begin::Input group--> */}
                          <div className="mb-5">
                            <select
                              name="timezone"
                              aria-label="Select a Timezone"
                              data-control="select2"
                              data-placeholder="date_period"
                              className="form-select form-select-sm form-select-solid select2-hidden-accessible"
                              data-select2-id="select2-data-1-z7dl"
                              tabindex="-1"
                              aria-hidden="true"
                            >
                              <option
                                value="next"
                                data-select2-id="select2-data-3-k5kv"
                              >
                                Within the next
                              </option>
                              <option value="last">Within the last</option>
                              <option value="between">Between</option>
                              <option value="on">On</option>
                            </select>
                            <span
                              className="select2 select2-container select2-container--bootstrap5"
                              dir="ltr"
                              data-select2-id="select2-data-2-rqcz"
                              // style="width: 100%;"
                            >
                              <span className="selection">
                                <span
                                  className="select2-selection select2-selection--single form-select form-select-sm form-select-solid"
                                  role="combobox"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                  tabindex="0"
                                  aria-disabled="false"
                                  aria-labelledby="select2-timezone-ob-container"
                                  aria-controls="select2-timezone-ob-container"
                                >
                                  <span
                                    className="select2-selection__rendered"
                                    id="select2-timezone-ob-container"
                                    role="textbox"
                                    aria-readonly="true"
                                    title="Within the next"
                                  >
                                    Within the next
                                  </span>
                                  <span
                                    className="select2-selection__arrow"
                                    role="presentation"
                                  >
                                    <b role="presentation"></b>
                                  </span>
                                </span>
                              </span>
                              <span
                                className="dropdown-wrapper"
                                aria-hidden="true"
                              ></span>
                            </span>
                          </div>
                          {/* <!--end::Input group--> */}
                          {/* <!--begin::Input group--> */}
                          <div className="row mb-8">
                            {/* <!--begin::Col--> */}
                            <div className="col-6">
                              <input
                                type="number"
                                name="date_number"
                                className="form-control form-control-sm form-control-solid"
                                placeholder="Lenght"
                                value=""
                              />
                            </div>
                            {/* <!--end::Col--> */}
                            {/* <!--begin::Col--> */}
                            <div className="col-6">
                              <select
                                name="date_typer"
                                aria-label="Select a Timezone"
                                data-control="select2"
                                data-placeholder="Period"
                                className="form-select form-select-sm form-select-solid select2-hidden-accessible"
                                data-select2-id="select2-data-4-m2yg"
                                tabindex="-1"
                                aria-hidden="true"
                              >
                                <option
                                  value="days"
                                  data-select2-id="select2-data-6-0u48"
                                >
                                  Days
                                </option>
                                <option value="weeks">Weeks</option>
                                <option value="months">Months</option>
                                <option value="years">Years</option>
                              </select>
                              <span
                                className="select2 select2-container select2-container--bootstrap5"
                                dir="ltr"
                                data-select2-id="select2-data-5-bh16"
                                // style="width: 100%;"
                              >
                                <span className="selection">
                                  <span
                                    className="select2-selection select2-selection--single form-select form-select-sm form-select-solid"
                                    role="combobox"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    tabindex="0"
                                    aria-disabled="false"
                                    aria-labelledby="select2-date_typer-p2-container"
                                    aria-controls="select2-date_typer-p2-container"
                                  >
                                    <span
                                      className="select2-selection__rendered"
                                      id="select2-date_typer-p2-container"
                                      role="textbox"
                                      aria-readonly="true"
                                      title="Days"
                                    >
                                      Days
                                    </span>
                                    <span
                                      className="select2-selection__arrow"
                                      role="presentation"
                                    >
                                      <b role="presentation"></b>
                                    </span>
                                  </span>
                                </span>
                                <span
                                  className="dropdown-wrapper"
                                  aria-hidden="true"
                                ></span>
                              </span>
                            </div>
                            {/* <!--end::Col--> */}
                          </div>
                          {/* <!--end::Input group--> */}
                          {/* <!--begin::Actions--> */}
                          <div className="d-flex justify-content-end">
                            <button
                              type="reset"
                              className="btn btn-sm btn-light fw-bolder btn-active-light-primary me-2"
                              data-kt-search-element="advanced-options-form-cancel"
                            >
                              Cancel
                            </button>
                            <a
                              href="../../demo1/dist/pages/search/horizontal.html"
                              className="btn btn-sm fw-bolder btn-primary"
                              data-kt-search-element="advanced-options-form-search"
                            >
                              Search
                            </a>
                          </div>
                          {/* <!--end::Actions--> */}
                        </form>
                        {/* <!--end::Preferences--> */}
                        {/* <!--begin::Preferences--> */}
                        <form
                          data-kt-search-element="preferences"
                          className="pt-1 d-none"
                        >
                          {/* <!--begin::Heading--> */}
                          <h3 className="fw-bold text-dark mb-7">
                            Search Preferences
                          </h3>
                          {/* <!--end::Heading--> */}
                          {/* <!--begin::Input group--> */}
                          <div className="pb-4 border-bottom">
                            <label className="form-check form-switch form-switch-sm form-check-custom form-check-solid flex-stack">
                              <span className="form-check-label text-gray-700 fs-6 fw-bold ms-0 me-2">
                                Projects
                              </span>
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value="1"
                                checked="checked"
                              />
                            </label>
                          </div>
                          {/* <!--end::Input group--> */}
                          {/* <!--begin::Input group--> */}
                          <div className="py-4 border-bottom">
                            <label className="form-check form-switch form-switch-sm form-check-custom form-check-solid flex-stack">
                              <span className="form-check-label text-gray-700 fs-6 fw-bold ms-0 me-2">
                                Targets
                              </span>
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value="1"
                                checked="checked"
                              />
                            </label>
                          </div>
                          {/* <!--end::Input group--> */}
                          {/* <!--begin::Input group--> */}
                          <div className="py-4 border-bottom">
                            <label className="form-check form-switch form-switch-sm form-check-custom form-check-solid flex-stack">
                              <span className="form-check-label text-gray-700 fs-6 fw-bold ms-0 me-2">
                                Affiliate Programs
                              </span>
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value="1"
                              />
                            </label>
                          </div>
                          {/* <!--end::Input group--> */}
                          {/* <!--begin::Input group--> */}
                          <div className="py-4 border-bottom">
                            <label className="form-check form-switch form-switch-sm form-check-custom form-check-solid flex-stack">
                              <span className="form-check-label text-gray-700 fs-6 fw-bold ms-0 me-2">
                                Referrals
                              </span>
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value="1"
                                checked="checked"
                              />
                            </label>
                          </div>
                          {/* <!--end::Input group--> */}
                          {/* <!--begin::Input group--> */}
                          <div className="py-4 border-bottom">
                            <label className="form-check form-switch form-switch-sm form-check-custom form-check-solid flex-stack">
                              <span className="form-check-label text-gray-700 fs-6 fw-bold ms-0 me-2">
                                Users
                              </span>
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value="1"
                              />
                            </label>
                          </div>
                          {/* <!--end::Input group--> */}
                          {/* <!--begin::Actions--> */}
                          <div className="d-flex justify-content-end pt-7">
                            <button
                              type="reset"
                              className="btn btn-sm btn-light fw-bolder btn-active-light-primary me-2"
                              data-kt-search-element="preferences-dismiss"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="btn btn-sm fw-bolder btn-primary"
                            >
                              Save Changes
                            </button>
                          </div>
                          {/* <!--end::Actions--> */}
                        </form>
                        {/* <!--end::Preferences--> */}
                      </div>
                      {/* <!--end::Menu--> */}
                    </div>
                    {/* <!--end::Search--> */}
                  </div>
                  {/* <!--end::Search--> */}
                  {/* <!--begin::Activities--> */}
                  <div className="d-flex align-items-center ms-1 ms-lg-3">
                    {/* <!--begin::Drawer toggle--> */}
                    <div
                      className="btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px"
                      id="kt_activities_toggle"
                    >
                      {/* <!--begin::Svg Icon | path: icons/duotune/general/gen032.svg--> */}
                      <span className="svg-icon svg-icon-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <rect
                            x="8"
                            y="9"
                            width="3"
                            height="10"
                            rx="1.5"
                            fill="black"
                          ></rect>
                          <rect
                            opacity="0.5"
                            x="13"
                            y="5"
                            width="3"
                            height="14"
                            rx="1.5"
                            fill="black"
                          ></rect>
                          <rect
                            x="18"
                            y="11"
                            width="3"
                            height="8"
                            rx="1.5"
                            fill="black"
                          ></rect>
                          <rect
                            x="3"
                            y="13"
                            width="3"
                            height="6"
                            rx="1.5"
                            fill="black"
                          ></rect>
                        </svg>
                      </span>
                    </div>
                    {/* <!--end::Drawer toggle--> */}
                  </div>
                  {/* <!--end::Activities--> */}
                  {/* <!--begin::Notifications--> */}
                  <div className="d-flex align-items-center ms-1 ms-lg-3">
                    {/* <!--begin::Menu- wrapper--> */}
                    <div
                      className="btn btn-icon btn-active-light-primary position-relative w-30px h-30px w-md-40px h-md-40px"
                      data-kt-menu-trigger="click"
                      data-kt-menu-attach="parent"
                      data-kt-menu-placement="bottom-end"
                    >
                      {/* <!--begin::Svg Icon | path: icons/duotune/general/gen022.svg--> */}
                      <span className="svg-icon svg-icon-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M11.2929 2.70711C11.6834 2.31658 12.3166 2.31658 12.7071 2.70711L15.2929 5.29289C15.6834 5.68342 15.6834 6.31658 15.2929 6.70711L12.7071 9.29289C12.3166 9.68342 11.6834 9.68342 11.2929 9.29289L8.70711 6.70711C8.31658 6.31658 8.31658 5.68342 8.70711 5.29289L11.2929 2.70711Z"
                            fill="black"
                          ></path>
                          <path
                            d="M11.2929 14.7071C11.6834 14.3166 12.3166 14.3166 12.7071 14.7071L15.2929 17.2929C15.6834 17.6834 15.6834 18.3166 15.2929 18.7071L12.7071 21.2929C12.3166 21.6834 11.6834 21.6834 11.2929 21.2929L8.70711 18.7071C8.31658 18.3166 8.31658 17.6834 8.70711 17.2929L11.2929 14.7071Z"
                            fill="black"
                          ></path>
                          <path
                            opacity="0.3"
                            d="M5.29289 8.70711C5.68342 8.31658 6.31658 8.31658 6.70711 8.70711L9.29289 11.2929C9.68342 11.6834 9.68342 12.3166 9.29289 12.7071L6.70711 15.2929C6.31658 15.6834 5.68342 15.6834 5.29289 15.2929L2.70711 12.7071C2.31658 12.3166 2.31658 11.6834 2.70711 11.2929L5.29289 8.70711Z"
                            fill="black"
                          ></path>
                          <path
                            opacity="0.3"
                            d="M17.2929 8.70711C17.6834 8.31658 18.3166 8.31658 18.7071 8.70711L21.2929 11.2929C21.6834 11.6834 21.6834 12.3166 21.2929 12.7071L18.7071 15.2929C18.3166 15.6834 17.6834 15.6834 17.2929 15.2929L14.7071 12.7071C14.3166 12.3166 14.3166 11.6834 14.7071 11.2929L17.2929 8.70711Z"
                            fill="black"
                          ></path>
                        </svg>
                      </span>
                    </div>
                    {/* <!--begin::Menu--> */}
                    <div
                      className="menu menu-sub menu-sub-dropdown menu-column w-350px w-lg-375px"
                      data-kt-menu="true"
                    >
                      {/* <!--begin::Heading--> */}
                      <div
                        className="d-flex flex-column bgi-no-repeat rounded-top"
                        // style="background-image:url('assets/media/misc/pattern-1.jpg')"
                      >
                        {/* <!--begin::Title--> */}
                        <h3 className="text-white fw-bold px-9 mt-10 mb-6">
                          Notifications
                          <span className="fs-8 opacity-75 ps-3">
                            24 reports
                          </span>
                        </h3>
                        {/* <!--end::Title--> */}
                        {/* <!--begin::Tabs--> */}
                        <ul className="nav nav-line-tabs nav-line-tabs-2x nav-stretch fw-bold px-9">
                          <li className="nav-item">
                            <a
                              className="nav-link text-white opacity-75 opacity-state-100 pb-4"
                              data-bs-toggle="tab"
                              href="#kt_topbar_notifications_1"
                            >
                              Alerts
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link text-white opacity-75 opacity-state-100 pb-4 active"
                              data-bs-toggle="tab"
                              href="#kt_topbar_notifications_2"
                            >
                              Updates
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link text-white opacity-75 opacity-state-100 pb-4"
                              data-bs-toggle="tab"
                              href="#kt_topbar_notifications_3"
                            >
                              Logs
                            </a>
                          </li>
                        </ul>
                        {/* <!--end::Tabs--> */}
                      </div>
                      {/* <!--end::Heading--> */}
                      {/* <!--begin::Tab content--> */}
                      <div className="tab-content">
                        {/* <!--begin::Tab panel--> */}
                        <div
                          className="tab-pane fade"
                          id="kt_topbar_notifications_1"
                          role="tabpanel"
                        >
                          {/* <!--begin::Items--> */}
                          <div className="scroll-y mh-325px my-5 px-8">
                            {/* <!--begin::Item--> */}
                            <div className="d-flex flex-stack py-4">
                              {/* <!--begin::Section--> */}
                              <div className="d-flex align-items-center">
                                {/* <!--begin::Symbol--> */}
                                <div className="symbol symbol-35px me-4">
                                  <span className="symbol-label bg-light-primary">
                                    {/* <!--begin::Svg Icon | path: icons/duotune/technology/teh008.svg--> */}
                                    <span className="svg-icon svg-icon-2 svg-icon-primary">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <path
                                          opacity="0.3"
                                          d="M11 6.5C11 9 9 11 6.5 11C4 11 2 9 2 6.5C2 4 4 2 6.5 2C9 2 11 4 11 6.5ZM17.5 2C15 2 13 4 13 6.5C13 9 15 11 17.5 11C20 11 22 9 22 6.5C22 4 20 2 17.5 2ZM6.5 13C4 13 2 15 2 17.5C2 20 4 22 6.5 22C9 22 11 20 11 17.5C11 15 9 13 6.5 13ZM17.5 13C15 13 13 15 13 17.5C13 20 15 22 17.5 22C20 22 22 20 22 17.5C22 15 20 13 17.5 13Z"
                                          fill="black"
                                        ></path>
                                        <path
                                          d="M17.5 16C17.5 16 17.4 16 17.5 16L16.7 15.3C16.1 14.7 15.7 13.9 15.6 13.1C15.5 12.4 15.5 11.6 15.6 10.8C15.7 9.99999 16.1 9.19998 16.7 8.59998L17.4 7.90002H17.5C18.3 7.90002 19 7.20002 19 6.40002C19 5.60002 18.3 4.90002 17.5 4.90002C16.7 4.90002 16 5.60002 16 6.40002V6.5L15.3 7.20001C14.7 7.80001 13.9 8.19999 13.1 8.29999C12.4 8.39999 11.6 8.39999 10.8 8.29999C9.99999 8.19999 9.20001 7.80001 8.60001 7.20001L7.89999 6.5V6.40002C7.89999 5.60002 7.19999 4.90002 6.39999 4.90002C5.59999 4.90002 4.89999 5.60002 4.89999 6.40002C4.89999 7.20002 5.59999 7.90002 6.39999 7.90002H6.5L7.20001 8.59998C7.80001 9.19998 8.19999 9.99999 8.29999 10.8C8.39999 11.5 8.39999 12.3 8.29999 13.1C8.19999 13.9 7.80001 14.7 7.20001 15.3L6.5 16H6.39999C5.59999 16 4.89999 16.7 4.89999 17.5C4.89999 18.3 5.59999 19 6.39999 19C7.19999 19 7.89999 18.3 7.89999 17.5V17.4L8.60001 16.7C9.20001 16.1 9.99999 15.7 10.8 15.6C11.5 15.5 12.3 15.5 13.1 15.6C13.9 15.7 14.7 16.1 15.3 16.7L16 17.4V17.5C16 18.3 16.7 19 17.5 19C18.3 19 19 18.3 19 17.5C19 16.7 18.3 16 17.5 16Z"
                                          fill="black"
                                        ></path>
                                      </svg>
                                    </span>
                                  </span>
                                </div>
                                {/* <!--end::Symbol--> */}
                                {/* <!--begin::Title--> */}
                                <div className="mb-0 me-2">
                                  <a
                                    href="#"
                                    className="fs-6 text-gray-800 text-hover-primary fw-bolder"
                                  >
                                    Project Alice
                                  </a>
                                  <div className="text-gray-400 fs-7">
                                    Phase 1 development
                                  </div>
                                </div>
                                {/* <!--end::Title--> */}
                              </div>
                              {/* <!--end::Section--> */}
                              {/* <!--begin::Label--> */}
                              <span className="badge badge-light fs-8">
                                1 hr
                              </span>
                              {/* <!--end::Label--> */}
                            </div>
                            {/* <!--end::Item--> */}
                            {/* <!--begin::Item--> */}
                            <div className="d-flex flex-stack py-4">
                              {/* <!--begin::Section--> */}
                              <div className="d-flex align-items-center">
                                {/* <!--begin::Symbol--> */}
                                <div className="symbol symbol-35px me-4">
                                  <span className="symbol-label bg-light-danger">
                                    {/* <!--begin::Svg Icon | path: icons/duotune/general/gen044.svg--> */}
                                    <span className="svg-icon svg-icon-2 svg-icon-danger">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <rect
                                          opacity="0.3"
                                          x="2"
                                          y="2"
                                          width="20"
                                          height="20"
                                          rx="10"
                                          fill="black"
                                        ></rect>
                                        <rect
                                          x="11"
                                          y="14"
                                          width="7"
                                          height="2"
                                          rx="1"
                                          transform="rotate(-90 11 14)"
                                          fill="black"
                                        ></rect>
                                        <rect
                                          x="11"
                                          y="17"
                                          width="2"
                                          height="2"
                                          rx="1"
                                          transform="rotate(-90 11 17)"
                                          fill="black"
                                        ></rect>
                                      </svg>
                                    </span>
                                  </span>
                                </div>
                                {/* <!--end::Symbol--> */}
                                {/* <!--begin::Title--> */}
                                <div className="mb-0 me-2">
                                  <a
                                    href="#"
                                    className="fs-6 text-gray-800 text-hover-primary fw-bolder"
                                  >
                                    HR Confidential
                                  </a>
                                  <div className="text-gray-400 fs-7">
                                    Confidential staff documents
                                  </div>
                                </div>
                                {/* <!--end::Title--> */}
                              </div>
                              {/* <!--end::Section--> */}
                              {/* <!--begin::Label--> */}
                              <span className="badge badge-light fs-8">
                                2 hrs
                              </span>
                              {/* <!--end::Label--> */}
                            </div>
                            {/* <!--end::Item--> */}
                            {/* <!--begin::Item--> */}
                            <div className="d-flex flex-stack py-4">
                              {/* <!--begin::Section--> */}
                              <div className="d-flex align-items-center">
                                {/* <!--begin::Symbol--> */}
                                <div className="symbol symbol-35px me-4">
                                  <span className="symbol-label bg-light-warning">
                                    {/* <!--begin::Svg Icon | path: icons/duotune/finance/fin006.svg--> */}
                                    <span className="svg-icon svg-icon-2 svg-icon-warning">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <path
                                          opacity="0.3"
                                          d="M20 15H4C2.9 15 2 14.1 2 13V7C2 6.4 2.4 6 3 6H21C21.6 6 22 6.4 22 7V13C22 14.1 21.1 15 20 15ZM13 12H11C10.5 12 10 12.4 10 13V16C10 16.5 10.4 17 11 17H13C13.6 17 14 16.6 14 16V13C14 12.4 13.6 12 13 12Z"
                                          fill="black"
                                        ></path>
                                        <path
                                          d="M14 6V5H10V6H8V5C8 3.9 8.9 3 10 3H14C15.1 3 16 3.9 16 5V6H14ZM20 15H14V16C14 16.6 13.5 17 13 17H11C10.5 17 10 16.6 10 16V15H4C3.6 15 3.3 14.9 3 14.7V18C3 19.1 3.9 20 5 20H19C20.1 20 21 19.1 21 18V14.7C20.7 14.9 20.4 15 20 15Z"
                                          fill="black"
                                        ></path>
                                      </svg>
                                    </span>
                                  </span>
                                </div>
                                {/* <!--end::Symbol--> */}
                                {/* <!--begin::Title--> */}
                                <div className="mb-0 me-2">
                                  <a
                                    href="#"
                                    className="fs-6 text-gray-800 text-hover-primary fw-bolder"
                                  >
                                    Company HR
                                  </a>
                                  <div className="text-gray-400 fs-7">
                                    Corporeate staff profiles
                                  </div>
                                </div>
                                {/* <!--end::Title--> */}
                              </div>
                              {/* <!--end::Section--> */}
                              {/* <!--begin::Label--> */}
                              <span className="badge badge-light fs-8">
                                5 hrs
                              </span>
                              {/* <!--end::Label--> */}
                            </div>
                            {/* <!--end::Item--> */}
                            {/* <!--begin::Item--> */}
                            <div className="d-flex flex-stack py-4">
                              {/* <!--begin::Section--> */}
                              <div className="d-flex align-items-center">
                                {/* <!--begin::Symbol--> */}
                                <div className="symbol symbol-35px me-4">
                                  <span className="symbol-label bg-light-success">
                                    {/* <!--begin::Svg Icon | path: icons/duotune/files/fil023.svg--> */}
                                    <span className="svg-icon svg-icon-2 svg-icon-success">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <path
                                          opacity="0.3"
                                          d="M5 15C3.3 15 2 13.7 2 12C2 10.3 3.3 9 5 9H5.10001C5.00001 8.7 5 8.3 5 8C5 5.2 7.2 3 10 3C11.9 3 13.5 4 14.3 5.5C14.8 5.2 15.4 5 16 5C17.7 5 19 6.3 19 8C19 8.4 18.9 8.7 18.8 9C18.9 9 18.9 9 19 9C20.7 9 22 10.3 22 12C22 13.7 20.7 15 19 15H5ZM5 12.6H13L9.7 9.29999C9.3 8.89999 8.7 8.89999 8.3 9.29999L5 12.6Z"
                                          fill="black"
                                        ></path>
                                        <path
                                          d="M17 17.4V12C17 11.4 16.6 11 16 11C15.4 11 15 11.4 15 12V17.4H17Z"
                                          fill="black"
                                        ></path>
                                        <path
                                          opacity="0.3"
                                          d="M12 17.4H20L16.7 20.7C16.3 21.1 15.7 21.1 15.3 20.7L12 17.4Z"
                                          fill="black"
                                        ></path>
                                        <path
                                          d="M8 12.6V18C8 18.6 8.4 19 9 19C9.6 19 10 18.6 10 18V12.6H8Z"
                                          fill="black"
                                        ></path>
                                      </svg>
                                    </span>
                                  </span>
                                </div>
                                {/* <!--end::Symbol--> */}
                                {/* <!--begin::Title--> */}
                                <div className="mb-0 me-2">
                                  <a
                                    href="#"
                                    className="fs-6 text-gray-800 text-hover-primary fw-bolder"
                                  >
                                    Project Redux
                                  </a>
                                  <div className="text-gray-400 fs-7">
                                    New frontend admin theme
                                  </div>
                                </div>
                                {/* <!--end::Title--> */}
                              </div>
                              {/* <!--end::Section--> */}
                              {/* <!--begin::Label--> */}
                              <span className="badge badge-light fs-8">
                                2 days
                              </span>
                              {/* <!--end::Label--> */}
                            </div>
                            {/* <!--end::Item--> */}
                            {/* <!--begin::Item--> */}
                            <div className="d-flex flex-stack py-4">
                              {/* <!--begin::Section--> */}
                              <div className="d-flex align-items-center">
                                {/* <!--begin::Symbol--> */}
                                <div className="symbol symbol-35px me-4">
                                  <span className="symbol-label bg-light-primary">
                                    {/* <!--begin::Svg Icon | path: icons/duotune/maps/map001.svg--> */}
                                    <span className="svg-icon svg-icon-2 svg-icon-primary">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <path
                                          opacity="0.3"
                                          d="M6 22H4V3C4 2.4 4.4 2 5 2C5.6 2 6 2.4 6 3V22Z"
                                          fill="black"
                                        ></path>
                                        <path
                                          d="M18 14H4V4H18C18.8 4 19.2 4.9 18.7 5.5L16 9L18.8 12.5C19.3 13.1 18.8 14 18 14Z"
                                          fill="black"
                                        ></path>
                                      </svg>
                                    </span>
                                  </span>
                                </div>
                                {/* <!--end::Symbol--> */}
                                {/* <!--begin::Title--> */}
                                <div className="mb-0 me-2">
                                  <a
                                    href="#"
                                    className="fs-6 text-gray-800 text-hover-primary fw-bolder"
                                  >
                                    Project Breafing
                                  </a>
                                  <div className="text-gray-400 fs-7">
                                    Product launch status update
                                  </div>
                                </div>
                                {/* <!--end::Title--> */}
                              </div>
                              {/* <!--end::Section--> */}
                              {/* <!--begin::Label--> */}
                              <span className="badge badge-light fs-8">
                                21 Jan
                              </span>
                              {/* <!--end::Label--> */}
                            </div>
                            {/* <!--end::Item--> */}
                            {/* <!--begin::Item--> */}
                            <div className="d-flex flex-stack py-4">
                              {/* <!--begin::Section--> */}
                              <div className="d-flex align-items-center">
                                {/* <!--begin::Symbol--> */}
                                <div className="symbol symbol-35px me-4">
                                  <span className="symbol-label bg-light-info">
                                    {/* <!--begin::Svg Icon | path: icons/duotune/general/gen006.svg--> */}
                                    <span className="svg-icon svg-icon-2 svg-icon-info">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <path
                                          opacity="0.3"
                                          d="M22 5V19C22 19.6 21.6 20 21 20H19.5L11.9 12.4C11.5 12 10.9 12 10.5 12.4L3 20C2.5 20 2 19.5 2 19V5C2 4.4 2.4 4 3 4H21C21.6 4 22 4.4 22 5ZM7.5 7C6.7 7 6 7.7 6 8.5C6 9.3 6.7 10 7.5 10C8.3 10 9 9.3 9 8.5C9 7.7 8.3 7 7.5 7Z"
                                          fill="black"
                                        ></path>
                                        <path
                                          d="M19.1 10C18.7 9.60001 18.1 9.60001 17.7 10L10.7 17H2V19C2 19.6 2.4 20 3 20H21C21.6 20 22 19.6 22 19V12.9L19.1 10Z"
                                          fill="black"
                                        ></path>
                                      </svg>
                                    </span>
                                  </span>
                                </div>
                                {/* <!--end::Symbol--> */}
                                {/* <!--begin::Title--> */}
                                <div className="mb-0 me-2">
                                  <a
                                    href="#"
                                    className="fs-6 text-gray-800 text-hover-primary fw-bolder"
                                  >
                                    Banner Assets
                                  </a>
                                  <div className="text-gray-400 fs-7">
                                    Collection of banner images
                                  </div>
                                </div>
                                {/* <!--end::Title--> */}
                              </div>
                              {/* <!--end::Section--> */}
                              {/* <!--begin::Label--> */}
                              <span className="badge badge-light fs-8">
                                21 Jan
                              </span>
                              {/* <!--end::Label--> */}
                            </div>
                            {/* <!--end::Item--> */}
                            {/* <!--begin::Item--> */}
                            <div className="d-flex flex-stack py-4">
                              {/* <!--begin::Section--> */}
                              <div className="d-flex align-items-center">
                                {/* <!--begin::Symbol--> */}
                                <div className="symbol symbol-35px me-4">
                                  <span className="symbol-label bg-light-warning">
                                    {/* <!--begin::Svg Icon | path: icons/duotune/art/art002.svg--> */}
                                    <span className="svg-icon svg-icon-2 svg-icon-warning">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="25"
                                        viewBox="0 0 24 25"
                                        fill="none"
                                      >
                                        <path
                                          opacity="0.3"
                                          d="M8.9 21L7.19999 22.6999C6.79999 23.0999 6.2 23.0999 5.8 22.6999L4.1 21H8.9ZM4 16.0999L2.3 17.8C1.9 18.2 1.9 18.7999 2.3 19.1999L4 20.9V16.0999ZM19.3 9.1999L15.8 5.6999C15.4 5.2999 14.8 5.2999 14.4 5.6999L9 11.0999V21L19.3 10.6999C19.7 10.2999 19.7 9.5999 19.3 9.1999Z"
                                          fill="black"
                                        ></path>
                                        <path
                                          d="M21 15V20C21 20.6 20.6 21 20 21H11.8L18.8 14H20C20.6 14 21 14.4 21 15ZM10 21V4C10 3.4 9.6 3 9 3H4C3.4 3 3 3.4 3 4V21C3 21.6 3.4 22 4 22H9C9.6 22 10 21.6 10 21ZM7.5 18.5C7.5 19.1 7.1 19.5 6.5 19.5C5.9 19.5 5.5 19.1 5.5 18.5C5.5 17.9 5.9 17.5 6.5 17.5C7.1 17.5 7.5 17.9 7.5 18.5Z"
                                          fill="black"
                                        ></path>
                                      </svg>
                                    </span>
                                  </span>
                                </div>
                                {/* <!--end::Symbol--> */}
                                {/* <!--begin::Title--> */}
                                <div className="mb-0 me-2">
                                  <a
                                    href="#"
                                    className="fs-6 text-gray-800 text-hover-primary fw-bolder"
                                  >
                                    Icon Assets
                                  </a>
                                  <div className="text-gray-400 fs-7">
                                    Collection of SVG icons
                                  </div>
                                </div>
                                {/* <!--end::Title--> */}
                              </div>
                              {/* <!--end::Section--> */}
                              {/* <!--begin::Label--> */}
                              <span className="badge badge-light fs-8">
                                20 March
                              </span>
                              {/* <!--end::Label--> */}
                            </div>
                            {/* <!--end::Item--> */}
                          </div>
                          {/* <!--end::Items--> */}
                          {/* <!--begin::View more--> */}
                          <div className="py-3 text-center border-top">
                            <a
                              href="../../demo1/dist/pages/profile/activity.html"
                              className="btn btn-color-gray-600 btn-active-color-primary"
                            >
                              View All
                              {/* <!--begin::Svg Icon | path: icons/duotune/arrows/arr064.svg--> */}
                              <span className="svg-icon svg-icon-5">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <rect
                                    opacity="0.5"
                                    x="18"
                                    y="13"
                                    width="13"
                                    height="2"
                                    rx="1"
                                    transform="rotate(-180 18 13)"
                                    fill="black"
                                  ></rect>
                                  <path
                                    d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z"
                                    fill="black"
                                  ></path>
                                </svg>
                              </span>
                            </a>
                          </div>
                          {/* <!--end::View more--> */}
                        </div>
                        {/* <!--end::Tab panel--> */}
                        {/* <!--begin::Tab panel--> */}
                        <div
                          className="tab-pane fade show active"
                          id="kt_topbar_notifications_2"
                          role="tabpanel"
                        >
                          {/* <!--begin::Wrapper--> */}
                          <div className="d-flex flex-column px-9">
                            {/* <!--begin::Section--> */}
                            <div className="pt-10 pb-0">
                              {/* <!--begin::Title--> */}
                              <h3 className="text-dark text-center fw-bolder">
                                Get Pro Access
                              </h3>
                              {/* <!--end::Title--> */}
                              {/* <!--begin::Text--> */}
                              <div className="text-center text-gray-600 fw-bold pt-1">
                                Outlines keep you honest. They stoping you from
                                amazing poorly about drive
                              </div>
                              {/* <!--end::Text--> */}
                              {/* <!--begin::Action--> */}
                              <div className="text-center mt-5 mb-9">
                                <a
                                  href="#"
                                  className="btn btn-sm btn-primary px-6"
                                  data-bs-toggle="modal"
                                  data-bs-target="#kt_modal_upgrade_plan"
                                >
                                  Upgrade
                                </a>
                              </div>
                              {/* <!--end::Action--> */}
                            </div>
                            {/* <!--end::Section--> */}
                            {/* <!--begin::Illustration--> */}
                            <div className="text-center px-4">
                              <img
                                className="mw-100 mh-200px"
                                alt="image"
                                src="assets/media/illustrations/sketchy-1/1.png"
                              />
                            </div>
                            {/* <!--end::Illustration--> */}
                          </div>
                          {/* <!--end::Wrapper--> */}
                        </div>
                        {/* <!--end::Tab panel--> */}
                        {/* <!--begin::Tab panel--> */}
                        <div
                          className="tab-pane fade"
                          id="kt_topbar_notifications_3"
                          role="tabpanel"
                        >
                          {/* <!--begin::Items--> */}
                          <div className="scroll-y mh-325px my-5 px-8">
                            {/* <!--begin::Item--> */}
                            <div className="d-flex flex-stack py-4">
                              {/* <!--begin::Section--> */}
                              <div className="d-flex align-items-center me-2">
                                {/* <!--begin::Code--> */}
                                <span className="w-70px badge badge-light-success me-4">
                                  200 OK
                                </span>
                                {/* <!--end::Code--> */}
                                {/* <!--begin::Title--> */}
                                <a
                                  href="#"
                                  className="text-gray-800 text-hover-primary fw-bold"
                                >
                                  New order
                                </a>
                                {/* <!--end::Title--> */}
                              </div>
                              {/* <!--end::Section--> */}
                              {/* <!--begin::Label--> */}
                              <span className="badge badge-light fs-8">
                                Just now
                              </span>
                              {/* <!--end::Label--> */}
                            </div>
                            {/* <!--end::Item--> */}
                            {/* <!--begin::Item--> */}
                            <div className="d-flex flex-stack py-4">
                              {/* <!--begin::Section--> */}
                              <div className="d-flex align-items-center me-2">
                                {/* <!--begin::Code--> */}
                                <span className="w-70px badge badge-light-danger me-4">
                                  500 ERR
                                </span>
                                {/* <!--end::Code--> */}
                                {/* <!--begin::Title--> */}
                                <a
                                  href="#"
                                  className="text-gray-800 text-hover-primary fw-bold"
                                >
                                  New customer
                                </a>
                                {/* <!--end::Title--> */}
                              </div>
                              {/* <!--end::Section--> */}
                              {/* <!--begin::Label--> */}
                              <span className="badge badge-light fs-8">
                                2 hrs
                              </span>
                              {/* <!--end::Label--> */}
                            </div>
                            {/* <!--end::Item--> */}
                            {/* <!--begin::Item--> */}
                            <div className="d-flex flex-stack py-4">
                              {/* <!--begin::Section--> */}
                              <div className="d-flex align-items-center me-2">
                                {/* <!--begin::Code--> */}
                                <span className="w-70px badge badge-light-success me-4">
                                  200 OK
                                </span>
                                {/* <!--end::Code--> */}
                                {/* <!--begin::Title--> */}
                                <a
                                  href="#"
                                  className="text-gray-800 text-hover-primary fw-bold"
                                >
                                  Payment process
                                </a>
                                {/* <!--end::Title--> */}
                              </div>
                              {/* <!--end::Section--> */}
                              {/* <!--begin::Label--> */}
                              <span className="badge badge-light fs-8">
                                5 hrs
                              </span>
                              {/* <!--end::Label--> */}
                            </div>
                            {/* <!--end::Item--> */}
                            {/* <!--begin::Item--> */}
                            <div className="d-flex flex-stack py-4">
                              {/* <!--begin::Section--> */}
                              <div className="d-flex align-items-center me-2">
                                {/* <!--begin::Code--> */}
                                <span className="w-70px badge badge-light-warning me-4">
                                  300 WRN
                                </span>
                                {/* <!--end::Code--> */}
                                {/* <!--begin::Title--> */}
                                <a
                                  href="#"
                                  className="text-gray-800 text-hover-primary fw-bold"
                                >
                                  Search query
                                </a>
                                {/* <!--end::Title--> */}
                              </div>
                              {/* <!--end::Section--> */}
                              {/* <!--begin::Label--> */}
                              <span className="badge badge-light fs-8">
                                2 days
                              </span>
                              {/* <!--end::Label--> */}
                            </div>
                            {/* <!--end::Item--> */}
                            {/* <!--begin::Item--> */}
                            <div className="d-flex flex-stack py-4">
                              {/* <!--begin::Section--> */}
                              <div className="d-flex align-items-center me-2">
                                {/* <!--begin::Code--> */}
                                <span className="w-70px badge badge-light-success me-4">
                                  200 OK
                                </span>
                                {/* <!--end::Code--> */}
                                {/* <!--begin::Title--> */}
                                <a
                                  href="#"
                                  className="text-gray-800 text-hover-primary fw-bold"
                                >
                                  API connection
                                </a>
                                {/* <!--end::Title--> */}
                              </div>
                              {/* <!--end::Section--> */}
                              {/* <!--begin::Label--> */}
                              <span className="badge badge-light fs-8">
                                1 week
                              </span>
                              {/* <!--end::Label--> */}
                            </div>
                            {/* <!--end::Item--> */}
                            {/* <!--begin::Item--> */}
                            <div className="d-flex flex-stack py-4">
                              {/* <!--begin::Section--> */}
                              <div className="d-flex align-items-center me-2">
                                {/* <!--begin::Code--> */}
                                <span className="w-70px badge badge-light-success me-4">
                                  200 OK
                                </span>
                                {/* <!--end::Code--> */}
                                {/* <!--begin::Title--> */}
                                <a
                                  href="#"
                                  className="text-gray-800 text-hover-primary fw-bold"
                                >
                                  Database restore
                                </a>
                                {/* <!--end::Title--> */}
                              </div>
                              {/* <!--end::Section--> */}
                              {/* <!--begin::Label--> */}
                              <span className="badge badge-light fs-8">
                                Mar 5
                              </span>
                              {/* <!--end::Label--> */}
                            </div>
                            {/* <!--end::Item--> */}
                            {/* <!--begin::Item--> */}
                            <div className="d-flex flex-stack py-4">
                              {/* <!--begin::Section--> */}
                              <div className="d-flex align-items-center me-2">
                                {/* <!--begin::Code--> */}
                                <span className="w-70px badge badge-light-warning me-4">
                                  300 WRN
                                </span>
                                {/* <!--end::Code--> */}
                                {/* <!--begin::Title--> */}
                                <a
                                  href="#"
                                  className="text-gray-800 text-hover-primary fw-bold"
                                >
                                  System update
                                </a>
                                {/* <!--end::Title--> */}
                              </div>
                              {/* <!--end::Section--> */}
                              {/* <!--begin::Label--> */}
                              <span className="badge badge-light fs-8">
                                May 15
                              </span>
                              {/* <!--end::Label--> */}
                            </div>
                            {/* <!--end::Item--> */}
                            {/* <!--begin::Item--> */}
                            <div className="d-flex flex-stack py-4">
                              {/* <!--begin::Section--> */}
                              <div className="d-flex align-items-center me-2">
                                {/* <!--begin::Code--> */}
                                <span className="w-70px badge badge-light-warning me-4">
                                  300 WRN
                                </span>
                                {/* <!--end::Code--> */}
                                {/* <!--begin::Title--> */}
                                <a
                                  href="#"
                                  className="text-gray-800 text-hover-primary fw-bold"
                                >
                                  Server OS update
                                </a>
                                {/* <!--end::Title--> */}
                              </div>
                              {/* <!--end::Section--> */}
                              {/* <!--begin::Label--> */}
                              <span className="badge badge-light fs-8">
                                Apr 3
                              </span>
                              {/* <!--end::Label--> */}
                            </div>
                            {/* <!--end::Item--> */}
                            {/* <!--begin::Item--> */}
                            <div className="d-flex flex-stack py-4">
                              {/* <!--begin::Section--> */}
                              <div className="d-flex align-items-center me-2">
                                {/* <!--begin::Code--> */}
                                <span className="w-70px badge badge-light-warning me-4">
                                  300 WRN
                                </span>
                                {/* <!--end::Code--> */}
                                {/* <!--begin::Title--> */}
                                <a
                                  href="#"
                                  className="text-gray-800 text-hover-primary fw-bold"
                                >
                                  API rollback
                                </a>
                                {/* <!--end::Title--> */}
                              </div>
                              {/* <!--end::Section--> */}
                              {/* <!--begin::Label--> */}
                              <span className="badge badge-light fs-8">
                                Jun 30
                              </span>
                              {/* <!--end::Label--> */}
                            </div>
                            {/* <!--end::Item--> */}
                            {/* <!--begin::Item--> */}
                            <div className="d-flex flex-stack py-4">
                              {/* <!--begin::Section--> */}
                              <div className="d-flex align-items-center me-2">
                                {/* <!--begin::Code--> */}
                                <span className="w-70px badge badge-light-danger me-4">
                                  500 ERR
                                </span>
                                {/* <!--end::Code--> */}
                                {/* <!--begin::Title--> */}
                                <a
                                  href="#"
                                  className="text-gray-800 text-hover-primary fw-bold"
                                >
                                  Refund process
                                </a>
                                {/* <!--end::Title--> */}
                              </div>
                              {/* <!--end::Section--> */}
                              {/* <!--begin::Label--> */}
                              <span className="badge badge-light fs-8">
                                Jul 10
                              </span>
                              {/* <!--end::Label--> */}
                            </div>
                            {/* <!--end::Item--> */}
                            {/* <!--begin::Item--> */}
                            <div className="d-flex flex-stack py-4">
                              {/* <!--begin::Section--> */}
                              <div className="d-flex align-items-center me-2">
                                {/* <!--begin::Code--> */}
                                <span className="w-70px badge badge-light-danger me-4">
                                  500 ERR
                                </span>
                                {/* <!--end::Code--> */}
                                {/* <!--begin::Title--> */}
                                <a
                                  href="#"
                                  className="text-gray-800 text-hover-primary fw-bold"
                                >
                                  Withdrawal process
                                </a>
                                {/* <!--end::Title--> */}
                              </div>
                              {/* <!--end::Section--> */}
                              {/* <!--begin::Label--> */}
                              <span className="badge badge-light fs-8">
                                Sep 10
                              </span>
                              {/* <!--end::Label--> */}
                            </div>
                            {/* <!--end::Item--> */}
                            {/* <!--begin::Item--> */}
                            <div className="d-flex flex-stack py-4">
                              {/* <!--begin::Section--> */}
                              <div className="d-flex align-items-center me-2">
                                {/* <!--begin::Code--> */}
                                <span className="w-70px badge badge-light-danger me-4">
                                  500 ERR
                                </span>
                                {/* <!--end::Code--> */}
                                {/* <!--begin::Title--> */}
                                <a
                                  href="#"
                                  className="text-gray-800 text-hover-primary fw-bold"
                                >
                                  Mail tasks
                                </a>
                                {/* <!--end::Title--> */}
                              </div>
                              {/* <!--end::Section--> */}
                              {/* <!--begin::Label--> */}
                              <span className="badge badge-light fs-8">
                                Dec 10
                              </span>
                              {/* <!--end::Label--> */}
                            </div>
                            {/* <!--end::Item--> */}
                          </div>
                          {/* <!--end::Items--> */}
                          {/* <!--begin::View more--> */}
                          <div className="py-3 text-center border-top">
                            <a
                              href="../../demo1/dist/pages/profile/activity.html"
                              className="btn btn-color-gray-600 btn-active-color-primary"
                            >
                              View All
                              {/* <!--begin::Svg Icon | path: icons/duotune/arrows/arr064.svg--> */}
                              <span className="svg-icon svg-icon-5">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <rect
                                    opacity="0.5"
                                    x="18"
                                    y="13"
                                    width="13"
                                    height="2"
                                    rx="1"
                                    transform="rotate(-180 18 13)"
                                    fill="black"
                                  ></rect>
                                  <path
                                    d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z"
                                    fill="black"
                                  ></path>
                                </svg>
                              </span>
                            </a>
                          </div>
                          {/* <!--end::View more--> */}
                        </div>
                        {/* <!--end::Tab panel--> */}
                      </div>
                      {/* <!--end::Tab content--> */}
                    </div>
                    {/* <!--end::Menu--> */}
                    {/* <!--end::Menu wrapper--> */}
                  </div>
                  {/* <!--end::Notifications--> */}
                  {/* <!--begin::Chat--> */}
                  <div className="d-flex align-items-center ms-1 ms-lg-3">
                    {/* <!--begin::Menu wrapper--> */}
                    <div
                      className="btn btn-icon btn-active-light-primary position-relative w-30px h-30px w-md-40px h-md-40px"
                      id="kt_drawer_chat_toggle"
                    >
                      {/* <!--begin::Svg Icon | path: icons/duotune/communication/com012.svg--> */}
                      <span className="svg-icon svg-icon-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            opacity="0.3"
                            d="M20 3H4C2.89543 3 2 3.89543 2 5V16C2 17.1046 2.89543 18 4 18H4.5C5.05228 18 5.5 18.4477 5.5 19V21.5052C5.5 22.1441 6.21212 22.5253 6.74376 22.1708L11.4885 19.0077C12.4741 18.3506 13.6321 18 14.8167 18H20C21.1046 18 22 17.1046 22 16V5C22 3.89543 21.1046 3 20 3Z"
                            fill="black"
                          ></path>
                          <rect
                            x="6"
                            y="12"
                            width="7"
                            height="2"
                            rx="1"
                            fill="black"
                          ></rect>
                          <rect
                            x="6"
                            y="7"
                            width="12"
                            height="2"
                            rx="1"
                            fill="black"
                          ></rect>
                        </svg>
                      </span>

                      <span className="bullet bullet-dot bg-success h-6px w-6px position-absolute translate-middle top-0 start-50 animation-blink"></span>
                    </div>
                    {/* <!--end::Menu wrapper--> */}
                  </div>
                  {/* <!--end::Chat--> */}
                  {/* <!--begin::Quick links--> */}
                  <div className="d-flex align-items-center ms-1 ms-lg-3">
                    {/* <!--begin::Menu wrapper--> */}
                    <div
                      className="btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px"
                      data-kt-menu-trigger="click"
                      data-kt-menu-attach="parent"
                      data-kt-menu-placement="bottom-end"
                    >
                      {/* <!--begin::Svg Icon | path: icons/duotune/general/gen025.svg--> */}
                      <span className="svg-icon svg-icon-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <rect
                            x="2"
                            y="2"
                            width="9"
                            height="9"
                            rx="2"
                            fill="black"
                          ></rect>
                          <rect
                            opacity="0.3"
                            x="13"
                            y="2"
                            width="9"
                            height="9"
                            rx="2"
                            fill="black"
                          ></rect>
                          <rect
                            opacity="0.3"
                            x="13"
                            y="13"
                            width="9"
                            height="9"
                            rx="2"
                            fill="black"
                          ></rect>
                          <rect
                            opacity="0.3"
                            x="2"
                            y="13"
                            width="9"
                            height="9"
                            rx="2"
                            fill="black"
                          ></rect>
                        </svg>
                      </span>
                    </div>
                    {/* <!--begin::Menu--> */}
                    <div
                      className="menu menu-sub menu-sub-dropdown menu-column w-250px w-lg-325px"
                      data-kt-menu="true"
                    >
                      {/* <!--begin::Heading--> */}
                      <div
                        className="d-flex flex-column flex-center bgi-no-repeat rounded-top px-9 py-10"
                        //  style="background-image:url('assets/media/misc/pattern-1.jpg')"
                      >
                        {/* <!--begin::Title--> */}
                        <h3 className="text-white fw-bold mb-3">Quick Links</h3>
                        {/* <!--end::Title--> */}
                        {/* <!--begin::Status--> */}
                        <span className="badge bg-primary py-2 px-3">
                          25 pending tasks
                        </span>
                        {/* <!--end::Status--> */}
                      </div>
                      {/* <!--end::Heading--> */}
                      {/* <!--begin:Nav--> */}
                      <div className="row g-0">
                        {/* <!--begin:Item--> */}
                        <div className="col-6">
                          <a
                            href="../../demo1/dist/pages/projects/budget.html"
                            className="d-flex flex-column flex-center h-100 p-6 bg-hover-light border-end border-bottom"
                          >
                            {/* <!--begin::Svg Icon | path: icons/duotune/finance/fin009.svg--> */}
                            <span className="svg-icon svg-icon-3x svg-icon-primary mb-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  opacity="0.3"
                                  d="M15.8 11.4H6C5.4 11.4 5 11 5 10.4C5 9.80002 5.4 9.40002 6 9.40002H15.8C16.4 9.40002 16.8 9.80002 16.8 10.4C16.8 11 16.3 11.4 15.8 11.4ZM15.7 13.7999C15.7 13.1999 15.3 12.7999 14.7 12.7999H6C5.4 12.7999 5 13.1999 5 13.7999C5 14.3999 5.4 14.7999 6 14.7999H14.8C15.3 14.7999 15.7 14.2999 15.7 13.7999Z"
                                  fill="black"
                                ></path>
                                <path
                                  d="M18.8 15.5C18.9 15.7 19 15.9 19.1 16.1C19.2 16.7 18.7 17.2 18.4 17.6C17.9 18.1 17.3 18.4999 16.6 18.7999C15.9 19.0999 15 19.2999 14.1 19.2999C13.4 19.2999 12.7 19.2 12.1 19.1C11.5 19 11 18.7 10.5 18.5C10 18.2 9.60001 17.7999 9.20001 17.2999C8.80001 16.8999 8.49999 16.3999 8.29999 15.7999C8.09999 15.1999 7.80001 14.7 7.70001 14.1C7.60001 13.5 7.5 12.8 7.5 12.2C7.5 11.1 7.7 10.1 8 9.19995C8.3 8.29995 8.79999 7.60002 9.39999 6.90002C9.99999 6.30002 10.7 5.8 11.5 5.5C12.3 5.2 13.2 5 14.1 5C15.2 5 16.2 5.19995 17.1 5.69995C17.8 6.09995 18.7 6.6 18.8 7.5C18.8 7.9 18.6 8.29998 18.3 8.59998C18.2 8.69998 18.1 8.69993 18 8.79993C17.7 8.89993 17.4 8.79995 17.2 8.69995C16.7 8.49995 16.5 7.99995 16 7.69995C15.5 7.39995 14.9 7.19995 14.2 7.19995C13.1 7.19995 12.1 7.6 11.5 8.5C10.9 9.4 10.5 10.6 10.5 12.2C10.5 13.3 10.7 14.2 11 14.9C11.3 15.6 11.7 16.1 12.3 16.5C12.9 16.9 13.5 17 14.2 17C15 17 15.7 16.8 16.2 16.4C16.8 16 17.2 15.2 17.9 15.1C18 15 18.5 15.2 18.8 15.5Z"
                                  fill="black"
                                ></path>
                              </svg>
                            </span>

                            <span className="fs-5 fw-bold text-gray-800 mb-0">
                              Accounting
                            </span>
                            <span className="fs-7 text-gray-400">
                              eCommerce
                            </span>
                          </a>
                        </div>
                        {/* <!--end:Item--> */}
                        {/* <!--begin:Item--> */}
                        <div className="col-6">
                          <a
                            href="../../demo1/dist/pages/projects/settings.html"
                            className="d-flex flex-column flex-center h-100 p-6 bg-hover-light border-bottom"
                          >
                            {/* <!--begin::Svg Icon | path: icons/duotune/communication/com010.svg--> */}
                            <span className="svg-icon svg-icon-3x svg-icon-primary mb-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M6 8.725C6 8.125 6.4 7.725 7 7.725H14L18 11.725V12.925L22 9.725L12.6 2.225C12.2 1.925 11.7 1.925 11.4 2.225L2 9.725L6 12.925V8.725Z"
                                  fill="black"
                                ></path>
                                <path
                                  opacity="0.3"
                                  d="M22 9.72498V20.725C22 21.325 21.6 21.725 21 21.725H3C2.4 21.725 2 21.325 2 20.725V9.72498L11.4 17.225C11.8 17.525 12.3 17.525 12.6 17.225L22 9.72498ZM15 11.725H18L14 7.72498V10.725C14 11.325 14.4 11.725 15 11.725Z"
                                  fill="black"
                                ></path>
                              </svg>
                            </span>

                            <span className="fs-5 fw-bold text-gray-800 mb-0">
                              Administration
                            </span>
                            <span className="fs-7 text-gray-400">Console</span>
                          </a>
                        </div>
                        {/* <!--end:Item--> */}
                        {/* <!--begin:Item--> */}
                        <div className="col-6">
                          <a
                            href="../../demo1/dist/pages/projects/list.html"
                            className="d-flex flex-column flex-center h-100 p-6 bg-hover-light border-end"
                          >
                            {/* <!--begin::Svg Icon | path: icons/duotune/abstract/abs042.svg--> */}
                            <span className="svg-icon svg-icon-3x svg-icon-primary mb-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M18 21.6C16.6 20.4 9.1 20.3 6.3 21.2C5.7 21.4 5.1 21.2 4.7 20.8L2 18C4.2 15.8 10.8 15.1 15.8 15.8C16.2 18.3 17 20.5 18 21.6ZM18.8 2.8C18.4 2.4 17.8 2.20001 17.2 2.40001C14.4 3.30001 6.9 3.2 5.5 2C6.8 3.3 7.4 5.5 7.7 7.7C9 7.9 10.3 8 11.7 8C15.8 8 19.8 7.2 21.5 5.5L18.8 2.8Z"
                                  fill="black"
                                ></path>
                                <path
                                  opacity="0.3"
                                  d="M21.2 17.3C21.4 17.9 21.2 18.5 20.8 18.9L18 21.6C15.8 19.4 15.1 12.8 15.8 7.8C18.3 7.4 20.4 6.70001 21.5 5.60001C20.4 7.00001 20.2 14.5 21.2 17.3ZM8 11.7C8 9 7.7 4.2 5.5 2L2.8 4.8C2.4 5.2 2.2 5.80001 2.4 6.40001C2.7 7.40001 3.00001 9.2 3.10001 11.7C3.10001 15.5 2.40001 17.6 2.10001 18C3.20001 16.9 5.3 16.2 7.8 15.8C8 14.2 8 12.7 8 11.7Z"
                                  fill="black"
                                ></path>
                              </svg>
                            </span>

                            <span className="fs-5 fw-bold text-gray-800 mb-0">
                              Projects
                            </span>
                            <span className="fs-7 text-gray-400">
                              Pending Tasks
                            </span>
                          </a>
                        </div>
                        {/* <!--end:Item--> */}
                        {/* <!--begin:Item--> */}
                        <div className="col-6">
                          <a
                            href="../../demo1/dist/pages/projects/users.html"
                            className="d-flex flex-column flex-center h-100 p-6 bg-hover-light"
                          >
                            {/* <!--begin::Svg Icon | path: icons/duotune/finance/fin006.svg--> */}
                            <span className="svg-icon svg-icon-3x svg-icon-primary mb-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  opacity="0.3"
                                  d="M20 15H4C2.9 15 2 14.1 2 13V7C2 6.4 2.4 6 3 6H21C21.6 6 22 6.4 22 7V13C22 14.1 21.1 15 20 15ZM13 12H11C10.5 12 10 12.4 10 13V16C10 16.5 10.4 17 11 17H13C13.6 17 14 16.6 14 16V13C14 12.4 13.6 12 13 12Z"
                                  fill="black"
                                ></path>
                                <path
                                  d="M14 6V5H10V6H8V5C8 3.9 8.9 3 10 3H14C15.1 3 16 3.9 16 5V6H14ZM20 15H14V16C14 16.6 13.5 17 13 17H11C10.5 17 10 16.6 10 16V15H4C3.6 15 3.3 14.9 3 14.7V18C3 19.1 3.9 20 5 20H19C20.1 20 21 19.1 21 18V14.7C20.7 14.9 20.4 15 20 15Z"
                                  fill="black"
                                ></path>
                              </svg>
                            </span>

                            <span className="fs-5 fw-bold text-gray-800 mb-0">
                              Customers
                            </span>
                            <span className="fs-7 text-gray-400">
                              Latest cases
                            </span>
                          </a>
                        </div>
                        {/* <!--end:Item--> */}
                      </div>
                      {/* <!--end:Nav--> */}
                      {/* <!--begin::View more--> */}
                      <div className="py-2 text-center border-top">
                        <a
                          href="../../demo1/dist/pages/profile/activity.html"
                          className="btn btn-color-gray-600 btn-active-color-primary"
                        >
                          View All
                          {/* <!--begin::Svg Icon | path: icons/duotune/arrows/arr064.svg--> */}
                          <span className="svg-icon svg-icon-5">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <rect
                                opacity="0.5"
                                x="18"
                                y="13"
                                width="13"
                                height="2"
                                rx="1"
                                transform="rotate(-180 18 13)"
                                fill="black"
                              ></rect>
                              <path
                                d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z"
                                fill="black"
                              ></path>
                            </svg>
                          </span>
                        </a>
                      </div>
                      {/* <!--end::View more--> */}
                    </div>
                    {/* <!--end::Menu--> */}
                    {/* <!--end::Menu wrapper--> */}
                  </div>
                  {/* <!--end::Quick links--> */}
                  {/* <!--begin::User--> */}
                  <div
                    className="d-flex align-items-center ms-1 ms-lg-3"
                    id="kt_header_user_menu_toggle"
                  >
                    {/* <!--begin::Menu wrapper--> */}
                    <div className='flex flex-col items-center p-3 spaxe-y-3'>
                       <div
                      className="cursor-pointer symbol font-semibold uppercase text-gray-600 symbol-30px symbol-md-40px"
                    >
                      {/* <img src="assets/media/avatars/150-26.jpg" alt= {username} /> */}
                       {username}
                    </div>
                    <button className='text-red-400' onClick={handleLogout}>Logout</button>
                    </div>
                    {/* <!--begin::Menu--> */}
                    <div
                      className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px"
                      data-kt-menu="true"
                    >
                      {/* <!--begin::Menu item--> */}
                      <div className="menu-item px-3">
                        <div className="menu-content d-flex align-items-center px-3">
                          {/* <!--begin::Avatar--> */}
                          <div className="symbol symbol-50px me-5">
                            <img
                              alt="Logo"
                              src="assets/media/avatars/150-26.jpg"
                            />
                          </div>
                          {/* <!--end::Avatar--> */}
                          {/* <!--begin::Username--> */}
                          <div className="d-flex flex-column">
                            <div className="fw-bolder d-flex align-items-center fs-5">
                              Max Smith
                              <span className="badge badge-light-success fw-bolder fs-8 px-2 py-1 ms-2">
                                Pro
                              </span>
                            </div>
                            <a
                              href="#"
                              className="fw-bold text-muted text-hover-primary fs-7"
                            >
                              max@kt.com
                            </a>
                          </div>
                          {/* <!--end::Username--> */}
                        </div>
                      </div>
                      {/* <!--end::Menu item--> */}
                      {/* <!--begin::Menu separator--> */}
                      <div className="separator my-2"></div>
                      {/* <!--end::Menu separator--> */}
                      {/* <!--begin::Menu item--> */}
                      <div className="menu-item px-5">
                        <a
                          href="../../demo1/dist/account/overview.html"
                          className="menu-link px-5"
                        >
                          My Profile
                        </a>
                      </div>
                      {/* <!--end::Menu item--> */}
                      {/* <!--begin::Menu item--> */}
                      <div className="menu-item px-5">
                        <a
                          href="../../demo1/dist/pages/projects/list.html"
                          className="menu-link px-5"
                        >
                          <span className="menu-text">My Projects</span>
                          <span className="menu-badge">
                            <span className="badge badge-light-danger badge-circle fw-bolder fs-7">
                              3
                            </span>
                          </span>
                        </a>
                      </div>
                      {/* <!--end::Menu item--> */}
                      {/* <!--begin::Menu item--> */}
                      <div
                        className="menu-item px-5"
                        data-kt-menu-trigger="hover"
                        data-kt-menu-placement="left-start"
                      >
                        <a href="#" className="menu-link px-5">
                          <span className="menu-title">My Subscription</span>
                          <span className="menu-arrow"></span>
                        </a>
                        {/* <!--begin::Menu sub--> */}
                        <div className="menu-sub menu-sub-dropdown w-175px py-4">
                          {/* <!--begin::Menu item--> */}
                          <div className="menu-item px-3">
                            <a
                              href="../../demo1/dist/account/referrals.html"
                              className="menu-link px-5"
                            >
                              Referrals
                            </a>
                          </div>
                          {/* <!--end::Menu item--> */}
                          {/* <!--begin::Menu item--> */}
                          <div className="menu-item px-3">
                            <a
                              href="../../demo1/dist/account/billing.html"
                              className="menu-link px-5"
                            >
                              Billing
                            </a>
                          </div>
                          {/* <!--end::Menu item--> */}
                          {/* <!--begin::Menu item--> */}
                          <div className="menu-item px-3">
                            <a
                              href="../../demo1/dist/account/statements.html"
                              className="menu-link px-5"
                            >
                              Payments
                            </a>
                          </div>
                          {/* <!--end::Menu item--> */}
                          {/* <!--begin::Menu item--> */}
                          <div className="menu-item px-3">
                            <a
                              href="../../demo1/dist/account/statements.html"
                              className="menu-link d-flex flex-stack px-5"
                            >
                              Statements
                              <i
                                className="fas fa-exclamation-circle ms-2 fs-7"
                                data-bs-toggle="tooltip"
                                title=""
                                data-bs-original-title="View your statements"
                                aria-label="View your statements"
                              ></i>
                            </a>
                          </div>
                          {/* <!--end::Menu item--> */}
                          {/* <!--begin::Menu separator--> */}
                          <div className="separator my-2"></div>
                          {/* <!--end::Menu separator--> */}
                          {/* <!--begin::Menu item--> */}
                          <div className="menu-item px-3">
                            <div className="menu-content px-3">
                              <label className="form-check form-switch form-check-custom form-check-solid">
                                <input
                                  className="form-check-input w-30px h-20px"
                                  type="checkbox"
                                  value="1"
                                  checked="checked"
                                  name="notifications"
                                />
                                <span className="form-check-label text-muted fs-7">
                                  Notifications
                                </span>
                              </label>
                            </div>
                          </div>
                          {/* <!--end::Menu item--> */}
                        </div>
                        {/* <!--end::Menu sub--> */}
                      </div>
                      {/* <!--end::Menu item--> */}
                      {/* <!--begin::Menu item--> */}
                      <div className="menu-item px-5">
                        <a
                          href="../../demo1/dist/account/statements.html"
                          className="menu-link px-5"
                        >
                          My Statements
                        </a>
                      </div>
                      {/* <!--end::Menu item--> */}
                      {/* <!--begin::Menu separator--> */}
                      <div className="separator my-2"></div>
                      {/* <!--end::Menu separator--> */}
                      {/* <!--begin::Menu item--> */}
                      <div
                        className="menu-item px-5"
                        data-kt-menu-trigger="hover"
                        data-kt-menu-placement="left-start"
                      >
                        <a href="#" className="menu-link px-5">
                          <span className="menu-title position-relative">
                            Language
                            <span className="fs-8 rounded bg-light px-3 py-2 position-absolute translate-middle-y top-50 end-0">
                              English
                              <img
                                className="w-15px h-15px rounded-1 ms-2"
                                src="assets/media/flags/united-states.svg"
                                alt=""
                              />
                            </span>
                          </span>
                        </a>
                        {/* <!--begin::Menu sub--> */}
                        <div className="menu-sub menu-sub-dropdown w-175px py-4">
                          {/* <!--begin::Menu item--> */}
                          <div className="menu-item px-3">
                            <a
                              href="../../demo1/dist/account/settings.html"
                              className="menu-link d-flex px-5 active"
                            >
                              <span className="symbol symbol-20px me-4">
                                <img
                                  className="rounded-1"
                                  src="assets/media/flags/united-states.svg"
                                  alt=""
                                />
                              </span>
                              English
                            </a>
                          </div>
                          {/* <!--end::Menu item--> */}
                          {/* <!--begin::Menu item--> */}
                          <div className="menu-item px-3">
                            <a
                              href="../../demo1/dist/account/settings.html"
                              className="menu-link d-flex px-5"
                            >
                              <span className="symbol symbol-20px me-4">
                                <img
                                  className="rounded-1"
                                  src="assets/media/flags/spain.svg"
                                  alt=""
                                />
                              </span>
                              Spanish
                            </a>
                          </div>
                          {/* <!--end::Menu item--> */}
                          {/* <!--begin::Menu item--> */}
                          <div className="menu-item px-3">
                            <a
                              href="../../demo1/dist/account/settings.html"
                              className="menu-link d-flex px-5"
                            >
                              <span className="symbol symbol-20px me-4">
                                <img
                                  className="rounded-1"
                                  src="assets/media/flags/germany.svg"
                                  alt=""
                                />
                              </span>
                              German
                            </a>
                          </div>
                          {/* <!--end::Menu item--> */}
                          {/* <!--begin::Menu item--> */}
                          <div className="menu-item px-3">
                            <a
                              href="../../demo1/dist/account/settings.html"
                              className="menu-link d-flex px-5"
                            >
                              <span className="symbol symbol-20px me-4">
                                <img
                                  className="rounded-1"
                                  src="assets/media/flags/japan.svg"
                                  alt=""
                                />
                              </span>
                              Japanese
                            </a>
                          </div>
                          {/* <!--end::Menu item--> */}
                          {/* <!--begin::Menu item--> */}
                          <div className="menu-item px-3">
                            <a
                              href="../../demo1/dist/account/settings.html"
                              className="menu-link d-flex px-5"
                            >
                              <span className="symbol symbol-20px me-4">
                                <img
                                  className="rounded-1"
                                  src="assets/media/flags/france.svg"
                                  alt=""
                                />
                              </span>
                              French
                            </a>
                          </div>
                          {/* <!--end::Menu item--> */}
                        </div>
                        {/* <!--end::Menu sub--> */}
                      </div>
                      {/* <!--end::Menu item--> */}
                      {/* <!--begin::Menu item--> */}
                      <div className="menu-item px-5 my-1">
                        <a
                          href="../../demo1/dist/account/settings.html"
                          className="menu-link px-5"
                        >
                          Account Settings
                        </a>
                      </div>
                      {/* <!--end::Menu item--> */}
                      {/* <!--begin::Menu item--> */}
                      <div className="menu-item px-5">
                        <a
                          href="../../demo1/dist/authentication/flows/basic/sign-in.html"
                          className="menu-link px-5"
                        >
                          Sign Out
                        </a>
                      </div>
                      {/* <!--end::Menu item--> */}
                      {/* <!--begin::Menu separator--> */}
                      <div className="separator my-2"></div>
                      {/* <!--end::Menu separator--> */}
                      {/* <!--begin::Menu item--> */}
                      <div className="menu-item px-5">
                        <div className="menu-content px-5">
                          <label
                            className="form-check form-switch form-check-custom form-check-solid pulse pulse-success"
                            for="kt_user_menu_dark_mode_toggle"
                          >
                            <input
                              className="form-check-input w-30px h-20px"
                              type="checkbox"
                              value="1"
                              name="mode"
                              id="kt_user_menu_dark_mode_toggle"
                              data-kt-url="../../demo1/dist/index.html"
                            />
                            <span className="pulse-ring ms-n1"></span>
                            <span className="form-check-label text-gray-600 fs-7">
                              Dark Mode
                            </span>
                          </label>
                        </div>
                      </div>
                      {/* <!--end::Menu item--> */}
                    </div>
                    {/* <!--end::Menu--> */}
                    {/* <!--end::Menu wrapper--> */}
                  </div>
                  {/* <!--end::User --> */}
                  {/* <!--begin::Heaeder menu toggle--> */}
                  <div
                    className="d-flex align-items-center d-lg-none ms-2 me-n3"
                    title="Show header menu"
                  >
                    <div
                      className="btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px"
                      id="kt_header_menu_mobile_toggle"
                    >
                      {/* <!--begin::Svg Icon | path: icons/duotune/text/txt001.svg--> */}
                      <span className="svg-icon svg-icon-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M13 11H3C2.4 11 2 10.6 2 10V9C2 8.4 2.4 8 3 8H13C13.6 8 14 8.4 14 9V10C14 10.6 13.6 11 13 11ZM22 5V4C22 3.4 21.6 3 21 3H3C2.4 3 2 3.4 2 4V5C2 5.6 2.4 6 3 6H21C21.6 6 22 5.6 22 5Z"
                            fill="black"
                          ></path>
                          <path
                            opacity="0.3"
                            d="M21 16H3C2.4 16 2 15.6 2 15V14C2 13.4 2.4 13 3 13H21C21.6 13 22 13.4 22 14V15C22 15.6 21.6 16 21 16ZM14 20V19C14 18.4 13.6 18 13 18H3C2.4 18 2 18.4 2 19V20C2 20.6 2.4 21 3 21H13C13.6 21 14 20.6 14 20Z"
                            fill="black"
                          ></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                  {/* <!--end::Heaeder menu toggle--> */}
                </div>
                {/* {/* <!--end::Toolbar wrapper--> */}
              </div>
            </div>
          {/* </div> */}
        {/* </div> */}
        {/* <div className="username">Logged in as: {username}</div> */}
        
        {/* <div className="d-flex align-items-stretch">
        
        </div> */}
        
       
      {/* </div> */}

    </div>
  );
};

export default Header;
