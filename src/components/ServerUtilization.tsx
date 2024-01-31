import { Paper, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { GanttChartItem } from "../interface/customer.interface";

interface ServerUtilizationProps {
  customers: GanttChartItem[];
}

const ServerUtilization: FC<ServerUtilizationProps> = ({ customers }) => {
  const [utilization, setUtilization] = useState<number>();
  const [busyTime, setBusyTime] = useState<number>();
  const [idleTime, setIdleTime] = useState<number>();
  const [totalTime, setTotalTime] = useState<number>();

  useEffect(() => {
    let idleTime = 0;
    let totalTime = 0;
    customers.forEach((item) => {
      const { customer, startTime, endTime } = item;

      if (customer === "idle") {
        idleTime += endTime! - startTime!;
      }
      totalTime += endTime! - startTime!;
    });
    setTotalTime(totalTime);
    setIdleTime(idleTime);
    setBusyTime(totalTime - idleTime);
    setUtilization(((totalTime - idleTime) / totalTime) * 100);
  }, [customers]);

  return (
    <>
      <Paper sx={{ width: "fit-content", padding: "16px 32px", margin: "8px 2px" }}>
        <Typography variant="h6" sx={{textAlign: "center"}}>Idle Time: <br /> {idleTime}</Typography>
      </Paper>
      <Paper sx={{ width: "fit-content", padding: "16px 32px", margin: "8px 2px" }}>
        <Typography variant="h6" sx={{textAlign: "center"}}>Busy Time: <br /> {busyTime}</Typography>
      </Paper>
      <Paper sx={{ width: "fit-content", padding: "16px 32px", margin: "8px 2px" }}>
        <Typography variant="h6" sx={{textAlign: "center"}}>Total Time: <br /> {totalTime}</Typography>
      </Paper>
      <Paper sx={{ width: "fit-content", padding: "16px 32px", margin: "8px 2px" }}>
        <Typography variant="h6" sx={{textAlign: "center"}}>
          Server Utilization: <br /> {utilization?.toFixed(3)} %
        </Typography>
      </Paper>
    </>
  );
};

export default ServerUtilization;
