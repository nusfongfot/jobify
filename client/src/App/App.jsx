import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import { AuthContextProvider } from "../context/authContext";
import LoadingContextProvider from "../context/loadingContext";
import { JobContextProvider } from "../context/jobContext";

function App() {
  return (
    <BrowserRouter>
        <AuthContextProvider>
          <JobContextProvider>
            <LoadingContextProvider>
              <Router />
            </LoadingContextProvider>
          </JobContextProvider>
        </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
