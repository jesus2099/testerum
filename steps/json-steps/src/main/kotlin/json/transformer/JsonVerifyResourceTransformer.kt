package json.transformer

import com.fasterxml.jackson.databind.JsonNode
import com.testerum.model.expressions.json.util.JSON_STEPS_OBJECT_MAPPER
import com.testerum.step_transformer_utils.JsonVariableReplacer
import com.testerum_api.testerum_steps_api.transformer.ParameterInfo
import com.testerum_api.testerum_steps_api.transformer.Transformer
import json.model.JsonVerifyResource
import json_support.module_di.JsonStepsModuleServiceLocator

class JsonVerifyResourceTransformer: Transformer<JsonVerifyResource> {

    private val jsonVariableReplacer: JsonVariableReplacer = JsonStepsModuleServiceLocator.bootstrapper.jsonStepsModuleFactory.jsonVariableReplacer

    override fun canTransform(paramInfo: ParameterInfo): Boolean
            = (paramInfo.type == JsonVerifyResource::class.java)

    override fun transform(toTransform: String, paramInfo: ParameterInfo): JsonVerifyResource {
        val rootNode: JsonNode = JSON_STEPS_OBJECT_MAPPER.readTree(toTransform)

        jsonVariableReplacer.replaceVariables(rootNode)

        val serializedJson: String = JSON_STEPS_OBJECT_MAPPER.writeValueAsString(rootNode)

        return JsonVerifyResource(serializedJson)
    }
}
