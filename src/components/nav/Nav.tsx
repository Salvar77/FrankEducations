"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./Logo";
import BurgerMenu from "./BurgerMenu";
import classes from "./Nav.module.scss";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  const [isDesktop, setIsDesktop] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const items = [
    { href: "/language-courses", label: "Language Courses" },
    { href: "/aviation", label: "Aviation" },
    { href: "/medical-studies", label: "Medical Studies" },
    { href: "/services-poland", label: "Services in Poland" },
    { href: "/about", label: "About Us" },
  ];

  const solidNav = pathname === "/" && isDesktop;

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 992 && isOpen) toggleNav();
      setIsDesktop(window.innerWidth >= 992);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [isOpen]);

  return (
    <nav className={`${classes.navbar}${solidNav ? ` ${classes.solid}` : ""}`}>
      <div className={classes.container}>
        <Logo />

        <div className={classes.navGroup}>
          <ul className={classes.links}>
            {items.map((it) => (
              <li key={it.href}>
                <Link href={it.href} className={classes.navLink}>
                  {it.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className={classes.authButtons}>
            <Link href="/login" className={classes.loginBtn}>
              Login
            </Link>
            <Link href="/register" className={classes.registerBtn}>
              Apply Now
            </Link>
          </div>
        </div>

        <div className={classes.mobileAuthContainer}>
          <Link href="/login" className={classes.mobileLogin}>
            Login
          </Link>
          <Link href="/register" className={classes.mobileRegister}>
            Apply Now
          </Link>
        </div>

        <div className={classes.burgerContainer}>
          <BurgerMenu isOpen={isOpen} handleOpen={toggleNav} />
        </div>
      </div>

      <ul className={`${classes.mobileMenu} ${isOpen ? classes.open : ""}`}>
        {items.map((it) => (
          <li key={it.href}>
            <Link href={it.href} onClick={toggleNav}>
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className={`${classes.spacer} ${isOpen ? classes.open : ""}`} />
    </nav>
  );
}
