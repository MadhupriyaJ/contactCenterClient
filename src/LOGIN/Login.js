
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from '../Asset/playbook/cerulean-logo(1).png'

const BASE_URL = process.env.REACT_APP_API_URL;

const Login = ({ setAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [passwordHash, setPasswordHash] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [bgVideo, setBgVideo] = useState(true);
  const [userName, setUserName] = useState("");

  const signIn = async (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", passwordHash);

    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, passwordHash }),
      });

      const responseData = await response.json()
      console.log("Username", responseData.userName)

      if (response.ok) {
        setAuthenticated(true);
        setUserName(responseData.userName)
        localStorage.setItem("authenticated", "true");
        localStorage.setItem("userRole", "customer");

        // Check if the user is an admin or master based on the email
        const isAdmin = email === "shahul@hotmail.com" || email.endsWith("@admin.com");
        const isitd = email.endsWith(".itd@gmail.com");
        const isbusinesspandp = email.endsWith(".business.pandp@gmail.com");
        const isbusinessfinance = email.endsWith(".business.finance@gmail.com");
        const isbusinessaccount = email.endsWith(".business.accounts@gmail.com");
        const isbusinessaudit = email.endsWith(".business.audit@gmail.com");
        const ishr = email.endsWith(".hr@gmail.com");
        const iscustomer = email.endsWith("@gmail.com");

        if (isAdmin) {
          console.log("Redirecting to admin_page reports...");
          const userRoles = ["isAdmin"];
          localStorage.setItem("authenticated", "true");
          localStorage.setItem("userRole", "admin");
          localStorage.setItem("userName", responseData.userName);
          localStorage.setItem("userRoles", JSON.stringify(userRoles));
          navigate("/admin_page");

        } else if (isitd) {
          console.log("Redirecting to itdstaff page...");
          const userRoles = ["isitd"];
          localStorage.setItem("authenticated", "true");
          localStorage.setItem("userRole", "itdstaff");
          localStorage.setItem("userName", responseData.userName);
          localStorage.setItem("userRoles", JSON.stringify(userRoles));
          navigate("/itdstaff");

        } else if (isbusinesspandp) {
          console.log("Redirecting to businesspandp page...");
          navigate("/pandpprocedure");

        } else if (isbusinessfinance) {
          console.log("Redirecting to businessfinance page...");
          const userRoles = ["isbusinessfinance"];
          localStorage.setItem("authenticated", "true");
          localStorage.setItem("userRole", "businessfinance");
          localStorage.setItem("userName", responseData.userName);
          localStorage.setItem("userRoles", JSON.stringify(userRoles));
          navigate("/finance");

        } else if (isbusinessaccount) {
          console.log("Redirecting to businessaccount page...");
          const userRoles = ["isbusinessaccount"];
          localStorage.setItem("authenticated", "true");
          localStorage.setItem("userRole", "businessaccount");
          localStorage.setItem("userName", responseData.userName);
          localStorage.setItem("userRoles", JSON.stringify(userRoles));
          navigate("/accounts");

        } else if (isbusinessaudit) {
          console.log("Redirecting to businessaudit page...");
          const userRoles = ["isbusinessaudit"];
          localStorage.setItem("authenticated", "true");
          localStorage.setItem("userRole", "audit");
          localStorage.setItem("userName", responseData.userName);
          localStorage.setItem("userRoles", JSON.stringify(userRoles));
          navigate("/audit");

        } else if (ishr) {
          console.log("Redirecting to hr page...");
          const userRoles = ["ishr"];
          localStorage.setItem("authenticated", "true");
          localStorage.setItem("userRole", "hr");
          localStorage.setItem("userName", responseData.userName);
          localStorage.setItem("userRoles", JSON.stringify(userRoles));
          navigate("/HRpage");

        } else if (iscustomer) {
          console.log("Redirecting to customer page...");
          // navigate(`/snowflake`);
          const userRoles = ["iscustomer"];
          localStorage.setItem("authenticated", "true");
          localStorage.setItem("userRole", "customer");
          localStorage.setItem("userName", responseData.userName);
          localStorage.setItem("userRoles", JSON.stringify(userRoles));
          navigate("/transcribe", { state: { userName: responseData.userName } });
        }

        else {
          if (location.pathname === "/reports") {
            console.log("You are not authorized to access this page.");
          } else {
            const { from } = location.state || {
              from: { pathname: "/user_homepage" },
            };
            console.log("Redirecting to:", from);
            navigate(from);
          }
        }
      } else {
        localStorage.removeItem("authenticated");
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const bgThemeSwitch = () => {
    setBgVideo(!bgVideo);
  };

  const navigateToRegister = () => {
    navigate("/register");
  };

  return (
    <div class="d-flex flex-column flex-root bg-black mb-2">

      <div class="d-flex  flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed">
  
        <div class="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20">
        
          <a href="../../demo1/dist/index.html" class="mb-12">
            <img alt="Logo" src={logo} class="h-32  rounded-lg px-28" />
          </a>
      
          <div class="w-lg-500px bg-body rounded  p-10 p-lg-15 mx-auto  shadow-2xl shadow-slate-500 ">
            <form class="form w-100 " novalidate="novalidate" id="kt_sign_in_form" action="#" >
              <div class="text-center mb-10">
                <h1 class="text-dark mb-3 font-semibold text-3xl">Sign In</h1>

                <div class="text-gray-400 fw-bold fs-4">
                  New Here?
                  <a href="/register" class="link-primary pl-2 fw-bolder" >
                    Create an Account
                  </a>
                </div>
              </div>

              <div class="fv-row mb-10">
                <label class="form-label fs-6 fw-bolder text-dark">Email</label>

                <input class="form-control form-control-lg form-control-solid" type="email" name="email" id="email"
                  autocomplete="off" placeholder="johndoe@company.com" value={email} onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div class="fv-row mb-10">
                <div class="d-flex flex-stack mb-2">
                  <label class="form-label fw-bolder text-dark fs-6 mb-0">
                    Password
                  </label>

                  <a
                    href="../../demo1/dist/authentication/flows/basic/password-reset.html"
                    class="link-primary fs-6 fw-bolder"
                  >
                    Forgot Password ?
                  </a>
                </div>

                <input class="form-control form-control-lg form-control-solid" type="password" name="password" id="password"
                  autocomplete="off" placeholder="••••••••" value={passwordHash} onChange={(e) => setPasswordHash(e.target.value)} required />
              </div>

              <div class="text-center">
                <button type="submit" id="kt_sign_in_submit"
                  class="btn btn-lg btn-primary w-100 mb-5"
                  onClick={signIn}
                >
                  <span class="indicator-label">Continue</span>
                  <span class="indicator-progress">
                    Please wait...
                    <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                  </span>
                </button>

                <div class="text-center text-muted text-uppercase fw-bolder mb-5">
                  or
                </div>

                <a href="#" class="btn btn-flex flex-center btn-light btn-lg w-100 mb-5" >
                  <img alt="Logo" src="assets/media/svg/brand-logos/google-icon.svg" class="h-20px me-3" />
                  Continue with Google
                </a>
              </div>
            </form>
          </div>
        </div>

        <div class="d-flex flex-center flex-column-auto p-10 ">
          <div class="d-flex align-items-center fw-bold fs-6">
            <a
              href=""
              class="text-muted text-hover-primary px-2"
            >
              About
            </a>
            <a
              href=""
              class="text-muted text-hover-primary px-2"
            >
              Contact
            </a>
            <a
              href=""
              class="text-muted text-hover-primary px-2"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Login;