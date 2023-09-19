import "./App.css";
import PageLogin from "./pages/PageLogin";
import { Toaster } from "sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageHome from "./pages/PageHome";

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster richColors />
        <Routes>
          <Route path="/" element={<PageLogin />} />
          <Route path="/home" element={<PageHome />} />          
          <Route
            path="*"
            element={
              <>
                {" "}
                <h1> 404 Not Found </h1>{" "}
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
