import React, { FC, useEffect, useRef, useState } from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js';

import { Card } from 'react-bootstrap';
import { ScatterChartProps } from '@typings/charts.d';
import _ from 'lodash';
import {
  getDefaultData,
  getDefaultOptions,
} from 'src/utils/configurations/chartsConfigurations';
import { Scatter } from 'react-chartjs-2';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const options: ChartOptions = getDefaultOptions();

const ScatterChart: FC<ScatterChartProps> = ({
  size,
  description,
  customOptions = {},
  customData = getDefaultData(),
}) => {
  const [chartData, setChartData] = useState<ChartData<'scatter'>>(customData);
  const chartRef = useRef<ChartJS<'scatter'>>(null);

  const chartOptions = _.merge(options, customOptions);

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart) {
      return;
    }
    setChartData(chartData);
  }, [chartData, customData]);

  return (
    <div className={`chart__container chart__container--${size}`}>
      {description && (
        <Card>
          <Card.Body>
            <Card.Text>{description}</Card.Text>
          </Card.Body>
        </Card>
      )}
      <Scatter options={chartOptions} data={chartData} ref={chartRef} />
    </div>
  );
};

export default ScatterChart;