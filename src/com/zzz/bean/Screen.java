package com.zzz.bean;

import java.sql.Date;

/**
 * @author Zhu
 * @createtime 2020/5/22-13:58
 */
public class Screen {
    private String language;
    private float price;
    private String room;
    private Date show_date;
    private String show_time;
    private int cid;
    private int sid;
    private String chinese_name;
    private String seat;
    private String name;
    private String address;
    private String phone;
    private String city;
    private int mid;
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
        return "Screen{" +
                "language='" + language + '\'' +
                ", price=" + price +
                ", room='" + room + '\'' +
                ", show_date=" + show_date +
                ", show_time='" + show_time + '\'' +
                ", cid=" + cid +
                ", sid=" + sid +
                ", chinese_name='" + chinese_name + '\'' +
                ", seat='" + seat + '\'' +
                ", name='" + name + '\'' +
                ", address='" + address + '\'' +
                ", phone='" + phone + '\'' +
                ", city='" + city + '\'' +
                ", mid=" + mid +
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

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public String getRoom() {
        return room;
    }

    public void setRoom(String room) {
        this.room = room;
    }

    public Date getShow_date() {
        return show_date;
    }

    public void setShow_date(Date show_date) {
        this.show_date = show_date;
    }

    public String getShow_time() {
        return show_time;
    }

    public void setShow_time(String show_time) {
        this.show_time = show_time;
    }

    public int getCid() {
        return cid;
    }

    public void setCid(int cid) {
        this.cid = cid;
    }

    public String getChinese_name() {
        return chinese_name;
    }

    public void setChinese_name(String chinese_name) {
        this.chinese_name = chinese_name;
    }

    public String getSeat() {
        return seat;
    }

    public void setSeat(String seat) {
        this.seat = seat;
    }

    public int getSid() {
        return sid;
    }

    public void setSid(int sid) {
        this.sid = sid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public int getMid() {
        return mid;
    }

    public void setMid(int mid) {
        this.mid = mid;
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
