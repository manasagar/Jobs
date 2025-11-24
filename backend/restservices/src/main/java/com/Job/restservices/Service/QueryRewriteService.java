package com.Job.restservices.service;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class QueryRewriteService {
    @Autowired
    @Qualifier("geminiClient")
    Client client;



    public String rewriteQuery(String query) {
        String prompt = """
            Rewrite this tech/job search query to include relevant technologies,
            frameworks, and tools.

            Query: "%s"
            """.formatted(query);

        try {

            GenerateContentResponse response =client.models.generateContent("gemini-2.5-flash", prompt, null);
            return response.text();
        } catch (Exception e) {
            throw new RuntimeException("Error rewriting query: " + e.getMessage());
        }
    }
}
