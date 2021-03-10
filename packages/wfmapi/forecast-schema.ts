export interface paths {
  "/status": {
    /** Handle healthcheck. */
    get: operations["get_status_status"];
  };
  "/tenants/{tenant_id}/competencies/{competency_id}/historical": {
    /** Retrieve a set of historical data. */
    get: operations["get_tenants_tenant_competencies_competency_historical"];
    /** Add historical data, overlapping data points are overwritten. */
    post: operations["post_tenants_tenant_competencies_competency_historical"];
    /** Delete a range of historical data. */
    delete: operations["delete_tenants_tenant_competencies_competency_historical"];
  };
  "/tenants/{tenant_id}/forecastscenarios": {
    /** Retrieve all scenarios. */
    get: operations["get_all_tenants_tenant_forecastscenarios"];
    /** Add a new forecast scenario. */
    post: operations["post_tenants_tenant_forecastscenarios"];
  };
  "/tenants/{tenant_id}/forecastscenarios/{forecast_scenario_id}": {
    /** Retrieve a single scenario. */
    get: operations["get_tenants_tenant_forecastscenarios_forecast_scenario_"];
    /** Mark a single scenario as deleted. */
    delete: operations["delete_tenants_tenant_forecastscenarios_forecast_scenario_"];
    /** Update a single scenario. */
    patch: operations["patch_tenants_tenant_forecastscenarios_forecast_scenario_patch"];
  };
  "/tenants/{tenant_id}/forecastscenarios/{forecast_scenario_id}/params": {
    /** Retrieve a scenario's forecast params. */
    get: operations["get_params_tenants_tenant_forecastscenarios_forecast_scenario_params"];
    /** Save forecast params to a scenario. */
    put: operations["put_params_tenants_tenant_forecastscenarios_forecast_scenario_params"];
    /** Delete a scenario's forecast params. */
    delete: operations["delete_params_tenants_tenant_forecastscenarios_forecast_scenario_params"];
  };
  "/tenants/{tenant_id}/forecastscenarios/{forecast_scenario_id}/forecast": {
    /** Initialize forecast creation. */
    post: operations["init_forecast_tenants_tenant_forecastscenarios_forecast_scenario_forecast"];
  };
  "/tenants/{tenant_id}/forecastscenarios/{scenario_id}/series": {
    /** Retrieve a forecast's data series. */
    get: operations["get_all_tenants_tenant_forecastscenarios_scenario_series"];
    /** Add a new forecast data series. */
    post: operations["post_tenants_tenant_forecastscenarios_scenario_series"];
  };
  "/tenants/{tenant_id}/forecastscenarios/{scenario_id}/series/{series_id}": {
    /** Retrieve a single forecast data series. */
    get: operations["get_tenants_tenant_forecastscenarios_scenario_series_series_"];
    /** Delete a single data series. */
    delete: operations["delete_tenants_tenant_forecastscenarios_scenario_series_series_"];
    /** Update a single data series. */
    patch: operations["patch_tenants_tenant_forecastscenarios_scenario_series_series_patch"];
  };
  "/tenants/{tenant_id}/forecasttimelines": {
    /** Retrieve all timelines. */
    get: operations["get_all_tenants_tenant_forecasttimelines"];
    /** Create a new timeline. */
    post: operations["post_timelines_tenants_tenant_forecasttimelines"];
  };
  "/tenants/{tenant_id}/forecasttimelines/{forecast_timeline_id}": {
    /** Retrieve single forecast timeline. */
    get: operations["get_timeline_tenants_tenant_forecasttimelines_forecast_timeline_"];
    /** Delete single forecast timeline. */
    delete: operations["delete_timeline_tenants_tenant_forecasttimelines_forecast_timeline_"];
    /** Update a single timeline. */
    patch: operations["patch_timeline_tenants_tenant_forecasttimelines_forecast_timeline_patch"];
  };
  "/tenants/{tenant_id}/forecasttimelines/{forecast_timeline_id}/scenarios": {
    /** Retrieve all scenarios for a timeline. */
    get: operations["get_timeline_scenarios_tenants_tenant_forecasttimelines_forecast_timeline_scenarios"];
    /** Add a forecast scenario to a timeline. */
    post: operations["post_timeline_scenario_tenants_tenant_forecasttimelines_forecast_timeline_scenarios"];
    /** Delete a single scenario from timeline. */
    delete: operations["delete_forecast_timeline_scenario_tenants_tenant_forecasttimelines_forecast_timeline_scenarios"];
  };
  "/tenants/{tenant_id}/forecasttimeline/{forecast_timeline_id}/adjustments": {
    /** Retrieve all adjustments. */
    get: operations["get_all_tenants_tenant_forecasttimeline_forecast_timeline_adjustments"];
    /** Add new adjustment. */
    post: operations["post_tenants_tenant_forecasttimeline_forecast_timeline_adjustments"];
  };
  "/tenants/{tenant_id}/forecasttimeline/{forecast_timeline_id}/adjustments/{adjustment_id}": {
    /** Retrieve a single adjustment. */
    get: operations["get_tenants_tenant_forecasttimeline_forecast_timeline_adjustments_adjustment_"];
    /** Retrieve a single adjustment. */
    delete: operations["delete_tenants_tenant_forecasttimeline_forecast_timeline_adjustments_adjustment_"];
    /** Update an adjustment. */
    patch: operations["patch_tenants_tenant_forecasttimeline_forecast_timeline_adjustments_adjustment_patch"];
  };
}

