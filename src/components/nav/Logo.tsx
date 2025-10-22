import Link from "next/link";
import Image from "next/image";
import styles from "./Logo.module.scss";
import FrankEducationLogo from "../../assets/image/frank-education-logo.png";

const Logo = () => (
  <div className={styles.logo}>
    <Link href="/">
      <Image
        src={FrankEducationLogo}
        alt="Logo MK Studio Auto Detailing"
        width={100}
        height={70}
      />
    </Link>
  </div>
);

export default Logo;
