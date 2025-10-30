"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ContactFormData } from "@/lib/types/contact";
import classes from "./ContactForm.module.scss";

const ContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    countryOfResidence: "",
    interestedDestination: "",
    preferredMethod: "",
    urgentSubmission: false,
    agreeToTerms: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const countries = [
    "Saudi Arabia",
    "United Arab Emirates",
    "Qatar",
    "Kuwait",
    "Oman",
    "Bahrain",
    "India",
    "Pakistan",
    "Bangladesh",
    "Nigeria",
    "Ghana",
    "Egypt",
    "Turkey",
    "China",
    "Vietnam",
    "Indonesia",
    "Malaysia",
    "Brazil",
    "Mexico",
    "United States",
    "Canada",
    "United Kingdom",
    "Germany",
    "France",
    "Italy",
    "Spain",
  ];

  const studyDestinations = [
    "Poland",
    "United Kingdom",
    "United States",
    "Canada",
    "Ireland",
    "Germany",
    "Switzerland",
    "Finland",
    "Australia",
    "Spain",
  ];

  const contactMethods = [
    "In-Person",
    "Video Call",
    "Phone Call",
    "Email",
    "WhatsApp",
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.countryOfResidence)
      newErrors.countryOfResidence = "Country of residence is required";
    if (!formData.interestedDestination)
      newErrors.interestedDestination = "Study destination is required";
    if (!formData.preferredMethod)
      newErrors.preferredMethod = "Preferred method is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    field: keyof ContactFormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      console.log("Form data:", formData);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      alert("Thank you! Our expert counselors will contact you soon.");
      setFormData({
        firstName: "",
        lastName: "",
        mobileNumber: "",
        email: "",
        countryOfResidence: "",
        interestedDestination: "",
        preferredMethod: "",
        urgentSubmission: false,
        agreeToTerms: false,
      });
    } catch (error) {
      console.error("Submission error:", error);
      alert("Submission failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isMobile) {
    return (
      <section className={classes.contactSection}>
        <div className={classes.container}>
          <div className={classes.header}>
            <h2 className={classes.title}>
              <span className={classes.span}>Frank Education</span> Can Help You
            </h2>
            <p className={classes.subtitle}>
              Enter your details and one of our expert counselors will contact
              you with the global course, country, university, including
              scholarship opportunities!
            </p>
          </div>

          <form onSubmit={handleSubmit} className={classes.form}>
            {/* Personal Information Row */}
            <div className={classes.formRow}>
              <div className={classes.inputGroup}>
                <label className={classes.label}>
                  <strong>First name</strong> *
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
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

              <div className={classes.inputGroup}>
                <label className={classes.label}>
                  <strong>Last name</strong> *
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
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
            </div>

            {/* Contact Information Row */}
            <div className={classes.divider}></div>

            <div className={classes.formRow}>
              <div className={classes.inputGroup}>
                <label className={classes.label}>
                  <strong>Mobile number</strong>
                </label>
                <input
                  type="tel"
                  value={formData.mobileNumber}
                  onChange={(e) =>
                    handleInputChange("mobileNumber", e.target.value)
                  }
                  className={classes.input}
                  placeholder="e.g., 352.545.678"
                  disabled={isLoading}
                />
              </div>

              <div className={classes.inputGroup}>
                <label className={classes.label}>
                  <strong>Email address</strong> *
                </label>
                <input
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
            </div>

            {/* Location Preferences Row */}
            <div className={classes.divider}></div>

            <div className={classes.formRow}>
              <div className={classes.inputGroup}>
                <label className={classes.label}>
                  <strong>Country of residence</strong> *
                </label>
                <select
                  value={formData.countryOfResidence}
                  onChange={(e) =>
                    handleInputChange("countryOfResidence", e.target.value)
                  }
                  className={`${classes.select} ${
                    errors.countryOfResidence ? classes.error : ""
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
                {errors.countryOfResidence && (
                  <span className={classes.errorText}>
                    {errors.countryOfResidence}
                  </span>
                )}
              </div>

              <div className={classes.inputGroup}>
                <label className={classes.label}>
                  <strong>Interested study destination</strong> *
                </label>
                <select
                  value={formData.interestedDestination}
                  onChange={(e) =>
                    handleInputChange("interestedDestination", e.target.value)
                  }
                  className={`${classes.select} ${
                    errors.interestedDestination ? classes.error : ""
                  }`}
                  disabled={isLoading}
                >
                  <option value="">Select destination</option>
                  {studyDestinations.map((destination) => (
                    <option key={destination} value={destination}>
                      {destination}
                    </option>
                  ))}
                </select>
                {errors.interestedDestination && (
                  <span className={classes.errorText}>
                    {errors.interestedDestination}
                  </span>
                )}
              </div>
            </div>

            {/* Preferences Row */}
            <div className={classes.divider}></div>

            <div className={classes.formRow}>
              <div className={classes.inputGroup}>
                <label className={classes.label}>
                  <strong>Preferred method of counseling</strong> *
                </label>
                <select
                  value={formData.preferredMethod}
                  onChange={(e) =>
                    handleInputChange("preferredMethod", e.target.value)
                  }
                  className={`${classes.select} ${
                    errors.preferredMethod ? classes.error : ""
                  }`}
                  disabled={isLoading}
                >
                  <option value="">Select method</option>
                  {contactMethods.map((method) => (
                    <option key={method} value={method}>
                      {method}
                    </option>
                  ))}
                </select>
                {errors.preferredMethod && (
                  <span className={classes.errorText}>
                    {errors.preferredMethod}
                  </span>
                )}
              </div>

              <div className={classes.checkboxGroup}>
                <label className={classes.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={formData.urgentSubmission}
                    onChange={(e) =>
                      handleInputChange("urgentSubmission", e.target.checked)
                    }
                    className={classes.checkbox}
                    disabled={isLoading}
                  />
                  <span className={classes.checkboxText}>
                    <strong>Urgent Submission</strong>
                  </span>
                </label>
              </div>
            </div>

            {/* Terms and Submit */}
            <div className={classes.divider}></div>

            <div className={classes.termsSection}>
              <label className={classes.termsLabel}>
                <input
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={(e) =>
                    handleInputChange("agreeToTerms", e.target.checked)
                  }
                  className={classes.checkbox}
                  disabled={isLoading}
                />
                <span className={classes.termsText}>
                  I agree to Frank Education{" "}
                  <a href="/terms" className={classes.link}>
                    terms
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className={classes.link}>
                    privacy policy
                  </a>{" "}
                </span>
              </label>
              {errors.agreeToTerms && (
                <span className={classes.errorText}>{errors.agreeToTerms}</span>
              )}
            </div>

            <button
              type="submit"
              className={classes.submitButton}
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Get Free Consultation"}
            </button>
          </form>
        </div>
      </section>
    );
  }

  // Desktop version with animations
  return (
    <motion.section
      className={classes.contactSection}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8 }}
    >
      <div className={classes.container}>
        <motion.div
          className={classes.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className={classes.title}>
            <span className={classes.span}>Frank Education</span> Can Help You
          </h2>
          <p className={classes.subtitle}>
            Enter your details and one of our expert counselors will contact you
            with the global course, country, university, including scholarship
            opportunities!
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className={classes.form}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Personal Information Row */}
          <motion.div
            className={classes.formRow}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className={classes.inputGroup}>
              <label className={classes.label}>
                <strong>First name</strong> *
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
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
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={classes.errorText}
                >
                  {errors.firstName}
                </motion.span>
              )}
            </div>

            <div className={classes.inputGroup}>
              <label className={classes.label}>
                <strong>Last name</strong> *
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
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
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={classes.errorText}
                >
                  {errors.lastName}
                </motion.span>
              )}
            </div>
          </motion.div>

          {/* Contact Information Row */}
          <motion.div
            className={classes.divider}
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          />

          <motion.div
            className={classes.formRow}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className={classes.inputGroup}>
              <label className={classes.label}>
                <strong>Mobile number</strong>
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                type="tel"
                value={formData.mobileNumber}
                onChange={(e) =>
                  handleInputChange("mobileNumber", e.target.value)
                }
                className={classes.input}
                placeholder="e.g., 352.545.678"
                disabled={isLoading}
              />
            </div>

            <div className={classes.inputGroup}>
              <label className={classes.label}>
                <strong>Email address</strong> *
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
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
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={classes.errorText}
                >
                  {errors.email}
                </motion.span>
              )}
            </div>
          </motion.div>

          {/* Location Preferences Row */}
          <motion.div
            className={classes.divider}
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 }}
          />

          <motion.div
            className={classes.formRow}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className={classes.inputGroup}>
              <label className={classes.label}>
                <strong>Country of residence</strong> *
              </label>
              <motion.select
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                value={formData.countryOfResidence}
                onChange={(e) =>
                  handleInputChange("countryOfResidence", e.target.value)
                }
                className={`${classes.select} ${
                  errors.countryOfResidence ? classes.error : ""
                }`}
                disabled={isLoading}
              >
                <option value="">Select your country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </motion.select>
              {errors.countryOfResidence && (
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={classes.errorText}
                >
                  {errors.countryOfResidence}
                </motion.span>
              )}
            </div>

            <div className={classes.inputGroup}>
              <label className={classes.label}>
                <strong>Interested study destination</strong> *
              </label>
              <motion.select
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                value={formData.interestedDestination}
                onChange={(e) =>
                  handleInputChange("interestedDestination", e.target.value)
                }
                className={`${classes.select} ${
                  errors.interestedDestination ? classes.error : ""
                }`}
                disabled={isLoading}
              >
                <option value="">Select destination</option>
                {studyDestinations.map((destination) => (
                  <option key={destination} value={destination}>
                    {destination}
                  </option>
                ))}
              </motion.select>
              {errors.interestedDestination && (
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={classes.errorText}
                >
                  {errors.interestedDestination}
                </motion.span>
              )}
            </div>
          </motion.div>

          {/* Preferences Row */}
          <motion.div
            className={classes.divider}
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.9 }}
          />

          <motion.div
            className={classes.formRow}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            <div className={classes.inputGroup}>
              <label className={classes.label}>
                <strong>Preferred method of counseling</strong> *
              </label>
              <motion.select
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                value={formData.preferredMethod}
                onChange={(e) =>
                  handleInputChange("preferredMethod", e.target.value)
                }
                className={`${classes.select} ${
                  errors.preferredMethod ? classes.error : ""
                }`}
                disabled={isLoading}
              >
                <option value="">Select method</option>
                {contactMethods.map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </motion.select>
              {errors.preferredMethod && (
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={classes.errorText}
                >
                  {errors.preferredMethod}
                </motion.span>
              )}
            </div>

            <div className={classes.checkboxGroup}>
              <motion.label
                className={classes.checkboxLabel}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <input
                  type="checkbox"
                  checked={formData.urgentSubmission}
                  onChange={(e) =>
                    handleInputChange("urgentSubmission", e.target.checked)
                  }
                  className={classes.checkbox}
                  disabled={isLoading}
                />
                <span className={classes.checkboxText}>
                  <strong>Urgent Submission</strong>
                </span>
              </motion.label>
            </div>
          </motion.div>

          {/* Terms and Submit */}
          <motion.div
            className={classes.divider}
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1.1 }}
          />

          <motion.div
            className={classes.termsSection}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <motion.label
              className={classes.termsLabel}
              whileHover={{ scale: 1.02 }}
            >
              <input
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={(e) =>
                  handleInputChange("agreeToTerms", e.target.checked)
                }
                className={classes.checkbox}
                disabled={isLoading}
              />
              <span className={classes.termsText}>
                I agree to Frank Education{" "}
                <a href="/terms" className={classes.link}>
                  terms
                </a>{" "}
                and{" "}
                <a href="/privacy" className={classes.link}>
                  privacy policy
                </a>{" "}
              </span>
            </motion.label>
            {errors.agreeToTerms && (
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={classes.errorText}
              >
                {errors.agreeToTerms}
              </motion.span>
            )}
          </motion.div>

          <motion.button
            type="submit"
            className={classes.submitButton}
            disabled={isLoading}
            whileHover={
              isLoading
                ? {}
                : {
                    scale: 1.05,
                    boxShadow: "0 20px 50px rgba(0, 163, 224, 0.4)",
                  }
            }
            whileTap={isLoading ? {} : { scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {isLoading ? "Submitting..." : "Get Free Consultation"}
          </motion.button>
        </motion.form>
      </div>
    </motion.section>
  );
};

export default ContactForm;
