package com.rooftopcoder.web.exception;

import javax.servlet.http.HttpServletResponse;


public class AppException extends Exception {

    private int statusCode = HttpServletResponse.SC_BAD_REQUEST;

    public AppException(String message) {
        super(message);
    }

    public AppException(String message, Throwable throwable) {
        super(message, throwable);
    }

    public int getStatusCode() {
        return this.statusCode;
    }

    public AppException setStatusCode(int code) {
        this.statusCode = code;
        return this;
    }
}
