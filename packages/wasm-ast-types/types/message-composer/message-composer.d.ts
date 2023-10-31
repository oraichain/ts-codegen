import * as t from '@babel/types';
import { ExecuteMsg } from '../types';
import { RenderContext } from '../context';
export declare const createMessageComposerClass: (context: RenderContext, className: string, implementsClassName: string, props: any[]) => t.ExportNamedDeclaration;
export declare const createMessageComposerInterface: (context: RenderContext, className: string, props: any[]) => t.ExportNamedDeclaration;
