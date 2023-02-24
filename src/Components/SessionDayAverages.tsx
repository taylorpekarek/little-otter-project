import React, { useEffect } from 'react';
import './SessionDayAverages.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import { SessionDayInfo, SessionInfo } from '../API/SessionInfo';

interface SessionDayAveragesProps {
  daySessions: SessionInfo[];
  patientDaySessions: SessionInfo[];
}

function SessionDayAverages({ daySessions, patientDaySessions }: SessionDayAveragesProps) {
  const [dayToDayAvgs, setdayToDayAvgs] = React.useState<SessionDayInfo>({
    sessionDay: '',
    numberOfSessions: 0,
    avgSessionLength: 0,
    avgPatientTravelDistance: 0,
    avgPatientAge: 0
  });

  useEffect(() => {
    if(daySessions.length !== 0) {
      setdayToDayAvgs({
        sessionDay: daySessions[0].startTime.toLocaleDateString(),
        numberOfSessions: daySessions.length,
        avgSessionLength: Math.round(daySessions.reduce((total, next) => total + next.sessionDuration, 0) / daySessions.length),
        avgPatientTravelDistance: Math.round(patientDaySessions.reduce((total, next) => total + next.distance, 0) / patientDaySessions.length),
        avgPatientAge: Math.round(patientDaySessions.reduce((total, next) =>  total + (next.startTime.getFullYear() - next.birthYear), 0) / patientDaySessions.length)
      });
    }
  }, [dayToDayAvgs, daySessions, patientDaySessions]);

  return (
    <Card variant="outlined" sx={{ maxWidth: 400 }}>
      <CardHeader 
        title={'Sessions on ' + dayToDayAvgs.sessionDay} 
        align='center' 
        titleTypographyProps={{ color: "white", fontWeight: 600, }}
      >
      </CardHeader>
      <CardContent>
        <div className="session-stat-container">
          <div className="session-label">Number of sessions</div>
          <div className="session-stat">{dayToDayAvgs.numberOfSessions}</div>
        </div>
        <hr></hr>
        <div className="session-stat-container">
          <div className="session-label">Average session length</div>
          <div className="session-stat">{dayToDayAvgs.avgSessionLength}</div>
        </div>
        <hr></hr>
        <div className="session-stat-container">
          <div className="session-label">Average patient travel distance</div>
          <div className="session-stat">{dayToDayAvgs.avgPatientTravelDistance}</div>
        </div>
        <hr></hr>
        <div className="session-stat-container">
          <div className="session-label">Average patient age</div>
          <div className="session-stat">{dayToDayAvgs.avgPatientAge}</div>
        </div>
      </CardContent>
    </Card>
  );


}

export default SessionDayAverages;