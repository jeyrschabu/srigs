package com.rooftopcoder.web.resources;

import com.google.gson.Gson;
import com.rooftopcoder.web.constants.ApplicationConstants;
import spark.ResponseTransformer;

public abstract class GeneralResource implements ApplicationConstants {
    public GeneralResource(){
        this.routes();
    }
    protected abstract void routes();
    protected ResponseTransformer json() {
        return object -> new Gson().toJson(object);
    }
}
