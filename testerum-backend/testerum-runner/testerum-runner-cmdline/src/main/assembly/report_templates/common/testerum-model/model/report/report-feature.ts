import {FeatureOrTestRunnerReportNode} from "./feature-or-test-runner-report-node";
import {ExecutionStatus} from "./execution-status";
import {ReportLog} from "./report-log";
import {MarshallingUtils} from "../../json-marshalling/marshalling-utils";
import {ExceptionDetail} from "../exception/exception-detail";
import {RunnerReportNodeType} from "./runner-report-node";
import {ReportTest} from "./report-test";

export class ReportFeature implements FeatureOrTestRunnerReportNode {

    constructor(public readonly featureName: string,
                public readonly startTime: Date,
                public readonly endTime: Date,
                public readonly durationMillis: number,
                public readonly status: ExecutionStatus,
                public readonly exceptionDetail: ExceptionDetail | null,
                public readonly logs: Array<ReportLog>,
                public readonly children: Array<FeatureOrTestRunnerReportNode>) {
    }

    static parse(input: Object): ReportFeature {
        if (!input) {
            return null;
        }

        const featureName = input["featureName"];
        const startTime = MarshallingUtils.parseLocalDateTime(input["startTime"]);
        const endTime = MarshallingUtils.parseLocalDateTime(input["endTime"]);
        const durationMillis = input["durationMillis"];
        const status = MarshallingUtils.parseEnum(input["status"], ExecutionStatus);
        const exceptionDetail = ExceptionDetail.parse(input["exceptionDetail"]);
        const logs = MarshallingUtils.parseList(input["logs"], ReportLog);
        const children = MarshallingUtils.parseListPolymorphically<FeatureOrTestRunnerReportNode>(input["children"], {
            [RunnerReportNodeType[RunnerReportNodeType.FEATURE]]: ReportFeature,
            [RunnerReportNodeType[RunnerReportNodeType.TEST]]: ReportTest
        });

        return new ReportFeature(featureName, startTime, endTime, durationMillis, status, exceptionDetail, logs, children);
    }

}