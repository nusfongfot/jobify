import { useState, useContext, createContext, useEffect } from "react";
import { getAccessToken } from "../services/localStorage";
import { useNavigate } from "react-router-dom";
import * as JobAPI from "../api/jobApi";

const JobContext = createContext();

const useJob = () => useContext(JobContext);

const JobContextProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  const createJob = async (formData) => {
    const res = await JobAPI.createJob(formData);
    const job = res.data.job;
    setJobs([...jobs, job]);
    navigate("/all-jobs");
  };

  const getAllJobs = async () => {
    const res = await JobAPI.getAllJobs();
    const dataJobs = res.data.jobs;
    setJobs(dataJobs);
  };

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      getAllJobs();
    }
  }, []);

  const shared = {
    jobs,
    setJobs,
    createJob,
  };
  return <JobContext.Provider value={shared}>{children}</JobContext.Provider>;
};

export { useJob, JobContextProvider };
