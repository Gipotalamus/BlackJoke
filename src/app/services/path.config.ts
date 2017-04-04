import {OpaqueToken} from "@angular/core";
export const path: string =  location.protocol + '//' + location.hostname + ':8080/';
export const basePath: OpaqueToken = new OpaqueToken('basePath');
