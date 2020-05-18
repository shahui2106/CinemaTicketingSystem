package com.zzz.bean;

import java.sql.Date;

/**
 * @author Zhu
 * @createtime 2020/5/14-21:20
 */
public class Movie {
    private int id;
    private String chinese_name;
    private String english_name;
    private String url;
    private String type;
    private String length;
    private Date release_daterelease_date;
    private String introduction;
    private String rating;
    private String country;
    private String show_place;

    @Override
    public String toString() {
        return "Movie{" +
                "id=" + id +
                ", chinese_name='" + chinese_name + '\'' +
                ", english_name='" + english_name + '\'' +
                ", url='" + url + '\'' +
                ", type='" + type + '\'' +
                ", length='" + length + '\'' +
                ", release_daterelease_date=" + release_daterelease_date +
                ", introduction='" + introduction + '\'' +
                ", rating='" + rating + '\'' +
                ", country='" + country + '\'' +
                ", show_place='" + show_place + '\'' +
                '}';
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
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

    public Date getRelease_daterelease_date() {
        return release_daterelease_date;
    }

    public void setRelease_daterelease_date(Date release_daterelease_date) {
        this.release_daterelease_date = release_daterelease_date;
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

    public String getShow_place() {
        return show_place;
    }

    public void setShow_place(String show_place) {
        this.show_place = show_place;
    }
}
