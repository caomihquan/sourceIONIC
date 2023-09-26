import { Configs_TienThu } from "../../../assets/themes/tienthu/config"; // assets/themes/default/_config";





const ColorPieChart1 = ["#267DB3", "#68C182", "#FAD55C", "#ED6647", "#8561C8", "#6DDBDB", "#FFB54D", "#E371B2", "#47BDEF", "#A75DBA", "#4285F4", "#DB4437", "#F4B401", "#0E9D58", "#AB47BC", "#00ACC1"]
const ColorPieChart2 = ["#349DB4", "#3A8BC2", "#5260A9", "#724D8C", "#AF69A0", "#B5B6B6", "#A11F1D", "#E17646", "#DBBE5E", "#9CC062", "#549F7A"]


const yearChartWidth = 0
const textCorlorGrey = "#AAA";

const HeightItem = 15;
const PaddingItem = 10;

const HeightItemWithGroup = 10;
const PaddingItemWithGroup = HeightItemWithGroup + 5;
const TextHeightWithGroup = 20;
const GroupOption = {
    HeightItem: HeightItemWithGroup,
    OneItem: {
        DomainPaddingX: TextHeightWithGroup + PaddingItemWithGroup,
        TextHeight: TextHeightWithGroup,
        TotalHeightItem: TextHeightWithGroup * 2,
    },
    TwoItem: {
        DomainPaddingX: TextHeightWithGroup + (PaddingItemWithGroup * 2),
        TextHeight: TextHeightWithGroup + HeightItemWithGroup,
        TotalHeightItem: TextHeightWithGroup * 3,
    },
    ThreeItem: {
        DomainPaddingX: TextHeightWithGroup + (PaddingItemWithGroup * 3),
        TextHeight: TextHeightWithGroup + (HeightItemWithGroup * 2),
        TotalHeightItem: TextHeightWithGroup * 4,
    },
}


