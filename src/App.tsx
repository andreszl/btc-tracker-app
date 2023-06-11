import React, { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
import moment from 'moment';
import _ from  'lodash';
import { IBTC, IGetTrackerResponse } from './interfaces/btc.interfaces';

import 'moment/locale/es'
import api from './api';
import './App.css';

moment.locale('es'); 

export const options = {
  title: "USD/BTC",
  legend: { position: "none" },
  hAxis: { textPosition: 'none' }
};

export default function App() {

  const [tracker, setTracker] = useState<(string | number)[][]>([])

  useEffect(() => {
    try {
      api.btc.getTracker().then((response: IGetTrackerResponse) => {
        let data: IBTC[] = _.orderBy(JSON.parse(response.body as any).data.map((t: any) => {
          return { ...t, created_at: { S: new Date(t.created_at.S) } }
        }),  ['created_at.S'], ['asc']);
  
        const chartData = data.map((t) => {
          return [moment(t.created_at.S).format('ddd DD MMM YYYY,  hh:mm a') , Number(t.price.N)]
        });
  
        setTracker([
          ['Fecha', 'BTC'],
          ...chartData,
        ]);
      });
    } catch (error) {
      console.log(error)
    }
  }, [])
  
  return (
    <div data-testid="app" className='w-100p'>
      <div data-testid="header" className='header'>
        <div data-testid="chart-container" className='w-100p'>
          <h1 data-testid="btc-title" className='text-center color-white'>BITCOIN TRACKING</h1>
          {
            tracker.length > 1 ? (
              <Chart
                data-testid="btc-chart"
                chartType="LineChart"
                width="100%"
                height="500px"
                data={tracker}
                options={options}
              />
            ) : null 
          }
        </div>
      </div>
    </div>
  );
}