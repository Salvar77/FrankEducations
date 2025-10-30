"use client";
import React, { useState } from "react";
import classes from "./ApplicationForm.module.scss";

// Typy dla edukacji
type EducationLevelKey = "highSchool" | "bachelor" | "master" | "phd";
type EducationEntry = {
  institution: string;
  country: string;
  year: string;
  diplomaFile: File | null;
};
type ApplicationFormData = {
  firstLanguage: string;
  passportNumber: string;
  passportExpiry: string;
  passportFile: File | null;
  maritalStatus: string;
  gender: string;
  address: string;
  phoneNumber: string;
  education: Record<EducationLevelKey, EducationEntry>;
  englishTest: string;
  englishScore: string;
  englishCertificate: File | null;
  englishOption: string;
};

const maritalStatuses = ["Single", "Married", "Divorced", "Widowed"];
const genders = ["Male", "Female", "Other"];
const languages = ["English", "Polish", "Spanish", "French", "Arabic", "Other"];
const educationLevels: { key: EducationLevelKey; label: string }[] = [
  { key: "highSchool", label: "High School" },
  { key: "bachelor", label: "Bachelor's" },
  { key: "master", label: "Master's" },
  { key: "phd", label: "PhD" },
];
const countries = [
  "Poland",
  "United Kingdom",
  "United States",
  "Canada",
  "Germany",
  "France",
  "Spain",
  "Italy",
  "Other",
];
const englishTests = ["IELTS", "TOEFL", "Duolingo", "Other"];

