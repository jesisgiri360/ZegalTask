import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import axios, { AxiosResponse } from "axios";
import qs from "qs";
import { URL } from "@config/url";
import { RequestMethod, RequestOptions } from "@interfaces/common.interfaces";
import { AsyncContext } from "@utils/context";
import { Cache } from "cache-manager";
import RunTimeException from "@exceptions/RunTimeException";

import { EntityManager } from "typeorm";
import { decrypt } from "./other.helper";
import { MessageEnum } from "@config/CONSTANTS";
import LmsException from "@exceptions/LmsException";

@Injectable()
export class ApiHelper {
  constructor(
    // private readonly clientMasterService: ClientMasterService,
    private readonly asyncContext: AsyncContext<string, any>,
    private readonly entityManager: EntityManager,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
  ) {}
  call = async <T = any>(
    requestMethod: RequestMethod,
    url: string,
    headers: any | null,
    body: any | null
  ): Promise<AxiosResponse<T>> => {
    const options: RequestOptions | any = {
      method: requestMethod ? requestMethod : RequestMethod.GET,
      url: url,
      data: body,
    };
    try {
      options.headers = headers
        ? headers
        : { "content-type": "application/json" };

      if (
        headers?.hasOwnProperty("Content-Type") &&
        headers["Content-Type"].includes("x-www-form-urlencoded")
      )
        options.data = qs.stringify(options.data);

      return await axios(options);
    } catch (err) {
      console.log(options.url);
      console.log("API ERROR=====>", JSON.stringify(err));
    }
  };
}
