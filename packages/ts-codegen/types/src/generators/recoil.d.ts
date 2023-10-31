import { ContractInfo, RecoilOptions } from "@oraichain/wasm-ast-types";
import { BuilderFile } from "../builder";
declare const _default: (
  name: string,
  contractInfo: ContractInfo,
  outPath: string,
  recoilOptions?: RecoilOptions
) => Promise<BuilderFile[]>;
export default _default;
