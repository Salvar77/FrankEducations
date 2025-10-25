"use client";
import React, { useState, useMemo } from "react";
import { mockPrograms, Program } from "@/lib/data/mockPrograms";
import styles from "./ProgramSearch.module.scss";
import Banners from "../../../components/more/Banners";

const ProgramSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedField, setSelectedField] = useState("");
  const [selectedDegree, setSelectedDegree] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [searchResults, setSearchResults] = useState<Program[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [sortOption, setSortOption] = useState("relevance");

  const sortedResults = useMemo(() => {
    const results = [...searchResults];

    switch (sortOption) {
      case "tuition-low-high":
        return results.sort((a, b) => {
          const tuitionA = parseFloat(a.tuition.replace(/[^\d.]/g, ""));
          const tuitionB = parseFloat(b.tuition.replace(/[^\d.]/g, ""));
          return tuitionA - tuitionB;
        });

      case "tuition-high-low":
        return results.sort((a, b) => {
          const tuitionA = parseFloat(a.tuition.replace(/[^\d.]/g, ""));
          const tuitionB = parseFloat(b.tuition.replace(/[^\d.]/g, ""));
          return tuitionB - tuitionA;
        });

      case "duration":
        return results.sort((a, b) => {
          const durationA = parseInt(a.duration);
          const durationB = parseInt(b.duration);
          return durationA - durationB;
        });

      case "relevance":
      default:
        return results;
    }
  }, [searchResults, sortOption]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const results = mockPrograms.filter((program) => {
      const matchesSearch =
        program.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        program.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
        program.field.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCountry =
        !selectedCountry || program.country === selectedCountry;
      const matchesField = !selectedField || program.field === selectedField;
      const matchesDegree =
        !selectedDegree || program.degree === selectedDegree;
      const matchesLanguage =
        !selectedLanguage || program.language === selectedLanguage;

      return (
        matchesSearch &&
        matchesCountry &&
        matchesField &&
        matchesDegree &&
        matchesLanguage
      );
    });

    setSearchResults(results);
    setShowResults(true);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  const clearFilters = () => {
    setSelectedCountry("");
    setSelectedField("");
    setSelectedDegree("");
    setSelectedLanguage("");
    setSearchQuery("");
  };

  const toggleFavorite = (programId: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(programId)) {
      newFavorites.delete(programId);
    } else {
      newFavorites.add(programId);
    }
    setFavorites(newFavorites);
  };

  const getPredictionClass = (level: string) => {
    switch (level.toLowerCase()) {
      case "very high":
        return styles.veryHigh;
      case "high":
        return styles.high;
      case "low":
        return styles.low;
      default:
        return styles.high;
    }
  };

  // Get unique values for filters
  const countries = Array.from(new Set(mockPrograms.map((p) => p.country)));
  const fields = Array.from(new Set(mockPrograms.map((p) => p.field)));
  const degrees = Array.from(new Set(mockPrograms.map((p) => p.degree)));
  const languages = Array.from(new Set(mockPrograms.map((p) => p.language)));

  const activeFiltersCount = [
    selectedCountry,
    selectedField,
    selectedDegree,
    selectedLanguage,
  ].filter(Boolean).length;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Banners />
        <h1 className={styles.title}>
          {showResults
            ? `${sortedResults.length} programs found for "${
                searchQuery || "medicine"
              }"`
            : "Find Your Program"}
        </h1>

        <form onSubmit={handleSearch} className={styles.searchForm}>
          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label>Search Programs</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by program, university, field..."
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Country</label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                <option value="">All Countries</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.inputGroup}>
              <button type="submit" className={styles.searchButton}>
                Search Programs
              </button>
            </div>
          </div>

          {/* Advanced Filters Toggle */}
          <div className={styles.filtersToggle}>
            <button
              type="button"
              className={styles.filtersToggleButton}
              onClick={() => setShowFilters(!showFilters)}
            >
              Advanced Filters{" "}
              {activeFiltersCount > 0 && `(${activeFiltersCount})`}
              <span className={styles.arrow}>{showFilters ? "▲" : "▼"}</span>
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className={styles.advancedFilters}>
              <div className={styles.filterRow}>
                <div className={styles.inputGroup}>
                  <label>Field of Study</label>
                  <select
                    value={selectedField}
                    onChange={(e) => setSelectedField(e.target.value)}
                  >
                    <option value="">All Fields</option>
                    {fields.map((field) => (
                      <option key={field} value={field}>
                        {field}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <label>Degree Level</label>
                  <select
                    value={selectedDegree}
                    onChange={(e) => setSelectedDegree(e.target.value)}
                  >
                    <option value="">All Degrees</option>
                    {degrees.map((degree) => (
                      <option key={degree} value={degree}>
                        {degree}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <label>Language</label>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                  >
                    <option value="">All Languages</option>
                    {languages.map((language) => (
                      <option key={language} value={language}>
                        {language}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <label>&nbsp;</label>
                  <button
                    type="button"
                    className={styles.clearFiltersButton}
                    onClick={clearFilters}
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </form>

        {showResults && (
          <div className={styles.resultsContainer}>
            <div className={styles.sortHeader}>
              <span className={styles.sortText}>
                Sort # {sortedResults.length}
              </span>
              <select
                className={styles.sortSelect}
                value={sortOption}
                onChange={handleSortChange}
              >
                <option value="relevance">Relevance</option>
                <option value="tuition-low-high">Tuition: Low to High</option>
                <option value="tuition-high-low">Tuition: High to Low</option>
                <option value="duration">Duration</option>
              </select>
            </div>

            <div className={styles.programsGrid}>
              {sortedResults.map((program) => (
                <div key={program.id} className={styles.programCard}>
                  <div className={styles.cardHeader}>
                    <div className={styles.headerTop}>
                      <div className={styles.universityInfo}>
                        <img
                          src={program.logo}
                          alt={`${program.university} logo`}
                          className={styles.universityLogo}
                        />
                        <span className={styles.degreeBadge}>
                          {program.degreeType}
                        </span>
                      </div>
                      <button
                        className={`${styles.favoriteButton} ${
                          favorites.has(program.id) ? styles.active : ""
                        }`}
                        onClick={() => toggleFavorite(program.id)}
                      >
                        ♡
                      </button>
                    </div>

                    <h2 className={styles.programName}>{program.name}</h2>
                    <h3 className={styles.university}>{program.university}</h3>

                    {/* Program Description */}
                    <p className={styles.programDescription}>
                      {program.description}
                    </p>

                    {program.badges.length > 0 && (
                      <div className={styles.badgesContainer}>
                        {program.badges.map((badge, index) => (
                          <span
                            key={index}
                            className={`${styles.badge} ${
                              badge.includes("Scholarships")
                                ? styles.scholarship
                                : styles.fastAcceptance
                            }`}
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className={styles.detailsGrid}>
                      <div className={styles.detailItem}>
                        <span className={styles.label}>Location</span>
                        <span className={styles.value}>{program.country}</span>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.label}>Campus city</span>
                        <span className={styles.value}>
                          {program.campusCity}
                        </span>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.label}>Tuition (1st year)</span>
                        <span className={styles.value}>{program.tuition}</span>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.label}>Application fee</span>
                        <span className={styles.value}>
                          {program.applicationFee}
                        </span>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.label}>Duration</span>
                        <span className={styles.value}>{program.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Admission Requirements */}
                  <div className={styles.requirementsSection}>
                    <h4 className={styles.requirementsTitle}>
                      Admission Requirements
                    </h4>
                    <ul className={styles.requirementsList}>
                      {program.admissionRequirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.successSection}>
                    <h4 className={styles.successTitle}>Success prediction</h4>
                    <div className={styles.predictionsGrid}>
                      {program.successPredictions.map((prediction, index) => (
                        <div key={index} className={styles.predictionItem}>
                          <div className={styles.intakeDate}>
                            {prediction.intake}
                          </div>
                          <div
                            className={`${
                              styles.predictionLevel
                            } ${getPredictionClass(prediction.level)}`}
                          >
                            {prediction.level}
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      className={styles.detailsButton}
                      onClick={() => (window.location.href = program.applyLink)}
                    >
                      Apply Now
                    </button>
                    <div className={styles.courseDate}>Course: 4/6/2024</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgramSearch;
