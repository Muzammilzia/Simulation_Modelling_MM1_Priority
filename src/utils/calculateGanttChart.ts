import { GanttChartItem } from "../interface/customer.interface";

interface calculateGanttChartProps {
  customerInService: string;
  clock: number;
}

export const calculateGanttChart = (data: calculateGanttChartProps[]) => {
  const outputArray: GanttChartItem[] = [];

  let currentCustomer: string;
  let startTime: number;

  data.forEach((item, index) => {
    if (index === 0) {
      // Initialize the first customer
      currentCustomer = item.customerInService;
      startTime = item.clock;
    } else if (
      item.customerInService !== currentCustomer ||
      index === data.length - 1
    ) {
      // When a new customer is encountered or at the end of the array
      const endTime =
        index === data.length - 1
          ? item.clock
          : data[index - 1].clock + 1;

      outputArray.push({
        customer: currentCustomer,
        startTime,
        endTime,
      });

      // Update the current customer and start time
      currentCustomer = item.customerInService;
      startTime = item.clock;
    }
  });

  return outputArray;
};
