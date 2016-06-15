package com.rooftopcoder.web.resources;

import com.rooftopcoder.web.services.SpecService;

import static spark.Spark.get;

/**
 * Created by jeyrschabu on 6/14/16.
 */
public class SpecResource extends GeneralResource {
    private SpecService specService;

    public SpecResource(SpecService specService) {
        super();
        this.specService = specService;
    }

    protected void routes() {
        //READ BY key value
        get(CONTEXT+"/specs/:key/:value", (request, response) -> specService.find(request.params("key"), request.params("value")), json());

        //READ ALL
        get(CONTEXT+"/specs", (request, response) -> specService.findAll(), json());

        //READ ONE
        get(CONTEXT+"/specs/:id", (request, response) -> specService.find(request.params(":id")), json());
    }
}
