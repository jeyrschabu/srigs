package com.rooftopcoder.web.resources;

import com.google.gson.Gson;
import com.rooftopcoder.web.constants.ApplicationConstants;
import com.rooftopcoder.web.exception.AppException;
import lombok.extern.slf4j.Slf4j;
import spark.Response;
import spark.ResponseTransformer;

import java.util.HashMap;
import java.util.Map;

import static spark.Spark.exception;

@Slf4j
public abstract class GeneralResource implements ApplicationConstants {
    public GeneralResource(){
        this.routes();
        exception(AppException.class, (exception, request, response) ->
                handleException(exception, response, ((AppException) exception).getStatusCode()));
    }
    protected abstract void routes();
    protected ResponseTransformer json() {
        return object -> new Gson().toJson(object);
    }

    protected static void handleException(Exception exception, Response response, int statusCode) {
        log.warn("handling exception with code {}", statusCode, exception);
        setErrorCode(exception, response, statusCode);
    }

    protected static void setErrorCode(Exception exception, Response response, int errorCode) {
        response.status(errorCode);
        Map<String, String> errorMap = new HashMap<>();
        errorMap.put("errorCode", String.valueOf(errorCode));
        errorMap.put("errorMessage", exception.getMessage());

        response.body(new Gson().toJson(errorMap));
    }

}
