import { ChangeEvent, useState } from "react";
import "./App.css";
import ResponsiveTable from "./components/ResponsiveTable";
import { generateServiceTime } from "./utils/exponentialRandomNumbers";
import { generateRandomPriorities } from "./utils/generateRandomPriorities";
import { generateArrivalTimes } from "./utils/poissonRandomNumbers";
import { Box, Grid, TextField, Button, Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { calculateStartEndTimes } from "./utils/calculateStartEndTimes";
import { Customer, GanttChartItem } from "./interface/customer.interface";
import GanttChart from "./components/GanttChart";
import { calculateGanttChart } from "./utils/calculateGanttChart";
import ServerUtilization from "./components/ServerUtilization";

const columns = [
  { id: "customer", label: "#Customer" },
  { id: "arrivalTime", label: "Arrival Time" },
  { id: "serviceTime", label: "Service Time" },
  { id: "priority", label: "Priority" },
  { id: "startTime", label: "Start Time" },
  { id: "endTime", label: "End Time" },
  { id: "turnAroundTime", label: "Turn Around Time" },
  { id: "waitTime", label: "Wait Time" },
  { id: "responseTime", label: "Response Time" },
];

const lcgPriorityParams = {
  a: 1664525, // Multiplier
  c: 1013904223, // Increment
  m: 2 ** 32, // Modulus
};

function App() {
  const [values, setValues] = useState<{
    arrivalRate?: number;
    serviceRate?: number;
    randomNumber?: number;
    numOfEntries?: number;
  }>({});

  const [show, setShow] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [ganttChartData, setGanttChartData] = useState<GanttChartItem[]>([]);

  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleGenerate = () => {
    if (
      !values.arrivalRate ||
      values.arrivalRate === 0 ||
      !values.serviceRate ||
      values.serviceRate === 0 ||
      !values.randomNumber ||
      values.randomNumber === 0 ||
      !values.numOfEntries ||
      values.numOfEntries === 0
    ) {
      toast.error("Invalid Inputs!");
      return;
    }

    const priorities = generateRandomPriorities({
      ...lcgPriorityParams,
      seed: values.randomNumber,
      count: values.numOfEntries!,
    });
    const arrivalTimes = generateArrivalTimes(
      values.arrivalRate,
      values.numOfEntries!
    );
    const serviceTimes = generateServiceTime(
      values.serviceRate,
      values.numOfEntries!
    );

    const dataArr: Customer[] = [];
    for (let i = 0; i < values.numOfEntries; i++) {
      dataArr.push({
        customer: i + 1,
        priority: priorities[i],
        arrivalTime: arrivalTimes[i],
        serviceTime: serviceTimes[i],
        remainingService: serviceTimes[i],
        isStarted: false,
      });
    }

    const { ganttChartArray, customersArray } = calculateStartEndTimes(dataArr);

    const finalData = customersArray.map((item) => {
      return {
        ...item,
        turnAroundTime: item.endTime! - item.arrivalTime!,
        waitTime: item.endTime! - item.arrivalTime! - item.serviceTime!,
        responseTime: item.startTime! - item.arrivalTime!,
      };
    });

    setGanttChartData(calculateGanttChart(ganttChartArray));

    setCustomers(finalData);
    setShow(true);
  };

  return (
    <Box sx={{ width: "100%", padding: "0 24px", margin: "0 0 24px 0" }}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Typography variant="h2" sx={{ textAlign: "center" }}>
        MM1 Priority Model
      </Typography>
      <Box sx={{ width: "100%", padding: "16px 0" }}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              sx={{ backgroundColor: "white", borderRadius: "8px" }}
              label="Arrival Rate"
              name="arrivalRate"
              variant="filled"
              value={values.arrivalRate}
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              sx={{ backgroundColor: "white", borderRadius: "8px" }}
              label="Service Rate"
              name="serviceRate"
              variant="filled"
              value={values.serviceRate}
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              sx={{ backgroundColor: "white", borderRadius: "8px" }}
              label="Random Priority Seed"
              name="randomNumber"
              variant="filled"
              value={values.randomNumber}
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              sx={{ backgroundColor: "white", borderRadius: "8px" }}
              label="Number of Entries"
              name="numOfEntries"
              variant="filled"
              value={values.numOfEntries}
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              sx={{ width: "70%" }}
              onClick={handleGenerate}
            >
              Generate
            </Button>
          </Grid>
        </Grid>
      </Box>
      {show && (
        <>
          <Typography
            variant="h3"
            sx={{ textAlign: "center", marginTop: "16px" }}
            className="custom-scrollbar"
          >
            Gantt Chart
          </Typography>
          <Box sx={{ width: "100%", overflow: "auto", margin: "16px 0" }}>
            <GanttChart customers={ganttChartData} />
          </Box>
          <Typography
            variant="h3"
            sx={{ textAlign: "center", marginTop: "16px" }}
          >
            Model
          </Typography>
          <Box sx={{ width: "100%" }}>
            <ResponsiveTable columns={columns} data={customers} />
          </Box>
          <Typography
            variant="h3"
            sx={{ textAlign: "center", marginTop: "16px" }}
          >
            Server Utilization
          </Typography>
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <ServerUtilization customers={ganttChartData} />
          </Box>
        </>
      )}
    </Box>
  );
}

export default App;
