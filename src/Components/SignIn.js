import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const navigate  = useNavigate();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {

    e.preventDefault();
    console.log(email);
    console.log(fullName);
    console.log(userName);
    console.log(password);

    try {
      const response = await fetch("https://insta-backend-hr3a.onrender.com/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          name: fullName,
          userName: userName,
          password: password,
        }),
      });
      const data = await response.json();
      console.log("registered successfully");
      navigate("/signin")
    } catch (e) {}
  }

  return (
    <div className="box">
      <div className="container">
        <img
          src="https://1000logos.net/wp-content/uploads/2017/02/Logo-Instagram.png"
          className="instagram"
          alt=""
        ></img>
        <div className="login-signup">
          <div className="SignUp">
            <div class="form-container2">
              <b>
                <p style={{ color: "grey", textAlign: "center" }}>
                  Sign up to see photos and videos from your friends.
                </p>
              </b>
              <button type="submit">Log in with Facebook</button>
              <div className="or">
                <div className="or-line"></div>
                <div>OR</div>
                <div className="or-line"></div>
              </div>
              <form id="signup-form">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="signup-email"
                  placeholder="Mobile number or Email"
                  required
                ></input>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full Name"
                  required
                ></input>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  id="signup-username"
                  placeholder="Username"
                  required
                ></input>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="signup-password"
                  placeholder="Password"
                  required
                ></input>
                <p style={{ color: "grey", fontSize: "12px" }}>
                  People who use our service may have uploaded your contact
                  information to Instagram.{" "}
                  <a href="https://www.facebook.com/help/instagram/261704639352628">
                    Learn More
                  </a>
                </p>
                <p style={{ color: "grey", fontSize: "12px" }}>
                  By signing up, you agree to our{" "}
                  <a href="https://help.instagram.com/581066165581870/?locale=en_US">
                    Terms
                  </a>{" "}
                  ,{" "}
                  <a href="https://www.facebook.com/privacy/policy">
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a href="https://www.instagram.com/legal/cookies/">
                    Cookies Policy
                  </a>
                  .
                </p>
                <button type="submit" onClick={handleSubmit}>
                  Sign up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="text-have">
          Have an account?{" "}
          <Link to={"/signin"} className="link">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
