export class SessionInfo {
    sessionDuration: number;
    startTime: Date;
    stopTime: Date;
    clinicId: number;
    clinicName: string;
    clinicLatitude: number;
    clinicLongitude: number;
    providerId: number;
    userType: string;
    birthYear: number;
    gender: number;
    distance: number;
  
    constructor(json?: any) {
      this.sessionDuration = json.sessionduration;
      this.startTime = new Date(json.start_time);
      this.stopTime = new Date(json.stop_time);
      this.clinicId = json.clinic_id;
      this.clinicName = json.clinic_name;
      this.clinicLatitude = json['clinic latitude'];
      this.clinicLongitude = json.clinic_longitude;
      this.providerId = json.provider_id;
      this.userType = json.usertype;
      this.birthYear = json['birth year'];
      this.gender = json.gender;
      this.distance = json.distance;
    }
  }
  