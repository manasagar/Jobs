package com.Job.restservices.config;
import io.qdrant.client.QdrantClient;
import io.qdrant.client.QdrantGrpcClient;
import io.qdrant.client.grpc.Collections.*;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
import java.util.concurrent.ExecutionException;

@Configuration
public class RagConfig {

    @Value("${qdrant.host}")
    private String host;

    @Value("${qdrant.port}")
    private int port;

    @Value("${qdrant.api-key:}")
    private String apiKey;



    @Bean
    public QdrantClient qdrantClient() {
        return  new QdrantClient(
                QdrantGrpcClient.newBuilder("localhost", 6334, false).build());

    }

}
