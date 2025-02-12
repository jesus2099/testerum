package com.testerum.model.runner.tree.model

import com.fasterxml.jackson.annotation.JsonCreator
import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonProperty
import com.testerum.model.infrastructure.path.Path
import com.testerum.model.step.StepCall
import com.testerum.model.util.new_tree_builder.ContainerTreeNode
import com.testerum.model.util.new_tree_builder.TreeNode

data class RunnerRootNode @JsonCreator constructor(
    @JsonProperty("id")  override val id: String,
    @JsonProperty("name") val name: String,
    @JsonProperty("beforeAllHooks") override val beforeAllHooks: RunnerHooksNode,
    @JsonIgnore override val beforeEachStepCalls: List<StepCall>,
    @JsonIgnore override val afterEachStepCalls: List<StepCall>,
    @JsonProperty("afterAllHooks") override val afterAllHooks: RunnerHooksNode,
): RunnerNode, ContainerTreeNode, RunnerHooksContainerNode {

    override val path: Path = Path.EMPTY

    @JsonProperty("children") val children: MutableList<RunnerTestOrFeatureNode> = mutableListOf()

    override val childrenCount: Int
        get() = children.size

    override fun addChild(child: TreeNode) {
        val childAsBasicStepNode = child as? RunnerTestOrFeatureNode
            ?: throw IllegalArgumentException("attempted to add child node of unexpected type [${child.javaClass}]: [$child]")
        children += childAsBasicStepNode
    }
}
