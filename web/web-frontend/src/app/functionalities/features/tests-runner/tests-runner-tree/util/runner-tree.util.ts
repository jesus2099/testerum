import {RunnerRootNode} from "../../../../../model/runner/tree/runner-root-node.model";
import {RunnerRootTreeNodeModel} from "../model/runner-root-tree-node.model";
import {RunnerTreeContainerNodeModel} from "../model/runner-tree-container-node.model";
import {RunnerNode} from "../../../../../model/runner/tree/runner-node.model";
import {RunnerTreeNodeModel} from "../model/runner-tree-node.model";
import {RunnerFeatureNode} from "../../../../../model/runner/tree/runner-feature-node.model";
import {RunnerFeatureTreeNodeModel} from "../model/runner-feature-tree-node.model";
import {JsonTreeModel} from "../../../../../generic/components/json-tree/model/json-tree.model";
import {RunnerTestNode} from "../../../../../model/runner/tree/runner-test-node.model";
import {RunnerComposedStepNode} from "../../../../../model/runner/tree/runner-composed-step-node.model";
import {RunnerTestTreeNodeModel} from "../model/runner-test-tree-node.model";
import {RunnerComposedStepTreeNodeModel} from "../model/runner-composed-step-tree-node.model";
import {RunnerBasicStepTreeNodeModel} from "../model/runner-basic-step-tree-node.model";
import {RunnerBasicStepNode} from "../../../../../model/runner/tree/runner-basic-step-node.model";
import {RunnerUndefinedStepNode} from "../../../../../model/runner/tree/runner-undefined-step-node.model";

export class RunnerTreeUtil {

    static mapServerModelToTreeModel(runnerRootNode: RunnerRootNode, treeModel:JsonTreeModel): JsonTreeModel {

        treeModel.children.length = 0;

        let rootTreeNode = new RunnerRootTreeNodeModel(treeModel);
        rootTreeNode.id = "TestSuite";

        RunnerTreeUtil.mapServerNodeChildrenToTreeModel(runnerRootNode, rootTreeNode);

        treeModel.children.push(rootTreeNode);
        return treeModel;
    }

    private static mapServerNodeChildrenToTreeModel(parentServerNode: RunnerNode, parentTreeNode: RunnerTreeNodeModel) {

        let serverNodeChildren: RunnerNode[] = null;
        if (parentServerNode instanceof RunnerRootNode ||
            parentServerNode instanceof RunnerFeatureNode ||
            parentServerNode instanceof RunnerTestNode ||
            parentServerNode instanceof RunnerComposedStepNode) {
            serverNodeChildren = parentServerNode.children;
        }

        if (serverNodeChildren == null) {
            return;
        }
        let parentTreeContainerNode: RunnerTreeContainerNodeModel = parentTreeNode as RunnerTreeContainerNodeModel;
        parentTreeContainerNode.getChildren().length = 0;
        for (const serverChildNode of serverNodeChildren) {
            let childTreeNode = this.createTreeNodeFromServerNode(serverChildNode, parentTreeContainerNode);
            parentTreeContainerNode.getChildren().push(childTreeNode);

            this.mapServerNodeChildrenToTreeModel(serverChildNode, childTreeNode);
        }
    }

    private static createTreeNodeFromServerNode(serverNode: RunnerNode, parentNode: RunnerTreeContainerNodeModel): RunnerTreeNodeModel {
        let treeNode: RunnerTreeNodeModel;

        if (serverNode instanceof RunnerFeatureNode) {
            let featureTreeNode = new RunnerFeatureTreeNodeModel(parentNode);
            featureTreeNode.text = serverNode.name;

            treeNode = featureTreeNode;
        }

        if (serverNode instanceof RunnerTestNode) {
            let testTreeNode = new RunnerTestTreeNodeModel(parentNode);
            testTreeNode.text = serverNode.name;
            testTreeNode.getNodeState().showChildren = false;

            treeNode = testTreeNode;
        }

        if (serverNode instanceof RunnerComposedStepNode) {
            let composedStepTreeNode = new RunnerComposedStepTreeNodeModel(parentNode);
            composedStepTreeNode.stepCall = serverNode.stepCall;
            composedStepTreeNode.getNodeState().showChildren = false;

            treeNode = composedStepTreeNode;
        }

        if (serverNode instanceof RunnerBasicStepNode || serverNode instanceof RunnerUndefinedStepNode) {
            let basicStepTreeNode = new RunnerBasicStepTreeNodeModel(parentNode);
            basicStepTreeNode.stepCall = serverNode.stepCall;

            treeNode = basicStepTreeNode;
        }

        if (treeNode == null) {
            throw new Error("Couldn't map the current instance to a tree node ["+JSON.stringify(serverNode)+"]");
        }

        treeNode.id = serverNode.id;
        treeNode.path = serverNode.path;

        return treeNode;
    }

    static getTreeTestNodes(runnerRootTreeNodeModel: RunnerRootTreeNodeModel): RunnerTestTreeNodeModel[] {
        let result: RunnerTestTreeNodeModel[] = [];
        this.addTreeTestsToResultsOfContainer(runnerRootTreeNodeModel, result);
        return result;
    }

    private static addTreeTestsToResultsOfContainer(parentNode: RunnerTreeContainerNodeModel, result: RunnerTestTreeNodeModel[]) {
        for (const childNode of parentNode.getChildren()) {
            if (childNode instanceof RunnerFeatureTreeNodeModel) {
                this.addTreeTestsToResultsOfContainer(childNode, result);
            }

            if (childNode instanceof RunnerTestTreeNodeModel) {
                result.push(childNode)
            }
        }
    }
}