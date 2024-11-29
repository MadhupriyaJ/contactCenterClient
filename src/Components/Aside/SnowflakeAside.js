import React, { useEffect, useRef, useState } from "react";
import "./SnowflakeAside.css";
import KTMenu from "../js/components/menu";
import KTDrawer from "../js/components/drawer";
import { useNavigate } from "react-router-dom";
import KTScroll from "../js/components/scroll";


const SnowflakeAside = ({onTableSelect,setSelectedTable,selectedTable,onToggle }) => {
  // const [asideOpen, setAsideOpen] = useState(true);

  // // Function to toggle the aside state
  // const toggleAside = () => {
  //   setAsideOpen((prevAsideOpen) => !prevAsideOpen);
  // };
  // const openNav = () => {
  //   setAsideOpen(true);
  // };

  // const closeNav = () => {
  //   setAsideOpen(false);
  // };

  const [asideOpen, setAsideOpen] = useState(true);
  const [tablename, setTablename] = useState([]);
  const [dataTable, setDataTable] = useState(null);
  const [tabledetails, setTabledetails] = useState([]);
  const BASE_URL = process.env.REACT_APP_API_URL;

  const tableRef = useRef();

  const navigate = useNavigate();

  // Function to handle the click event for "Users List"
  const handleUserListClick = () => {
    navigate("/List"); // Programmatically navigate to the /List route
  };


  const handleTableSelect = (tableName) => {
  
    navigate(`/${tableName}`);
  };



  useEffect(() => {
    console.log("Fetching table names...");
    fetchTablename();
  }, []);

 
  //To get All Table from server
  const fetchTablename = async () => {
    try {
      const response = await fetch(`${BASE_URL}/gettablename`);
      const data = await response.json();
      console.log("Fetched table names for aside:", data);
      setTablename(data);
    } catch (error) {
      console.error("Error fetching table names:", error);
    }
  };
  
  const fetchTableData = async (tableName) => {
    try {
      const response = await fetch(`${BASE_URL}/tablecategorieswithvalue`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tableName }),
      });

      const data = await response.json();
      console.log("Fetched table data for", tableName, ":", data);
      setTabledetails(data);

      // Destroy the DataTable if it exists
      if (dataTable !== null) {
        dataTable.destroy();
      }
      onTableSelect(tableName); // Call the callback function to pass the selected table name

      // Initialize DataTable for the current tableRef
      const newDataTable = $(tableRef.current).DataTable({
        searching: true, // Enable searching
      });
      console.log("DataTable initialized:", newDataTable);
      setDataTable(newDataTable);
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  };
  const toggleAside = () => {
    setAsideOpen(!asideOpen)
    onToggle(!asideOpen)
    // setAsideOpen((prevAsideOpen) => !prevAsideOpen);
  }

  const openNav = () => {
    setAsideOpen(true);
  };
  const closeNav = () => {
    setAsideOpen(false);
  };
  
  const tableNamesMapping = {
    AdminandUserLogin: 'Login',
    at_entity: 'Entity',
    at_language: 'Language',
    at_country: 'Country',
    at_city: 'City',
    at_city_zone: 'CityZone',
    at_region: 'Region',
    at_division: 'Division',
    at_department: 'Department',
    at_designation: 'Designation',
    at_roles: 'Roles',
    at_roles_desig: 'Roles Designation',
    at_module: 'Module',
    at_menu: 'Menu',
    at_screen: 'Screen',
    at_field: 'Field',
    at_txns: 'Transactions',
    at_user: 'User',
    user_menus: 'User Menus',
    user_screens: 'User Screens',
    user_roles_design: 'User Roles Design',
    user_roles_design_excep: 'User Roles Design Except',
    at_userlogins: 'User Logins',
    at_userlogins_screens: 'User Login Screens',
    at_admin_logs: 'Admin Logs',
    at_control: 'Control',
  };
  
  KTMenu.createInstances();
  var menuElement = document.querySelector("#kt_menu");
  var menu = KTMenu.getInstance(menuElement);
  KTMenu.updateDropdowns();
  KTMenu.updateByLinkAttribute("/users/group/add");
  KTMenu.hideDropdowns();
  KTDrawer.createInstances();
  var drawerElement = document.querySelector("#kt_drawer_example_1");
  var drawer = KTDrawer.getInstance(drawerElement);
  KTDrawer.hideAll();
  KTDrawer.updateAll();
  KTScroll.createInstances();
  
  KTScroll.handleResize();
  // KTAppSidebar.init();




  return (
    <div
      className={`aside ${asideOpen ? 'open' : ''}h-[100vh] fixed`}
      // onMouseEnter={openNav}
    >
      <div
        id="kt_aside"
        className={`aside aside-white aside-hoverable mt-0 sidenav h-full ${
          asideOpen ? "w-64 " : "w-14"
        } duration-300 h-full bg-slate-900 text-white relative`}
        data-kt-drawer="false"
        data-kt-drawer-name="aside"
        data-kt-drawer-activate="{default: true, lg: false}"
        data-kt-drawer-overlay="true"
        data-kt-drawer-width="{default:'200px', '300px': '250px'}"
        data-kt-drawer-direction="start"
        data-kt-drawer-toggle="#kt_aside_mobile_toggle"
      >
        {/*  */}

        {/*<!--begin::Brand--> */}
        <div class="aside-logo flex-column-auto " id="kt_aside_logo">
          {/*<!--begin::Logo--> */}
          <a href="../../demo1/dist/index.html">
            {asideOpen ? (
              <div class="aside-logo flex-column-auto " id="kt_aside_logo">
                <a href="../../demo1/dist/index.html">
                  <img
                    alt="Logo"
                    src="assets/media/logos/cerulean-logo(1).png"
                    class="w-64"
                  />
                </a>
              </div>
            ) : (
              <div class="aside-logo flex-column-auto " id="kt_aside_logo">
                <a href="../../demo1/dist/index.html">
                  <img
                    alt="Logo"
                    src="assets/media/logos/snowflakeds.png"
                    class="w-24" // Adjust the size as needed (50% size)
                  />
                </a>
              </div>
            )}
          </a>
          {/*<!--end::Logo--> */}
          {/*<!--begin::Aside toggler--> */}
          <div
            id="kt_aside_toggle"
            class="btn btn-icon"
            onClick={toggleAside}
            data-kt-toggle="true"
            data-kt-toggle-state="active"
            data-kt-toggle-target="body"
            data-kt-toggle-name="aside-minimize"
          >
            {/*<!--begin::Svg Icon | path: icons/duotune/arrows/arr079.svg--> */}
            <span
              class="svg-icon svg-icon-1"
              className={`absolute z-20 cursor-pointer rounded-lg bg-slate-300 hover:bg-slate-100 -right-3 top-16 w-7 ${
                !asideOpen && "rotate-180"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  opacity="0.5"
                  d="M14.2657 11.4343L18.45 7.25C18.8642 6.83579 18.8642 6.16421 18.45 5.75C18.0358 5.33579 17.3642 5.33579 16.95 5.75L11.4071 11.2929C11.0166 11.6834 11.0166 12.3166 11.4071 12.7071L16.95 18.25C17.3642 18.6642 18.0358 18.6642 18.45 18.25C18.8642 17.8358 18.8642 17.1642 18.45 16.75L14.2657 12.5657C13.9533 12.2533 13.9533 11.7467 14.2657 11.4343Z"
                  fill="blue"
                ></path>
                <path
                  d="M8.2657 11.4343L12.45 7.25C12.8642 6.83579 12.8642 6.16421 12.45 5.75C12.0358 5.33579 11.3642 5.33579 10.95 5.75L5.40712 11.2929C5.01659 11.6834 5.01659 12.3166 5.40712 12.7071L10.95 18.25C11.3642 18.6642 12.0358 18.6642 12.45 18.25C12.8642 17.8358 12.8642 17.1642 12.45 16.75L8.2657 12.5657C7.95328 12.2533 7.95328 11.7467 8.2657 11.4343Z"
                  fill="blue"
                ></path>
              </svg>
            </span>
            {/*<!--end::Svg Icon--> */}
          </div>
          {/*<!--end::Aside toggler--> */}
        </div>
        {/*<!--end::Brand--> */}
        {/*<!--begin::Aside menu--> */}
        <div class="aside-menu flex-column-fluid ">
          {/*<!--begin::Aside Menu--> */}
          <div
            class="hover-scroll-overlay-y my-5 my-lg-5 "
            id="kt_aside_menu_wrapper"
            data-kt-scroll="true"
            data-kt-scroll-activate="{default: false, lg: true}"
            data-kt-scroll-height="auto"
            data-kt-scroll-dependencies="#kt_aside_logo, #kt_aside_footer"
            data-kt-scroll-wrappers="#kt_aside_menu"
            data-kt-scroll-offset="0"
            // style="height: 422px;"
          >


            
            {/*<!--begin::Menu--> */}
            <div
              class="menu menu-column menu-title-gray-600 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-500 "
              id="#kt_aside_menu"
              data-kt-menu="true"
            >

 {/* playbook */}
 <div class="menu-item">
                <div class="menu-content pt-8 pb-2">
                  {asideOpen && (
                    <span class="menu-section text-muted text-uppercase fs-8 ls-1">
                      playbook
                    </span>
                  )}
                </div>
              </div>

              <div
                data-kt-menu-trigger="click"
                class="menu-item menu-accordion"
              >
                <span class="menu-link">
                  <span class="menu-icon">
                    {/*<!--begin::Svg Icon | path: icons/duotune/ecommerce/ecm007.svg--> */}
                    <span class="svg-icon svg-icon-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M21 9V11C21 11.6 20.6 12 20 12H14V8H20C20.6 8 21 8.4 21 9ZM10 8H4C3.4 8 3 8.4 3 9V11C3 11.6 3.4 12 4 12H10V8Z"
                          fill="white"
                        ></path>
                        <path
                          d="M15 2C13.3 2 12 3.3 12 5V8H15C16.7 8 18 6.7 18 5C18 3.3 16.7 2 15 2Z"
                          fill="white"
                        ></path>
                        <path
                          opacity="0.3"
                          d="M9 2C10.7 2 12 3.3 12 5V8H9C7.3 8 6 6.7 6 5C6 3.3 7.3 2 9 2ZM4 12V21C4 21.6 4.4 22 5 22H10V12H4ZM20 12V21C20 21.6 19.6 22 19 22H14V12H20Z"
                          fill="white"
                        ></path>
                      </svg>
                    </span>
                    {/*<!--end::Svg Icon--> */}
                  </span>
                  <span class="menu-title">Pages</span>
                  <span class="menu-arrow"></span>
                </span>
                <div class="menu-sub menu-sub-accordion menu-active-bg">               

                  <div
                    data-kt-menu-trigger="click"
                    class="menu-item menu-accordion"
                  >
                    <span class="menu-link">
                      <span class="menu-icon">
                        {/* <!--begin::Svg Icon | path: icons/duotune/communication/com013.svg--> */}
                    <span class="svg-icon svg-icon-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M6.28548 15.0861C7.34369 13.1814 9.35142 12 11.5304 12H12.4696C14.6486 12 16.6563 13.1814 17.7145 15.0861L19.3493 18.0287C20.0899 19.3618 19.1259 21 17.601 21H6.39903C4.87406 21 3.91012 19.3618 4.65071 18.0287L6.28548 15.0861Z"
                          fill="white"
                        ></path>
                        <rect
                          opacity="0.3"
                          x="8"
                          y="3"
                          width="8"
                          height="8"
                          rx="4"
                          fill="white"
                        ></rect>
                      </svg>
                    </span>
                {/* <!--end::Svg Icon--> */}
                      </span>
                      <span class="menu-title">Speech service</span>
                      <span class="menu-arrow"></span>
                    </span>
                    {/* playbook side menu start  */}
                    <div class="menu-sub menu-sub-accordion menu-active-bg">
                      <div class="menu-item">
                        <a
                          class="menu-link"
                          href="/transcribe"
                        >
                          <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                          </span>
                          <span class="menu-title">Speech To Text</span>
                        </a>
                      </div>
                    </div>
                    {/* BSTT */}
                    <div class="menu-sub menu-sub-accordion menu-active-bg">
                      <div class="menu-item">
                        <a
                          class="menu-link"
                          href="/Batchspeechtotext"
                        >
                          <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                          </span>
                          <span class="menu-title">Batch Speech To Text</span>
                        </a>
                      </div>
                    </div>
                    {/* REALTIME SPEECH TO TEXT */}
                    <div class="menu-sub menu-sub-accordion menu-active-bg">
                      <div class="menu-item">
                        <a
                          class="menu-link"
                          href="/speechtotext"
                        >
                          <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                          </span>
                          <span class="menu-title">Real Time Speech To Text</span>
                        </a>
                      </div>
                    </div>
                    {/* TEXT TO SPEECH */}
                    <div class="menu-sub menu-sub-accordion menu-active-bg">
                      <div class="menu-item">
                        <a
                          class="menu-link"
                          href="/texttospeech"
                        >
                          <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                          </span>
                          <span class="menu-title">Text To Speech</span>
                        </a>
                      </div>
                    </div>

                     {/* LANGUAGE SUMMERIZATION */}
                    {/* <div class="menu-sub menu-sub-accordion menu-active-bg">
                      <div class="menu-item">
                        <a
                          class="menu-link"
                          href="/LanguageSummerization"
                        >
                          <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                          </span>
                          <span class="menu-title">Language summerise information</span>
                        </a>
                      </div>
                    </div> */}
                    {/* DETECT LANGUAGE */}
                    {/* <div class="menu-sub menu-sub-accordion menu-active-bg">
                      <div class="menu-item">
                        <a
                          class="menu-link"
                          href="/DetectLanguage"
                        >
                          <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                          </span>
                          <span class="menu-title">Detect Language</span>
                        </a>
                      </div>
                    </div> */}
                    {/* Analyze sentiment with Openion mining */}
                    {/* <div class="menu-sub menu-sub-accordion menu-active-bg">
                      <div class="menu-item">
                        <a
                          class="menu-link"
                          href="/SentimentAnalysis"
                        >
                          <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                          </span>
                          <span class="menu-title">Analyze sentiment with Openion mining</span>
                        </a>
                      </div>
                    </div> */}
                    {/* Personally Identified Information */}
                    {/* <div class="menu-sub menu-sub-accordion menu-active-bg">
                      <div class="menu-item">
                        <a
                          class="menu-link"
                          href="/PII"
                        >
                          <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                          </span>
                          <span class="menu-title">Personally Identified Information</span>
                        </a>
                      </div>
                    </div> */}
                    {/* Document Translation */}
                    {/* <div class="menu-sub menu-sub-accordion menu-active-bg">
                      <div class="menu-item">
                        <a
                          class="menu-link"
                          href="/DocumentTranslation"
                        >
                          <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                          </span>
                          <span class="menu-title">Document Translation</span>
                        </a>
                      </div>
                    </div> */}
                  </div>

                </div>
                {/*<!--end::Menu--> */}
              </div>
              {/* playbook end */}


{/* Dashboard */}

              <div class="menu-item  ">
                <div class="menu-content pb-2">
                  {asideOpen && (
                    <span class="menu-section text-muted text-uppercase fs-8 ls-1">
                      Dashboard
                    </span>
                  )}
                </div>
              </div>
              <div class="menu-item ">
                <a class="menu-link " href="#">
                  <span class="menu-icon ">
                    {/*<!--begin::Svg Icon | path: icons/duotune/general/gen025.svg--> */}
                    <span class="svg-icon svg-icon-2 ">
                      {/* <svg
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
                          fill="white"
                        ></rect>
                        <rect
                          opacity="0.3"
                          x="13"
                          y="2"
                          width="9"
                          height="9"
                          rx="2"
                          fill="white"
                        ></rect>
                        <rect
                          opacity="0.3"
                          x="13"
                          y="13"
                          width="9"
                          height="9"
                          rx="2"
                          fill="white"
                        ></rect>
                        <rect
                          opacity="0.3"
                          x="2"
                          y="13"
                          width="9"
                          height="9"
                          rx="2"
                          fill="white"
                        ></rect>
                      </svg> */}
                    </span>
                    {/*<!--end::Svg Icon--> */}
                  </span>
                  {/* <span class="menu-title ">Administrator</span> */}
                </a>
              </div>
              

              <div data-kt-menu-trigger="click"
                class="menu-item menu-accordion"
              >
                <a
                  class="menu-link"
                  // href="../../demo1/dist/dashboards/only-header.html"
                >
                  <span class="menu-icon">
                    {/*<!--begin::Svg Icon | path: icons/duotune/layouts/lay010.svg--> */}
                    <span class="svg-icon svg-icon-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          opacity="0.3"
                          d="M20 21H3C2.4 21 2 20.6 2 20V10C2 9.4 2.4 9 3 9H20C20.6 9 21 9.4 21 10V20C21 20.6 20.6 21 20 21Z"
                          fill="white"
                        ></path>
                        <path
                          d="M20 7H3C2.4 7 2 6.6 2 6V3C2 2.4 2.4 2 3 2H20C20.6 2 21 2.4 21 3V6C21 6.6 20.6 7 20 7Z"
                          fill="white"
                        ></path>
                      </svg>
                    </span>
                    {/*<!--end::Svg Icon--> */}
                  </span>

                  <span class="menu-title">Only Header</span>
                  <span class="menu-arrow" ></span>
                </a>

                <div class="menu-sub menu-sub-accordion menu-active-bg">
                <div
                    data-kt-menu-trigger="click"
                    class="menu-item menu-accordion"
                  >
                    <span class="menu-link">
                      <span class="menu-bullet">
                        <span class="bullet bullet-dot"></span>
                      </span>
                      <span class="menu-title">
                      <a href="/customer">Data Tables</a>
                      </span>
                      <span class="menu-arrow" ></span>
                    </span>
                    {/* <div class="menu-sub menu-sub-accordion menu-active-bg">
                    {tablename.map((table, index) => (
                <div class="menu-item"
                 key={index}>
                  <p class="menu-link" 
                  onClick={() => {fetchTableData(table.TABLE_NAME)
                    handleTableSelect(table.TABLE_NAME)}}
                  >
                    <span class="menu-icon ">
                     
                      <span class="svg-icon svg-icon-2 ">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.2929 2.70711C11.6834 2.31658 12.3166 2.31658 12.7071 2.70711L15.2929 5.29289C15.6834 5.68342 15.6834 6.31658 15.2929 6.70711L12.7071 9.29289C12.3166 9.68342 11.6834 9.68342 11.2929 9.29289L8.70711 6.70711C8.31658 6.31658 8.31658 5.68342 8.70711 5.29289L11.2929 2.70711Z"
                            fill="currentColor"
                          />
                          <path
                            d="M11.2929 14.7071C11.6834 14.3166 12.3166 14.3166 12.7071 14.7071L15.2929 17.2929C15.6834 17.6834 15.6834 18.3166 15.2929 18.7071L12.7071 21.2929C12.3166 21.6834 11.6834 21.6834 11.2929 21.2929L8.70711 18.7071C8.31658 18.3166 8.31658 17.6834 8.70711 17.2929L11.2929 14.7071Z"
                            fill="currentColor"
                          />
                          <path
                            opacity="0.3"
                            d="M5.29289 8.70711C5.68342 8.31658 6.31658 8.31658 6.70711 8.70711L9.29289 11.2929C9.68342 11.6834 9.68342 12.3166 9.29289 12.7071L6.70711 15.2929C6.31658 15.6834 5.68342 15.6834 5.29289 15.2929L2.70711 12.7071C2.31658 12.3166 2.31658 11.6834 2.70711 11.2929L5.29289 8.70711Z"
                            fill="currentColor"
                          />
                          <path
                            opacity="0.3"
                            d="M17.2929 8.70711C17.6834 8.31658 18.3166 8.31658 18.7071 8.70711L21.2929 11.2929C21.6834 11.6834 21.6834 12.3166 21.2929 12.7071L18.7071 15.2929C18.3166 15.6834 17.6834 15.6834 17.2929 15.2929L14.7071 12.7071C14.3166 12.3166 14.3166 11.6834 14.7071 11.2929L17.2929 8.70711Z"
                            fill="currentColor"
                          />
                        </svg>
                      </span>
              
                    </span>
                    <a
                      class="menu-title"
                      // key={index}
                      // value={table.TABLE_NAME}
                      // href="/customer"
                    >
                      {table.TABLE_NAME}
                    </a>
                  </p>
                </div>
              ))}
                    </div> */}
                  </div>
                  </div>
                
              </div>
            
             
              {/* crafted */}
              <div class="menu-item">
                <div class="menu-content pt-8 pb-2">
                  {asideOpen && (
                    <span class="menu-section text-muted text-uppercase fs-8 ls-1">
                      Crafted
                    </span>
                  )}
                </div>
              </div>
              
              <div
                data-kt-menu-trigger="click"
                class="menu-item menu-accordion"
              >
                <span class="menu-link">
                  <span class="menu-icon">
                    {/*<!--begin::Svg Icon | path: icons/duotune/ecommerce/ecm007.svg--> */}
                    <span class="svg-icon svg-icon-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M21 9V11C21 11.6 20.6 12 20 12H14V8H20C20.6 8 21 8.4 21 9ZM10 8H4C3.4 8 3 8.4 3 9V11C3 11.6 3.4 12 4 12H10V8Z"
                          fill="white"
                        ></path>
                        <path
                          d="M15 2C13.3 2 12 3.3 12 5V8H15C16.7 8 18 6.7 18 5C18 3.3 16.7 2 15 2Z"
                          fill="white"
                        ></path>
                        <path
                          opacity="0.3"
                          d="M9 2C10.7 2 12 3.3 12 5V8H9C7.3 8 6 6.7 6 5C6 3.3 7.3 2 9 2ZM4 12V21C4 21.6 4.4 22 5 22H10V12H4ZM20 12V21C20 21.6 19.6 22 19 22H14V12H20Z"
                          fill="white"
                        ></path>
                      </svg>
                    </span>
                    {/*<!--end::Svg Icon--> */}
                  </span>
                  <span class="menu-title">Pages</span>
                  <span class="menu-arrow"></span>
                </span>
                <div class="menu-sub menu-sub-accordion menu-active-bg">
                <div
                    data-kt-menu-trigger="click"
                    class="menu-item menu-accordion"
                  >
                    <span class="menu-link">
                      <span class="menu-bullet">
                        <span class="bullet bullet-dot"></span>
                      </span>
                      <span class="menu-title">
                      <a href="/customer">Data Tables</a></span>
                      <span class="menu-arrow" ></span>
                    </span>
                    <div class="menu-sub menu-sub-accordion menu-active-bg">
                    
                    </div>
                  </div>
                  <div
                    data-kt-menu-trigger="click"
                    class="menu-item menu-accordion"
                  >
                    <span class="menu-link">
                      <span class="menu-bullet">
                        <span class="bullet bullet-dot"></span>
                      </span>
                      <span class="menu-title">Profile</span>
                      <span class="menu-arrow"></span>
                    </span>
                    <div class="menu-sub menu-sub-accordion menu-active-bg">
                      <div class="menu-item">
                        <a
                          class="menu-link"
                          href="../../demo1/dist/pages/profile/overview.html"
                        >
                          <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                          </span>
                          <span class="menu-title">Overview</span>
                        </a>
                      </div>
                      <div class="menu-item">
                        <a
                          class="menu-link"
                          href="../../demo1/dist/pages/profile/projects.html"
                        >
                          <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                          </span>
                          <span class="menu-title">Projects</span>
                        </a>
                      </div>
                      <div class="menu-item">
                        <a
                          class="menu-link"
                          href="../../demo1/dist/pages/profile/campaigns.html"
                        >
                          <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                          </span>
                          <span class="menu-title">Campaigns</span>
                        </a>
                      </div>
                      <div class="menu-item">
                        <a
                          class="menu-link"
                          href="../../demo1/dist/pages/profile/documents.html"
                        >
                          <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                          </span>
                          <span class="menu-title">Documents</span>
                        </a>
                      </div>
                      <div class="menu-item">
                        <a
                          class="menu-link"
                          href="../../demo1/dist/pages/profile/connections.html"
                        >
                          <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                          </span>
                          <span class="menu-title">Connections</span>
                        </a>
                      </div>
                      <div class="menu-item">
                        <a
                          class="menu-link"
                          href="../../demo1/dist/pages/profile/activity.html"
                        >
                          <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                          </span>
                          <span class="menu-title">Activity</span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div
                    data-kt-menu-trigger="click"
                    class="menu-item menu-accordion"
                  >
                    <span class="menu-link">
                      <span class="menu-bullet">
                        <span class="bullet bullet-dot"></span>
                      </span>
                      <span class="menu-title">Projects</span>
                      <span class="menu-arrow"></span>
                    </span>
                    <div class="menu-sub menu-sub-accordion menu-active-bg">
                      <div class="menu-item">
                        <a
                          class="menu-link"
                          href="../../demo1/dist/pages/projects/list.html"
                        >
                          <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                          </span>
                          <span class="menu-title">My Projects</span>
                        </a>
                      </div>
                      <div class="menu-item">
                        <a
                          class="menu-link"
                          href="../../demo1/dist/pages/projects/project.html"
                        >
                          <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                          </span>
                          <span class="menu-title">View Project</span>
                        </a>
                      </div>
                      <div class="menu-item">
                        <a
                          class="menu-link"
                          href="../../demo1/dist/pages/projects/targets.html"
                        >
                          <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                          </span>
                          <span class="menu-title">Targets</span>
                        </a>
                      </div>
                      <div class="menu-item">
                        <a
                          class="menu-link"
                          href="../../demo1/dist/pages/projects/budget.html"
                        >
                          <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                          </span>
                          <span class="menu-title">Budget</span>
                        </a>
                      </div>
                      <div class="menu-item">
                        <a
                          class="menu-link"
                          href="../../demo1/dist/pages/projects/users.html"
                        >
                          <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                          </span>
                          <span class="menu-title">Users</span>
                        </a>
                      </div>
                      <div class="menu-item">
                        <a
                          class="menu-link"
                          href="../../demo1/dist/pages/projects/files.html"
                        >
                          <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                          </span>
                          <span class="menu-title">Files</span>
                        </a>
                      </div>
                      <div class="menu-item">
                        <a
                          class="menu-link"
                          href="../../demo1/dist/pages/projects/activity.html"
                        >
                          <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                          </span>
                          <span class="menu-title">Activity</span>
                        </a>
                      </div>
                      <div class="menu-item">
                        <a
                          class="menu-link"
                          href="../../demo1/dist/pages/projects/settings.html"
                        >
                          <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                          </span>
                          <span class="menu-title">Settings</span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div
                    data-kt-menu-trigger="click"
                    class="menu-item menu-accordion"
                  >
                    <span class="menu-link">
                      <span class="menu-bullet">
                        <span class="bullet bullet-dot"></span>
                      </span>
                      <span class="menu-title">Wizards</span>
                      <span class="menu-arrow"></span>
                    </span>
                    <div class="menu-sub menu-sub-accordion menu-active-bg">
                      <div class="menu-item">
                        <a
                          class="menu-link"
                          href="../../demo1/dist/pages/wizards/horizontal.html"
                        >
                          <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                          </span>
                          <span class="menu-title">Horizontal</span>
                        </a>
                      </div>
                      <div class="menu-item">
                        <a
                          class="menu-link"
                          href="../../demo1/dist/pages/wizards/vertical.html"
                        >
                          <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                          </span>
                          <span class="menu-title">Vertical</span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div
                    data-kt-menu-trigger="click"
                    class="menu-item menu-accordion"
                  >
                    <span class="menu-link">
                      <span class="menu-bullet">
                        <span class="bullet bullet-dot"></span>
                      </span>
                      <span class="menu-title">Search</span>
                      <span class="menu-arrow"></span>
                    </span>
                    <div class="menu-sub menu-sub-accordion menu-active-bg">
                      <div class="menu-item">
                        <a
                          class="menu-link"
                          href="../../demo1/dist/pages/search/horizontal.html"
                        >
                          <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                          </span>
                          <span class="menu-title">Horizontal</span>
                        </a>
                      </div>
                      <div class="menu-item">
                        <a
                          class="menu-link"
                          href="../../demo1/dist/pages/search/vertical.html"
                        >
                          <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                          </span>
                          <span class="menu-title">Vertical</span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div
                    data-kt-menu-trigger="click"
                    class="menu-item menu-accordion"
                  >
                    <span class="menu-link">
                      <span class="menu-bullet">
                        <span class="bullet bullet-dot"></span>
                      </span>
                      <span class="menu-title">Blog</span>
                      <span class="menu-arrow"></span>
                    </span>
                    <div class="menu-sub menu-sub-accordion menu-active-bg">
                      <div class="menu-item">
                        <a
                          class="menu-link"
                          href="../../demo1/dist/pages/blog/home.html"
                        >
                          <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                          </span>
                          <span class="menu-title">Blog Home</span>
                        </a>
                      </div>
                      <div class="menu-item">
                        <a
                          class="menu-link"
                          href="../../demo1/dist/pages/blog/post.html"
                        >
                          <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                          </span>
                          <span class="menu-title">Blog Post</span>
                        </a>
                      </div>
                    </div>
                  </div>
                   {/*<div
                    data-kt-menu-trigger="click"
                    class="menu-item menu-accordion"
                  >
                    <span class="menu-link">
                      <span class="menu-bullet">
                        <span class="bullet bullet-dot"></span>
                      </span>
                      <span class="menu-title">Company</span>
                      <span class="menu-arrow"></span>
                    </span>
                    <div class="menu-sub menu-sub-accordion menu-active-bg">
                      <div class="menu-item">
                        <a
                          class="menu-link"
                          href="../../demo1/dist/pages/company/about.html"
                        >
                          <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                          </span>
                          <span class="menu-title">About Us</span>
                        </a>
                      </div>
                      <div class="menu-item">
                        <a
                          class="menu-link"
                          href="../../demo1/dist/pages/company/pricing.html"
                        >
                          <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                          </span>
                          <span class="menu-title">Pricing</span>
                        </a>
                      </div>
                      <div class="menu-item">
                        <a
                          class="menu-link"
                          href="../../demo1/dist/pages/company/contact.html"
                        >
                          <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                          </span>
                          <span class="menu-title">Contact Us</span>
                        </a>
                      </div>
                      <div class="menu-item">
                        <a
                          class="menu-link"
                          href="../../demo1/dist/pages/company/team.html"
                        >
                          <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                          </span>
                          <span class="menu-title">Our Team</span>
                        </a>
                      </div>
                      <div class="menu-item">
                        <a
                          class="menu-link"
                          href="../../demo1/dist/pages/company/licenses.html"
                        >
                          <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                          </span>
                          <span class="menu-title">Licenses</span>
                        </a>
                      </div>
                      <div class="menu-item">
                        <a
                          class="menu-link"
                          href="../../demo1/dist/pages/company/sitemap.html"
                        >
                          <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                          </span>
                          <span class="menu-title">Sitemap</span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div
                    data-kt-menu-trigger="click"
                    class="menu-item menu-accordion"
                  >
                    <span class="menu-link">
                      <span class="menu-bullet">
                        <span class="bullet bullet-dot"></span>
                      </span>
                      <span class="menu-title">Careers</span>
                      <span class="menu-arrow"></span>
                    </span>
                    <div class="menu-sub menu-sub-accordion menu-active-bg">
                      <div class="menu-item">
                        <a
                          class="menu-link"
                          href="../../demo1/dist/pages/careers/list.html"
                        >
                          <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                          </span>
                          <span class="menu-title">Careers List</span>
                        </a>
                      </div>
                      <div class="menu-item">
                        <a
                          class="menu-link"
                          href="../../demo1/dist/pages/careers/apply.html"
                        >
                          <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                          </span>
                          <span class="menu-title">Careers Apply</span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div
                    data-kt-menu-trigger="click"
                    class="menu-item menu-accordion"
                  >
                    <span class="menu-link">
                      <span class="menu-bullet">
                        <span class="bullet bullet-dot"></span>
                      </span>
                      <span class="menu-title">FAQ</span>
                      <span class="menu-arrow"></span>
                    </span>
                    <div class="menu-sub menu-sub-accordion menu-active-bg">
                      <div class="menu-item">
                        <a
                          class="menu-link"
                          href="../../demo1/dist/pages/faq/classic.html"
                        >
                          <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                          </span>
                          <span class="menu-title">Classic</span>
                        </a>
                      </div>
                      <div class="menu-item">
                        <a
                          class="menu-link"
                          href="../../demo1/dist/pages/faq/extended.html"
                        >
                          <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                          </span>
                          <span class="menu-title">Extended</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
                  <div
                    data-kt-menu-trigger="click"
                    class="menu-item menu-accordion"
                  >
                    <span class="menu-link">
                      <span class="menu-icon">
                        {/* <!--begin::Svg Icon | path: icons/duotune/communication/com013.svg--> */}
                    <span class="svg-icon svg-icon-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M6.28548 15.0861C7.34369 13.1814 9.35142 12 11.5304 12H12.4696C14.6486 12 16.6563 13.1814 17.7145 15.0861L19.3493 18.0287C20.0899 19.3618 19.1259 21 17.601 21H6.39903C4.87406 21 3.91012 19.3618 4.65071 18.0287L6.28548 15.0861Z"
                          fill="white"
                        ></path>
                        <rect
                          opacity="0.3"
                          x="8"
                          y="3"
                          width="8"
                          height="8"
                          rx="4"
                          fill="white"
                        ></rect>
                      </svg>
                    </span>
                {/* <!--end::Svg Icon--> */}
                      </span>
                      <span class="menu-title">Account</span>
                      <span class="menu-arrow"></span>
                    </span>
                    <div class="menu-sub menu-sub-accordion menu-active-bg">
                      <div class="menu-item">
                        <a
                          class="menu-link"
                          href="../../demo1/dist/account/overview.html"
                        >
                          <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                          </span>
                          <span class="menu-title">Overview</span>
                        </a>
                      </div>
                      <div class="menu-item">
                        <a
                          class="menu-link"
                          href="../../demo1/dist/account/settings.html"
                        >
                          <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                          </span>
                          <span class="menu-title">Settings</span>
                        </a>
                      </div>
                      <div class="menu-item">
                        <a
                          class="menu-link"
                          href="../../demo1/dist/account/security.html"
                        >
                          <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                          </span>
                          <span class="menu-title">Security</span>
                        </a>
                      </div>
                      <div class="menu-item">
                        <a
                          class="menu-link"
                          href="../../demo1/dist/account/billing.html"
                        >
                          <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                          </span>
                          <span class="menu-title">Billing</span>
                        </a>
                      </div>
                      <div class="menu-item">
                        <a
                          class="menu-link"
                          href="../../demo1/dist/account/statements.html"
                        >
                          <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                          </span>
                          <span class="menu-title">Statements</span>
                        </a>
                      </div>
                      <div class="menu-item">
                        <a
                          class="menu-link"
                          href="../../demo1/dist/account/referrals.html"
                        >
                          <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                          </span>
                          <span class="menu-title">Referrals</span>
                        </a>
                      </div>
                      <div class="menu-item">
                        <a
                          class="menu-link"
                          href="../../demo1/dist/account/api-keys.html"
                        >
                          <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                          </span>
                          <span class="menu-title">API Keys</span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="menu-item">
                    <div class="menu-content pt-8 pb-2">
                      {asideOpen && (
                        <span class="menu-section text-muted text-uppercase fs-8 ls-1">
                          Apps
                        </span>
                      )}
                    </div>
                  </div>
                  <div
                    data-kt-menu-trigger="click"
                    class="menu-item menu-accordion"
                  >
                    <span class="menu-link">
                      <span class="menu-icon">
                        {/*<!--begin::Svg Icon | path: icons/duotune/finance/fin006.svg--> */}
                        <span class="svg-icon svg-icon-2">
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
                              fill="white"
                            ></path>
                            <path
                              d="M14 6V5H10V6H8V5C8 3.9 8.9 3 10 3H14C15.1 3 16 3.9 16 5V6H14ZM20 15H14V16C14 16.6 13.5 17 13 17H11C10.5 17 10 16.6 10 16V15H4C3.6 15 3.3 14.9 3 14.7V18C3 19.1 3.9 20 5 20H19C20.1 20 21 19.1 21 18V14.7C20.7 14.9 20.4 15 20 15Z"
                              fill="white"
                            ></path>
                          </svg>
                        </span>
                        {/*<!--end::Svg Icon--> */}
                      </span>
                      <span class="menu-title">Customers</span>
                      <span class="menu-arrow"></span>
                    </span>
                    <div class="menu-sub menu-sub-accordion">
                      <div class="menu-item">
                        <a
                          class="menu-link"
                          href="../../demo1/dist/apps/customers/getting-started.html"
                        >
                          <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                          </span>
                          <span class="menu-title">Getting Started</span>
                        </a>
                      </div>
                      <div class="menu-item">
                        <a
                          class="menu-link"
                          href="../../demo1/dist/apps/customers/list.html"
                        >
                          <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                          </span>
                          <span class="menu-title">Customer Listing</span>
                        </a>
                      </div>
                      <div class="menu-item">
                        <a
                          class="menu-link"
                          href="../../demo1/dist/apps/customers/view.html"
                        >
                          <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                          </span>
                          <span class="menu-title">Customer Details</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* User Management */}

                  <div
                    data-kt-menu-trigger="click"
                    class="menu-item menu-accordion mb-1"
                  >
                    <span class="menu-link">
                      <span class="menu-icon">
                        <span class="svg-icon svg-icon-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              opacity="0.3"
                              d="M20.5543 4.37824L12.1798 2.02473C12.0626 1.99176 11.9376 1.99176 11.8203 2.02473L3.44572 4.37824C3.18118 4.45258 3 4.6807 3 4.93945V13.569C3 14.6914 3.48509 15.8404 4.4417 16.984C5.17231 17.8575 6.18314 18.7345 7.446 19.5909C9.56752 21.0295 11.6566 21.912 11.7445 21.9488C11.8258 21.9829 11.9129 22 12.0001 22C12.0872 22 12.1744 21.983 12.2557 21.9488C12.3435 21.912 14.4326 21.0295 16.5541 19.5909C17.8169 18.7345 18.8277 17.8575 19.5584 16.984C20.515 15.8404 21 14.6914 21 13.569V4.93945C21 4.6807 20.8189 4.45258 20.5543 4.37824Z"
                              fill="white"
                            />
                            <path
                              d="M14.854 11.321C14.7568 11.2282 14.6388 11.1818 14.4998 11.1818H14.3333V10.2272C14.3333 9.61741 14.1041 9.09378 13.6458 8.65628C13.1875 8.21876 12.639 8 12 8C11.361 8 10.8124 8.21876 10.3541 8.65626C9.89574 9.09378 9.66663 9.61739 9.66663 10.2272V11.1818H9.49999C9.36115 11.1818 9.24306 11.2282 9.14583 11.321C9.0486 11.4138 9 11.5265 9 11.6591V14.5227C9 14.6553 9.04862 14.768 9.14583 14.8609C9.24306 14.9536 9.36115 15 9.49999 15H14.5C14.6389 15 14.7569 14.9536 14.8542 14.8609C14.9513 14.768 15 14.6553 15 14.5227V11.6591C15.0001 11.5265 14.9513 11.4138 14.854 11.321ZM13.3333 11.1818H10.6666V10.2272C10.6666 9.87594 10.7969 9.57597 11.0573 9.32743C11.3177 9.07886 11.6319 8.9546 12 8.9546C12.3681 8.9546 12.6823 9.07884 12.9427 9.32743C13.2031 9.57595 13.3333 9.87594 13.3333 10.2272V11.1818Z"
                              fill="white"
                            />
                          </svg>
                        </span>
                      </span>
                      <span class="menu-title">User Management</span>
                      <span class="menu-arrow"></span>
                    </span>

                    <div class="menu-sub menu-sub-accordion">
                      <div
                        data-kt-menu-trigger="click"
                        class="menu-item menu-accordion mb-1"
                      >
                        <span class="menu-link">
                          <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                          </span>
                          <span class="menu-title">Users</span>
                          <span class="menu-arrow"></span>
                        </span>
                        <div class="menu-sub menu-sub-accordion">
                          <div class="menu-item">
                            {/* List.js */}
                            <a
                              class="menu-link"
                              // href=""
                              onClick={handleUserListClick}
                            >
                              <span class="menu-bullet">
                                <span class="bullet bullet-dot"></span>
                              </span>
                              <span class="menu-title">Users List</span>
                            </a>
                          </div>
                          <div class="menu-item">
                            <a
                              class="menu-link"
                              href="../../demo1/dist/apps/user-management/users/view.html"
                            >
                              <span class="menu-bullet">
                                <span class="bullet bullet-dot"></span>
                              </span>
                              <span class="menu-title">View User</span>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div
                        data-kt-menu-trigger="click"
                        class="menu-item menu-accordion"
                      >
                        <span class="menu-link">
                          <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                          </span>
                          <span class="menu-title">Roles</span>
                          <span class="menu-arrow"></span>
                        </span>
                        <div class="menu-sub menu-sub-accordion">
                          <div class="menu-item">
                            <a
                              class="menu-link"
                              href="../../demo1/dist/apps/user-management/roles/list.html"
                            >
                              <span class="menu-bullet">
                                <span class="bullet bullet-dot"></span>
                              </span>
                              <span class="menu-title">Roles List</span>
                            </a>
                          </div>
                          <div class="menu-item">
                            <a
                              class="menu-link"
                              href="../../demo1/dist/apps/user-management/roles/view.html"
                            >
                              <span class="menu-bullet">
                                <span class="bullet bullet-dot"></span>
                              </span>
                              <span class="menu-title">View Role</span>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div class="menu-item">
                        <a
                          class="menu-link"
                          href="../../demo1/dist/apps/user-management/permissions.html"
                        >
                          <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                          </span>
                          <span class="menu-title">Permissions</span>
                        </a>
                      </div>
                    </div>
                  </div>
                  {/* User Management */}
{/* chat */}
                  <div
                    data-kt-menu-trigger="click"
                    class="menu-item menu-accordion"
                  >
                    <span class="menu-link">
                      <span class="menu-icon">
                        {/*<!--begin::Svg Icon | path: icons/duotune/communication/com012.svg--> */}
                        <span class="svg-icon svg-icon-2">
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
                              fill="white"
                            ></path>
                            <rect
                              x="6"
                              y="12"
                              width="7"
                              height="2"
                              rx="1"
                              fill="white"
                            ></rect>
                            <rect
                              x="6"
                              y="7"
                              width="12"
                              height="2"
                              rx="1"
                              fill="white"
                            ></rect>
                          </svg>
                        </span>
                        {/*<!--end::Svg Icon--> */}
                      </span>
                      <span class="menu-title">Chat</span>
                      <span class="menu-arrow"></span>
                    </span>
                    <div class="menu-sub menu-sub-accordion">
                      <div class="menu-item">
                        <a
                          class="menu-link"
                          href="../../demo1/dist/apps/chat/private.html"
                        >
                          <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                          </span>
                          <span class="menu-title">Private Chat</span>
                        </a>
                      </div>
                      <div class="menu-item">
                        <a
                          class="menu-link"
                          href="../../demo1/dist/apps/chat/group.html"
                        >
                          <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                          </span>
                          <span class="menu-title">Group Chat</span>
                        </a>
                      </div>
                      <div class="menu-item">
                        <a
                          class="menu-link"
                          href="../../demo1/dist/apps/chat/drawer.html"
                        >
                          <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                          </span>
                          <span class="menu-title">Drawer Chat</span>
                        </a>
                      </div>
                    </div>
                  </div>
                  {/* chat */}
                  <div class="menu-item">
                    <div class="menu-content pt-8 pb-0">
                      {asideOpen && (
                        <span class="menu-section text-muted text-uppercase fs-8 ls-1">
                          Layout
                        </span>
                      )}
                    </div>
                  </div>
{/* chat */}
{/* Aside */}
                  <div
                    data-kt-menu-trigger="click"
                    class="menu-item menu-accordion"
                  >
                    <span class="menu-link">
                      <span class="menu-icon">
                        {/*<!--begin::Svg Icon | path: icons/duotune/general/gen009.svg--> */}
                        <span class="svg-icon svg-icon-2">
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
                              fill="white"
                            ></path>
                            <path
                              d="M10 22H3C2.4 22 2 21.6 2 21V3C2 2.4 2.4 2 3 2H10C10.6 2 11 2.4 11 3V21C11 21.6 10.6 22 10 22Z"
                              fill="white"
                            ></path>
                          </svg>
                        </span>
                        {/*<!--end::Svg Icon--> */}
                      </span>
                      <span class="menu-title">Aside</span>
                      <span class="menu-arrow"></span>
                    </span>
                    <div class="menu-sub menu-sub-accordion menu-active-bg">
                      <div class="menu-item">
                        <a
                          class="menu-link"
                          href="../../demo1/dist/layouts/aside/light.html"
                        >
                          <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                          </span>
                          <span class="menu-title">Light Skin</span>
                        </a>
                      </div>
                      <div class="menu-item">
                        <a
                          class="menu-link"
                          href="../../demo1/dist/layouts/aside/font-icons.html"
                        >
                          <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                          </span>
                          <span class="menu-title">Font Icons</span>
                        </a>
                      </div>
                      <div class="menu-item">
                        <a
                          class="menu-link"
                          href="../../demo1/dist/layouts/aside/minimized.html"
                        >
                          <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                          </span>
                          <span class="menu-title">Minimized</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* <div class="menu-item">
                    <div class="menu-content">
                      <div class="separator mx-1 my-4"></div>
                    </div>
                  </div> */}
                  
                </div>
                {/*<!--end::Menu--> */}
              </div>
              {/*<!--end::Aside Menu--> */}
            </div>
            {/*<!--end::Aside menu--> */}
            {/*<!--begin::Footer--> */}
           
            {/*<!--end::Footer--> */}
          </div>
{/* footer */}
<div class="menu-item ">
                    <div class="menu-content">
                      <div class="separator "></div>
                    </div>
                  </div>
<div class="menu-item">
                    <a
                      class="menu-link"
                      href="../../demo1/dist/documentation/getting-started/changelog.html"
                    >
                      <span class="menu-icon">
                        {/*<!--begin::Svg Icon | path: icons/duotune/coding/cod003.svg--> */}
                        <span class="svg-icon svg-icon-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M16.95 18.9688C16.75 18.9688 16.55 18.8688 16.35 18.7688C15.85 18.4688 15.75 17.8688 16.05 17.3688L19.65 11.9688L16.05 6.56876C15.75 6.06876 15.85 5.46873 16.35 5.16873C16.85 4.86873 17.45 4.96878 17.75 5.46878L21.75 11.4688C21.95 11.7688 21.95 12.2688 21.75 12.5688L17.75 18.5688C17.55 18.7688 17.25 18.9688 16.95 18.9688ZM7.55001 18.7688C8.05001 18.4688 8.15 17.8688 7.85 17.3688L4.25001 11.9688L7.85 6.56876C8.15 6.06876 8.05001 5.46873 7.55001 5.16873C7.05001 4.86873 6.45 4.96878 6.15 5.46878L2.15 11.4688C1.95 11.7688 1.95 12.2688 2.15 12.5688L6.15 18.5688C6.35 18.8688 6.65 18.9688 6.95 18.9688C7.15 18.9688 7.35001 18.8688 7.55001 18.7688Z"
                              fill="white"
                            ></path>
                            <path
                              opacity="0.3"
                              d="M10.45 18.9687C10.35 18.9687 10.25 18.9687 10.25 18.9687C9.75 18.8687 9.35 18.2688 9.55 17.7688L12.55 5.76878C12.65 5.26878 13.25 4.8687 13.75 5.0687C14.25 5.1687 14.65 5.76878 14.45 6.26878L11.45 18.2688C11.35 18.6688 10.85 18.9687 10.45 18.9687Z"
                              fill="white"
                            ></path>
                          </svg>
                        </span>
                        {/*<!--end::Svg Icon--> */}
                      </span>
                      <span class="menu-title">Changelog v8.0.25</span>
                    </a>
                  </div>
          <div
              class="aside-footer flex-column-auto p-4  "
              id="kt_aside_footer"
            >
              <a
                href="../../demo1/dist/documentation/getting-started.html"
                class="btn btn-custom btn-primary w-75 "
                data-bs-toggle="tooltip"
                data-bs-trigger="hover"
                data-bs-dismiss-="click"
                title=""
                data-bs-original-title="200+ in-house components and 3rd-party plugins"
              >
                {asideOpen && (
                  <span class="btn-label">Docs &amp; Components</span>
                )}
                {/*<!--begin::Svg Icon | path: icons/duotune/general/gen005.svg--> */}
                <span class="svg-icon btn-icon svg-icon-2 ">
                  {!asideOpen && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      // width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        opacity="0.3"
                        d="M19 22H5C4.4 22 4 21.6 4 21V3C4 2.4 4.4 2 5 2H14L20 8V21C20 21.6 19.6 22 19 22ZM15 17C15 16.4 14.6 16 14 16H8C7.4 16 7 16.4 7 17C7 17.6 7.4 18 8 18H14C14.6 18 15 17.6 15 17ZM17 12C17 11.4 16.6 11 16 11H8C7.4 11 7 11.4 7 12C7 12.6 7.4 13 8 13H16C16.6 13 17 12.6 17 12ZM17 7C17 6.4 16.6 6 16 6H8C7.4 6 7 6.4 7 7C7 7.6 7.4 8 8 8H16C16.6 8 17 7.6 17 7Z"
                        fill="white"
                      ></path>
                      <path
                        d="M15 8H20L14 2V7C14 7.6 14.4 8 15 8Z"
                        fill="white"
                      ></path>
                    </svg>
                  )}
                </span>
                {/*<!--end::Svg Icon--> */}
              </a>
            </div>
            {/* footer end */}
          {/* <button
        variant="light"
        style={{
          fontSize: "30px",
          cursor: "pointer",
          marginLeft: "100px",
          display: "block",
          cursor: "pointer",
          fontSize: "20px",
          marginRight: "10px",
        }}
        onClick={openNav}
      >
        &#9776;
      </button> */}
        </div>
      </div>

    </div>
  );
};

export default SnowflakeAside;
