package com.testerum.model.step

import com.fasterxml.jackson.annotation.JsonCreator
import com.fasterxml.jackson.annotation.JsonProperty
import com.testerum.model.enums.StepPhaseEnum
import com.testerum.model.infrastructure.path.Path
import com.testerum.model.text.StepPattern
import com.testerum.model.util.StepHashUtil
import com.testerum.model.warning.Warning

data class ComposedStepDef @JsonCreator constructor(@JsonProperty("path") override val path: Path,
                                                    @JsonProperty("phase") override val phase: StepPhaseEnum,
                                                    @JsonProperty("stepPattern") override val stepPattern: StepPattern,
                                                    @JsonProperty("description") override val description: String? = null,
                                                    @JsonProperty("tags") override val tags: List<String> = emptyList(),
                                                    @JsonProperty("stepCalls") val stepCalls: List<StepCall>,
                                                    @JsonProperty("warnings") override val warnings: List<Warning> = emptyList()): StepDef {

    override val id: String
        get() = StepHashUtil.calculateStepHash(phase, stepPattern)

    private val _descendantsHaveWarnings: Boolean = stepCalls.any { it.warnings.isNotEmpty() || it.descendantsHaveWarnings }

    @get:JsonProperty("descendantsHaveWarnings")
    override val descendantsHaveWarnings: Boolean
        get() = _descendantsHaveWarnings

    override fun toString() = buildString {
        append(phase)
        append(" ")
        append(stepPattern.toDebugString(varPrefix = "<<", varSuffix = ">>"))
    }
}