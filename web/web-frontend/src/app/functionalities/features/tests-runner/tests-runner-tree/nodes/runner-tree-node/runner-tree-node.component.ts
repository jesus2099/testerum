import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {RunnerTreeNodeModel} from "../../model/runner-tree-node.model";
import {ExecutionStatusEnum} from "../../../../../../model/test/event/enums/execution-status.enum";
import {RunnerTreeComponentService} from "../../runner-tree.component-service";
import {RunnerComposedStepTreeNodeModel} from "../../model/runner-composed-step-tree-node.model";
import {RunnerBasicStepTreeNodeModel} from "../../model/runner-basic-step-tree-node.model";
import {ModelComponentMapping} from "../../../../../../model/infrastructure/model-component-mapping.model";
import {RunnerFeatureTreeNodeModel} from "../../model/runner-feature-tree-node.model";
import {Subscription} from "rxjs";
import {RunnerTestTreeNodeModel} from "../../model/runner-test-tree-node.model";
import {TestsRunnerService} from "../../../tests-runner.service";
import {RunnerTreeFilterModel} from "../../model/filter/runner-tree-filter.model";

@Component({
    moduleId: module.id,
    selector: 'runner-tree-node',
    templateUrl: 'runner-tree-node.component.html',
    styleUrls:[
        'runner-tree-node.component.scss',
        '../../../../../../generic/css/tree.scss'
    ]
})
export class RunnerTreeNodeComponent implements OnInit, OnDestroy {

    @Input() model:RunnerTreeNodeModel;
    @Input() modelComponentMapping: ModelComponentMapping;

    isSelected:boolean = false;

    RunnerTreeNodeStateEnum = ExecutionStatusEnum;

    constructor(private runnerTreeComponentService:RunnerTreeComponentService,
                private testsRunnerService: TestsRunnerService){}

    nodeSelectedSubscription: Subscription;
    runnerTreeFilterSubscription: Subscription;
    ngOnInit(): void {
        this.nodeSelectedSubscription = this.runnerTreeComponentService.selectedRunnerTreeNodeObserver.subscribe((selectedTreeNode: RunnerTreeNodeModel) => {
            this.isSelected = this.model.equals(selectedTreeNode);
        });
        this.runnerTreeFilterSubscription = this.testsRunnerService.treeFilterObservable.subscribe((filter: RunnerTreeFilterModel) => {
            this.model.calculateNodeVisibilityBasedOnFilter(filter)
        });
    }

    ngOnDestroy(): void {
        if (this.nodeSelectedSubscription != null) {
            this.nodeSelectedSubscription.unsubscribe();
        }
        if (this.runnerTreeFilterSubscription != null) {
            this.runnerTreeFilterSubscription.unsubscribe();
        }
    }

    isFeatureNode(): boolean {
        return this.model instanceof RunnerFeatureTreeNodeModel;
    }

    isTestNode(): boolean {
        return this.model instanceof RunnerTestTreeNodeModel;
    }
    isStepNode(): boolean {
        return this.model instanceof RunnerComposedStepTreeNodeModel || this.model instanceof RunnerBasicStepTreeNodeModel
    }
    isOpenedNode(): boolean {
        return this.model.jsonTreeNodeState.showChildren
    }

    getStatusTooltip(): string {
        switch (this.model.state) {
            case ExecutionStatusEnum.WAITING: return "Waiting";
            case ExecutionStatusEnum.EXECUTING : return "Executing";
            case ExecutionStatusEnum.PASSED: return "Passed";
            case ExecutionStatusEnum.FAILED: return "Failed";
            case ExecutionStatusEnum.DISABLED: return "Disabled";
            case ExecutionStatusEnum.UNDEFINED: return "Undefined steps";
            case ExecutionStatusEnum.SKIPPED: return "Skipped";

            default: return "";
        }
    }

    collapseNode() {
        this.model.jsonTreeNodeState.showChildren = !this.model.jsonTreeNodeState.showChildren
    }

    setSelected() {
        this.runnerTreeComponentService.setNodeAsSelected(this.model);
    }

}