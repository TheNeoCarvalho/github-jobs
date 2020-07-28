import React, { useState } from "react";
import useFetchJobs from "./hooks/useFetchJobs";
import { Container } from "react-bootstrap";
import "./App.css";

import Job from "./components/Job";
import JobPagination from "./components/JobPagination";

function App() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);

  const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page);
  return (
    <div className="App my-4">
      <Container>
        <h1 className="mb-4">Github Jobs</h1>
        <JobPagination
          page={page}
          setPage={setPage}
          hasNextPage={hasNextPage}
        />
        {loading && <p>Loading</p>}
        {error && <p>Error</p>}
        {jobs.map((job) => {
          return <Job key={job.id} job={job} />;
        })}
      </Container>
    </div>
  );
}

export default App;
