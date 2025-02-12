package http.mock.transformer

import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.ObjectMapper
import com.testerum.common_json.ObjectMapperFactory
import com.testerum.model.resources.http.mock.stub.HttpMock
import com.testerum_api.testerum_steps_api.transformer.ParameterInfo
import com.testerum_api.testerum_steps_api.transformer.Transformer
import http_support.module_di.HttpStepsModuleServiceLocator

class HttpMockTransformer: Transformer<HttpMock> {

    private val objectMapper: ObjectMapper = ObjectMapperFactory.RESOURCE_OBJECT_MAPPER
    private val jsonVariableReplacer = HttpStepsModuleServiceLocator.bootstrapper.httpStepsModuleFactory.jsonVariableReplacer

    override fun canTransform(paramInfo: ParameterInfo): Boolean
            = (paramInfo.type == HttpMock::class.java)

    override fun transform(toTransform: String, paramInfo: ParameterInfo): HttpMock {
        val rootNode: JsonNode = objectMapper.readTree(toTransform)

        jsonVariableReplacer.replaceVariables(rootNode)

        return objectMapper.treeToValue(rootNode, HttpMock::class.java)
    }

}
