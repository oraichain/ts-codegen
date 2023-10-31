import { ContractInfo } from "@oraichain/wasm-ast-types";
import { MessageComposerOptions } from "@oraichain/wasm-ast-types";
import { BuilderFile } from "../builder";
declare const _default: (
  name: string,
  contractInfo: ContractInfo,
  outPath: string,
  messageComposerOptions?: MessageComposerOptions
) => Promise<BuilderFile[]>;
export default _default;
