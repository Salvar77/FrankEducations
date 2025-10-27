"use client";
import React, { useState, useEffect } from "react";
import { RegisterFormData } from "@/lib/types/auth";
import {
  countries,
  referralSources,
  studyDestinations,
} from "@/lib/data/formData";
import classes from "./RegisterForm.module.scss";

const RegisterForm = () => {
  const [step, setStep] = useState<"form" | "verification">("form");
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    countryOfCitizenship: "",
    email: "",
    referralResource: "",
    countryOfInterest: "",
    gdprConsent: false,
  });
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<RegisterFormData>>({});
  const [apiError, setApiError] = useState("");

  const validateForm = (): boolean => {
    const newErrors: Partial<RegisterFormData> = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    } else {
      const birthDate = new Date(formData.dateOfBirth);
      const today = new Date();
      const minDate = new Date();
      minDate.setFullYear(today.getFullYear() - 100);

      if (birthDate > today)
        newErrors.dateOfBirth = "Date cannot be in the future";
      if (birthDate < minDate)
        newErrors.dateOfBirth = "Please enter a valid date";
    }

    if (!formData.countryOfCitizenship)
      newErrors.countryOfCitizenship = "Country of citizenship is required";

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.referralResource)
      newErrors.referralResource = "Referral source is required";
    if (!formData.countryOfInterest)
      newErrors.countryOfInterest = "Country of interest is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    field: keyof RegisterFormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleVerificationInputChange = (index: number, value: string) => {
    // Allow only numbers and limit to 1 character
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`verification-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleVerificationKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`verification-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // ✅ RZECZYWISTE WYSŁANIE KODU WERYFIKACYJNEGO
      const response = await fetch("/api/auth/send-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          firstName: formData.firstName,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send verification code");
      }

      // Przejdź do kroku weryfikacji
      setStep("verification");
    } catch (error) {
      console.error("Registration error:", error);
      setApiError(
        error instanceof Error
          ? error.message
          : "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");

    const code = verificationCode.join("");
    if (code.length !== 6) {
      setApiError("Please enter the complete 6-digit verification code");
      return;
    }

    setIsLoading(true);

    try {
      // ✅ RZECZYWISTA WERYFIKACJA KODU
      const response = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          code: code,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Verification failed");
      }

      // ✅ KONTO ZWERYFIKOWANE - PRZEKIERUJ DO LOGIN
      alert("Account created successfully! Redirecting to login...");
      window.location.href = "/login?message=account_created";
    } catch (error) {
      console.error("Verification error:", error);
      setApiError(
        error instanceof Error
          ? error.message
          : "Invalid verification code. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const resendVerificationCode = async () => {
    setIsLoading(true);
    setApiError("");

    try {
      const response = await fetch("/api/auth/send-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          firstName: formData.firstName,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to resend code");
      }

      alert("Verification code sent again!");
      setVerificationCode(["", "", "", "", "", ""]);

      // Focus first input
      const firstInput = document.getElementById("verification-0");
      if (firstInput) firstInput.focus();
    } catch (error) {
      setApiError(
        error instanceof Error
          ? error.message
          : "Failed to resend code. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Test API connection
    const testAPI = async () => {
      try {
        const response = await fetch("/api/auth/send-verification", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: "test@test.com", firstName: "Test" }),
        });
        const data = await response.json();
        console.log("✅ API TEST SUCCESS:", data);
      } catch (error) {
        console.error("❌ API TEST FAILED:", error);
      }
    };

    testAPI();
  }, []);

  // Render Verification Step
  if (step === "verification") {
    return (
      <div className={classes.container}>
        <div className={classes.formWrapper}>
          <div className={classes.header}>
            <h1 className={classes.title}>Verify Your Email</h1>
            <p className={classes.subtitle}>
              We sent a 6-digit verification code to
              <br />
              <strong>{formData.email}</strong>
            </p>
          </div>

          <form
            onSubmit={handleVerification}
            className={classes.verificationForm}
          >
            {/* ✅ BŁĘDY API W WERYFIKACJI */}
            {apiError && <div className={classes.apiError}>{apiError}</div>}

            <div className={classes.verificationInputs}>
              {verificationCode.map((digit, index) => (
                <input
                  key={index}
                  id={`verification-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) =>
                    handleVerificationInputChange(index, e.target.value)
                  }
                  onKeyDown={(e) => handleVerificationKeyDown(index, e)}
                  className={classes.verificationInput}
                  disabled={isLoading}
                />
              ))}
            </div>

            <button
              type="submit"
              className={classes.submitButton}
              disabled={isLoading || verificationCode.join("").length !== 6}
            >
              {isLoading ? "Verifying..." : "Verify Account"}
            </button>

            <div className={classes.resendSection}>
              <p>Didn't receive the code?</p>
              <button
                type="button"
                onClick={resendVerificationCode}
                className={classes.resendButton}
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Resend Code"}
              </button>
            </div>

            <button
              type="button"
              onClick={() => setStep("form")}
              className={classes.backButton}
              disabled={isLoading}
            >
              ← Back to Registration
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Render Registration Form Step
  return (
    <div className={classes.container}>
      <div className={classes.formWrapper}>
        <div className={classes.header}>
          <h1 className={classes.title}>Create Your Account</h1>
          <p className={classes.subtitle}>
            Start your study abroad journey with Frank Educations
          </p>
        </div>

        <form onSubmit={handleSubmit} className={classes.form}>
          <div className={classes.formGrid}>
            {/* ✅ BŁĘDY API NA GÓRZE FORMULARZA */}
            {apiError && <div className={classes.apiError}>{apiError}</div>}

            {/* First Name */}
            <div className={classes.inputGroup}>
              <label htmlFor="firstName" className={classes.label}>
                First Name *
              </label>
              <input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className={`${classes.input} ${
                  errors.firstName ? classes.error : ""
                }`}
                placeholder="Enter your first name"
                disabled={isLoading}
              />
              {errors.firstName && (
                <span className={classes.errorText}>{errors.firstName}</span>
              )}
            </div>

            {/* Last Name */}
            <div className={classes.inputGroup}>
              <label htmlFor="lastName" className={classes.label}>
                Last Name *
              </label>
              <input
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className={`${classes.input} ${
                  errors.lastName ? classes.error : ""
                }`}
                placeholder="Enter your last name"
                disabled={isLoading}
              />
              {errors.lastName && (
                <span className={classes.errorText}>{errors.lastName}</span>
              )}
            </div>

            {/* Date of Birth */}
            <div className={classes.inputGroup}>
              <label htmlFor="dateOfBirth" className={classes.label}>
                Date of Birth *
              </label>
              <input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) =>
                  handleInputChange("dateOfBirth", e.target.value)
                }
                className={`${classes.input} ${
                  errors.dateOfBirth ? classes.error : ""
                }`}
                disabled={isLoading}
              />
              {errors.dateOfBirth && (
                <span className={classes.errorText}>{errors.dateOfBirth}</span>
              )}
            </div>

            {/* Country of Citizenship */}
            <div className={classes.inputGroup}>
              <label htmlFor="countryOfCitizenship" className={classes.label}>
                Country of Citizenship *
              </label>
              <select
                id="countryOfCitizenship"
                value={formData.countryOfCitizenship}
                onChange={(e) =>
                  handleInputChange("countryOfCitizenship", e.target.value)
                }
                className={`${classes.select} ${
                  errors.countryOfCitizenship ? classes.error : ""
                }`}
                disabled={isLoading}
              >
                <option value="">Select your country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              {errors.countryOfCitizenship && (
                <span className={classes.errorText}>
                  {errors.countryOfCitizenship}
                </span>
              )}
            </div>

            {/* Email */}
            <div className={classes.inputGroup}>
              <label htmlFor="email" className={classes.label}>
                Email Address *
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`${classes.input} ${
                  errors.email ? classes.error : ""
                }`}
                placeholder="Enter your email address"
                disabled={isLoading}
              />
              {errors.email && (
                <span className={classes.errorText}>{errors.email}</span>
              )}
            </div>

            {/* Referral Resource */}
            <div className={classes.inputGroup}>
              <label htmlFor="referralResource" className={classes.label}>
                How did you hear about us? *
              </label>
              <select
                id="referralResource"
                value={formData.referralResource}
                onChange={(e) =>
                  handleInputChange("referralResource", e.target.value)
                }
                className={`${classes.select} ${
                  errors.referralResource ? classes.error : ""
                }`}
                disabled={isLoading}
              >
                <option value="">Select referral source</option>
                {referralSources.map((source) => (
                  <option key={source} value={source}>
                    {source}
                  </option>
                ))}
              </select>
              {errors.referralResource && (
                <span className={classes.errorText}>
                  {errors.referralResource}
                </span>
              )}
            </div>

            {/* Country of Interest */}
            <div className={classes.inputGroup}>
              <label htmlFor="countryOfInterest" className={classes.label}>
                Preferred Study Destination *
              </label>
              <select
                id="countryOfInterest"
                value={formData.countryOfInterest}
                onChange={(e) =>
                  handleInputChange("countryOfInterest", e.target.value)
                }
                className={`${classes.select} ${
                  errors.countryOfInterest ? classes.error : ""
                }`}
                disabled={isLoading}
              >
                <option value="">Select country of interest</option>
                {studyDestinations.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              {errors.countryOfInterest && (
                <span className={classes.errorText}>
                  {errors.countryOfInterest}
                </span>
              )}
            </div>
          </div>

          {/* GDPR Consent */}
          <div className={classes.consentSection}>
            <label className={classes.checkboxLabel}>
              <input
                type="checkbox"
                checked={formData.gdprConsent}
                onChange={(e) =>
                  handleInputChange("gdprConsent", e.target.checked)
                }
                className={classes.checkbox}
                disabled={isLoading}
              />
              <span className={classes.checkboxText}>
                I agree to the{" "}
                <a
                  href="/privacy-policy"
                  target="_blank"
                  className={classes.link}
                >
                  Privacy Policy
                </a>{" "}
                and consent to the processing of my personal data in accordance
                with GDPR *
              </span>
            </label>
            {errors.gdprConsent && (
              <span className={classes.errorText}>{errors.gdprConsent}</span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={classes.submitButton}
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>

          {/* Login Link */}
          <div className={classes.loginSection}>
            <p>
              Already have an account?{" "}
              <a href="/login" className={classes.link}>
                Sign in here
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
