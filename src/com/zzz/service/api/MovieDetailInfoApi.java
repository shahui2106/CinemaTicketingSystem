package com.zzz.service.api;

import com.google.gson.Gson;
import com.zzz.bean.Movie;
import com.zzz.dao.imp.MovieDaoImpl;
import com.zzz.utils.StringUtils;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author Zhu
 * @createtime 2020/5/18-17:03
 */
public class MovieDetailInfoApi extends HttpServlet {
    MovieDaoImpl movieDao = new MovieDaoImpl();
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("utf-8");
        resp.setContentType("text/html;charset=utf-8");
        String chineseName = new String(StringUtils.getURLDecoderString(req.getParameter("chineseName")).getBytes("iso-8859-1"), "UTF-8");
        if(chineseName!=null){
            Movie movie = movieDao.querySingleMovieInfoByName(chineseName);
            resp.getWriter().write(new Gson().toJson(movie));
        }
    }
}
