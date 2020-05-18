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
    public Long queryAllMovie();


    public List<Movie> queryMovieFromStartToEnd(int start,int end);

}
