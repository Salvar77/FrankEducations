// components/main/Hero.tsx
"use client";
import React from "react";
import classes from "./Hero.module.scss";

const Hero = () => {
  return (
    <div className={classes.heroContainer}>
      <section className={classes.hero}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className={classes.videoBackground}
        >
          <source src="/video_full_hd.mp4" type="video/mp4" />
          <img src="/frank-education-logo.png" alt="Frank Educations" />
        </video>

        <div className={classes.textOverlay}>
          <h1 className={classes.title}>
            Study Abroad with <span>Frank Educations</span>
          </h1>
          <p className={classes.subtitle}>
            Your gateway to international education in Poland, USA, UK and more
          </p>

          <div className={classes.ctaButton}>
            <a href="/register" className={classes.applyButton}>
              Apply Now
            </a>
          </div>
        </div>
      </section>

      <div className={classes.triangleDivider}></div>
    </div>
  );
};

export default Hero;
