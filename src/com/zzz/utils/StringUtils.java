package com.zzz.utils;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Zhu
 * @createtime 2020/5/18-17:09
 */
public class StringUtils {
    /**
     * 浏览器字符解码
     * @param str 需解码的字符串
     * @return 返回utf-8字符编码字符串
     */
    public static String getURLDecoderString(String str) {
        String result = "";
        if (null == str) {
            return "";
        }
        try {
            result = java.net.URLDecoder.decode(str, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return result;
    }

    /***
     * MD5加码 生成32位md5码
     */
    public static String string2MD5(String inStr){
        MessageDigest md5 = null;
        try{
            md5 = MessageDigest.getInstance("MD5");
        }catch (Exception e){
            System.out.println(e.toString());
            e.printStackTrace();
            return "";
        }
        char[] charArray = inStr.toCharArray();
        byte[] byteArray = new byte[charArray.length];

        for (int i = 0; i < charArray.length; i++)
            byteArray[i] = (byte) charArray[i];
        byte[] md5Bytes = md5.digest(byteArray);
        StringBuffer hexValue = new StringBuffer();
        for (int i = 0; i < md5Bytes.length; i++){
            int val = ((int) md5Bytes[i]) & 0xff;
            if (val < 16)
                hexValue.append("0");
            hexValue.append(Integer.toHexString(val));
        }
        return hexValue.toString();

    }

    public static  List<String> compare(String str1,String str2){
        char[] chars1 = str1.toCharArray();
        char[] chars2 = str2.toCharArray();
        List<String> res = new ArrayList<>();
        for (int i = 0; i < chars1.length; i++) {
            if(chars1[i] == '1' && chars2[i] == '1'){
                int cur = i+1;
                if (cur % 17 != 0)
                    res.add((cur / 17 + 1) + "排" + (cur % 17) + "座");
                else
                    res.add((cur / 17) + "排" + 17 + "座");
            }
        }
        return  res;
    }


    public static String merge(String str1,String str2){
        char[] chars1 = str1.toCharArray();
        char[] chars2 = str2.toCharArray();
        StringBuffer res = new StringBuffer();
        for (int i = 0; i < chars1.length; i++) {
            if(chars1[i] == '1' || chars2[i] == '1'){
                res.append('1');
            }else {
                res.append(chars1[i]);
            }
        }
        return res.toString();
    }

    /**
     * 加密解密算法 执行一次加密，两次解密
     */
    public static String convertMD5(String inStr){

        char[] a = inStr.toCharArray();
        for (int i = 0; i < a.length; i++){
            a[i] = (char) (a[i] ^ 't');
        }
        String s = new String(a);
        return s;

    }

}
