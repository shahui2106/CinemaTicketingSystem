package com.zzz.bean;

/**
 * @author Zhu
 * @createtime 2020/5/10-21:17
 */
public class Statue {
    private String message;
    private int statue;
    private Object object;

    @Override
    public String toString() {
        return "Statue{" +
                "message='" + message + '\'' +
                ", statue=" + statue +
                ", object=" + object +
                '}';
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getStatue() {
        return statue;
    }

    public void setStatue(int statue) {
        this.statue = statue;
    }

    public Object getObject() {
        return object;
    }

    public void setObject(Object object) {
        this.object = object;
    }
}
