import { pascal } from "case";
import { header } from '../utils/header';
import { join } from "path";
import { sync as mkdirp } from "mkdirp";
import * as w from 'wasm-ast-types';
import * as t from '@babel/types';
import { writeFileSync } from 'fs';
import generate from "@babel/generator";
import { ContractInfo, getMessageProperties } from "wasm-ast-types";
import { findAndParseTypes, findExecuteMsg, findQueryMsg } from '../utils';
import { RenderContext, TSClientOptions } from "wasm-ast-types";
import { BuilderFile } from "../builder";

export default async (
  name: string,
  contractInfo: ContractInfo,
  outPath: string,
  tsClientOptions?: TSClientOptions
): Promise<BuilderFile[]> => {

  const { schemas } = contractInfo;
  const context = new RenderContext(contractInfo, {
    client: tsClientOptions ?? {}
  });
  // const options = context.options.client;

  const localname = pascal(name) + '.client.ts';
  const TypesFile = pascal(name) + '.types'
  const QueryMsg = findQueryMsg(schemas);
  const ExecuteMsg = findExecuteMsg(schemas);
  const typeHash = await findAndParseTypes(schemas);

  let Client = null;
  let Instance = null;
  let QueryClient = null;
  let ReadOnlyInstance = null;
  let ExecProps = null;

  const body = [];

  body.push(
    w.importStmt(Object.keys(typeHash), `./${TypesFile}`)
  );

  if (ExecuteMsg) {
    ExecProps = getMessageProperties(ExecuteMsg);
  }  

  // query messages
  if (QueryMsg) {
    QueryClient = pascal(`${name}QueryClient`);
    ReadOnlyInstance = pascal(`${name}ReadOnlyInterface`);

    // if exec extend from query, should add get_ prefix to query when conflict
    let methodsCache;
    if(context.options.client.execExtendsQuery) {
      methodsCache = Object.fromEntries(ExecProps
        .map((method) => Object.keys(method.properties)?.[0])
        .filter(Boolean).map(methodName=>[methodName,true]));
    }

    const children = getMessageProperties(QueryMsg);    
    body.push(
      w.createQueryInterface(context, ReadOnlyInstance, children, methodsCache)
    );
    body.push(
      w.createQueryClass(context, QueryClient, ReadOnlyInstance, children, methodsCache)
    );
  }

  // execute messages
  if (ExecProps) {    
    if (ExecProps.length > 0) {
      Client = pascal(`${name}Client`);
      Instance = pascal(`${name}Interface`);

      body.push(
        w.createExecuteInterface(
          context,
          Instance,
          context.options.client.execExtendsQuery ? ReadOnlyInstance : null,
          ExecProps
        )
      );

      body.push(
        w.createExecuteClass(
          context,
          Client,
          Instance,
          context.options.client.execExtendsQuery ? QueryClient : null,
          ExecProps
        )
      );
    }
  }

  if (typeHash.hasOwnProperty('Coin')) {
    // @ts-ignore
    delete context.utils.Coin;
  }
  const imports = context.getImports();
  const code = header + generate(
    t.program([
      ...imports,
      ...body
    ])
  ).code;

  mkdirp(outPath);
  writeFileSync(join(outPath, localname), code);

  return [
    {
      type: 'client',
      contract: name,
      localname,
      filename: join(outPath, localname),
    }
  ]
};
