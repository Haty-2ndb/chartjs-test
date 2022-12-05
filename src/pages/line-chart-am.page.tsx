import React, { FC, useEffect, useState } from 'react';
import { LineChartAm } from '@components/charts';
import { LineOptions, LineData } from '@typings/charts';
import { LineQueryParams } from '@typings/chartEvents';
import customChartEvent from 'src/utils/webview/custom-events';
import { WebviewActions, WebviewCharts } from 'src/models/events.model';
import * as am5 from '@amcharts/amcharts5';
import { Button } from '@components/index';
//generate date
const date: Date = new Date();
function generateData(value = 20): LineData {
  value = Math.round(Math.random() * 10 - 5 + value);
  am5.time.add(date, 'day', 1);
  return {
    date: date.getTime(),
    value: value,
    isEvent: Math.random() < 0.5,
  };
}

function generateDatas(count: number): LineData[] {
  const data: LineData[] = [];
  for (let i = 0; i < count; ++i) {
    data.push(generateData());
  }
  return data;
}

const customLineAm: LineData[] = generateDatas(30);

const queryParams = new URLSearchParams(window.location.search);
const params: LineQueryParams = queryParams
  ? Object.fromEntries(queryParams.entries())
  : {};
const webviewOptions: LineOptions = {
  hideLegend: true,
  windowHeight: true,
  showRange: false,
  showEvents: false,
  isWebview: true,
};
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
let showRange = false;
let showEvents = false;

const dispatchRange = () => {
  showRange = !showRange;
  customChartEvent.dispatch(
    WebviewCharts.LINE,
    WebviewActions.SHOWRANGE,
    { show: showRange },
    false,
    document.getElementById('chartEventsListen')
  );
};
const dispatchEvents = () => {
  showEvents = !showEvents;
  customChartEvent.dispatch(
    WebviewCharts.LINE,
    WebviewActions.SHOWEVENTS,
    { show: showEvents },
    false,
    document.getElementById('chartEventsListen')
  );
};

const LineChartAmPage: FC = () => {
  const [data, setData] = useState<LineData[]>();
  async function fetchData(delay = 0) {
    await sleep(delay);
    setData(customLineAm);
  }

  useEffect(() => {
    if (params) {
      fetchData(params.delay);
    }
  }, []);

  return (
    <div>
      <Button onClick={dispatchRange}> range</Button>
      <Button onClick={dispatchEvents}> events</Button>
      {data && (
        <LineChartAm
          customData={data}
          customOptions={webviewOptions}
        ></LineChartAm>
      )}
    </div>
  );
};

export default LineChartAmPage;
