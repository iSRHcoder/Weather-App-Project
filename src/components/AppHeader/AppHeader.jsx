import { Container, Navbar } from "react-bootstrap";
import styles from "./AppHeader.module.css";

const AppHeader = () => {
  const titleCss = {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#041b2d",
    textDecoration: "none",
    fontFamily: "monospace",
    paddingLeft: "10rem",
  };
  return (
    <header>
      <Navbar bg="light" data-bs-theme="light" className={styles.AppHeader}>
        <Container className={styles.headerContainer}>
          <Navbar.Brand style={titleCss}>
            Weather App{" "}
            <img
              src="/Images/weather-sunny-and-cloudy-svgrepo-com.svg"
              width="40"
            />{" "}
          </Navbar.Brand>
        </Container>
      </Navbar>
    </header>
  );
};

export default AppHeader;
