package com.rooftopcoder.web.resources;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static spark.Spark.get;

public class HomeResource extends GeneralResource {

    private static final Logger LOG = LoggerFactory.getLogger(HomeResource.class);


    public HomeResource(){
        super();
    }

    protected void routes() {
        get(CONTEXT+"/", (request, response) -> null, json());
    }


}
