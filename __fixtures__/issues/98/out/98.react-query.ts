/**
* This file was automatically generated by @cosmwasm/ts-codegen@latest.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

import { UseQueryOptions, useQuery } from "react-query";
import { Uint128, InstantiateMsg, Coin, ExecuteMsg, InstallableExecMsg, Binary, ExecMsg, QueryMsg, InstallableQueryMsg, QueryMsg1, ConfigResponse, NullablePlugin, CanonicalAddr, Plugin, PluginsResponse } from "./98.types";
import { 98QueryClient } from "./98.client";
export interface 98ReactQuery<TResponse, TData = TResponse> {
  client: 98QueryClient;
  options?: UseQueryOptions<TResponse, Error, TData>;
}
export interface 98GetPluginByIdQuery<TData> extends 98ReactQuery<NullablePlugin, TData> {
  args: {
    id: number;
  };
}
export function use98GetPluginByIdQuery<TData = NullablePlugin>({
  client,
  args,
  options
}: 98GetPluginByIdQuery<TData>) {
  return useQuery<NullablePlugin, Error, TData>(["98GetPluginById", client.contractAddress, JSON.stringify(args)], () => client.getPluginById({
    id: args.id
  }), options);
}
export interface 98GetPluginsQuery<TData> extends 98ReactQuery<PluginsResponse, TData> {
  args: {
    limit?: number;
    startAfter?: number;
  };
}
export function use98GetPluginsQuery<TData = PluginsResponse>({
  client,
  args,
  options
}: 98GetPluginsQuery<TData>) {
  return useQuery<PluginsResponse, Error, TData>(["98GetPlugins", client.contractAddress, JSON.stringify(args)], () => client.getPlugins({
    limit: args.limit,
    startAfter: args.startAfter
  }), options);
}
export interface 98GetConfigQuery<TData> extends 98ReactQuery<ConfigResponse, TData> {}
export function use98GetConfigQuery<TData = ConfigResponse>({
  client,
  options
}: 98GetConfigQuery<TData>) {
  return useQuery<ConfigResponse, Error, TData>(["98GetConfig", client.contractAddress], () => client.getConfig(), options);
}