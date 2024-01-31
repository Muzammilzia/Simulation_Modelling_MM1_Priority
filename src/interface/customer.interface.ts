export interface Customer {
  customer?: number;
  arrivalTime?: number;
  serviceTime?: number;
  priority?: number;
  remainingService?: number;
  startTime?: number;
  endTime?: number;
  isStarted?: boolean;
  turnAroundTime?: number;
  waitTime?: number;
  responseTime?: number;
}

export interface GanttChartItem {
  customer?: string;
  startTime?: number;
  endTime?: number;
}
