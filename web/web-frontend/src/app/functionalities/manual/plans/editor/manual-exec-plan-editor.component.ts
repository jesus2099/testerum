import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {SelectTestsTreeRunnerService} from "../../../../manual-tests/runner/editor/select-tests-tree/select-tests-tree-runner.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ManualTestsRunnerService} from "../../../../manual-tests/runner/service/manual-tests-runner.service";
import {ManualTestsOverviewService} from "../../../../manual-tests/runner/overview/manual-tests-overview.service";
import {ManualTestsRunnerStatus} from "../../../../manual-tests/runner/model/enums/manual-tests-runner-status.enum";
import {ManualExecPlan} from "../model/manual-exec-plan.model";
import {ManualExecPlansService} from "../../service/manual-exec-plans.service";
import {UrlService} from "../../../../service/url.service";
import {MarkdownEditorComponent} from "../../../../generic/components/markdown-editor/markdown-editor.component";
import {AreYouSureModalService} from "../../../../generic/components/are_you_sure_modal/are-you-sure-modal.service";
import {AreYouSureModalEnum} from "../../../../generic/components/are_you_sure_modal/are-you-sure-modal.enum";

@Component({
    selector: 'manual-exec-plan-editor',
    templateUrl: './manual-exec-plan-editor.component.html',
    styleUrls: ['./manual-exec-plan-editor.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ManualExecPlanEditorComponent implements OnInit {

    model: ManualExecPlan = new ManualExecPlan();

    isEditMode: boolean = false;
    isFinalized: boolean = false;
    isCreateAction: boolean = false;

    pieChartData: any;

    @ViewChild(MarkdownEditorComponent) markdownEditor: MarkdownEditorComponent;

    markdownEditorOptions = {
        status: false,
        spellChecker: false
    };

    constructor(private router: Router,
                private route: ActivatedRoute,
                private urlService: UrlService,
                private manualExecPlansService: ManualExecPlansService,
                private manualTestsRunnerService: ManualTestsRunnerService,
                private manualTestsOverviewService: ManualTestsOverviewService,
                private areYouSureModalService: AreYouSureModalService,
                public selectTestsTreeRunnerService: SelectTestsTreeRunnerService) {
    }

    ngOnInit(): void {

        this.route.data.subscribe(data => {
            let manualTestsRunner = data['manualExecPlan'];

            this.pieChartData = {
                labels: ['Passed Tests', 'Failed Tests', 'Blocked Tests', "Not Applicable Tests", "Not Executed"],
                datasets: [{
                    data: [
                        manualTestsRunner.passedTests,
                        manualTestsRunner.failedTests,
                        manualTestsRunner.blockedTests,
                        manualTestsRunner.notApplicableTests,
                        manualTestsRunner.notExecutedTests
                    ],
                    backgroundColor: ["#5cb85c", "#FF6384", "#FFCE56", "#36A2EB", "#c0bebc"],
                    hoverBackgroundColor: ["#5cb85c", "#FF6384", "#FFCE56", "#36A2EB", "#c0bebc"]
                }]
            };

            this.initialize(manualTestsRunner);
        });
    }

    private initialize(manualTestsRunner: ManualExecPlan) {
        this.model = manualTestsRunner;

        this.setEditMode(this.model.path.isEmpty());
        this.isFinalized = manualTestsRunner.status == ManualTestsRunnerStatus.FINISHED;

        this.isCreateAction = this.model.path.isEmpty();

        this.pieChartData.datasets[0].data[0] = this.model.passedTests;
        this.pieChartData.datasets[0].data[1] = this.model.failedTests;
        this.pieChartData.datasets[0].data[2] = this.model.blockedTests;
        this.pieChartData.datasets[0].data[3] = this.model.notApplicableTests;
        this.pieChartData.datasets[0].data[4] = this.model.notExecutedTests
    }

    setEditMode(editMode: boolean) {
        this.isEditMode = editMode;
        this.selectTestsTreeRunnerService.isEditMode = editMode;
        this.markdownEditor.setEditMode(editMode);
    }

    enableEditTestMode(): void {
        this.setEditMode(true);
    }

    navigateToExecutorMode() {
        this.urlService.navigateToManualExecPlanRunner(this.model.path);
    }

    cancelAction(): void {
        if (this.isCreateAction) {
            this.urlService.navigateToManualExecPlanCreate();
        } else {
            this.manualExecPlansService.getManualExecPlan(this.model.path).subscribe(
                (result: ManualExecPlan) => {
                    this.initialize(result);
                    this.setEditMode(false);
                }
            )
        }
    }

    deleteAction(): void {
        this.areYouSureModalService.showAreYouSureModal(
            "Delete Runner",
            "Are you sure you want to delete this Manual Tests Runner?")
            .subscribe((event: AreYouSureModalEnum) => {
                if (event == AreYouSureModalEnum.OK) {
                    this.manualExecPlansService.deleteManualExecPlan(this.model.path).subscribe(result => {
                        this.manualTestsOverviewService.initializeRunnersOverview();
                        this.router.navigate(["/manual/runner"]);
                    });
                }
            });
    }

    finalize(): void {
        // this.areYouSureModalComponent.show(
        //     "Finalize Execution",
        //     "Are you sure you want to finalize this Tests Execution?",
        //     (action: AreYouSureModalEnum): void => {
        //         if (action == AreYouSureModalEnum.OK) {
        //             this.manualTestsRunnerService
        //                 .finalize(this.model)
        //                 .subscribe(savedModel => this.afterSaveHandler(savedModel));
        //         }
        //     }
        // );
    }

    bringBackInExecution(): void {
        // this.manualTestsRunnerService
        //     .bringBackInExecution(this.model)
        //     .subscribe(savedModel => this.afterSaveHandler(savedModel));
    }

    saveAction(): void {
        // this.model.testsToExecute = this.selectTestsTreeRunnerService.getSelectedTests();
        //
        // this.manualTestsRunnerService
        //     .save(this.model)
        //     .subscribe(savedModel => this.afterSaveHandler(savedModel));
    }

    private afterSaveHandler(savedManualTestRunner: ManualExecPlan) {
        this.initialize(savedManualTestRunner);
        this.manualTestsOverviewService.initializeRunnersOverview();
        this.setEditMode(false);
        this.router.navigate(["/manual/runner/show", {path: savedManualTestRunner.path.toString()}]);
    }

}