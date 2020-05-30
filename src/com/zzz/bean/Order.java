package com.zzz.bean;

/**
 * @author Zhu
 * @createtime 2020/5/29-21:57
 */
public class Order {
    private int fid;
    private int sid;
    private int uid;
    private String seat;

    @Override
    public String toString() {
        return "Order{" +
                "fid=" + fid +
                ", sid=" + sid +
                ", uid=" + uid +
                ", seat='" + seat + '\'' +
                '}';
    }

    public int getFid() {
        return fid;
    }

    public void setFid(int fid) {
        this.fid = fid;
    }

    public int getSid() {
        return sid;
    }

    public void setSid(int sid) {
        this.sid = sid;
    }

    public int getUid() {
        return uid;
    }

    public void setUid(int uid) {
        this.uid = uid;
    }

    public String getSeat() {
        return seat;
    }

    public void setSeat(String seat) {
        this.seat = seat;
    }
}
