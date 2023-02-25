import React from 'react';
import './ClinicChart.css';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
import { SessionInfo } from '../API/SessionInfo';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

interface ClinicChartProps {
    sessionsList: SessionInfo[];
}

interface ChartData { 
    clinicID: number;
    clinicName: string;
    femaleClients: number;
    maleClients: number;
    count: number;
}

const options = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
        title: {
            display: true,
            text: 'Clinic Name'
        }
      },
      y: {
        stacked: true,
        title: {
            display: true,
            text: 'No of Clients'
        }
      },
    },
  };

function ClinicChart({ sessionsList }: ClinicChartProps) {
    const clinicData = getClinicIds(sessionsList);

    const data = {
        labels: clinicData.map(cd => cd.clinicName),
        datasets: [
          {
            label: 'Female Clients',
            data: clinicData.map(cd => cd.femaleClients),
            backgroundColor: 'rgb(255, 99, 132)',
          },
          {
            label: 'Male Clients',
            data: clinicData.map(cd => cd.maleClients),
            backgroundColor: 'rgb(75, 192, 192)',
          },
        ],
      };

  return (
    <div className="clinic-page-section">
        <h2>Clinic's Total Sessions & Client Gender Diversity</h2>
        <div className="clinic-chart-containers">
            <Bar options={options} data={data} />
        </div>
    </div>
  );
}

function getClinicIds(sessionsList: SessionInfo[]): ChartData[] {
    const clinics: ChartData[] = [];

    sessionsList.forEach(s => {
        const index = clinics.findIndex(t => t.clinicID ===  s.clinicId);

        if (index === -1) {
            clinics.push({
                clinicID:  s.clinicId,
                clinicName: s.clinicName,
                femaleClients: s.gender === 1 ? 1 : 0,
                maleClients: s.gender === 2 ? 1 : 0,
                count: 1 
            });
        } else if (index >= 0) {
            clinics[index].count++;

            if (s.gender === 1){
                clinics[index].femaleClients++;
            } else {
                clinics[index].maleClients++;
            }
        }
    });
  
    return clinics.sort((a, b) => a.count - b.count);
}



export default ClinicChart;