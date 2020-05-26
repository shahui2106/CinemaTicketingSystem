package com.zzz.service.api;

import com.google.gson.Gson;
import com.zzz.bean.Screen;
import com.zzz.bean.Statue;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * @author Zhu
 * @createtime 2020/5/24-16:05
 */
public class ShowTimesApi extends HttpServlet {
    Statue statue = new Statue();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("utf-8");
        resp.setContentType("text/html;charset=utf-8");
        String show_date = (String) req.getParameter("show_date");
        System.out.println("日期" + show_date);
        Map<String, List<Screen>> showDate = (Map<String, List<Screen>>) req.getSession().getAttribute("showDate");
        if (showDate != null && show_date != null) {
            statue.setStatue(200);
            statue.setMessage("成功");
            List<Screen> screens = showDate.get(show_date);
            List<item> items = new ArrayList<>();
            for (Screen screen : screens) {
                String[] split = screen.getShow_time().split("−");
                item item = new item();
                item.setStartTime(split[0]);
                if(split.length >=2)
                item.setEndTime(split[1]);
                item.setPrice(screen.getPrice());
                item.setRoom(screen.getRoom());
                items.add(item);
            }
            statue.setObject(items);
        } else {
            statue.setStatue(0);
            statue.setMessage("未获取到上映日期列表");
            statue.setObject(null);
        }
        resp.getWriter().write(new Gson().toJson(statue));
    }

    class item {
        private String startTime;
        private String endTime;
        private float price;
        private String room;

        @Override
        public String toString() {
            return "item{" +
                    "startTime='" + startTime + '\'' +
                    ", endTime='" + endTime + '\'' +
                    ", price='" + price + '\'' +
                    ", room='" + room + '\'' +
                    '}';
        }

        public String getStartTime() {
            return startTime;
        }

        public void setStartTime(String startTime) {
            this.startTime = startTime;
        }

        public String getEndTime() {
            return endTime;
        }

        public void setEndTime(String endTime) {
            this.endTime = endTime;
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
    }
}
