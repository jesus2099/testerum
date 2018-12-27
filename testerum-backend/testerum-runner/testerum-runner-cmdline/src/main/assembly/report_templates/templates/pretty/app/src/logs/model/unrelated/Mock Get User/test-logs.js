receiveModel([{"time":"2018-12-27T11:13:11.175","logLevel":"INFO","message":"Executing test Mock Get User"},{"time":"2018-12-27T11:13:11.176","logLevel":"INFO","message":"11:13:11.176 [main] INFO com.testerum.runner_cmdline.runner_tree.nodes.hook.RunnerHook - start executing hook HookDef(phase=BEFORE_EACH_TEST, className=http.mock.HttpMockSteps, methodName=beforeTest, order=1000000, description=null)"},{"time":"2018-12-27T11:13:11.176","logLevel":"INFO","message":"11:13:11.176 [main] INFO com.testerum.runner_cmdline.runner_tree.nodes.hook.RunnerHook - done executing hook HookDef(phase=BEFORE_EACH_TEST, className=http.mock.HttpMockSteps, methodName=beforeTest, order=1000000, description=null)"},{"time":"2018-12-27T11:13:11.176","logLevel":"INFO","message":""},{"time":"2018-12-27T11:13:11.177","logLevel":"INFO","message":"Executing step BASIC: GIVEN the HTTP Mock Server <<httpMockServer = file:Sample Mock Server.http.mock.server.yaml>> with the Mock Request <<httpMock = {\"expectedRequest\":{\"method\":\"GET\",\"url\":\"/users/([0-9]+)\"},\"mockResponse\":{\"statusCode\":200,\"headers\":{\"Content-Type\":\"application/json\"},\"body\":{\"bodyType\":\"JSON\",\"content\":\"{\\n    \\\"userName\\\": \\\"Ionut Pruteanu\\\",\\n    \\\"email\\\": \\\"ipruteanu@testerum.com\\\"\\n}\"}}}>>"},{"time":"2018-12-27T11:13:11.288","logLevel":"INFO","message":"Finished executing step BASIC: GIVEN the HTTP Mock Server <<httpMockServer = file:Sample Mock Server.http.mock.server.yaml>> with the Mock Request <<httpMock = {\"expectedRequest\":{\"method\":\"GET\",\"url\":\"/users/([0-9]+)\"},\"mockResponse\":{\"statusCode\":200,\"headers\":{\"Content-Type\":\"application/json\"},\"body\":{\"bodyType\":\"JSON\",\"content\":\"{\\n    \\\"userName\\\": \\\"Ionut Pruteanu\\\",\\n    \\\"email\\\": \\\"ipruteanu@testerum.com\\\"\\n}\"}}}>>"},{"time":"2018-12-27T11:13:11.289","logLevel":"INFO","message":"Executing step BASIC: WHEN I execute <<httpRequest = {\"method\":\"GET\",\"url\":\"http://localhost:12121/users/1\"}>> HTTP Request"},{"time":"2018-12-27T11:13:11.332","logLevel":"INFO","message":"HTTP Request [\nGET http://localhost:12121/users/1\n\n]"},{"time":"2018-12-27T11:13:11.339","logLevel":"INFO","message":"HTTP Response [\nHTTP/1.1 200\nContent-Type: application/json\nVary: Accept-Encoding, User-Agent\nTransfer-Encoding: chunked\nServer: Jetty(9.2.z-SNAPSHOT)\n\n{\n  \"userName\" : \"Ionut Pruteanu\",\n  \"email\" : \"ipruteanu@testerum.com\"\n}\n]"},{"time":"2018-12-27T11:13:11.339","logLevel":"INFO","message":"Http Request executed successfully"},{"time":"2018-12-27T11:13:11.339","logLevel":"INFO","message":"Finished executing step BASIC: WHEN I execute <<httpRequest = {\"method\":\"GET\",\"url\":\"http://localhost:12121/users/1\"}>> HTTP Request"},{"time":"2018-12-27T11:13:11.34","logLevel":"INFO","message":"Executing step BASIC: THEN I expect <<httpResponseVerify = {\"expectedStatusCode\":200,\"expectedBody\":{\"httpBodyVerifyMatchingType\":\"JSON_VERIFY\",\"httpBodyType\":\"JSON\",\"bodyVerify\":\"{\\\"=compareMode\\\":\\\"exact\\\",\\\"userName\\\":\\\"Ionut Pruteanu\\\",\\\"email\\\":\\\"ipruteanu@testerum.com\\\"}\"}}>> HTTP Response"},{"time":"2018-12-27T11:13:11.409","logLevel":"INFO","message":"Finished executing step BASIC: THEN I expect <<httpResponseVerify = {\"expectedStatusCode\":200,\"expectedBody\":{\"httpBodyVerifyMatchingType\":\"JSON_VERIFY\",\"httpBodyType\":\"JSON\",\"bodyVerify\":\"{\\\"=compareMode\\\":\\\"exact\\\",\\\"userName\\\":\\\"Ionut Pruteanu\\\",\\\"email\\\":\\\"ipruteanu@testerum.com\\\"}\"}}>> HTTP Response"},{"time":"2018-12-27T11:13:11.41","logLevel":"INFO","message":"11:13:11.410 [main] INFO com.testerum.runner_cmdline.runner_tree.nodes.hook.RunnerHook - start executing hook HookDef(phase=AFTER_EACH_TEST, className=selenium.actions.hooks.WebDriverShutdownHook, methodName=destroyWebDriver, order=2147483647, description=null)"},{"time":"2018-12-27T11:13:11.41","logLevel":"INFO","message":"11:13:11.410 [main] INFO com.testerum.runner_cmdline.runner_tree.nodes.hook.RunnerHook - done executing hook HookDef(phase=AFTER_EACH_TEST, className=selenium.actions.hooks.WebDriverShutdownHook, methodName=destroyWebDriver, order=2147483647, description=null)"},{"time":"2018-12-27T11:13:11.41","logLevel":"INFO","message":""},{"time":"2018-12-27T11:13:11.411","logLevel":"INFO","message":"Finished executing test Mock Get User"},]);