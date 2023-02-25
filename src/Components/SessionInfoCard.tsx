import * as React from 'react';
import './SessionInfoCard.css';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { SessionInfo } from "../API/SessionInfo";
import SessionDayAverages from "./SessionDayAverages";
import { useEffect } from 'react';

export interface SessionInfoCardProps {
  sessionsList: SessionInfo[];
}

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 250,
      backgroundColor: "white"
    },
  },
};

function SessionInfoCard({ sessionsList }: SessionInfoCardProps) {
  const selectableDates = getAllSessionStartDates(sessionsList);

  const [sessionDate, setSessionDate] = React.useState(selectableDates[0]);
  const [selectedDaySessions, setSelectedDaySessions] = React.useState<SessionInfo[]>([]);
  const [selectedDayPatientSessions, setSelectedDayPatientSessions] = React.useState<SessionInfo[]>([]);

  const handleChange = (event: SelectChangeEvent) => {
    if(event.target.value !== sessionDate) {
      setSessionDate(event.target.value as string);
    }
  };

  useEffect(() => {
    setSelectedDaySessions(getSessionsFromSelectedDay(sessionsList, sessionDate));
  }, [sessionDate, sessionsList]);

  useEffect(() => {
    setSelectedDayPatientSessions(getPatientSessionsFromSelectedDay(selectedDaySessions));
  }, [selectedDaySessions, selectedDayPatientSessions]);


    return (
      <div className="center-content">

        <div className="selector-container">
          <div className="center-content">
            <Box className="selector-width">
              <FormControl fullWidth>
                <InputLabel>Session Dates</InputLabel>
                <Select
                  value={sessionDate}
                  label="Session Date"
                  onChange={handleChange}
                  MenuProps={MenuProps}
                >
                  {
                    selectableDates.map((dateOpt) =>
                      <MenuItem key={dateOpt} value={dateOpt}>{dateOpt}</MenuItem>
                    )
                  }
                </Select>
              </FormControl>
            </Box>
          </div>
        </div>

        <SessionDayAverages
          daySessions={selectedDaySessions} 
          patientDaySessions={selectedDayPatientSessions}
        ></SessionDayAverages>

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