const ApplicationForm = () => {
  const [formData, setFormData] = useState<ApplicationFormData>({
    firstLanguage: "",
    passportNumber: "",
    passportExpiry: "",
    passportFile: null,
    maritalStatus: "",
    gender: "",
    address: "",
    phoneNumber: "",
    education: {
      highSchool: { institution: "", country: "", year: "", diplomaFile: null },
      bachelor: { institution: "", country: "", year: "", diplomaFile: null },
      master: { institution: "", country: "", year: "", diplomaFile: null },
      phd: { institution: "", country: "", year: "", diplomaFile: null },
    },
    englishTest: "",
    englishScore: "",
    englishCertificate: null,
    englishOption: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // --- Handlers ---
  const handleInputChange = (field: keyof ApplicationFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as string])
      setErrors((prev) => ({ ...prev, [field as string]: "" }));
  };

  const handleEducationChange = (
    level: EducationLevelKey,
    field: keyof EducationEntry,
    value: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      education: {
        ...prev.education,
        [level]: { ...prev.education[level], [field]: value },
      },
    }));
    if (errors[`${level}_${field}`])
      setErrors((prev) => ({ ...prev, [`${level}_${field}`]: "" }));
  };

  const handleFileChange = (
    field: keyof ApplicationFormData,
    file: File | null
  ) => {
    handleInputChange(field, file);
  };

  const handleEducationFileChange = (
    level: EducationLevelKey,
    file: File | null
  ) => {
    setFormData((prev) => ({
      ...prev,
      education: {
        ...prev.education,
        [level]: { ...prev.education[level], diplomaFile: file },
      },
    }));
    if (errors[`${level}_diplomaFile`])
      setErrors((prev) => ({ ...prev, [`${level}_diplomaFile`]: "" }));
  };

  // --- Validation ---
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.firstLanguage) newErrors.firstLanguage = "Required";
    if (!formData.passportNumber) newErrors.passportNumber = "Required";
    if (!formData.passportExpiry) newErrors.passportExpiry = "Required";
    if (!formData.passportFile) newErrors.passportFile = "Required";
    if (!formData.maritalStatus) newErrors.maritalStatus = "Required";
    if (!formData.gender) newErrors.gender = "Required";
    if (!formData.address) newErrors.address = "Required";
    if (!formData.phoneNumber) newErrors.phoneNumber = "Required";
    educationLevels.forEach(({ key }) => {
      const edu = formData.education[key];
      if (edu.institution || edu.country || edu.year || edu.diplomaFile) {
        if (!edu.institution) newErrors[`${key}_institution`] = "Required";
        if (!edu.country) newErrors[`${key}_country`] = "Required";
        if (!edu.year) newErrors[`${key}_year`] = "Required";
        if (!edu.diplomaFile) newErrors[`${key}_diplomaFile`] = "Required";
      }
    });
    if (formData.englishTest) {
      if (
        !formData.englishOption &&
        !formData.englishScore &&
        !formData.englishCertificate
      ) {
        newErrors.englishScore =
          "Provide score or upload certificate or select an option";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- Submit ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    // Tu dodaj logikę wysyłki do API/CRM/email
    setTimeout(() => {
      setSuccess(true);
      setIsLoading(false);
    }, 1500);
  };

  // --- Render ---
  if (success) {
    return (
      <div className={classes.successBox}>
        <h2>Application submitted!</h2>
        <p>
          Thank you for your application.
          <br />
          You will receive a confirmation email soon.
        </p>
      </div>
    );
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <h2 className={classes.title}>Personal Details</h2>
      {/* --- Personal Details --- */}
      <div className={classes.inputGroup}>
        <label>First Language *</label>
        <select
          value={formData.firstLanguage}
          onChange={(e) => handleInputChange("firstLanguage", e.target.value)}
          className={errors.firstLanguage ? classes.error : ""}
        >
          <option value="">Select language</option>
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
        {errors.firstLanguage && (
          <span className={classes.errorText}>{errors.firstLanguage}</span>
        )}
      </div>
      <div className={classes.inputGroup}>
        <label>Passport Number *</label>
        <input
          type="text"
          value={formData.passportNumber}
          onChange={(e) => handleInputChange("passportNumber", e.target.value)}
          className={errors.passportNumber ? classes.error : ""}
        />
        {errors.passportNumber && (
          <span className={classes.errorText}>{errors.passportNumber}</span>
        )}
      </div>
      <div className={classes.inputGroup}>
        <label>Passport Expiry Date *</label>
        <input
          type="date"
          value={formData.passportExpiry}
          onChange={(e) => handleInputChange("passportExpiry", e.target.value)}
          className={errors.passportExpiry ? classes.error : ""}
        />
        {errors.passportExpiry && (
          <span className={classes.errorText}>{errors.passportExpiry}</span>
        )}
      </div>
      <div className={classes.inputGroup}>
        <label>Upload Passport/ID *</label>
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) =>
            handleFileChange("passportFile", e.target.files?.[0] || null)
          }
          className={errors.passportFile ? classes.error : ""}
        />
        {errors.passportFile && (
          <span className={classes.errorText}>{errors.passportFile}</span>
        )}
      </div>
      <div className={classes.inputGroup}>
        <label>Marital Status *</label>
        <select
          value={formData.maritalStatus}
          onChange={(e) => handleInputChange("maritalStatus", e.target.value)}
          className={errors.maritalStatus ? classes.error : ""}
        >
          <option value="">Select status</option>
          {maritalStatuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        {errors.maritalStatus && (
          <span className={classes.errorText}>{errors.maritalStatus}</span>
        )}
      </div>
      <div className={classes.inputGroup}>
        <label>Gender *</label>
        <select
          value={formData.gender}
          onChange={(e) => handleInputChange("gender", e.target.value)}
          className={errors.gender ? classes.error : ""}
        >
          <option value="">Select gender</option>
          {genders.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        {errors.gender && (
          <span className={classes.errorText}>{errors.gender}</span>
        )}
      </div>
      <div className={classes.inputGroup}>
        <label>Full Address *</label>
        <textarea
          value={formData.address}
          onChange={(e) => handleInputChange("address", e.target.value)}
          className={errors.address ? classes.error : ""}
        />
        {errors.address && (
          <span className={classes.errorText}>{errors.address}</span>
        )}
      </div>
      <div className={classes.inputGroup}>
        <label>Phone Number *</label>
        <input
          type="tel"
          value={formData.phoneNumber}
          onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
          className={errors.phoneNumber ? classes.error : ""}
        />
        {errors.phoneNumber && (
          <span className={classes.errorText}>{errors.phoneNumber}</span>
        )}
      </div>

      {/* --- Education Background --- */}
      <h2 className={classes.title}>Education Background</h2>
      {educationLevels.map(({ key, label }) => (
        <div key={key} className={classes.eduSection}>
          <h3>{label}</h3>
          <div className={classes.inputGroup}>
            <label>Institution Name</label>
            <input
              type="text"
              value={formData.education[key].institution}
              onChange={(e) =>
                handleEducationChange(key, "institution", e.target.value)
              }
              className={errors[`${key}_institution`] ? classes.error : ""}
            />
            {errors[`${key}_institution`] && (
              <span className={classes.errorText}>
                {errors[`${key}_institution`]}
              </span>
            )}
          </div>
          <div className={classes.inputGroup}>
            <label>Country</label>
            <select
              value={formData.education[key].country}
              onChange={(e) =>
                handleEducationChange(key, "country", e.target.value)
              }
              className={errors[`${key}_country`] ? classes.error : ""}
            >
              <option value="">Select country</option>
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {errors[`${key}_country`] && (
              <span className={classes.errorText}>
                {errors[`${key}_country`]}
              </span>
            )}
          </div>
          <div className={classes.inputGroup}>
            <label>Graduation Year</label>
            <input
              type="number"
              min="1950"
              max={new Date().getFullYear()}
              value={formData.education[key].year}
              onChange={(e) =>
                handleEducationChange(key, "year", e.target.value)
              }
              className={errors[`${key}_year`] ? classes.error : ""}
            />
            {errors[`${key}_year`] && (
              <span className={classes.errorText}>{errors[`${key}_year`]}</span>
            )}
          </div>
          <div className={classes.inputGroup}>
            <label>Upload Diploma/Transcript</label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) =>
                handleEducationFileChange(key, e.target.files?.[0] || null)
              }
              className={errors[`${key}_diplomaFile`] ? classes.error : ""}
            />
            {errors[`${key}_diplomaFile`] && (
              <span className={classes.errorText}>
                {errors[`${key}_diplomaFile`]}
              </span>
            )}
          </div>
        </div>
      ))}

      {/* --- English Proficiency --- */}
      <h2 className={classes.title}>English Proficiency</h2>
      <div className={classes.inputGroup}>
        <label>Test Type</label>
        <select
          value={formData.englishTest}
          onChange={(e) => handleInputChange("englishTest", e.target.value)}
        >
          <option value="">Select test</option>
          {englishTests.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <div className={classes.inputGroup}>
        <label>Score (if available)</label>
        <input
          type="text"
          value={formData.englishScore}
          onChange={(e) => handleInputChange("englishScore", e.target.value)}
        />
      </div>
      <div className={classes.inputGroup}>
        <label>Upload Certificate</label>
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) =>
            handleFileChange("englishCertificate", e.target.files?.[0] || null)
          }
        />
      </div>
      <div className={classes.inputGroup}>
        <label>Options</label>
        <div className={classes.radioGroup}>
          <label>
            <input
              type="radio"
              name="englishOption"
              value="later"
              checked={formData.englishOption === "later"}
              onChange={() => handleInputChange("englishOption", "later")}
            />
            I’ll take the test later.
          </label>
          <label>
            <input
              type="radio"
              name="englishOption"
              value="courses"
              checked={formData.englishOption === "courses"}
              onChange={() => handleInputChange("englishOption", "courses")}
            />
            I’m open to take English courses abroad.
          </label>
        </div>
      </div>

      {/* --- Submit --- */}
      <button
        type="submit"
        className={classes.submitButton}
        disabled={isLoading}
      >
        {isLoading ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
};

export default ApplicationForm;
