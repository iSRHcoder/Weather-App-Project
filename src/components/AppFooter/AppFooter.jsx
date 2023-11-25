import styles from "./AppFooter.module.css";
import { FaGithub } from "react-icons/fa";

const AppFooter = () => {
  return (
    <footer className={styles.AppFooter}>
      <div>
        <a href="https://github.com/iSRHcoder" style={{ color: "black" }}>
          <FaGithub />
        </a>
      </div>
      <div>Made with ❤️ by iSRHcoder [2023]</div>
    </footer>
  );
};
export default AppFooter;
