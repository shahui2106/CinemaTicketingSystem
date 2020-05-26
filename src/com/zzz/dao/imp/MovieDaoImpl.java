package com.zzz.dao.imp;


import com.zzz.bean.Movie;
import com.zzz.bean.Slick;
import com.zzz.dao.BaseDao;
import com.zzz.dao.MovieDao;

import java.util.List;

public class MovieDaoImpl extends BaseDao implements MovieDao {


    @Override
    public List<Movie> queryMovieByCountry(String country) {
        String sql = "select * from movie where country like \"%"+country+"%\"";
        return queryForList(Movie.class, sql);
    }

    @Override
    public List<Slick> querySlickById() {
        String sql = "select * from slick";
        return queryForList(Slick.class,sql);
    }

    @Override
    public Long queryAllMovieNum() {
        String sql = "select count(*) from movie";
        return (Long) queryForSingleValue(sql);
    }

    @Override
    public List<Movie> queryMovieFromStartToEnd(int start, int end) {
        String sql = "select * from movie limit ?,?";
        return queryForList(Movie.class,sql,start,end);
    }

    @Override
    public Movie querySingleMovieInfoByName(String title) {
        String sql = "select * from movie where chinese_name = ?";
        return queryForOne(Movie.class,sql,title);
    }

    public static void main(String[] args) {
        MovieDaoImpl movieDao = new MovieDaoImpl();
        System.out.println(movieDao.querySingleMovieInfoByName("神奇女侠"));
    }
}