const ReportConst = {
    LeaveApprove: "LeaveApprove",
    LeaveResponse: "LeaveResponse",

    KEY: {
        FromDate: "FromDate",
        DowCode: "DowCode",
        DepartmentCode: "DepartmentCode",
        ParentCode: "ParentCode",
        DepartmentName: "DepartmentName",
        Value: "Value",
        Caption: "Caption",
        Amount: "SL",
        Month: "YYYYMM",
        EmployeeName: "EmployeeName",
        JobWName: "JobWName",
        JoinDate: "JoinDate",
        AmountDay: "SoNgay",
        DepartmentLevelCode: "DepartmentLevelCode",
        DepartmentLevelName: "DepartmentLevelName",
        AmountNew: "SLNew",
        AmountOff: "SLOff",
        Male: "Nam",
        Female: "Nu",
        ConTypeName: "ConTypeName",
        TrainLevelName: "TrainLevelName",
        DayNum: "DayNum",
        KowName: "KowName",
        GroupDepartmentName: "GroupDepartmentName",
        BoNhiem: "BoNhiem",
        DieuDong: "DieuDong",
        ThuyenChuyen: "ThuyenChuyen",
        MienNhiem: "MienNhiem",
        KiemNhiem: "KiemNhiem",
        Appoint: ["BoNhiem", "DieuDong", "ThuyenChuyen", "MienNhiem", "KiemNhiem"],
        Gender: "GT",
        GenderName: "GenderName",
        DepartmentNameOld: "DepartmentNameOld",
        DepartmentNameNew: "DepartmentNameNew",
        JobWNameOld: "JobWNameOld",
        JobWNameNew: "JobWNameNew",
        EffectDate: "EffectDate",
        ConTypeName: "ConTypeName",
        TrainLevelName: "TrainLevelName",
        EndDate: "EndDate",
        GroupName: "GroupName",
        GroupChildName: "GroupChildName",
        AppointName: "AppointName",
        Period: "Period",
        SeniorityName: "SeniorityName",
        LeavePeriod: "LeavePeriod",
        FromToTime: "FromToTime",
        X: "x",
        Y: "y",
    },

    Color: ColorPieChart1,

    Icon: {
        JobWokingOld: {
            type: "FontAwesome5",
            name: "user-alt",
            color: textCorlorGrey
        },
        DepartmentOld: {
            type: "FontAwesome5",
            name: "map-marker-alt",
            color: textCorlorGrey
        },
        JobWoking: {
            type: "FontAwesome5",
            name: "user-alt",
            color: Configs_TienThu.Color.Primary
        },
        Department: {
            type: "FontAwesome5",
            name: "map-marker-alt",
            color: Configs_TienThu.Color.Primary
        },
        Contract: {
            type: "FontAwesome5",
            name: "file-signature",
            color: Configs_TienThu.Color.Primary
        },
        Graduation: {
            type: "FontAwesome5",
            name: "graduation-cap",
            color: Configs_TienThu.Color.Primary
        },
        Seniority: {
            type: "FontAwesome5",
            name: "hourglass-end",
            color: Configs_TienThu.Color.Primary
        },
        Time: {
            type: "FontAwesome5",
            name: "clock",
            color: Configs_TienThu.Color.Primary
        },
        Calendar: {
            type: "FontAwesome5",
            name: "calendar-day",
            color: Configs_TienThu.Color.Primary
        }
    },
    StackOption: {
        StyleLabel: {
            fill: "#fff",
            fontSize: 10
        }
    },
    AxisOption: {
        Style: {
            grid: { stroke: "transparent" },
            ticks: { stroke: "transparent" },
        }
    },
    PieChartOption: {
        Width: yearChartWidth,
        Padding: { top: 50, bottom: 50, left: 30, right: 80 },
        LabelRadius: 10,
        Style: { labels: { fontSize: 11 } }
    },
    VictoryChartOption: {
        Height: 350,
        PaddingNoText: { top: 30, bottom: 50, left: 0, right: 60 },
        PaddingNoTextLabelRight: { top: 30, bottom: 50, left: 0, right: 100 },
        PaddingWithText: { top: 30, bottom: 50, left: 60, right: 60 },
        TotalHeightItem: HeightItem + (PaddingItem * 2),
        DomainPaddingX: PaddingItem,
        HeightItem: HeightItem,

        HeightWithGroup: 600,
        Offset: 10,
        HeightItemWithGroup: HeightItemWithGroup,

        OneItem: {
            TotalHeightItem: GroupOption.OneItem.TotalHeightItem + 35,
            DomainPaddingX: GroupOption.OneItem.DomainPaddingX,
            TextHeight: GroupOption.OneItem.TextHeight,
        },
    },
    VictoryChartGroupOption: {
        Height: 350,
        PaddingNoText: { top: 30, bottom: 50, left: 0, right: 60 },
        PaddingWithText: { top: 30, bottom: 50, left: 60, right: 60 },
        PaddingNoTextLabelRight: { top: 30, bottom: 50, left: 0, right: 80 },

        OneItem: {
            TotalHeightItem: GroupOption.OneItem.TotalHeightItem + 35,
            DomainPaddingX: GroupOption.OneItem.DomainPaddingX,
            TextHeight: GroupOption.OneItem.TextHeight,
        },
        TwoItem: {
            TotalHeightItem: GroupOption.TwoItem.TotalHeightItem + 35,
            DomainPaddingX: GroupOption.TwoItem.DomainPaddingX,
            TextHeight: GroupOption.TwoItem.TextHeight,
        },
        ThreeItem: {
            TotalHeightItem: GroupOption.ThreeItem.TotalHeightItem + 35,
            DomainPaddingX: GroupOption.ThreeItem.DomainPaddingX,
            TextHeight: GroupOption.ThreeItem.TextHeight,
        },
        Offset: 20,
        HeightItem: HeightItemWithGroup,
    },
}

export default ReportConst;
