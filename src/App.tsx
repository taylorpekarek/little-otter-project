import './App.css';
import { useEffect, useState } from 'react';
import SessionInfoCard from './Components/SessionInfoCard';
import { sessionInfoAPI } from './API/SessionAPI';
import { SessionInfo } from './Components/SessionInfo';

function App() {
  const [sessionData, setProjects] = useState<SessionInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  
    useEffect(() => {
      async function loadProjects() {
        setLoading(true);
        try {
          const data = await sessionInfoAPI.get();
          setError('');
          setProjects(data);
        }
          catch (e) {
          if (e instanceof Error) {
            setError(e.message);
          }
          } finally {
          setLoading(false);
        }
      }
      loadProjects();
    }, []);

  return (
    <div className="container">
      {
        loading && (
          <div className="center-page">
            <span className="spinner primary"></span>
            <p>Loading...</p>
          </div>
        )
      }

      {
        error && (
          <div className="row">
            <div className="card large error">
              <section>
                <p>
                  <span className="icon-alert inverse "></span>
                  {error}
                </p>
              </section>
            </div>
          </div>
        )
      }

      {
        !loading && (
          <SessionInfoCard sessionsList={sessionData}></SessionInfoCard>
        )
      }
    </div>
  );
}

export default App;
