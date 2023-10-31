import { ContractInfo, TSTypesOptions } from "@oraichain/wasm-ast-types";
import { BuilderFile } from "../builder";
declare const _default: (
  name: string,
  contractInfo: ContractInfo,
  outPath: string,
  tsTypesOptions?: TSTypesOptions
) => Promise<BuilderFile[]>;
export default _default;
