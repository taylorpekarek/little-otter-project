import React from 'react';
import './SessionsChart.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { SessionInfo } from '../API/SessionInfo';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

interface SessionsChartProps {
    sessionsList: SessionInfo[];
}

interface ChartData { 
    time: number;
    count: number;
}

const timeLineChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
    },
    scales: {
        x: {
            title: {
              display: true,
              text: 'Hour of day (HH:00)'
            }
          },
        y: {
          title: {
            display: true,
            text: 'No of Sessions'
          }
        }
    } 
};

const durationLineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
        x: {
            title: {
              display: true,
              text: 'Minutes'
            }
          },
        y: {
          title: {
            display: true,
            text: 'No of Sessions'
          }
        }
    } 
};

function SessionsChart({ sessionsList }: SessionsChartProps) {
    const startTimes = getAllSessionStartTimes(sessionsList);
    const stopTimes = getAllSessionStopTimes(sessionsList);
    const durationTimes = getAllSessionDurations(sessionsList);

    const startTimeLineChartData = {
        labels: startTimes.map(st => st.time).sort((n1,n2) => n1 - n2),
        datasets: [
            {
                fill: true,
                label: 'Session Start Time',
                data: startTimes.map(st => st.count),
                borderColor: 'rgb(76, 175, 79)',
                backgroundColor: 'rgba(76, 175, 79, 0.5)',
            },
        ],  
    };

    const stopTimeLineChartData = {
        labels: stopTimes.map(st => st.time).sort((n1,n2) => n1 - n2),
        datasets: [
            {
                fill: true,
                label: 'Session Stop Time',
                data: stopTimes.map(st => st.count),
                borderColor: 'rgb(244, 67, 54)',
                backgroundColor: 'rgba(244, 67, 54, 0.5)',
            },
        ],  
    };

    const sessionDurationLineChartData = {
        labels: durationTimes.map(st => st.time).sort((n1,n2) => n1 - n2),
        datasets: [
            {
                fill: true,
                label: 'Session Duration',
                data: durationTimes.map(st => st.count),
                borderColor: 'rgb(40, 62, 76)',
                backgroundColor: 'rgba(40, 62, 76, 0.5)',
            },
        ],  
    };

  return (
    <div>
        <div className="session-page-section">
            <div className="session-chart-containers">
                <h2>Hour of day a Session Starts</h2>
                <Line options={timeLineChartOptions} data={startTimeLineChartData} />
            </div>
            <div className="session-chart-containers">
                <h2>Hour of day a Session Stops</h2>
                <Line options={timeLineChartOptions} data={stopTimeLineChartData} />            
            </div>
        </div>
            <div className="duration-chart-container">
                <h2>Duration of Sessions</h2>
                <Line options={durationLineChartOptions} data={sessionDurationLineChartData} />            
            </div>
    </div>
  );
}

function getAllSessionStartTimes(sessionsList: SessionInfo[]): ChartData[] {
    const times: ChartData[] = [];
  
    sessionsList.forEach(s => {
        const time = s.startTime.getHours();
        const index = times.findIndex(t => t.time === time);

        if (index === -1) {
            times.push({
                time: time,
                count: 1 
            });
        } else if (index >= 0) {
            times[index].count++;
        }
    });

    return times;
}

function getAllSessionStopTimes(sessionsList: SessionInfo[]): ChartData[] {
    const times: ChartData[] = [];
  
    sessionsList.forEach(s => {
        const time = s.stopTime.getHours();
        const index = times.findIndex(t => t.time === time);

        if (index === -1) {
            times.push({
                time: time,
                count: 1 
            });
        } else if (index >= 0) {
            times[index].count++;
        }
    });

    return times;
}

function getAllSessionDurations(sessionsList: SessionInfo[]): ChartData[] {
    const times: ChartData[] = [];
  
    sessionsList.forEach(s => {
        const time = s.sessionDuration;
        const index = times.findIndex(t => t.time === time);

        if (index === -1) {
            times.push({
                time: time,
                count: 1 
            });
        } else if (index >= 0) {
            times[index].count++;
        }
    });

    return times;
}

export default SessionsChart;