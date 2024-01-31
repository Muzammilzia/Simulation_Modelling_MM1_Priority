import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { Customer, GanttChartItem } from "../interface/customer.interface";

interface GanttChartProps {
  customers: GanttChartItem[];
}

const GanttChart: React.FC<GanttChartProps> = ({ customers }) => {
  return (
    <Box
      sx={{
        width: "fit-content",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
      }}
    >
      {customers.map((item, index) => (
        <Box>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Typography variant="body2">{item.startTime}</Typography>
                {index === customers.length - 1 ? <Typography variant="body2">{item.endTime! + 1}</Typography> : null}
            </Box>

            <Box
            key={index}
            sx={{
                background: 'white',
                color: 'black',
                minWidth: "60px",
                height: "50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0 16px",
                borderRight:
                index < customers.length - 1 ? "1px solid #000" : "none",
            }}
            >
            <Typography variant="body2">{`${item.customer}`}</Typography>
            </Box>
        </Box>
      ))}
    </Box>
  );
};

export default GanttChart;
