import "./App.css";
import MainPage from "./components/MainPage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function App() {
  return (
    <div className="main">
      <MainPage />
      <ToastContainer />
    </div>
  );
}

export default App;
