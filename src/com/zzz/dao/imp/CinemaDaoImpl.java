package com.zzz.dao.imp;

import com.zzz.bean.Cinema;
import com.zzz.bean.Movie;
import com.zzz.bean.Screen;
import com.zzz.dao.BaseDao;
import com.zzz.dao.CinemaDao;

import java.util.List;

/**
 * @author Zhu
 * @createtime 2020/5/22-14:12
 */
public class CinemaDaoImpl extends BaseDao implements CinemaDao {
    @Override
    public List<Screen> queryScreenByMovieName(String MovieName) {
        String sql = "SELECT * FROM cinema,screen,movie WHERE cinema.`cid` = screen.`cid` AND screen.`mid` = movie.`mid` and chinese_name = ? order by price";
        return queryForList(Screen.class,sql,MovieName);
    }

    @Override
    public List<Screen> queryScreenByCinemaName(String CinemaName) {
        String sql = "SELECT distinct img_url,chinese_name,english_name,length,director,actors,country,rating,introduction,type FROM cinema,screen,movie WHERE cinema.`cid` = screen.`cid` AND screen.`mid` = movie.`mid` and name = ? order by price";
        return queryForList(Screen.class,sql,CinemaName);
    }

    @Override
    public List<Screen> queryScreenByMovieNameAndCinemaName(String MovieName, String CinemaName) {
        String sql = "SELECT * FROM cinema,screen,movie WHERE cinema.`cid` = screen.`cid` AND screen.`mid` = movie.`mid` and chinese_name = ? and name = ? order by price";
        return queryForList(Screen.class,sql,MovieName,CinemaName);
    }

    @Override
    public List<Screen> queryScreenByCinemaNameOrDirectorOrActors(String search) {
        String sql = "SELECT DISTINCT img_url,chinese_name,english_name,LENGTH,director,actors,country,rating,introduction,TYPE FROM cinema,screen,movie WHERE cinema.`cid` = screen.`cid` AND screen.`mid` = movie.`mid` AND (NAME LIKE '%"+search+"%' OR director  LIKE '%"+search+"%' OR actors  LIKE '%"+search+"%' OR chinese_name LIKE '%"+search+"%') ORDER BY price";
        return queryForList(Screen.class,sql);
    }

    @Override
    public Screen queryScreenBySid(int sid) {
        String sql = "SELECT * FROM cinema,screen,movie WHERE cinema.`cid` = screen.`cid` AND screen.`mid` = movie.`mid` and sid = ?";
        return queryForOne(Screen.class,sql,sid);
    }

    @Override
    public List<Cinema> queryIsExistCinema(String cinemaName) {
        String sql = "select * from cinema where name like \"%"+cinemaName+"%\"";
        return queryForList(Cinema.class,sql);
    }

    @Override
    public List<Cinema> queryCinemaByCity(String city) {
        String sql = "select * from cinema where city like '%"+city+"%'";
        return queryForList(Cinema.class,sql);
    }

    @Override
    public List<Cinema> queryAllCinema() {
        String sql = "select * from cinema";
        return queryForList(Cinema.class,sql);
    }

    @Override
    public String querySeatBySid(int Sid) {
        String sql = "select seat from screen where sid = ?";
        return (String) queryForSingleValue(sql,Sid);
    }

    @Override
    public List<Screen> queryAllScreen() {
        String sql = "SELECT * FROM cinema,screen,movie WHERE cinema.`cid` = screen.`cid` AND screen.`mid` = movie.`mid` limit 0,200";
        return queryForList(Screen.class,sql);
    }


    public static void main(String[] args) {
        CinemaDaoImpl cinemaDao = new CinemaDaoImpl();
        System.out.println(cinemaDao.querySeatBySid(1));
    }
}
