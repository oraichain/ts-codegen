import { pascal } from "case";
import * as w from "@oraichain/wasm-ast-types";
import { findExecuteMsg, findAndParseTypes, findQueryMsg } from "../utils";
import {
  RenderContext,
  ContractInfo,
  RenderContextBase,
  getMessageProperties,
  RenderOptions,
} from "@oraichain/wasm-ast-types";
import { BuilderFileType } from "../builder";
import { BuilderPluginBase } from "./plugin-base";

export const TYPE = "client";

export class ClientPlugin extends BuilderPluginBase<RenderOptions> {
  initContext(
    contract: ContractInfo,
    options?: RenderOptions
  ): RenderContextBase<RenderOptions> {
    return new RenderContext(contract, options, this.builder.builderContext);
  }

  async doRender(
    name: string,
    context: RenderContext
  ): Promise<
    {
      type: BuilderFileType;
      pluginType?: string;
      localname: string;
      body: any[];
    }[]
  > {
    const { enabled } = this.option.client;

    if (!enabled) {
      return;
    }

    const { schemas } = context.contract;

    const localname = pascal(name) + ".client.ts";
    const TypesFile = pascal(name) + ".types";
    const QueryMsg = findQueryMsg(schemas);
    const ExecuteMsg = findExecuteMsg(schemas);
    const typeHash = await findAndParseTypes(schemas);

    let Client = null;
    let Instance = null;
    let QueryClient = null;
    let ReadOnlyInstance = null;
    let ExecProps = null;

    const body = [];

    body.push(w.importStmt(Object.keys(typeHash), `./${TypesFile}`));

    if (ExecuteMsg) {
      ExecProps = getMessageProperties(ExecuteMsg);
    }

    // query messages
    if (QueryMsg) {
      QueryClient = pascal(`${name}QueryClient`);
      ReadOnlyInstance = pascal(`${name}ReadOnlyInterface`);
      

      // if exec extend from query, should add get_ prefix to query when conflict
      let methodsCache;
      if (context.options.client.execExtendsQuery) {
        methodsCache = Object.fromEntries(
          ExecProps.map((method) => Object.keys(method.properties)?.[0])
            .filter(Boolean)
            .map((methodName) => [methodName, true])
        );
      }

      const children = getMessageProperties(QueryMsg);
      body.push(w.createQueryInterface(context, ReadOnlyInstance, children, methodsCache));
      body.push(
        w.createQueryClass(context, QueryClient, ReadOnlyInstance, children, methodsCache)
      );

      context.addProviderInfo(
        name,
        w.PROVIDER_TYPES.QUERY_CLIENT_TYPE,
        QueryClient,
        localname
      );
    }

    // execute messages
    if (ExecuteMsg) {
      const children = getMessageProperties(ExecuteMsg);
      if (children.length > 0) {
        Client = pascal(`${name}Client`);
        Instance = pascal(`${name}Interface`);

        body.push(
          w.createExecuteInterface(
            context,
            Instance,
            this.option.client.execExtendsQuery ? ReadOnlyInstance : null,
            children
          )
        );

        body.push(
          w.createExecuteClass(
            context,
            Client,
            Instance,
            this.option.client.execExtendsQuery ? QueryClient : null,
            children
          )
        );

        context.addProviderInfo(
          name,
          w.PROVIDER_TYPES.SIGNING_CLIENT_TYPE,
          Client,
          localname
        );
      }
    }

    if (typeHash.hasOwnProperty("Coin")) {
      // @ts-ignore
      delete context.utils.Coin;
    }

    return [
      {
        type: TYPE,
        localname,
        body,
      },
    ];
  }
}
