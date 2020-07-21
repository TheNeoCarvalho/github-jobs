import React from "react";
import useFetchJobs from "./useFetchJobs";
import { Container } from "react-bootstrap";
import "./App.css";

function App() {
  const { jobs, loading, error } = useFetchJobs();
  return (
    <div className="App">
      <Container>
        {loading && <p>Loading</p>}
        <h1>{jobs.length}</h1>
        {error && <p>Error</p>}
      </Container>
    </div>
  );
}

export default App;
