/*
 * This file was generated by the Gradle 'init' task.
 */

plugins {
    id("com.testerum.java-conventions")
}

dependencies {
    implementation(project(":common-jdk"))
    implementation(project(":common-cmdline"))
    implementation(project(":common-json"))
    implementation(project(":common-httpclient"))
    implementation(project(":common-rdbms"))
    implementation(project(":model"))
    implementation(project(":settings"))
    implementation(project(":file-service"))
    implementation(project(":project-manager"))
    implementation(project(":common-expression-evaluator"))
    implementation(project(":cloud-client"))
    implementation(project(":common-fsnotifier"))
    implementation(project(":common-profiles"))
    implementation(project(":common-angular"))
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.4.10")
    implementation("org.jetbrains.kotlin:kotlin-reflect:1.4.10")
    implementation("commons-fileupload:commons-fileupload:1.3.3")
    implementation("commons-io:commons-io:2.6")
    implementation("org.springframework:spring-context:5.2.8.RELEASE")
    implementation("org.springframework:spring-orm:5.2.8.RELEASE")
    implementation("org.springframework:spring-web:5.2.8.RELEASE")
    implementation("org.springframework:spring-webmvc:5.2.8.RELEASE")
    implementation("org.springframework:spring-context-support:5.2.8.RELEASE")
    implementation("org.springframework:spring-websocket:5.2.8.RELEASE")
    implementation("org.springframework:spring-messaging:5.2.8.RELEASE")
    implementation("com.fasterxml.jackson.core:jackson-annotations:2.11.3")
    implementation("com.fasterxml.jackson.core:jackson-core:2.11.3")
    implementation("com.fasterxml.jackson.core:jackson-databind:2.11.3")
    implementation("com.fasterxml.jackson.datatype:jackson-datatype-jsr310:2.11.3")
    implementation("com.fasterxml.jackson.module:jackson-module-afterburner:2.11.3")
    implementation("org.slf4j:slf4j-api:1.7.25")
    implementation("org.logback-extensions:logback-ext-spring:0.1.1")
    implementation("javax.servlet:javax.servlet-api:4.0.1")
    implementation("org.zeroturnaround:zt-exec:1.10")
    implementation("org.zeroturnaround:zt-process-killer:1.8")
    implementation("org.eclipse.jetty:jetty-server:9.4.27.v20200227")
    implementation("org.eclipse.jetty:jetty-servlet:9.4.27.v20200227")
    implementation("org.eclipse.jetty.websocket:javax-websocket-server-impl:9.4.27.v20200227")
    implementation(project(":assertion-steps"))
    implementation(project(":debug-steps"))
    implementation(project(":http-steps"))
    implementation(project(":json-steps"))
    implementation(project(":rdbms-steps"))
    implementation(project(":selenium-steps"))
    implementation(project(":util-steps"))
    implementation(project(":vars-steps"))
    implementation(project(":test-steps"))
    runtimeOnly(project(":web-launcher"))
    runtimeOnly("org.springframework:spring-test:5.2.8.RELEASE")
    runtimeOnly("org.slf4j:jcl-over-slf4j:1.7.25")
    runtimeOnly("org.slf4j:log4j-over-slf4j:1.7.25")
    runtimeOnly("ch.qos.logback:logback-classic:1.2.2")
    runtimeOnly("ch.qos.logback:logback-core:1.2.2")
    testImplementation("org.junit.jupiter:junit-jupiter-api:5.6.2")
    testImplementation("org.junit.jupiter:junit-jupiter-params:5.6.2")
    testImplementation("org.junit.jupiter:junit-jupiter-engine:5.6.2")
    testImplementation("org.junit.platform:junit-platform-launcher:1.6.2")
    testImplementation("org.assertj:assertj-core")
}

description = "web-backend"
