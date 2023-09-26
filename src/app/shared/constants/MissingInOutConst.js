const MissingInOutConst = {
    ListPayrollDow: "ListPayrollDow",
    ListRequest: "ListRequest",
    RemainLeaveNumber: "RemainLeaveNumber",
    ListOfHistRequest: "ListOfHistRequest",
    ListActivePleaseCancel: [3, 5, 6],
    ListOfLeavePeriod: [1, 3, 5],

    KEY: {
        DowCode: "DowCode",
        Day: "Day",
        Status: "Status",
        BegDate: "BegDate",
        EndDate: "EndDate",
        BegDay: "BegDay",
        EndDay: "EndDay",
        name: "name",
        key: "key",
        Caption: "Caption",
        Value: "Value",
        RecordID: "RecordID",
        ColorSet: "ColorSet",
        IsUsedRejectProcess: "IsUsedRejectProcess",
    },

    STATUS: {
        E_Pending: 1,
        Pending: "Pending",
        E_Approved: 2,
        Approved: "Approved",
        E_Reject: 3,
        Reject: "Reject",
        E_Wait: 5,
        Wait: "Wait",
        E_Cancelled: 6,
        Cancelled: "Cancelled",

        E_AllDay: 1,
        E_AllMorning: 2,
        E_AllAfternoon: 3
    }
}

export default MissingInOutConst;