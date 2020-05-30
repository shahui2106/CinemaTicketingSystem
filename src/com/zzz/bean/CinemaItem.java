package com.zzz.bean;

import java.util.List;

/**
 * @author Zhu
 * @createtime 2020/5/24-14:56
 */
public class CinemaItem {
    private int cid;
    private String name;
    private float price;
    private String address;
    private String phone;
    private List<String> show_date;

    public int getCid() {
        return cid;
    }

    public void setCid(int cid) {
        this.cid = cid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
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

    public List<String> getShow_date() {
        return show_date;
    }

    public void setShow_date(List<String> show_date) {
        this.show_date = show_date;
    }
}
