package com.testerum.service.step

import com.testerum.model.exception.ServerStateChangedException
import com.testerum.model.manual.operation.UpdateTestModel
import com.testerum.model.step.ComposedStepDef
import com.testerum.model.step.StepCall
import com.testerum.model.step.StepDef
import com.testerum.model.test.TestModel
import com.testerum.model.text.StepPattern
import com.testerum.service.step.impl.ComposedStepsService
import com.testerum.service.step.util.isStepPatternChangeCompatible
import com.testerum.service.tests.TestsService
import com.testerum.service.warning.WarningService

class StepUpdateService(private val stepService: StepService,
                        private val composedStepsService: ComposedStepsService,
                        private val testsService: TestsService,
                        private val stepUpdateCompatibilityService: StepUpdateCompatibilityService,
                        private val warningService: WarningService) {

    fun update(composedStepDef: ComposedStepDef): ComposedStepDef {
        val oldStepPath = composedStepDef.path

        val oldStep = stepService.getComposedStepByPath(oldStepPath) ?: throw ServerStateChangedException()

        val oldStepPattern = oldStep.stepPattern
        val newStepPattern = composedStepDef.stepPattern
        if(oldStepPattern == newStepPattern){
            val updatedStep = stepService.update(composedStepDef)

            return warningService.composedStepWithWarnings(updatedStep, keepExistingWarnings = true)
        }

        if (stepUpdateCompatibilityService.isOtherStepWithTheSameStepPattern(oldStepPattern, newStepPattern)) {
            throw ServerStateChangedException()
        }

        if (oldStepPattern.isStepPatternChangeCompatible(newStepPattern)) {
            updateTestsThatUsesOldStep(oldStep, composedStepDef)
            updateStepsThatUsesOldStep(oldStep, composedStepDef)
        }

        val updatedStep = stepService.update(composedStepDef)

        return warningService.composedStepWithWarnings(updatedStep, keepExistingWarnings = true)
    }

    private fun updateStepsThatUsesOldStep(oldStep: ComposedStepDef, newStep: ComposedStepDef) {
        val stepsThatUsesOldStep = stepUpdateCompatibilityService.findStepsThatUsesStepPatternAsDirectChild(oldStep.stepPattern)
        for (stepDefToUpdate in stepsThatUsesOldStep) {
            var updatedStepDef = stepDefToUpdate
            for ((index, stepCall) in stepDefToUpdate.stepCalls.withIndex()) {
                if (stepCall.stepDef.stepPattern == oldStep.stepPattern) {
                    updatedStepDef = updateStepPatternAtStepCall(updatedStepDef, index, newStep.stepPattern)
                }
            }
            composedStepsService.update(updatedStepDef)
        }
    }

    private fun updateStepPatternAtStepCall(stepDefToUpdate: ComposedStepDef, stepCallIndexToUpdate: Int, stepPattern: StepPattern): ComposedStepDef {
        val updateStepCalls: MutableList<StepCall> = stepDefToUpdate.stepCalls.toMutableList()
        val updateStepCallStepDef: StepDef = (updateStepCalls[stepCallIndexToUpdate].stepDef as ComposedStepDef).copy(stepPattern = stepPattern)
        updateStepCalls[stepCallIndexToUpdate] = updateStepCalls[stepCallIndexToUpdate].copy(stepDef = updateStepCallStepDef)
        return stepDefToUpdate.copy(stepCalls = updateStepCalls)
    }

    private fun updateTestsThatUsesOldStep(oldStep: ComposedStepDef, newStep: ComposedStepDef) {
        val testsThatUsesOldStep = stepUpdateCompatibilityService.findTestsThatUsesStepPatternAsChild(oldStep.stepPattern)
        for (testToUpdate in testsThatUsesOldStep) {
            var updatedTest = testToUpdate
            for ((index, stepCall) in testToUpdate.stepCalls.withIndex()) {
                if (stepCall.stepDef.stepPattern == oldStep.stepPattern) {
                    updatedTest = updateStepPatternAtStepCallForTest(updatedTest, index, newStep.stepPattern)
                }
            }
            testsService.updateTest(
                    UpdateTestModel(
                            updatedTest.path,
                            updatedTest
                    )
            )
        }
    }

    private fun updateStepPatternAtStepCallForTest(testToUpdate: TestModel, stepCallIndexToUpdate: Int, stepPattern: StepPattern): TestModel {
        val updateStepCalls: MutableList<StepCall> = testToUpdate.stepCalls.toMutableList()
        val updateStepCallStepDef: StepDef = (updateStepCalls[stepCallIndexToUpdate].stepDef as ComposedStepDef).copy(stepPattern = stepPattern)
        updateStepCalls[stepCallIndexToUpdate] = updateStepCalls[stepCallIndexToUpdate].copy(stepDef = updateStepCallStepDef)
        return testToUpdate.copy(stepCalls = updateStepCalls)
    }
}