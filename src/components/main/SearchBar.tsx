"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import classes from "./SearchBar.module.scss";
import CountryFlags from "../icons/CountryFlags";
import { mockPrograms, Program } from "@/lib/data/mockPrograms";
import { fadeIn } from "../../utils/motion";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<Program[]>([]);
  const [showResults, setShowResults] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const countries = [
    { name: "Canada", component: CountryFlags.Canada },
    { name: "Poland", component: CountryFlags.Poland },
    { name: "UK", component: CountryFlags.UK },
    { name: "USA", component: CountryFlags.USA },
    { name: "Ireland", component: CountryFlags.Ireland },
    { name: "Germany", component: CountryFlags.Germany },
    { name: "Switzerland", component: CountryFlags.Switzerland },
    { name: "Finland", component: CountryFlags.Finland },
    { name: "Australia", component: CountryFlags.Australia },
    { name: "Spain", component: CountryFlags.Spain },
    { name: "Japan", component: CountryFlags.Japan },
    { name: "Czech Republic", component: CountryFlags.CzechRepublic },
    { name: "Hungary", component: CountryFlags.Hungary },
    { name: "Albania", component: CountryFlags.Albania },
    { name: "Bulgaria", component: CountryFlags.Bulgaria },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sprawdzanie czy to mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const queryParams = new URLSearchParams();
    if (searchQuery) queryParams.set("search", searchQuery);
    if (selectedCountry) queryParams.set("country", selectedCountry);

    // TYLKO przekierowanie - reszta kodu się nie wykona
    window.location.href = `/programs?${queryParams.toString()}`;
  };

  const selectedCountryData = countries.find((c) => c.name === selectedCountry);

  // Ikony SVG
  const StatsIcon = () => (
    <svg className={classes.statsIcon} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 20V10M18 20V4M6 20V16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const BookIcon = () => (
    <svg className={classes.shapeIcon} viewBox="0 0 24 24" fill="none">
      <path
        d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20M4 19.5C4 20.163 4.26339 20.7989 4.73223 21.2678C5.20107 21.7366 5.83696 22 6.5 22H20V2H6.5C5.83696 2 5.20107 2.26339 4.73223 2.73223C4.26339 3.20107 4 3.83696 4 4.5V19.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const GlobeIcon = () => (
    <svg className={classes.shapeIcon} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M2 12H22" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );

  const SchoolIcon = () => (
    <svg className={classes.shapeIcon} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3L1 9L12 15L23 9L12 3Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 12V17C19 17.5304 18.7893 18.0391 18.4142 18.4142C18.0391 18.7893 17.5304 19 17 19H7C6.46957 19 5.96086 18.7893 5.58579 18.4142C5.21071 18.0391 5 17.5304 5 17V12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const ResearchIcon = () => (
    <svg className={classes.shapeIcon} viewBox="0 0 24 24" fill="none">
      <path
        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const GraduateIcon = () => (
    <svg className={classes.shapeIcon} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3L1 9L12 15L23 9L12 3Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 12V17C19 17.5304 18.7893 18.0391 18.4142 18.4142C18.0391 18.7893 17.5304 19 17 19H7C6.46957 19 5.96086 18.7893 5.58579 18.4142C5.21071 18.0391 5 17.5304 5 17V12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 15V19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  // Lista wszystkich ikon
  const allIcons = [
    BookIcon,
    GlobeIcon,
    SchoolIcon,
    ResearchIcon,
    GraduateIcon,
    StatsIcon,
  ];

  // Wybieramy tylko 3 ikony na mobile, 6 na desktop
  const displayedIcons = isMobile ? allIcons.slice(0, 3) : allIcons;

  // Renderowanie zależne od urządzenia
  const SectionWrapper = isMobile ? "section" : motion.section;
  const sectionProps = isMobile
    ? {}
    : {
        initial: "hidden",
        whileInView: "show",
        viewport: { once: true, margin: "-100px" },
        variants: fadeIn("up", "tween", 0.2, 0.8),
      };

  return (
    <SectionWrapper className={classes.heroSection} {...sectionProps}>
      {/* DEKORACYJNE ELEMENTY EDUKACYJNE - 3 NA MOBILE, 6 NA DESKTOP */}
      <div className={classes.decorativeElements}>
        {displayedIcons.map((Icon, index) => (
          <div key={index} className={classes.eduShape}>
            <Icon />
          </div>
        ))}
      </div>

      <div className={classes.searchContainer}>
        {/* NAGŁÓWEK Z LICZNIKIEM */}
        <div className={classes.statsHeader}>
          <div className={classes.statsBadge}>
            <StatsIcon />
            <span className={classes.statsNumber}>18M+</span>
            <span className={classes.statsText}>searches and counting</span>
          </div>
        </div>

        {/* FORMULARZ WYSZUKIWANIA */}
        <form onSubmit={handleSearch} className={classes.searchForm}>
          {/* Search Input */}
          <div className={classes.searchInputGroup}>
            <div className={classes.inputWrapper}>
              <svg
                className={classes.searchIcon}
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                type="text"
                placeholder="What would you like to study? (e.g., Law)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={classes.searchInput}
              />
            </div>
          </div>

          {/* Country Select */}
          <div className={classes.countrySelectGroup} ref={dropdownRef}>
            <div className={classes.customSelect}>
              <button
                type="button"
                className={classes.selectButton}
                onClick={() => setIsOpen(!isOpen)}
              >
                <svg
                  className={classes.globeIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path d="M2 12H22" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>

                <span className={classes.selectedText}>
                  {selectedCountry ? (
                    <>
                      <span className={classes.flag}>
                        {selectedCountryData && (
                          <selectedCountryData.component />
                        )}
                      </span>
                      {selectedCountry}
                    </>
                  ) : (
                    "Any country"
                  )}
                </span>

                <svg
                  className={`${classes.chevron} ${isOpen ? classes.open : ""}`}
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {isOpen && (
                <div className={classes.dropdown}>
                  {countries.map((country) => (
                    <div
                      key={country.name}
                      className={`${classes.option} ${
                        selectedCountry === country.name ? classes.selected : ""
                      }`}
                      onClick={() => {
                        setSelectedCountry(country.name);
                        setIsOpen(false);
                      }}
                    >
                      <span className={classes.flag}>
                        <country.component />
                      </span>
                      <span>{country.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Search Button */}
          <button type="submit" className={classes.searchButton}>
            <span>Search</span>
            <svg className={classes.arrowIcon} viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </form>

        {/* DODATKOWY CTA */}
        <div className={classes.quickLinks}>
          <p className={classes.quickLinksText}>Popular fields of study:</p>
          <div className={classes.quickLinksButtons}>
            {[
              "Medicine",
              "Computer Science",
              "Business Administration",
              "Engineering",
              "Psychology",
            ].map((field) => (
              <button key={field} className={classes.quickLink}>
                {field}
              </button>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default SearchBar;
