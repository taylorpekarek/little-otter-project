import React, { useEffect } from 'react';
import { SessionDayInfo, SessionInfo } from './SessionInfo';

interface SessionDayAveragesProps {
  daySessions: SessionInfo[];
  patientDaySessions: SessionInfo[];
}

function SessionDayAverages({ daySessions, patientDaySessions }: SessionDayAveragesProps) {
  const sessionDate = daySessions[0].startTime.toLocaleDateString();
  const [dayToDayAvgs, setdayToDayAvgs] = React.useState<SessionDayInfo>({
    sessionDay: '',
    numberOfSessions: 0,
    avgSessionLength: 0,
    avgPatientTravelDistance: 0,
    avgPatientAge: 0
  });

  useEffect(() => {
    if(dayToDayAvgs.sessionDay !== sessionDate && daySessions.length !== 0) {
      setdayToDayAvgs({
        sessionDay: sessionDate,
        numberOfSessions: daySessions.length,
        avgSessionLength: Math.round(daySessions.reduce((total, next) => total + next.sessionDuration, 0) / daySessions.length),
        avgPatientTravelDistance: Math.round(patientDaySessions.reduce((total, next) => total + next.distance, 0) / patientDaySessions.length),
        avgPatientAge: Math.round(patientDaySessions.reduce((total, next) =>  total + (next.startTime.getFullYear() - next.birthYear), 0) / patientDaySessions.length)
      });
    }
  }, [dayToDayAvgs]);

  return (
    <div>
      <p>Number of sessions: {dayToDayAvgs.numberOfSessions}</p>
      <p>Average session length: {dayToDayAvgs.avgSessionLength}</p>
      <p>Average patient travel distance: {dayToDayAvgs.avgPatientTravelDistance}</p>
      <p>Average patient age: {dayToDayAvgs.avgPatientAge}</p>
    </div>
  );


}

export default SessionDayAverages;