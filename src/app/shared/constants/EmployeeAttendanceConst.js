const EmployeeAttendanceConst = {
    CheckIn: "CheckIn",
    CheckOut: "CheckOut",
    HomeInOut: "HomeInOut",

    KEY: {
        ID: "ID",
        RecordID: "RecordID",
        Note: "Note",
        Status: "Status",
        Status2: "Status2",
        LeavePeriod: "LeavePeriod",
        LeavePeriod2: "LeavePeriod2",
        IsPresent: "IsPresent",
        IsObsent: "IsObsent",
        EmployeeCode: "EmployeeCode",
        IsPH: "IsPH",
        LeavePeriodOff: "LeavePeriodOff"
    },

    STATUS: {
        E_IsPresent: 0,
        E_IsObsent: 1,
    },

    LEAVE_PRESENT: [1, 2],
    LEAVE_OBSENT: [1, 3],
    STATUS_REQUEST: [1, 5],
    LEAVEOFF_PRESENT: [1, 2],
    LEAVEOFF_OBSENT: [1, 3],

    COLOR: {
        Check: "#2089DC",
        CheckLock: "#2089dc78",
        UnCheck: "#bfbfbf",
        UnCheckLock: "#eee",
    },
    COORDS: {
        longitude: "longitude",
        latitude: "latitude",
        accuracy: "accuracy",
        speed: "speed"
    }

}

export default EmployeeAttendanceConst;