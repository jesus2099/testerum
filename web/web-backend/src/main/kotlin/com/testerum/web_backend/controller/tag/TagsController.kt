package com.testerum.web_backend.controller.tag

import com.testerum.service.tags.TagsService
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/tags")
class TagsController(private val tagsService: TagsService) {

    @RequestMapping(method = [RequestMethod.GET], path = [""])
    fun get(): List<String> {
        return tagsService.getAllTags()
    }

}