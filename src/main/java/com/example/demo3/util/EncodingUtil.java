package com.example.demo3.util;

import java.io.UnsupportedEncodingException;


public class EncodingUtil {
    public static String toKSC5601(String s) {
        if (s == null) {
            return null;
        }
        try {
            return new String(s.getBytes("KSC5601"), "8859_1");
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
    }
}
