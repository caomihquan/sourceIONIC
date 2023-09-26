import React from 'react';
import { VictoryAxis, VictoryLabel } from "victory-native";
import ReportConst from "../constants/ReportConst";

const ChartHandler = {
    Chart: (config, child) => {
        return (
            <VictoryChart
                height={ReportConst.VictoryChartGroupOption.Height < ((this.state.ListWithTrongThang.Length * ReportConst.VictoryChartGroupOption.TwoItem.TotalHeightItem) + ReportConst.VictoryChartGroupOption.TwoItem.DomainPaddingX)
                    ? (this.state.ListWithTrongThang.Length * ReportConst.VictoryChartGroupOption.TwoItem.TotalHeightItem) + ReportConst.VictoryChartGroupOption.TwoItem.DomainPaddingX
                    : ReportConst.VictoryChartGroupOption.Height}
                padding={ReportConst.VictoryChartGroupOption?.PaddingNoTextLabelRight}
                domainPadding={{ x: ReportConst.VictoryChartGroupOption?.TwoItem.DomainPaddingX }}
            >
                {child}
            </VictoryChart>
        )
    },
    CrossAxis: (config) => {
        const defaultConfig = {
            style: ReportConst.AxisOption?.Style,
            VictoryLabel: {
                textAnchor: "start"
            }
        }
        config.VictoryLabel = Object.assign(defaultConfig.VictoryLabel, config.VictoryLabel);
        config = Object.assign(defaultConfig, config);

        return (<VictoryAxis crossAxis
            style={config.style}
            invertAxis={config.invertAxis}
            tickLabelComponent={
                <VictoryLabel
                    text={config.VictoryLabel?.text}
                    dy={config.VictoryLabel?.dy}
                    dx={config.VictoryLabel?.dx}
                    x={config.VictoryLabel?.x}
                    textAnchor={config.VictoryLabel?.textAnchor}
                />
            }
        />)
    }

}

export default ChartHandler;