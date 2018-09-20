package com.testerum.web_backend.services.initializers.settings

import com.testerum.api.test_context.settings.model.SettingDefinition
import com.testerum.api.test_context.settings.model.SettingType
import com.testerum.file_service.file.SettingsFileService
import com.testerum.settings.SettingsManager
import com.testerum.settings.SettingsManagerModifier
import com.testerum.settings.keys.SystemSettingKeys
import org.slf4j.LoggerFactory
import java.nio.file.Paths
import java.nio.file.Path as JavaPath

class SettingsManagerInitializer(private val settingsFileService: SettingsFileService,
                                 private val settingsManager: SettingsManager,
                                 private val settingsDir: JavaPath) {

    companion object {
        private val LOG = LoggerFactory.getLogger(SettingsManagerInitializer::class.java)
    }

    fun initialize() {
        LOG.info("initializing settings...")

        val startTimeMillis = System.currentTimeMillis()

        val settingsValuesFromFile = settingsFileService.loadSettings(settingsDir)

        settingsManager.modify {
            configureSystemSettings(this)
            setValues(settingsValuesFromFile)
        }

        val endTimeMillis = System.currentTimeMillis()

        LOG.info("loading ${settingsManager.getSettings().size} settings took ${endTimeMillis - startTimeMillis} ms")
    }

    private fun configureSystemSettings(modifier: SettingsManagerModifier) {
        val testerumInstallDir = System.getProperty(SystemSettingKeys.TESTERUM_INSTALL_DIR)
                ?.let { Paths.get(it).toAbsolutePath().normalize() }
                ?: throw RuntimeException("the system property ${SystemSettingKeys.TESTERUM_INSTALL_DIR} is missing")

        modifier.registerDefinition(
                SettingDefinition(
                        key = SystemSettingKeys.TESTERUM_INSTALL_DIR,
                        type = SettingType.FILESYSTEM_DIRECTORY,
                        defaultValue = testerumInstallDir.toString(),
                        description = "Directory where Testerum is installed",
                        category = "Application"
                )
        )
        modifier.registerDefinition(
                SettingDefinition(
                        key = SystemSettingKeys.BUILT_IN_BASIC_STEPS_DIR,
                        type = SettingType.FILESYSTEM_DIRECTORY,
                        defaultValue = "{{${SystemSettingKeys.TESTERUM_INSTALL_DIR}}}/basic_steps",
                        description = "Directory where the built-in Basic Steps jar files and dependencies are located",
                        category = "Application"
                )
        )
        modifier.registerDefinition(
                SettingDefinition(
                        key = SystemSettingKeys.REPOSITORY_DIR,
                        type = SettingType.FILESYSTEM_DIRECTORY,
                        defaultValue = "",
                        description = "Directory path where all your work will be saved",
                        category = "Application"
                )
        )
        modifier.registerDefinition(
                SettingDefinition(
                        key = SystemSettingKeys.JDBC_DRIVERS_DIR,
                        type = SettingType.FILESYSTEM_DIRECTORY,
                        defaultValue = "{{${SystemSettingKeys.TESTERUM_INSTALL_DIR}}}/relational_database_drivers",
                        description = "Directory where the JDBC Drivers jar files and their descriptors are located",
                        category = "Relational Database"
                )
        )
    }


}