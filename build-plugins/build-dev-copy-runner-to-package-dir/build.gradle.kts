plugins {
    `kotlin-dsl`
}

repositories {
    jcenter()
    gradlePluginPortal()
}

kotlinDslPluginOptions {
    experimentalWarning.set(false)
}

gradlePlugin {
    plugins {
        register("buildDevCopyRunnerToPackageDir") {
            id = "com.testerum.build-dev-copy-runner-to-package-dir"
            implementationClass = "com.testerum.build_plugins.copy_runner.CopyRunnerToPackageDirPlugin"
            displayName = "build-dev-copy-runner-to-package-dir"
            description = "Testerum plugin to copy runner & dependencies to the package dir"
        }
    }
}