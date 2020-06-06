package com.zzz.bean;

import java.sql.Date;
import java.util.Set;

/**
 * @author Zhu
 * @createtime 2020/5/14-21:20
 */
public class Movie {
    private int mid;
    private String chinese_name;
    private String english_name;
    private String img_url;
    private String type;
    private String length;
    private Date release_date;
    private String introduction;
    private String rating;
    private String country;
    private String actors;
    private String director;
    private String showing;

    @Override
    public String toString() {
        return "Movie{" +
                "mid=" + mid +
                ", chinese_name='" + chinese_name + '\'' +
                ", english_name='" + english_name + '\'' +
                ", img_url='" + img_url + '\'' +
                ", type='" + type + '\'' +
                ", length='" + length + '\'' +
                ", release_date=" + release_date +
                ", introduction='" + introduction + '\'' +
                ", rating='" + rating + '\'' +
                ", country='" + country + '\'' +
                ", actors='" + actors + '\'' +
                ", director='" + director + '\'' +
                ", showing='" + showing + '\'' +
                '}';
    }

    public int getMid() {
        return mid;
    }

    public void setMid(int mid) {
        this.mid = mid;
    }

    public String getChinese_name() {
        return chinese_name;
    }

    public void setChinese_name(String chinese_name) {
        this.chinese_name = chinese_name;
    }

    public String getEnglish_name() {
        return english_name;
    }

    public void setEnglish_name(String english_name) {
        this.english_name = english_name;
    }

    public String getImg_url() {
        return img_url;
    }

    public void setImg_url(String img_url) {
        this.img_url = img_url;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getLength() {
        return length;
    }

    public void setLength(String length) {
        this.length = length;
    }

    public Date getRelease_date() {
        return release_date;
    }

    public void setRelease_date(Date release_date) {
        this.release_date = release_date;
    }

    public String getIntroduction() {
        return introduction;
    }

    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }

    public String getRating() {
        return rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getActors() {
        return actors;
    }

    public void setActors(String actors) {
        this.actors = actors;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public String getShowing() {
        return showing;
    }

    public void setShowing(String showing) {
        this.showing = showing;
    }
}
