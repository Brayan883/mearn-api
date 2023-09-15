import "./App.css";
import PageLogin from "./pages/PageLogin";
import { Toaster } from 'sonner'
function App() {
  return (
    <>
      <Toaster richColors  />
      <PageLogin />
    </>
  );
}

export default App;
