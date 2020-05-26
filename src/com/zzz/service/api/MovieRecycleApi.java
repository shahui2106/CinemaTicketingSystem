package com.zzz.service.api;

import com.google.gson.Gson;
import com.zzz.bean.Movie;
import com.zzz.dao.imp.MovieDaoImpl;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

/**
 * @author Zhu
 * @createtime 2020/5/17-17:50
 */
public class MovieRecycleApi extends HttpServlet {
    MovieDaoImpl movieDao = new MovieDaoImpl();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("text/html;charset=utf-8");
        Long allMovie = movieDao.queryAllMovieNum();
        String curPageStr = req.getParameter("curPage");
        if (curPageStr != null) {
            int curPage = Integer.parseInt(curPageStr);
            int start = (curPage - 1) * 8;
            int num = 8;
            if (allMovie - start < 8)
                num = (int) (allMovie - start);
            List<Movie> movies = movieDao.queryMovieFromStartToEnd(start, num);
            resp.getWriter().write(new Gson().toJson(new Movies(movies, String.valueOf(allMovie))));
        }else
            resp.getWriter().write(new Gson().toJson(new Movies(null, String.valueOf(allMovie))));
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req, resp);
    }

    static class Movies {
        private List<Movie> Movies;
        private String movieNum;

        @Override
        public String toString() {
            return "Movies{" +
                    "Movies=" + Movies +
                    '}';
        }

        public Movies(List<Movie> movies, String movieNum) {
            Movies = movies;
            this.movieNum = movieNum;
        }
    }
}
