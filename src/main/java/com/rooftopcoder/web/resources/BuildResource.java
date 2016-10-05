package com.rooftopcoder.web.resources;

import com.rooftopcoder.web.services.BuildService;
import static spark.Spark.get;

public class BuildResource extends GeneralResource {
  private final BuildService buildService;
  public BuildResource(BuildService buildService) {
    super();
    this.buildService = buildService;
  }

  protected void routes() {
    //READ ALL
    get(CONTEXT+"/builds", (request, response) -> buildService.findAll(), json());

    //READ ONE BY NAME
    get(CONTEXT+"/builds/:productName", (request, response) -> buildService.find(request.params(":productName")), json());
  }
}
