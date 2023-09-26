const LeaveAndOTConst = {
    LeaveApprove: "LeaveApprove",
    LeaveResponse: "LeaveResponse",
    OTResponse: "OTResponse",
    RemainLeaveNumber: "RemainLeaveNumber",
    RemainExtraDayOffNumber: "RemainExtraDayOffNumber",
    SetupProcess: "SetupProcess",
    ListOfHistRequest: "ListOfHistRequest",
    IsRegOTByFromTo: "IsRegOTByFromTo",
    ListKow: "ListKow",
    DefaultKow: "DefaultKow",
    ConfigTS: "ConfigTS",
    ConfigsApproval: "ConfigsApproval",
    ModalOTGroupRequest: "ModalOTGroupRequest",
    ModelConfigTSEmp: "ModelConfigTSEmp",
    ConfigFields: "ConfigFields",
    ListActivePleaseCancel: [3, 5, 6],
    ListOfLeavePeriod: [1, 3, 4, 5, 6],

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
        TSIsRegOTByFromTo: "TSIsRegOTByFromTo",
        DefaultKow: "DefaultKow",
        TSOTKowCodeWhenRegOT: "TSOTKowCodeWhenRegOT",
        TSIsSelectOTType: "TSIsSelectOTType",
        DepartmentName: "DepartmentName",
        strStatus: "strStatus",
        ArrayStatus: "ArrayStatus",
        IsUsedRejectProcess: "IsUsedRejectProcess",
        PayValue: "PayValue",
        PayValueName: "PayValueName"
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

        E_Approved_Mobile: 112,
        E_Reject_Mobile: 113,

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

export default LeaveAndOTConst;