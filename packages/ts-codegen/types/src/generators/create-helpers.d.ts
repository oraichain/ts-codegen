import { BuilderFile, TSBuilderInput } from "../builder";
import { BuilderContext } from "@oraichain/wasm-ast-types";
export declare const createHelpers: (
  input: TSBuilderInput,
  builderContext: BuilderContext
) => BuilderFile[];
