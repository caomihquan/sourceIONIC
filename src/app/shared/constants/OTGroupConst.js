const OTGroupConst = {
    ListActivePleaseCancel: [3, 5, 6],
    ListOfBusinessTripPeriod: [1, 3, 4, 5, 6, 7],

    KEY: {
        Day: "Day",
        Month: "Month",
        Status: "Status",
        StatusName: "StatusName",
        Type: "Type",
        BegDate: "BegDate",
        EndDate: "EndDate",
        Index: "Index",
        dayOfMonth: "dayOfMonth",
        KowCode: "KowCode",
        KowName: "KowName",
        TotalRecord: "TotalRecord",
        GroupName: "GroupName",
        name: "name",
        key: "key",
        Caption: "Caption",
        Value: "Value",
        RecordID: "RecordID",
        ColorSet: "ColorSet",
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
        E_AllAfternoon: 3,
        E_DefaultKow: "OT150"
    },

    TAB: {
        Infomation: "Infomation",
        Employee: "Employee"
    }
}

export default OTGroupConst;