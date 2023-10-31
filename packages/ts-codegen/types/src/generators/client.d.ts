import { ContractInfo } from "@oraichain/wasm-ast-types";
import { TSClientOptions } from "@oraichain/wasm-ast-types";
import { BuilderFile } from "../builder";
declare const _default: (
  name: string,
  contractInfo: ContractInfo,
  outPath: string,
  tsClientOptions?: TSClientOptions
) => Promise<BuilderFile[]>;
export default _default;
