import {
  ChartType,
  ChartOptions,
  ComplexFillTarget,
  TooltipPositionerFunction,
} from 'chart.js';
import * as am5 from '@amcharts/amcharts5';
export type d3Charts = 'D3_circular';
export type AMCharts = 'force_directed' | 'am_doughnut';
export type chartJsCharts = ChartType | 'linearea' | 'horizontalbar' | 'gauge';
export type Charts = chartJsCharts | d3Charts | AMCharts;

export type ChartProps = {
  size?: ChartSize;
  customData?;
};

export type AmChartProps = {
  size?: ChartSize;
};

export type GaugePlugin = {
  needleValue?: number;
};

export type ChartInfoProps = {
  id: Charts;
};

export type LineChartProps = ChartProps & {
  customOptions?: ChartOptions<'line'>;
  customFill?: ComplexFillTarget | undefined;
  showAlwaysTooltip?: boolean;
};
export type BarChartProps = ChartProps & {
  customOptions?: ChartOptions<'bar'>;
};
export type DoughnutChartProps = ChartProps & {
  customOptions?: ChartOptions<'doughnut'>;
};
export type PieChartProps = ChartProps & {
  customOptions?: ChartOptions<'pie'>;
};
export type ScatterChartProps = ChartProps & {
  customOptions?: ChartOptions<'scatter'>;
};

export type ForceDirectedProps = AmChartProps & {
  customData: ForceDirected;
};

export type AmDoughnutProps = AmChartProps & {
  customData: DoughnutData[];
};

export type LineChartAmProps = ChartProps & {
  customOptions?;
};
export type ChartSize = 'xs' | 'md' | 'xl' | 'responsive';

export type CircularPackingProps = {
  width: number;
  height: number;
  data: CircularPackingMainData;
  size?: ChartSize;
};
declare module 'chart.js' {
  interface TooltipPositionerMap {
    myCustomPositioner: TooltipPositionerFunction<ChartType>;
  }
}

export type CircularPackingMainData = {
  type: 'node';
  value: number;
  name: string;
  groupsColors: { [key: string]: string };
  groups: string[];
  id: string;
  children: CircularPackingElement[];
};

export type CircularPackingElement = {
  type: string;
  name: string;
  value: number;
  id: string;
};

export type CircularPackingData =
  | CircularPackingMainData
  | CircularPackingElement;

export type AMChartsData = ForceDirected | DoughnutData[];

export type ForceDirected = {
  name?: string;
  value?: number;
  children: ForceDirectedData[];
};

export type ForceDirectedData = {
  name: string;
  id: string;
  value?: number;
  type?: string;
};

export type DoughnutData = {
  name: string;
  value: number;
  color: am5.Color;
};
