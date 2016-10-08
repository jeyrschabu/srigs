package com.rooftopcoder.web.resources;

import com.rooftopcoder.web.services.BuildService;

import java.util.HashMap;
import java.util.Map;

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
    get(CONTEXT+"/builds/:productName", (request, response) -> {
      Map<String, Object> params = new HashMap<>();
      request.queryMap().toMap().entrySet().forEach(item -> params.put(item.getKey(), item.getValue()[0]));
      params.put("product", request.params(":productName"));
      return buildService.find(params);
    }, json());
  }
}
