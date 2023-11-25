import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppHeader from "./components/AppHeader/AppHeader";
import Home from "./pages/Home";
import AppFooter from "./components/AppFooter/AppFooter";

function App() {
  return (
    <div className="App">
      <AppHeader />
      <main className="main">
        <Home />
      </main>
      <AppFooter />
    </div>
  );
}

export default App;
