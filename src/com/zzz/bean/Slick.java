package com.zzz.bean;

import com.google.gson.annotations.SerializedName;

/**
 * @author Zhu
 * @createtime 2020/5/16-11:07
 */
public class Slick {
    private String imageUrl;

    @Override
    public String toString() {
        return "Slick{" +
                "imageUrl='" + imageUrl + '\'' +
                '}';
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
