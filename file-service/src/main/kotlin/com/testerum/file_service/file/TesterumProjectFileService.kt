package com.testerum.file_service.file

import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.SerializationFeature
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory
import com.fasterxml.jackson.dataformat.yaml.YAMLGenerator
import com.fasterxml.jackson.datatype.guava.GuavaModule
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import com.fasterxml.jackson.module.afterburner.AfterburnerModule
import com.fasterxml.jackson.module.kotlin.KotlinModule
import com.fasterxml.jackson.module.kotlin.readValue
import com.testerum.common_kotlin.createDirectories
import com.testerum.common_kotlin.doesNotExist
import com.testerum.common_kotlin.exists
import com.testerum.common_kotlin.isNotADirectory
import com.testerum.common_kotlin.writeText
import com.testerum.model.exception.ValidationException
import com.testerum.model.project.TesterumProject
import org.slf4j.LoggerFactory
import java.nio.file.Path as JavaPath

class TesterumProjectFileService {

    companion object {
        private val LOG = LoggerFactory.getLogger(TesterumProjectFileService::class.java)

        private val OBJECT_MAPPER: ObjectMapper = run {
            val yamlFactory = YAMLFactory().apply {
                configure(YAMLGenerator.Feature.WRITE_DOC_START_MARKER, false)
                configure(YAMLGenerator.Feature.USE_PLATFORM_LINE_BREAKS, false)
                configure(YAMLGenerator.Feature.MINIMIZE_QUOTES, true)
            }

            ObjectMapper(yamlFactory).apply {
                registerModule(AfterburnerModule())
                registerModule(KotlinModule())
                registerModule(JavaTimeModule())
                registerModule(GuavaModule())

                enable(SerializationFeature.INDENT_OUTPUT)
                setSerializationInclusion(JsonInclude.Include.NON_NULL)
                disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS)
                enable(SerializationFeature.WRITE_DATES_WITH_ZONE_ID)

                disable(DeserializationFeature.ADJUST_DATES_TO_CONTEXT_TIME_ZONE)
                enable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES)
            }
        }
    }

    fun load(directory: JavaPath): TesterumProject {
        if (!isTesterumProject(directory)) {
            throw ValidationException("The directory [${directory.toAbsolutePath().normalize()}] is not a Testerum project.")
        }

        try {
            val projectFile = projectFilePath(directory)

            return OBJECT_MAPPER.readValue(projectFile.toFile())
        } catch (e: Exception) {
            val errorMessage = "Failed to load [${directory.toAbsolutePath().normalize()}] as a Testerum project"
            LOG.error(errorMessage, e)

            throw ValidationException(errorMessage)
        }
    }

    fun save(project: TesterumProject, directory: JavaPath) {
        val serializedProject = OBJECT_MAPPER.writeValueAsString(project)

        val projectFile = projectFilePath(directory)
        projectFile.parent?.createDirectories()
        projectFile.writeText(serializedProject)
    }

    fun isTesterumProject(directory: JavaPath): Boolean {
        if (directory.doesNotExist) {
            return false
        }
        if (directory.isNotADirectory) {
            return false
        }

        val projectFile = projectFilePath(directory)

        return projectFile.exists
    }

    private fun projectFilePath(directory: JavaPath): JavaPath {
        return directory.resolve("Testerum-Project.yaml")
    }

}