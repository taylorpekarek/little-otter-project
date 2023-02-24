import './App.css';
import { ThemeProvider, createTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import SessionInfoCard from './Components/SessionInfoCard';
import { sessionInfoAPI } from './API/SessionAPI';
import { SessionInfo } from './API/SessionInfo';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#283e4c',
    },
    secondary: {
      main: '#56beba',
    },
    background: {
      paper: 'rgba(40,62,100,0.84)',
      default: '#fafafa',
    },
  },
});

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
    <ThemeProvider theme={theme}>
      <div>
        <div className="page-header-container">
          <h1 className="header-text">Little Koala Health</h1>
        </div>
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
            <div className='container'>
            <SessionInfoCard sessionsList={sessionData}></SessionInfoCard>
            </div>
          )
        }
      </div>
    </ThemeProvider>
  );
}

export default App;
