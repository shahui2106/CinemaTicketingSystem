package com.zzz.service.api;

import com.google.gson.Gson;
import com.zzz.bean.Movie;
import com.zzz.bean.ShowingMoiveInfo;
import com.zzz.dao.imp.MovieDaoImpl;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Zhu
 * @createtime 2020/5/14-21:11
 */
public class ShowingMovieApi extends HttpServlet {
    private Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/html; charset=UTF-8");
        MovieDaoImpl movieDao = new MovieDaoImpl();
        List<ShowingMoiveInfo> movies = new ArrayList<>();
        for (Movie movie : movieDao.queryMovieByCountry("中国")) {
            movies.add(new ShowingMoiveInfo(movie.getChinese_name(), movie.getIntroduction(), movie.getUrl()));
        }
        Movies movie = new Movies();
        movie.setMovie(movies);
        resp.getWriter().write(gson.toJson(movie));
    }

    static class Movies {
        private List<ShowingMoiveInfo> Movie;

        @Override
        public String toString() {
            return "Movies{" +
                    "Movie=" + Movie +
                    '}';
        }

        public List<ShowingMoiveInfo> getMovie() {
            return Movie;
        }

        public void setMovie(List<ShowingMoiveInfo> movie) {
            Movie = movie;
        }
    }
}
