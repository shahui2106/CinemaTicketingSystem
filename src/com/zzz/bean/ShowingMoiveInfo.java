package com.zzz.bean;

/**
 * @author Zhu
 * @createtime 2020/5/14-21:09
 */
public class ShowingMoiveInfo {
    private String title;
    private String des;
    private String imgpath;

    @Override
    public String toString() {
        return "ShowingMoiveInfo{" +
                "title='" + title + '\'' +
                ", des='" + des + '\'' +
                ", imgpath='" + imgpath + '\'' +
                '}';
    }

    public ShowingMoiveInfo(String title, String des, String imgpath) {
        this.title = title;
        this.des = des;
        this.imgpath = imgpath;
    }

    public ShowingMoiveInfo() {
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDes() {
        return des;
    }

    public void setDes(String des) {
        this.des = des;
    }

    public String getImgpath() {
        return imgpath;
    }

    public void setImgpath(String imgpath) {
        this.imgpath = imgpath;
    }
}