export interface components {
  schemas: {
    /** The forecast adjustment type. */
    AdjustmentType: "percentage" | "absolute";
    /** Model for holding generic algorithm options. */
    AlgorithmOption: {
      option: string;
      value: string;
    };
    /** Interaction types supported by CxEngage. */
    ChannelType: "voice" | "messaging" | "sms" | "email" | "work_item";
    /** Model for date interval. */
    DatePairDTO: {
      startDate: string;
      endDate: string;
    };
    /** Represent day curve series. */
    DayCurveDTO: {
      weekDay: number;
      curve: number[];
    };
    /** Represent day values series. */
    DayValueDTO: {
      valueType: components["schemas"]["ForecastValueType"];
      values: number[];
    };
    /** The direction of a single interaction or group of interactions. */
    DirectionType: "inbound" | "outbound";
    /** Represent dto model for output responses. */
    ForecastAdjustmentDTO: {
      competency: string;
      channel: components["schemas"]["ChannelType"];
      direction: components["schemas"]["DirectionType"];
      startDateTime: string;
      intervalLength: components["schemas"]["IntervalType"];
      numberOfIntervals: number;
      type: components["schemas"]["AdjustmentType"];
      value: number;
      id: string;
    };
    /** Represent dto model for updates. */
    ForecastAdjustmentPatchDTO: {
      competency?: string;
      channel?: components["schemas"]["ChannelType"];
      direction?: components["schemas"]["DirectionType"];
      startDateTime?: string;
      intervalLength?: components["schemas"]["IntervalType"];
      numberOfIntervals?: number;
      type?: components["schemas"]["AdjustmentType"];
      value?: number;
    };
    /** The forecast algorithm that should be used. */
    ForecastAlgorithmType: "average" | "prophet";
    /** Model for forecast scenarios. */
    ForecastScenarioDTO: {
      id?: string;
      name: string;
      description: string;
      startDate: string;
      endDate: string;
      scenarioType: components["schemas"]["ForecastScenarioType"];
    };
    /** Model for handling forecast params. */
    ForecastScenarioParamsDTO: {
      dayValueDateRanges: components["schemas"]["DatePairDTO"][];
      dayCurveDateRange: components["schemas"]["DatePairDTO"];
      series: components["schemas"]["ForecastSeriesParam"][];
      algorithm: components["schemas"]["ForecastAlgorithmType"];
      includeDayCurve: boolean;
      metrics: components["schemas"]["MetricType"][];
      algorithmOptions: components["schemas"]["AlgorithmOption"][];
    };
    /** Model for patching forecast scenarios. */
    ForecastScenarioPatchDTO: {
      name?: string;
      description?: string;
      startDate?: string;
      endDate?: string;
      scenarioType?: components["schemas"]["ForecastScenarioType"];
    };
    /** The type of forecast scenario. */
    ForecastScenarioType: "temporary" | "permanent";
    /** Represent dto model for output responses. */
    ForecastSeriesDTO: {
      status: components["schemas"]["JobStatus"];
      competency: string;
      channel: components["schemas"]["ChannelType"];
      direction: components["schemas"]["DirectionType"];
      metric: components["schemas"]["MetricType"];
      startDate: string;
      dayCurves: components["schemas"]["DayCurveDTO"][];
      dayValues: components["schemas"]["DayValueDTO"][];
      id: string;
    };
    /** Model for triplet defining forecast data inclusion. */
    ForecastSeriesParam: {
      competency: string;
      channel: components["schemas"]["ChannelType"];
      direction: components["schemas"]["DirectionType"];
    };
    /** Represent dto model for the input update requests. */
    ForecastSeriesPatchDTO: {
      status?: components["schemas"]["JobStatus"];
      competency?: string;
      channel?: components["schemas"]["ChannelType"];
      direction?: components["schemas"]["DirectionType"];
      metric?: components["schemas"]["MetricType"];
      startDate?: string;
      dayCurves?: components["schemas"]["DayCurveDTO"][];
      dayValues?: components["schemas"]["DayValueDTO"][];
    };
    /** Represent dto model for output responses. */
    ForecastTimelineDTO: {
      name: string;
      description?: string;
      id: string;
    };
    /** Represent dto model for patch requests. */
    ForecastTimelinePatchDTO: {
      name?: string;
      description?: string;
    };
    /** Represent dto model for forecast timeline scenarios. */
    ForecastTimelineScenarioDTO: {
      forecastScenarioId: string;
      startDate: string;
      endDate: string;
    };
    /** Type of forecast values. */
    ForecastValueType: "forecast" | "upper" | "lower";
    HTTPValidationError: {
      detail?: components["schemas"]["ValidationError"][];
    };
    /** The historical data that should be stored. */
    HistoricalDataDTO: {
      channel: components["schemas"]["ChannelType"];
      direction: components["schemas"]["DirectionType"];
      series: components["schemas"]["TimeSeriesDTO"][];
    };
    /** The aggregation interval. */
    IntervalType: "quarter-hour" | "hour" | "day" | "week" | "month" | "year";
    /** Status for jobs. */
    JobStatus: "pending" | "running" | "success" | "failed";
    /** The type of data in a series. */
    MetricType: "nco" | "aht" | "abandons";
    /** Represent dto model for input requests. */
    NewForecastAdjustmentDTO: {
      competency: string;
      channel: components["schemas"]["ChannelType"];
      direction: components["schemas"]["DirectionType"];
      startDateTime: string;
      intervalLength: components["schemas"]["IntervalType"];
      numberOfIntervals: number;
      type: components["schemas"]["AdjustmentType"];
      value: number;
    };
    /** Represent dto model for input requests. */
    NewForecastSeriesDTO: {
      status: components["schemas"]["JobStatus"];
      competency: string;
      channel: components["schemas"]["ChannelType"];
      direction: components["schemas"]["DirectionType"];
      metric: components["schemas"]["MetricType"];
      startDate: string;
      dayCurves: components["schemas"]["DayCurveDTO"][];
      dayValues: components["schemas"]["DayValueDTO"][];
    };
    /** Represent dto model for input requests. */
    NewForecastTimelineDTO: {
      name: string;
      description?: string;
    };
    /** Represent the DTO-model for an Time Series. */
    TimeSeriesDTO: {
      timestamp: string;
      nco: number;
      aht: number;
      abandons: number;
    };
    ValidationError: {
      loc: string[];
      msg: string;
      type: string;
    };
  };
}

