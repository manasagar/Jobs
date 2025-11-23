package com.Job.restservices.service;

import com.Job.restservices.entity.Resume;
import io.qdrant.client.QdrantClient;
import opennlp.tools.chunker.ChunkerME;
import opennlp.tools.namefind.NameFinderME;
import opennlp.tools.postag.POSTaggerME;
import opennlp.tools.sentdetect.SentenceDetectorME;
import opennlp.tools.sentdetect.SentenceModel;
import opennlp.tools.tokenize.TokenizerME;
import opennlp.tools.tokenize.TokenizerModel;
import opennlp.tools.util.Span;
import org.apache.tika.exception.TikaException;
import org.apache.tika.metadata.Metadata;
import org.apache.tika.parser.AutoDetectParser;
import org.apache.tika.sax.BodyContentHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import org.xml.sax.SAXException;
import opennlp.tools.namefind.TokenNameFinderModel;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@Service
public class ParseResume {
    @Autowired
    TokenizerME tokenizer;
    @Autowired
    ChunkerME chunker;
    @Autowired
    @Qualifier("org")
    NameFinderME orgFinder;
    @Autowired
    @Qualifier("date")
    NameFinderME dateFinder;
    @Autowired
    @Qualifier("location")
    NameFinderME locationFinder;

    @Autowired
    POSTaggerME posTagger;
    private List<String> extractOrganizations(String[] tokens) {
    Span[] spans = orgFinder.find(tokens);

    return Arrays.stream(spans)
            .map(span -> String.join(" ",
                    Arrays.copyOfRange(tokens, span.getStart(), span.getEnd())))
            .distinct()
            .toList();
    }

    private List<String> extractDate(String[] tokens) {
        Span[] spans = dateFinder.find(tokens);

        return Arrays.stream(spans)
                .map(span -> String.join(" ",
                        Arrays.copyOfRange(tokens, span.getStart(), span.getEnd())))
                .distinct()
                .toList();
    }
    private List<String> extractLocations(String[] tokens) {

        Span[] spans = locationFinder.find(tokens);

        return Arrays.stream(spans)
                .map(span -> String.join(" ",
                        Arrays.copyOfRange(tokens, span.getStart(), span.getEnd())))
                .distinct()
                .toList();
    }
    private String[] tokenise(String resumeText){
        return tokenizer.tokenize(resumeText);
    }
    private List<String> extractSkills(String [] chunks,String [] tokens){
        List<String> nounPhrases = new ArrayList<>();
        StringBuilder np = new StringBuilder();

        for (int i = 0; i < chunks.length; i++) {
            if (chunks[i].equals("B-NP")) {
                if (np.length() > 0) nounPhrases.add(np.toString());
                np = new StringBuilder(tokens[i]);
            } else if (chunks[i].equals("I-NP")) {
                np.append(" ").append(tokens[i]);
            }
        }
        if (np.length() > 0) nounPhrases.add(np.toString());
        return nounPhrases;
    }
    public Resume parse(byte[] res) throws TikaException, IOException, SAXException {
        BodyContentHandler handler = new BodyContentHandler(-1);
        AutoDetectParser parser = new AutoDetectParser();
        Metadata metadata = new Metadata();
        Resume resume =new Resume();
        resume.setResume(res);
        InputStream stream = new ByteArrayInputStream(res);
        parser.parse(stream,handler,metadata);
        String resumeText = handler.toString();
        resume.setContent(resumeText);
        String[] tokens=tokenise(resumeText);
        String[] pos = posTagger.tag(tokens);
        String[] chunks = chunker.chunk(tokens, pos);
        resume.setOrgs(extractOrganizations(tokens));
        resume.setDates(extractDate(tokens));
        resume.setLocations(extractLocations(tokens));
        resume.setSkills(extractSkills(chunks,tokens));
        return resume;

    }

}
