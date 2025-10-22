"use client";
import React, { useState, useRef, useEffect } from "react";
import classes from "./SearchBar.module.scss";
import CountryFlags from "../icons/CountryFlags";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search:", searchQuery, "Country:", selectedCountry);
  };

  const selectedCountryData = countries.find((c) => c.name === selectedCountry);

  return (
    <section className={classes.heroSection}>
      <div className={classes.searchContainer}>
        {/* NAGŁÓWEK Z LICZNIKIEM */}
        <div className={classes.statsHeader}>
          <div className={classes.statsBadge}>
            <span className={classes.statsNumber}>18M+</span>
            <span className={classes.statsText}>searches and counting</span>
          </div>
        </div>

        {/* FORMULARZ WYSZUKIWANIA - TERAZ W POZIOMYM UKŁADZIE */}
        <form onSubmit={handleSearch} className={classes.searchForm}>
          {/* Search Input - oddzielony */}
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

          {/* Country Select - oddzielony */}
          <div className={classes.countrySelectGroup} ref={dropdownRef}>
            <div className={classes.customSelect}>
              <button
                type="button"
                className={classes.selectButton}
                onClick={() => setIsOpen(!isOpen)}
              >
                {/* IKONA GLOBUSU - DODANA Z POWROTEM */}
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

          {/* Search Button - oddzielony */}
          <button type="submit" className={classes.searchButton}>
            <span>Search</span>
            {/* IKONA STRZAŁKI - DODANA Z POWROTEM */}
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
      </div>
    </section>
  );
};

export default SearchBar;
