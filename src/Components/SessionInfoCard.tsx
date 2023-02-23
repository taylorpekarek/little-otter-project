import React from "react";
import { SessionDayInfo, SessionInfo } from "./SessionInfo";

export interface Props {
  sessionsList: SessionInfo[];
}


class SessionInfoCard extends React.Component<Props> {
    sessionData = this.props.sessionsList;
    selectableDates: string[] = [];
    selectedDaySessions: SessionInfo[] = [];

    render() {

        this.getSessionsFromSelectedDay('2/2/2015');

        return (
            this.selectedDaySessions.map((item: SessionInfo) =>
                <div className="container">
                    <p>Session Duration: {item.sessionDuration}</p>
                    <p>Start Time: {item.startTime.toLocaleDateString()} {item.startTime.toLocaleTimeString()}</p>
                    <p>Stop Time: {item.stopTime.toLocaleDateString()} {item.stopTime.toLocaleTimeString()}</p>
                    <p>Clinic ID: {item.clinicId}</p>
                    <p>Clinic Name: {item.clinicName}</p>
                    <p>Clinic Latitude: {item.clinicLatitude}</p>
                    <p>Clinic Longitude: {item.clinicLongitude}</p>
                    <p>Provider ID: {item.providerId}</p>
                    <p>User Type: {item.userType}</p>
                    <p>Birth Year: {item.birthYear}</p>
                    <p>Gender: {item.gender}</p>
                    <p>Distance: {item.distance}</p>
                </div>
            )
        );
    }

  getAllSessionStartDates(): void {

    this.selectedDaySessions.forEach(s => {
        const date = s.startTime.toLocaleDateString();
        const match = this.selectableDates.includes(date);
        if  (!match) {
            this.selectableDates.push(date);
        }
    });
  }

  getAllSessionStopDates(): void {
    const dateSelections: string[] = [];

    this.sessionData.forEach(s => {
        const date = s.stopTime.toLocaleDateString();
        const match = dateSelections.includes(date);
        if  (!match) {
            dateSelections.push(date);
        }
    });
  }

  getSessionsFromSelectedDay(date: string): void {
    this.selectedDaySessions = this.sessionData.filter(s => s.startTime.toLocaleDateString() === date);
  }

  calculateDayData(): SessionDayInfo {
    const data: SessionDayInfo = {
        numberOfSessions: this.selectedDaySessions.length,
        avgSessionLength: 0,
        avgPatiendTravelDistance: 0,
        avgPatientAge: 0
    };

    data.avgSessionLength = this.selectedDaySessions.reduce((total, next) => total + next.sessionDuration, 0) / this.selectedDaySessions.length;


    return data;

  }
}

export default SessionInfoCard;
