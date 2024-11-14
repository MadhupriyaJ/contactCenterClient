// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
// import reportWebVitals from "./reportWebVitals";


// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );


// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// For development without Single-SPA (if you want to run the app standalone)
const rootElement = document.getElementById("root");

// Define lifecycle functions for Single-SPA
export const bootstrap = async () => {
  console.log('App2 bootstrapping');
};

export const mount = async () => {
  console.log('App2 mounting');
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

export const unmount = async () => {
  console.log('App2 unmounting');
  const root = ReactDOM.createRoot(rootElement);
  root.unmount();
};

// Standard React DOM rendering for development without Single-SPA
if (!window.singleSpaNavigate) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// Web vitals (performance monitoring)
reportWebVitals();
