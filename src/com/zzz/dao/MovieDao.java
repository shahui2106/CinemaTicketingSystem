package com.zzz.dao;


import com.zzz.bean.Movie;
import com.zzz.bean.Slick;

import java.util.List;

public interface MovieDao {

    /**
     * 根据放映国家筛选电影信息
     * @param country 国家名
     * @return 如果返回null,说明没有电影。反之亦然
     */
    public List<Movie> queryMovieByCountry(String country);

    /**
     * 返回所有滚动图片的URL
     * @return 如果返回null,说明没有滚动图片。反之亦然
     */
    public List<Slick> querySlickById();

    /**
     * 返回总电影数目
     * @return 如果返回-1,说明没有电影。反之亦然
     */
    public Long queryAllMovieNum();

    /**
     * 获取某个区域内的电影信息
     * @param start 开始索引
     * @param num 电影个数
     * @return 如果返回null，说明没有电影，反之亦然
     */
    public List<Movie> queryMovieFromStartToEnd(int start,int num);

    /**
     * 通过电影名查询此电影的详细信息
     * @param title 电影的中文名称
     * @return 返回null说明没有该电影信息，反之亦然
     */
    public Movie querySingleMovieInfoByName(String title);

    public List<Movie> queryAllMovie();

}
