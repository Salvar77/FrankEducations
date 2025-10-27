"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./Banners.module.scss";
import { fadeIn, staggerContainer } from "../../utils/motion";

const Banners: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const banners = [
    {
      href: "/student",
      icon: "🎓",
      title: "Students",
      description: "Find your dream program and apply with confidence",
    },
    {
      href: "/university",
      icon: "🏛️",
      title: "Universities",
      description: "Reach qualified international students worldwide",
    },
    {
      href: "/consultant",
      icon: "🌍",
      title: "Agencies",
      description: "Partner with us to grow your student recruitment",
    },
  ];

  // Prosty variant bez problemów z typami
  const bannerAnimation = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween" as const,
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  if (isMobile) {
    return (
      <div className={styles.bannersContainer}>
        {banners.map((banner) => (
          <Link
            key={banner.href}
            href={banner.href}
            className={styles.bannerLink}
          >
            <div className={styles.banner}>
              <div className={styles.bannerIcon}>{banner.icon}</div>
              <div className={styles.bannerContent}>
                <h3>{banner.title}</h3>
                <p>{banner.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className={styles.bannersContainer}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
    >
      {banners.map((banner, index) => (
        <Link
          key={banner.href}
          href={banner.href}
          className={styles.bannerLink}
        >
          <motion.div
            className={styles.banner}
            variants={bannerAnimation}
            whileHover={{
              y: -8,
              scale: 1.02,
              transition: {
                type: "tween" as const,
                duration: 0.3,
                ease: "easeOut" as const,
              },
            }}
          >
            <div className={styles.bannerIcon}>{banner.icon}</div>
            <div className={styles.bannerContent}>
              <h3>{banner.title}</h3>
              <p>{banner.description}</p>
            </div>
          </motion.div>
        </Link>
      ))}
    </motion.div>
  );
};

export default Banners;
