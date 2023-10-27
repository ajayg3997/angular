import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalConfigFactoryService {
  constructor() { }
  // const version_app = `v${packageJson.version}`;
 // readonly url_server = "/hri-web";
  //readonly url_server = "http://hri-back.dev-falcon-hri.psa-cloud.com/hri-web"
   readonly url_server = "http://localhost:8000";
   readonly url_server2 = "http://localhost:8010"
}