export interface operations {
  /** Handle healthcheck. */
  get_status_status: {
    responses: {
      /** Successful Response */
      200: {
        content: {
          "application/json": { [key: string]: unknown };
        };
      };
    };
  };
  /** Retrieve a set of historical data. */
  get_tenants_tenant_competencies_competency_historical: {
    parameters: {
      path: {
        tenant_id: string;
        competency_id: string;
      };
      query: {
        channel: components["schemas"]["ChannelType"];
        direction: components["schemas"]["DirectionType"];
        startDateTime: string;
        endDateTime: string;
      };
      header: {
        "x-cx-auth-tenant"?: string;
        "x-cx-auth-platform"?: string;
      };
    };
    responses: {
      /** Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["HistoricalDataDTO"];
        };
      };
      /** Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Add historical data, overlapping data points are overwritten. */
  post_tenants_tenant_competencies_competency_historical: {
    parameters: {
      path: {
        tenant_id: string;
        competency_id: string;
      };
      header: {
        "x-cx-auth-tenant"?: string;
        "x-cx-auth-platform"?: string;
      };
    };
    responses: {
      /** Successful Response */
      200: {
        content: {
          "application/json": { [key: string]: any };
        };
      };
      /** Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["HistoricalDataDTO"];
      };
    };
  };
  /** Delete a range of historical data. */
  delete_tenants_tenant_competencies_competency_historical: {
    parameters: {
      path: {
        tenant_id: string;
        competency_id: string;
      };
      query: {
        channel: components["schemas"]["ChannelType"];
        direction: components["schemas"]["DirectionType"];
        startDateTime: string;
        endDateTime: string;
      };
      header: {
        "x-cx-auth-tenant"?: string;
        "x-cx-auth-platform"?: string;
      };
    };
    responses: {
      /** Successful Response */
      200: {
        content: {
          "application/json": { [key: string]: any };
        };
      };
      /** Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Retrieve all scenarios. */
  get_all_tenants_tenant_forecastscenarios: {
    parameters: {
      path: {
        tenant_id: string;
      };
      header: {
        "x-cx-auth-tenant"?: string;
        "x-cx-auth-platform"?: string;
      };
    };
    responses: {
      /** Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["ForecastScenarioDTO"][];
        };
      };
      /** Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Add a new forecast scenario. */
  post_tenants_tenant_forecastscenarios: {
    parameters: {
      path: {
        tenant_id: string;
      };
      header: {
        "x-cx-auth-tenant"?: string;
        "x-cx-auth-platform"?: string;
      };
    };
    responses: {
      /** Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["ForecastScenarioDTO"];
        };
      };
      /** Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["ForecastScenarioDTO"];
      };
    };
  };
  /** Retrieve a single scenario. */
  get_tenants_tenant_forecastscenarios_forecast_scenario_: {
    parameters: {
      path: {
        tenant_id: string;
        forecast_scenario_id: string;
      };
      header: {
        "x-cx-auth-tenant"?: string;
        "x-cx-auth-platform"?: string;
      };
    };
    responses: {
      /** Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["ForecastScenarioDTO"];
        };
      };
      /** Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Mark a single scenario as deleted. */
  delete_tenants_tenant_forecastscenarios_forecast_scenario_: {
    parameters: {
      path: {
        tenant_id: string;
        forecast_scenario_id: string;
      };
      header: {
        "x-cx-auth-tenant"?: string;
        "x-cx-auth-platform"?: string;
      };
    };
    responses: {
      /** Successful Response */
      200: {
        content: {
          "application/json": { [key: string]: any };
        };
      };
      /** Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Update a single scenario. */
  patch_tenants_tenant_forecastscenarios_forecast_scenario_patch: {
    parameters: {
      path: {
        tenant_id: string;
        forecast_scenario_id: string;
      };
      header: {
        "x-cx-auth-tenant"?: string;
        "x-cx-auth-platform"?: string;
      };
    };
    responses: {
      /** Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["ForecastScenarioDTO"];
        };
      };
      /** Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["ForecastScenarioPatchDTO"];
      };
    };
  };
  /** Retrieve a scenario's forecast params. */
  get_params_tenants_tenant_forecastscenarios_forecast_scenario_params: {
    parameters: {
      path: {
        tenant_id: string;
        forecast_scenario_id: string;
      };
      header: {
        "x-cx-auth-tenant"?: string;
        "x-cx-auth-platform"?: string;
      };
    };
    responses: {
      /** Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["ForecastScenarioParamsDTO"];
        };
      };
      /** Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Save forecast params to a scenario. */
  put_params_tenants_tenant_forecastscenarios_forecast_scenario_params: {
    parameters: {
      path: {
        tenant_id: string;
        forecast_scenario_id: string;
      };
      header: {
        "x-cx-auth-tenant"?: string;
        "x-cx-auth-platform"?: string;
      };
    };
    responses: {
      /** Successful Response */
      200: {
        content: {
          "application/json": { [key: string]: any };
        };
      };
      /** Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["ForecastScenarioParamsDTO"];
      };
    };
  };
  /** Delete a scenario's forecast params. */
  delete_params_tenants_tenant_forecastscenarios_forecast_scenario_params: {
    parameters: {
      path: {
        tenant_id: string;
        forecast_scenario_id: string;
      };
      header: {
        "x-cx-auth-tenant"?: string;
        "x-cx-auth-platform"?: string;
      };
    };
    responses: {
      /** Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["ForecastScenarioParamsDTO"];
        };
      };
      /** Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Initialize forecast creation. */
  init_forecast_tenants_tenant_forecastscenarios_forecast_scenario_forecast: {
    parameters: {
      path: {
        tenant_id: string;
        forecast_scenario_id: string;
      };
      header: {
        "x-cx-auth-tenant"?: string;
        "x-cx-auth-platform"?: string;
      };
    };
    responses: {
      /** Successful Response */
      200: {
        content: {
          "application/json": { [key: string]: any };
        };
      };
      /** Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Retrieve a forecast's data series. */
  get_all_tenants_tenant_forecastscenarios_scenario_series: {
    parameters: {
      path: {
        tenant_id: string;
        scenario_id: string;
      };
      header: {
        "x-cx-auth-tenant"?: string;
        "x-cx-auth-platform"?: string;
      };
    };
    responses: {
      /** Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["ForecastSeriesDTO"][];
        };
      };
      /** Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Add a new forecast data series. */
  post_tenants_tenant_forecastscenarios_scenario_series: {
    parameters: {
      path: {
        tenant_id: string;
        scenario_id: string;
      };
      header: {
        "x-cx-auth-tenant"?: string;
        "x-cx-auth-platform"?: string;
      };
    };
    responses: {
      /** Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["ForecastSeriesDTO"];
        };
      };
      /** Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["NewForecastSeriesDTO"];
      };
    };
  };
  /** Retrieve a single forecast data series. */
  get_tenants_tenant_forecastscenarios_scenario_series_series: {
    parameters: {
      path: {
        tenant_id: string;
        scenario_id: string;
        series_id: string;
      };
      header: {
        "x-cx-auth-tenant"?: string;
        "x-cx-auth-platform"?: string;
      };
    };
    responses: {
      /** Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["ForecastSeriesDTO"];
        };
      };
      /** Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Delete a single data series. */
  delete_tenants_tenant_forecastscenarios_scenario_series_series: {
    parameters: {
      path: {
        tenant_id: string;
        scenario_id: string;
        series_id: string;
      };
      header: {
        "x-cx-auth-tenant"?: string;
        "x-cx-auth-platform"?: string;
      };
    };
    responses: {
      /** Successful Response */
      200: {
        content: {
          "application/json": { [key: string]: any };
        };
      };
      /** Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Update a single data series. */
  patch_tenants_tenant_forecastscenarios_scenario_series_series_patch: {
    parameters: {
      path: {
        tenant_id: string;
        scenario_id: string;
        series_id: string;
      };
      header: {
        "x-cx-auth-tenant"?: string;
        "x-cx-auth-platform"?: string;
      };
    };
    responses: {
      /** Successful Response */
      200: {
        content: {
          "application/json": { [key: string]: any };
        };
      };
      /** Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["ForecastSeriesPatchDTO"];
      };
    };
  };
  /** Retrieve all timelines. */
  get_all_tenants_tenant_forecasttimelines: {
    parameters: {
      path: {
        tenant_id: string;
      };
      header: {
        "x-cx-auth-tenant"?: string;
        "x-cx-auth-platform"?: string;
      };
    };
    responses: {
      /** Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["ForecastTimelineDTO"][];
        };
      };
      /** Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Create a new timeline. */
  post_timelines_tenants_tenant_forecasttimelines: {
    parameters: {
      path: {
        tenant_id: string;
      };
      header: {
        "x-cx-auth-tenant"?: string;
        "x-cx-auth-platform"?: string;
      };
    };
    responses: {
      /** Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["ForecastTimelineDTO"];
        };
      };
      /** Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["NewForecastTimelineDTO"];
      };
    };
  };
  /** Retrieve single forecast timeline. */
  get_timeline_tenants_tenant_forecasttimelines_forecast_timeline: {
    parameters: {
      path: {
        tenant_id: string;
        forecast_timeline_id: string;
      };
      header: {
        "x-cx-auth-tenant"?: string;
        "x-cx-auth-platform"?: string;
      };
    };
    responses: {
      /** Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["ForecastTimelineDTO"];
        };
      };
      /** Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Delete single forecast timeline. */
  delete_timeline_tenants_tenant_forecasttimelines_forecast_timeline: {
    parameters: {
      path: {
        tenant_id: string;
        forecast_timeline_id: string;
      };
      header: {
        "x-cx-auth-tenant"?: string;
        "x-cx-auth-platform"?: string;
      };
    };
    responses: {
      /** Successful Response */
      200: {
        content: {
          "application/json": { [key: string]: any };
        };
      };
      /** Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Update a single timeline. */
  patch_timeline_tenants_tenant_forecasttimelines_forecast_timeline_patch: {
    parameters: {
      path: {
        tenant_id: string;
        forecast_timeline_id: { [key: string]: any };
      };
      header: {
        "x-cx-auth-tenant"?: string;
        "x-cx-auth-platform"?: string;
      };
    };
    responses: {
      /** Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["ForecastTimelineDTO"];
        };
      };
      /** Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["ForecastTimelinePatchDTO"];
      };
    };
  };
  /** Retrieve all scenarios for a timeline. */
  get_timeline_scenarios_tenants_tenant_forecasttimelines_forecast_timeline_scenarios: {
    parameters: {
      path: {
        tenant_id: string;
        forecast_timeline_id: string;
      };
      header: {
        "x-cx-auth-tenant"?: string;
        "x-cx-auth-platform"?: string;
      };
    };
    responses: {
      /** Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["ForecastTimelineScenarioDTO"][];
        };
      };
      /** Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Add a forecast scenario to a timeline. */
  post_timeline_scenario_tenants_tenant_forecasttimelines_forecast_timeline_scenarios: {
    parameters: {
      path: {
        tenant_id: string;
        forecast_timeline_id: string;
      };
      header: {
        "x-cx-auth-tenant"?: string;
        "x-cx-auth-platform"?: string;
      };
    };
    responses: {
      /** Successful Response */
      200: {
        content: {
          "application/json": { [key: string]: any };
        };
      };
      /** Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["ForecastTimelineScenarioDTO"];
      };
    };
  };
  /** Delete a single scenario from timeline. */
  delete_forecast_timeline_scenario_tenants_tenant_forecasttimelines_forecast_timeline_scenarios: {
    parameters: {
      path: {
        tenant_id: string;
        forecast_timeline_id: string;
      };
      query: {
        forecastScenarioId?: string;
      };
      header: {
        "x-cx-auth-tenant"?: string;
        "x-cx-auth-platform"?: string;
      };
    };
    responses: {
      /** Successful Response */
      200: {
        content: {
          "application/json": { [key: string]: any };
        };
      };
      /** Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Retrieve all adjustments. */
  get_all_tenants_tenant_forecasttimeline_forecast_timeline_adjustments: {
    parameters: {
      path: {
        tenant_id: string;
        forecast_timeline_id: string;
      };
      query: {
        startDateTime: string;
        endDateTime: string;
        competencyId?: string;
        channel?: components["schemas"]["ChannelType"];
        direction?: components["schemas"]["DirectionType"];
        interval?: components["schemas"]["IntervalType"];
      };
      header: {
        "x-cx-auth-tenant"?: string;
        "x-cx-auth-platform"?: string;
      };
    };
    responses: {
      /** Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["ForecastAdjustmentDTO"][];
        };
      };
      /** Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Add new adjustment. */
  post_tenants_tenant_forecasttimeline_forecast_timeline_adjustments: {
    parameters: {
      path: {
        tenant_id: string;
        forecast_timeline_id: string;
      };
      header: {
        "x-cx-auth-tenant"?: string;
        "x-cx-auth-platform"?: string;
      };
    };
    responses: {
      /** Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["ForecastAdjustmentDTO"];
        };
      };
      /** Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["NewForecastAdjustmentDTO"];
      };
    };
  };
  /** Retrieve a single adjustment. */
  get_tenants_tenant_forecasttimeline_forecast_timeline_adjustments_adjustment: {
    parameters: {
      path: {
        tenant_id: string;
        forecast_timeline_id: string;
        adjustment_id: string;
      };
      header: {
        "x-cx-auth-tenant"?: string;
        "x-cx-auth-platform"?: string;
      };
    };
    responses: {
      /** Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["ForecastAdjustmentDTO"];
        };
      };
      /** Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Retrieve a single adjustment. */
  delete_tenants_tenant_forecasttimeline_forecast_timeline_adjustments_adjustment: {
    parameters: {
      path: {
        tenant_id: string;
        forecast_timeline_id: string;
        adjustment_id: string;
      };
      header: {
        "x-cx-auth-tenant"?: string;
        "x-cx-auth-platform"?: string;
      };
    };
    responses: {
      /** Successful Response */
      200: {
        content: {
          "application/json": { [key: string]: any };
        };
      };
      /** Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Update an adjustment. */
  patch_tenants_tenant_forecasttimeline_forecast_timeline_adjustments_adjustment_patch: {
    parameters: {
      path: {
        tenant_id: string;
        forecast_timeline_id: string;
        adjustment_id: string;
      };
      header: {
        "x-cx-auth-tenant"?: string;
        "x-cx-auth-platform"?: string;
      };
    };
    responses: {
      /** Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["ForecastAdjustmentDTO"];
        };
      };
      /** Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["ForecastAdjustmentPatchDTO"];
      };
    };
  };
}
