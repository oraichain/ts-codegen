import {
  ContractInfo,
  RenderOptions,
  RenderContextBase,
  RenderContext,
} from "@oraichain/wasm-ast-types";
import { BuilderFileType } from "../builder";
import { BuilderPluginBase } from "./plugin-base";
export declare class ReactQueryPlugin extends BuilderPluginBase<RenderOptions> {
  initContext(
    contract: ContractInfo,
    options?: RenderOptions
  ): RenderContextBase<RenderOptions>;
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
