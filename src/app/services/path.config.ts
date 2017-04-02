import {OpaqueToken} from "@angular/core";
let appHostname: string = location.hostname;
let  appPort: string = '8080';
let  appProtocol: string = location.protocol;
export const path =  `${appProtocol}//${appHostname}:${appPort}/`;
export const basePath: OpaqueToken = new OpaqueToken('basePath');
