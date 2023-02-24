import { SessionInfo } from "./SessionInfo";

function parseJSON(response: Response) {
  return response.json();
}

function convertToSessionInfoModels(data: any[]): SessionInfo[] {
  let projects: SessionInfo[] = data.map(convertToSessionInfoModel);
  return projects;
}

function convertToSessionInfoModel(item: any): SessionInfo {
  return new SessionInfo(item);
}

const sessionInfoAPI = {
    get() {
        return fetch('https://lo-interview.s3.us-west-2.amazonaws.com/health_sessions.json')
        .then(parseJSON)
        .then(convertToSessionInfoModels)
        .catch((error: TypeError) => {
            console.log('log client error ' + error);
            throw new Error(
                'There was an error retrieving the data. Please try again.'
            );
        });
    },
};

export { sessionInfoAPI };