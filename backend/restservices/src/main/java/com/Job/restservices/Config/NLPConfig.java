package com.Job.restservices.config;

import opennlp.tools.chunker.ChunkerME;
import opennlp.tools.chunker.ChunkerModel;
import opennlp.tools.namefind.NameFinderME;
import opennlp.tools.namefind.TokenNameFinderModel;
import opennlp.tools.postag.POSModel;
import opennlp.tools.postag.POSTaggerME;
import opennlp.tools.sentdetect.SentenceDetectorME;
import opennlp.tools.sentdetect.SentenceModel;
import opennlp.tools.tokenize.TokenizerME;
import opennlp.tools.tokenize.TokenizerModel;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;

@Configuration
public class NLPConfig {

    @Bean("org")
    public NameFinderME orgModel() throws IOException{
        return new NameFinderME(new TokenNameFinderModel(getClass().getResourceAsStream("/models/en-ner-organization.bin")));
    }
    @Bean("date")
    public NameFinderME datemodel() throws IOException{
        return new NameFinderME(new TokenNameFinderModel(getClass().getResourceAsStream("/models/en-ner-date.bin")));
    }
    @Bean
    public POSTaggerME posModel()throws IOException{
        return new POSTaggerME(new POSModel(getClass().getResourceAsStream("/models/opennlp-en-ud-ewt-pos-1.3-2.5.4.bin")));
    }
    @Bean
    public ChunkerME chunker()throws IOException{
        return  new ChunkerME(new ChunkerModel(getClass().getResourceAsStream("/models/en-chunker.bin")));
    }
    @Bean("location")
    public NameFinderME locationModel()throws IOException{
     return new NameFinderME(new TokenNameFinderModel(getClass().getResourceAsStream("/models/en-ner-location.bin")));
    }
    @Bean
    public TokenizerME tokenizerModel() throws IOException{
        return new TokenizerME(new TokenizerModel(
                    getClass().getResourceAsStream("/models/opennlp-en-ud-ewt-tokens-1.3-2.5.4.bin")));
    }
    @Bean
    public SentenceDetectorME sentenceModel() throws IOException {
        return new SentenceDetectorME(new SentenceModel(
                getClass().getResourceAsStream("/models/opennlp-en-ud-ewt-sentence-1.3-2.5.4.bin")));
    }

}
