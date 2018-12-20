import {ExecutionStatus} from "../../../../../../../../common/testerum-model/model/report/execution-status";
import {ReportLog} from "../../../../../../../../common/testerum-model/model/report/report-log";
import {ReportGridNodeType} from "./enums/report-grid-node-type.enum";

export class ReportGridNodeData {
    textAsHtml: string;
    status: ExecutionStatus;
    durationMillis: number;
    logs: Array<ReportLog>;
    nodeType: ReportGridNodeType;
}