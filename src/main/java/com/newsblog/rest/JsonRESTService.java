package com.newsblog.rest;

import com.newsblog.database.DBProcessor;
import com.newsblog.model.Article;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

@Path("/json")
public class JsonRESTService {

    private static final Logger LOGGER = LoggerFactory.getLogger(JsonRESTService.class);
    private DBProcessor db = new DBProcessor();

    @GET
    @Path("/getArticleList")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Article> getArticleList() throws SQLException {
        List<Article> articleList = new ArrayList<>();

        Connection connection = db.getConnection();
        Statement statement = connection.createStatement();
        String query = "SELECT id, title, author, article_date, article_type, img FROM tbl_article ORDER BY article_date DESC";
        ResultSet resultSet = statement.executeQuery(query);

        while (resultSet.next()) {
            Article article = new Article();
            article.setId(resultSet.getInt("id"));
            article.setTitle(resultSet.getString("title"));
            article.setAuthor(resultSet.getString("author"));
            article.setType(resultSet.getString("article_type"));
            article.setDate(resultSet.getString("article_date"));
            article.setImg("images/" + resultSet.getString("img"));
            articleList.add(article);
        }

        statement.close();
        connection.close();
        return articleList;
    }


    @POST
    @Path("/getArticleListByType")
    @Consumes(MediaType.TEXT_PLAIN)
    @Produces(MediaType.APPLICATION_JSON)
    public List<Article> getArticleListByType(String type) throws SQLException {
        List<Article> articleList = new ArrayList<>();

        Connection connection = db.getConnection();
        Statement statement = connection.createStatement();
        String query = "SELECT id, title, author, article_date, article_type, img FROM tbl_article WHERE article_type='" + type + "' ORDER BY article_date DESC";
        ResultSet resultSet = statement.executeQuery(query);

        while (resultSet.next()) {
            Article article = new Article();
            article.setId(resultSet.getInt("id"));
            article.setTitle(resultSet.getString("title"));
            article.setAuthor(resultSet.getString("author"));
            article.setType(resultSet.getString("article_type"));
            article.setDate(resultSet.getString("article_date"));
            article.setImg("images/" + resultSet.getString("img"));
            articleList.add(article);
        }

        statement.close();
        connection.close();
        return articleList;
    }


    @POST
    @Path("/getArticleById")
    @Consumes(MediaType.TEXT_PLAIN)
    @Produces(MediaType.APPLICATION_JSON)
    public Article getArticleById(int id) throws SQLException {
        Article article = new Article();

        Connection connection = db.getConnection();
        Statement statement = connection.createStatement();
        String query = "SELECT * FROM tbl_article WHERE id=" + id;
        ResultSet resultSet = statement.executeQuery(query);

        while (resultSet.next()) {
            article.setId(id);
            article.setTitle(resultSet.getString("title"));
            article.setAuthor(resultSet.getString("author"));
            article.setType(resultSet.getString("article_type"));
            article.setDate(resultSet.getString("article_date"));
            article.setImg("images/" + resultSet.getString("img"));
            article.setContent(resultSet.getString("content"));
        }

        statement.close();
        connection.close();
        return article;
    }
}
