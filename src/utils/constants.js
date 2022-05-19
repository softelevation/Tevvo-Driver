const PlanningData = [
  {
    startDate: '11/27/2021',
    startTime: '0800',
    EndDate: '11/27/2021',
    EndTime: '1700',
    vehicleCode: 'GMT017',
    changed: true,
    changeStartDate: '11/28/2021',
    changeStartTime: '0900',
    changeEndDate: '11/28/2021',
    changeEndTime: '1900',
  },
  {
    startDate: '11/27/2021',
    startTime: '0800',
    EndDate: '11/27/2021',
    EndTime: '1700',
    vehicleCode: 'GMT017',
    changed: false,
  },
  {
    startDate: '11/27/2021',
    startTime: '0800',
    EndDate: '11/27/2021',
    EndTime: '1700',
    vehicleCode: 'GMT017',
    changed: false,
  },
  {
    startDate: '11/27/2021',
    startTime: '0800',
    EndDate: '11/27/2021',
    EndTime: '1700',
    vehicleCode: 'GMT017',
    changed: false,
  },
  {
    startDate: '11/27/2021',
    startTime: '0800',
    EndDate: '11/27/2021',
    EndTime: '1700',
    vehicleCode: 'GMT017',
    changed: false,
  },
];

const planningDetails = {
  startDate: '11/27/2021',
  startTime: '0800',
  EndDate: '11/27/2021',
  EndTime: '1700',
  vehicleCode: 'GMT017',
  changed: true,
  changeStartDate: '11/28/2021',
  changeStartTime: '0900',
  changeEndDate: '11/28/2021',
  changeEndTime: '1900',
  rejectUnit: false,
};
export const transportStatus = (name) => {
  switch (name) {
    case 'dispatch_requested':
      return 'Dispatch Requested';
    case 'noshow':
      return 'Completed - No Show';
    case 'en_route':
      return 'En Route';
    case 'arrived_at_pick_up':
      return 'Arrived at PU';
    case 'confirm_dob':
      return 'Confirmed DOB';
    case 'patient_loaded':
      return 'Patient loaded';
    case 'arrived_at_drop_off':
      return 'Arrived at DO';
    case 'rejected':
      return 'Rejected';
    case 'completed':
      return 'Completed';
    case 'planned':
      return 'Planned';
    case 'accepted':
      return 'Accepted';
    case 'cancelled':
      return 'Cancelled';
    case 'aborted':
      return 'Aborted';
    case 'requested':
      return 'Requested';
    case 'unassigned':
      return 'Unassigned';
    case 'expired':
      return 'Expired';
    case 'allocated':
      return 'Allocated';
    case 'dispatched':
      return 'Dispatched';
    default:
      return name;
  }
};
export {PlanningData, planningDetails};
