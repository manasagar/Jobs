package com.Job.restservices.service;

import org.apache.tika.Tika;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

public class AtsService {
    public static String extractText(byte[] resume) throws Exception {
        Tika tika = new Tika();
        return tika.parseToString(new ByteArrayInputStream(resume));
    }


    public static Set<String> cleanText(String text) {
        String[] words = text.toLowerCase().replaceAll("[^a-z ]", "").split("\\s+");
    

        Set<String> stopwords = new HashSet<>(Arrays.asList(
                "the", "is", "in", "at", "of", "a", "and", "to", "with", "for", "on", "by"
        ));

        Set<String> keywords = new HashSet<>();
        for (String word : words) {
            if (!stopwords.contains(word) && word.length() > 1) {
                keywords.add(word);
            }
        }
        return keywords;
    }


    public static double calculateATSScore(byte[] resume, String jdText) throws Exception {
        String resumeText = extractText(resume);

        Set<String> resumeWords = cleanText(resumeText);
        Set<String> jdWords = cleanText(jdText);

        int matchCount = 0;
        for (String word : jdWords) {
            if (resumeWords.contains(word)) {
                matchCount++;
            }
        }

        return 100.0 * matchCount / jdWords.size(); // return percentage match
    }


}
