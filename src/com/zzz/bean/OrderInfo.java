package com.zzz.bean;

import java.sql.Date;
import java.util.List;

/**
 * @author Zhu
 * @createtime 2020/5/29-17:17
 */
public class OrderInfo {
    private String filmName;
    private Date show_date;
    private String show_time;
    private String cinemaName;
    private String room;
    private String seat;
    private List<String> seatList;
    private String userPhone;
    private Integer ticketNum;
    private Float ticketSum;
    private Integer sid;
    private Integer uid;
    private Integer fid;

    @Override
    public String toString() {
        return "OrderInfo{" +
                "filmName='" + filmName + '\'' +
                ", show_date=" + show_date +
                ", show_time='" + show_time + '\'' +
                ", cinemaName='" + cinemaName + '\'' +
                ", room='" + room + '\'' +
                ", seat='" + seat + '\'' +
                ", seatList=" + seatList +
                ", userPhone='" + userPhone + '\'' +
                ", ticketNum=" + ticketNum +
                ", ticketSum=" + ticketSum +
                ", sid=" + sid +
                ", uid=" + uid +
                '}';
    }

    public Integer getFid() {
        return fid;
    }

    public void setFid(Integer fid) {
        this.fid = fid;
    }

    public String getFilmName() {
        return filmName;
    }

    public void setFilmName(String filmName) {
        this.filmName = filmName;
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

    public String getCinemaName() {
        return cinemaName;
    }

    public void setCinemaName(String cinemaName) {
        this.cinemaName = cinemaName;
    }

    public String getRoom() {
        return room;
    }

    public void setRoom(String room) {
        this.room = room;
    }

    public List<String> getSeatList() {
        return seatList;
    }

    public String getSeat() {
        return seat;
    }

    public void setSeat(String seat) {
        this.seat = seat;
    }

    public Integer getTicketNum() {
        return ticketNum;
    }

    public void setTicketNum(Integer ticketNum) {
        this.ticketNum = ticketNum;
    }

    public Float getTicketSum() {
        return ticketSum;
    }

    public void setTicketSum(Float ticketSum) {
        this.ticketSum = ticketSum;
    }

    public Integer getSid() {
        return sid;
    }

    public void setSid(Integer sid) {
        this.sid = sid;
    }

    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public void setSeatList(List<String> seatList) {
        this.seatList = seatList;
    }

    public String getUserPhone() {
        return userPhone;
    }

    public void setUserPhone(String userPhone) {
        this.userPhone = userPhone;
    }
}
