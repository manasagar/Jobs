package com.Job.restservices.service;


import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Slf4j
@Component
public class EmbeddingService {

    private final RestTemplate restTemplate = new RestTemplate();
    private static final String OLLAMA_URL = "http://localhost:11434/api/embed";

    public List<List<Float>> embed(String text) {
        Map<String, Object> request = Map.of(
                "model", "nomic-embed-text",
                "input", text
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(request, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(OLLAMA_URL, entity, Map.class);
       // log.info("this {}",response);
        // Response is like:
        // {"embedding":[...vector...]}
        return (List<List<Float>>) response.getBody().get("embeddings");




    }
}
