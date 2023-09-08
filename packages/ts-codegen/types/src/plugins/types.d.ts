import {
  ContractInfo,
  RenderContext,
  RenderContextBase,
  RenderOptions,
} from "@oraichain/wasm-ast-types";
import { BuilderFileType } from "../builder";
import { BuilderPluginBase } from "./plugin-base";
export declare class TypesPlugin extends BuilderPluginBase<RenderOptions> {
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
