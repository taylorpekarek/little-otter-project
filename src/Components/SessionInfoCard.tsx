import React from "react";
import { SessionInfo } from "./SessionInfo";

export interface Props {
  session: SessionInfo;
}


class SessionInfoCard extends React.Component<Props> {

  render() {
    const data = this.props.session;

    return (
        <div className="container">
          <p>Session Duration: {data.sessionDuration}</p>
          <p>Start Time: {data.startTime.toLocaleDateString()} {data.startTime.toLocaleTimeString()}</p>
          <p>Stop Time: {data.stopTime.toLocaleDateString()} {data.stopTime.toLocaleTimeString()}</p>
          <p>Clinic ID: {data.clinicId}</p>
          <p>Clinic Name: {data.clinicName}</p>
          <p>Clinic Latitude: {data.clinicLatitude}</p>
          <p>Clinic Longitude: {data.clinicLongitude}</p>
          <p>Provider ID: {data.providerId}</p>
          <p>User Type: {data.userType}</p>
          <p>Birth Year: {data.birthYear}</p>
          <p>Gender: {data.gender}</p>
          <p>Distance: {data.distance}</p>
        </div>
    );
  }
}

export default SessionInfoCard;
