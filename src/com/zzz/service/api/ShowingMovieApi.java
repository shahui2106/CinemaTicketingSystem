package com.zzz.service.api;

import com.google.gson.Gson;
import com.zzz.bean.Movie;
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
        List<Movie> movies = movieDao.queryMovieByCountry("中国");
        Movies showingMovies = new Movies();
        showingMovies.setMovie(movies);
        resp.getWriter().write(gson.toJson(showingMovies));
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req, resp);
    }

    static class Movies {
        private List<Movie> Movie;

        @Override
        public String toString() {
            return "Movies{" +
                    "Movie=" + Movie +
                    '}';
        }

        public List<Movie> getMovie() {
            return Movie;
        }

        public void setMovie(List<Movie> movie) {
            Movie = movie;
        }
    }
}
