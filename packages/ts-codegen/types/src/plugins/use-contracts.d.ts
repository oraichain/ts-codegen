import {
  ContractInfo,
  RenderContextBase,
  RenderContext,
} from "@oraichain/wasm-ast-types";
import { BuilderFileType, TSBuilderOptions } from "../builder";
import { BuilderPluginBase } from "./plugin-base";
export declare class ContractsContextPlugin extends BuilderPluginBase<TSBuilderOptions> {
  initContext(
    contract: ContractInfo,
    options?: TSBuilderOptions
  ): RenderContextBase<TSBuilderOptions>;
  doRender(
    name: string,
    context: RenderContext
  ): Promise<
    {
      type: BuilderFileType;
      pluginType?: string;
      localname: string;
      body: any[];
    }[]
  >;
}
