// components/auth/LoginForm.tsx
"use client";
import React, { useState } from "react";
import classes from "./LoginForm.module.scss";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Tymczasowa symulacja logowania
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Sprawdź czy to przekierowanie z rejestracji
      const urlParams = new URLSearchParams(window.location.search);
      const message = urlParams.get("message");

      if (message === "account_created") {
        console.log("Welcome new user!", { email });
      }

      // Przekierowanie do Profile Completion (Phase 1)
      window.location.href = "/profile-completion";
    } catch (error) {
      setError("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.formWrapper}>
        <div className={classes.header}>
          <h1 className={classes.title}>Welcome Back</h1>
          <p className={classes.subtitle}>
            Sign in to your Frank Educations account
          </p>
        </div>

        <form onSubmit={handleSubmit} className={classes.form}>
          {error && <div className={classes.errorMessage}>{error}</div>}

          <div className={classes.inputGroup}>
            <label htmlFor="email" className={classes.label}>
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={classes.input}
              placeholder="Enter your email"
              required
              disabled={isLoading}
            />
          </div>

          <div className={classes.inputGroup}>
            <label htmlFor="password" className={classes.label}>
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={classes.input}
              placeholder="Enter your password"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className={classes.submitButton}
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>

          <div className={classes.registerLink}>
            <p>
              Don't have an account?{" "}
              <a href="/register" className={classes.link}>
                Create account here
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
