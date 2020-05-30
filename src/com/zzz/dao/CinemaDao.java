package com.zzz.dao;


import com.zzz.bean.Cinema;
import com.zzz.bean.Screen;

import java.util.List;

public interface CinemaDao {

    /**
     * 根据电影名查询放映室相关信息
     * @param MovieName 电影名（中文）
     * @return 如果返回null,说明没有影院信息。反之亦然
     */
    public List<Screen> queryScreenByMovieName(String MovieName);

    /**
     * 根据影院名查询影片和放映室相关信息
     * @param CinemaName 影院名
     * @return 如果返回null,说明没有影院信息。反之亦然
     */
    public List<Screen> queryScreenByCinemaName(String CinemaName);

    /**
     * 根据影院名和片名查询放映室相关信息
     * @param CinemaName 影院名
     * @param MovieName 片名
     * @return 如果返回null,说明没有影院信息。反之亦然
     */
    public List<Screen> queryScreenByMovieNameAndCinemaName(String MovieName,String CinemaName);


    /**
     * 根据搜索结果查询放映室相关信息
     * @param search 搜索关键词
     * @return 如果返回null,说明没有影院信息。反之亦然
     */
    public List<Screen> queryScreenByCinemaNameOrDirectorOrActors(String search);

    public Screen queryScreenBySid(int sid);

    /**
     * 查询是否含有该影院
     * @param cinemaName 影院
     * @return 如果返回null,说明没有影院信息。反之亦然
     */
    public List<Cinema> queryIsExistCinema(String cinemaName);

    /**
     * 根据城市名查询电影院相关信息
     * @param city 城市名
     * @return 如果返回null,说明没有影院信息。反之亦然
     */
    public List<Cinema> queryCinemaByCity(String city);


    /**
     * 查询所有的电影院
     * @return 如果返回null,说明没有影院信息。反之亦然
     */
    public List<Cinema> queryAllCinema();

    /**
     * 根据放映室id查询座位号信息
     * @param Sid
     * @return
     */
    public String querySeatBySid(int Sid);

}
