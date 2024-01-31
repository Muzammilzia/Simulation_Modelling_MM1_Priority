import { Customer } from "../interface/customer.interface";

interface GanttChartItem {
    customerInService: string,
    clock: number,
}

export const calculateStartEndTimes = (data: Customer[]) => {
    const customersArray: Customer[] = JSON.parse(JSON.stringify(data));;
    const arrivals = new Set(customersArray.map(item => item.arrivalTime!));

    const ganttChartArray: GanttChartItem[] = []

    let currentClock = 0

    let totalServiceTime = customersArray.reduce((prev, current) => prev + current.serviceTime!, 0)

    let arrivedcustomersArray: Customer[] = []
    let customerInService: Customer = customersArray[0]// set to none
    let prevCustomerInService: Customer // set to none

    while(totalServiceTime >= 0){
        if(arrivals.has(currentClock)){
            arrivedcustomersArray = [...arrivedcustomersArray, ...customersArray.filter(item => item.arrivalTime === currentClock)]
        }        
        
        if(arrivedcustomersArray.length !== 0) {
            prevCustomerInService = customerInService;
            customerInService = arrivedcustomersArray[0];
            arrivedcustomersArray.forEach(item => {
                if(item.priority! < customerInService.priority!){
                    customerInService = item;
                }
            })



            if(customerInService.customer !== prevCustomerInService.customer){
                customersArray.forEach(item => {
                    if(item.customer === prevCustomerInService.customer && item.remainingService === 0){
                        const indexToBeDeleted = arrivedcustomersArray.findIndex(elem => elem.customer === prevCustomerInService.customer);
                        if(indexToBeDeleted !== -1){
                            item.endTime = currentClock;
                            arrivedcustomersArray.splice(indexToBeDeleted, 1);
                        }
                    }
                })
            }


            customersArray.forEach((item) => {
                if(item.customer === customerInService.customer){
                    if(!item.isStarted){
                        item.isStarted = true;
                        item.startTime = currentClock;
                    }
                    
                    if(item.remainingService === 0){
                        const deleteIndex = arrivedcustomersArray.findIndex(elem => elem.customer === customerInService.customer);
                        if(deleteIndex !== -1){
                            item.endTime = currentClock;
                            arrivedcustomersArray.splice(deleteIndex, 1);
                        }
                        if(totalServiceTime === 0){
                            totalServiceTime = -1;
                        }
                    } else {
                        ganttChartArray.push({
                            customerInService: `Customer ${customerInService.customer}`,
                            clock: currentClock
                        })
                        currentClock++
                        item.remainingService = item.remainingService! - 1;
                        totalServiceTime--;
                    }
                }
            })
        }
        else{
            ganttChartArray.push({
                customerInService: `idle`,
                clock: currentClock
            })
            currentClock++;
        }
    }

    return { customersArray, ganttChartArray };
}
