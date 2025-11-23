package com.Job.restservices.service;
import static io.qdrant.client.ValueFactory.value;

import com.Job.restservices.entity.JobApplications;
import com.Job.restservices.entity.JobDetails;
import com.Job.restservices.entity.Resume;
import com.Job.restservices.repository.JobApplicationsRepository;
import com.Job.restservices.repository.JobDetailsRepository;
import com.Job.restservices.repository.ResumeRepository;
import com.google.common.util.concurrent.ListenableFuture;
import io.qdrant.client.QdrantClient;
import io.qdrant.client.grpc.Collections;
import io.qdrant.client.grpc.Points;
import lombok.extern.slf4j.Slf4j;
import opennlp.tools.sentdetect.SentenceDetectorME;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import static io.qdrant.client.PointIdFactory.id;
import static io.qdrant.client.VectorsFactory.vectors;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@Slf4j
@Service
public class ResumeService {
    @Autowired
    JobApplicationsRepository jobApplicationsRepository;
    @Autowired
    JobDetailsRepository jobDetailsRepository;
    @Autowired
    QdrantClient qdrantClient;
    @Autowired
    EmbeddingService embeddingService;
    @Autowired
    SentenceDetectorME sentenceDetectorME;
    private  List<String> chunking(String text){
        String [] sentences=sentenceDetectorME.sentDetect(text);
        StringBuilder currentChunk = new StringBuilder();
        List<String> chunks = new ArrayList<>();
        List<List<Float> >embeddings=new ArrayList<>(chunks.size());
        int maxWords=100;
        int wordCount=0;
        for(String sentence:sentences){
            int sentenceWordCount=sentence.split("\\s+").length;
            if(wordCount+sentenceWordCount>maxWords){
                chunks.add(currentChunk.toString().trim());
                currentChunk = new StringBuilder();
                wordCount = 0;
            }
            currentChunk.append(sentence).append(" ");
            wordCount += sentenceWordCount;
        }
        if (currentChunk.length() > 0) {
            chunks.add(currentChunk.toString().trim());
        }
      return chunks;
    }
    private void advanceVectorStore(Long id,List<String>chunks,String name){
        List<Points.PointStruct> points=new ArrayList<>(chunks.size());
        for(int i=0;i<chunks.size();i++){
            long unique = ((id << 5) |i);
            List<Float> floatVector = new ArrayList<>();
            List<Float>embed=embeddingService.embed(chunks.get(i)).get(0);
            for (Number d : embed) {
                floatVector.add(d.floatValue());
            }
            points.add(
                    Points.PointStruct.newBuilder()
                            .setId(id(unique))
                            .setVectors(vectors(floatVector))
                            .putAllPayload(Map.of("resumeId",value(id),"chunkIndex",value(i),"text",value(chunks.get(i))))
                            .build()
            );
        }
        ListenableFuture<Points.UpdateResult> updateResult = qdrantClient.upsertAsync(name,points);
        log.info("this is it {}",updateResult.toString());
    }
    private void vectorStore(String text,Long id){
        List<Float> floatVector = new ArrayList<>();
       List<Float> embeddingList= embeddingService.embed(text).get(0);
        for (Number d : embeddingList) {
            floatVector.add(d.floatValue());
        }
       List<Points.PointStruct> points = List.of(Points.PointStruct.newBuilder()
                .setId(id(id))
                .setVectors(vectors(floatVector))
                .putAllPayload(Map.of(
                        "text", value(text)
                ))
                .build());
        ListenableFuture<Points.UpdateResult> updateResult = qdrantClient.upsertAsync("{test}",points);
        log.info("this is it {}",updateResult.toString());

    }
    public void updateResume(String resume,Long id,String name) throws Exception {
      advanceVectorStore(id,chunking(resume),name);
        return;
    }
    public void addJob(String jobDescription,Long id){
        vectorStore(jobDescription,id);
    }
    public List<JobApplications> queryApplications(String text, String name) throws ExecutionException, InterruptedException {
        List<Float> embeddingList= embeddingService.embed(text).get(0);
        List<Float> floatVector = new ArrayList<>();
        for (Number d : embeddingList) {
            floatVector.add(d.floatValue());
        }
        log.info("heaven {}",floatVector);
        List<Points.ScoredPoint> points =
                qdrantClient
                        .searchAsync(
                                Points.SearchPoints.newBuilder()
                                        .setCollectionName(name)
                                        .addAllVector(floatVector)
                                        .setLimit(5)
                                        .build()).get();


        List<Long> ids = points.stream()
                .map(p -> p.getId().getNum()/32)  // extract 'num' field from id
                .collect(Collectors.toList());
        log.info("hell {}",ids);
        return jobApplicationsRepository.getApplications(ids);
    }
    public List<JobDetails>queryJobs(String text) throws ExecutionException, InterruptedException {
        List<Float> embeddingList= embeddingService.embed(text).get(0);
        List<Float> floatVector = new ArrayList<>();
        for (Number d : embeddingList) {
            floatVector.add(d.floatValue());
        }
        List<Points.ScoredPoint> points =
                qdrantClient
                        .searchAsync(
                                Points.SearchPoints.newBuilder()
                                        .setCollectionName("{test}")
                                        .addAllVector(floatVector)
                                        .setLimit(5)
                                        .build()).get();

        List<Long> ids = points.stream()
                .map(p -> p.getId().getNum())  // extract 'num' field from id
                .collect(Collectors.toList());

        return jobDetailsRepository.getJobs(ids);
    }

    public  void  createVectorStore(String name) throws ExecutionException, InterruptedException {
        qdrantClient.createCollectionAsync(name, Collections.VectorParams.newBuilder().setDistance(Collections.Distance.Dot).setSize(768).build()).get();
    }

}