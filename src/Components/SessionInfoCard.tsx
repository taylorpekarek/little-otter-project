import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { SessionInfo } from "./SessionInfo";
import SessionDayAverages from "./SessionDayAverages";
import { useEffect } from 'react';

export interface SessionInfoCardProps {
  sessionsList: SessionInfo[];
}

function SessionInfoCard({ sessionsList }: SessionInfoCardProps) {
  const [sessionDate, setSessionDate] = React.useState('');
  const selectableDates = getAllSessionStartDates(sessionsList);
  const [selectedDaySessions, setSelectedDaySessions] = React.useState<SessionInfo[]>([]);
  const [selectedDayPatientSessions, setSelectedDayPatientSessions] = React.useState<SessionInfo[]>([]);

  const handleChange = (event: SelectChangeEvent) => {
    if(event.target.value !== sessionDate) {
      setSessionDate(event.target.value as string);
    }
  };

  useEffect(() => {
    setSelectedDaySessions(getSessionsFromSelectedDay(sessionsList, sessionDate));
  }, [sessionDate]);

  useEffect(() => {
    setSelectedDayPatientSessions(getPatientSessionsFromSelectedDay(selectedDaySessions));
  }, [selectedDaySessions]);


    return (
      <div>

        <Box sx={{ maxWidth: 150 }}>
          <FormControl fullWidth>
            <InputLabel id="session-date-select-label">Session Dates</InputLabel>
            <Select
              labelId="session-date-label"
              id="session-date-select"
              value={sessionDate}
              label="Session Date"
              onChange={handleChange}
            >
              {
                selectableDates.map((dateOpt) =>
                  <MenuItem value={dateOpt}>{dateOpt}</MenuItem>
                )
              }
            </Select>
          </FormControl>
        </Box>

        {
          selectedDaySessions.length > 0 && (
            <SessionDayAverages
              daySessions={selectedDaySessions} 
              patientDaySessions={selectedDayPatientSessions}
            ></SessionDayAverages>
          )
        }

      </div>
    );
}

// Gets all the start dates from the data set to create a list for the user's to select from
function getAllSessionStartDates(sessionsList: SessionInfo[]): string[] {
  const dates: string[] = [];

  sessionsList.forEach(s => {
      const date = s.startTime.toLocaleDateString();

      if (!dates.includes(date)) {
        dates.push(date);
      }
  });

  return dates;
}

// Gets all the sessions that occurred on the selected day
function getSessionsFromSelectedDay(sessionsList: SessionInfo[], date: string): SessionInfo[] {
  return sessionsList.filter(s => (s.startTime.toLocaleDateString() === date));
}

// Gets all the PATIENT sessions that occurred on the selected day
function getPatientSessionsFromSelectedDay(selectedDaySessions: SessionInfo[]): SessionInfo[] {
  const x = selectedDaySessions.filter(s => s.userType === 'Patient');
  return x;
}

export default SessionInfoCard;
