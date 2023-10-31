import { ReactQueryOptions, ContractInfo } from "@oraichain/wasm-ast-types";
import { BuilderFile } from "../builder";
declare const _default: (
  contractName: string,
  contractInfo: ContractInfo,
  outPath: string,
  reactQueryOptions?: ReactQueryOptions
) => Promise<BuilderFile[]>;
export default _default;
