package com.newsblog.database;

import com.mysql.cj.jdbc.Driver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.*;

public class DBProcessor {

    private static final Logger LOGGER = LoggerFactory.getLogger(DBProcessor.class);

    private Connection connection;
    private static final String USERNAME = "root";
    private static final String PASSWORD = "Gaugamela331";
    private static final String URL = "jdbc:mysql://localhost:3306/newsblog?useSSL=false&serverTimezone=UTC";

    public DBProcessor() {
        try {
            DriverManager.registerDriver(new Driver());
        } catch (SQLException e) {
            LOGGER.error("[logid:190927095239] [function:DBProcessor] Driver didn't register!!");
        }
    }

    public Connection getConnection(){
        if (connection == null){
            try {
                connection = DriverManager.getConnection(URL, USERNAME, PASSWORD);
            } catch (SQLException e) {
                LOGGER.error("[logid:190927095722] [function:getConnection] Thrown SQL Exception!!");
            }
        }
        return connection;
    }
}
