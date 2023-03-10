import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {



  filteredStatus: string = '';



  

appStatus = new Promise(   ////////USADO PARA _ SIMULAR O _ RETRIEVE _DE DATA__ DE UM SERVER...
  (resolve, reject) => {

          setTimeout(
              () => {
                  
                  resolve('stable');   ///RESOLVE COMO 'appStatus: stable' DEPOIS DE 2 SEGUNDOS...
              },

              2000
          )
  }
)






  servers = [
    {
      instanceType: 'medium',
      name: 'Production Server',
      status: 'stable',
      started: new Date(15, 1, 2017),
    },

    {
      instanceType: 'large',
      name: 'User Database',
      status: 'stable',
      started: new Date(15, 1, 2017),
    },

    {
      instanceType: 'small',
      name: 'Development Server',
      status: 'offline',
      started: new Date(15, 1, 2017),
    },

    {
      instanceType: 'medium',
      name: 'Production Server',
      status: 'offline',
      started: new Date(15, 1, 2017),
    },
  ];

  getStatusClasses(server: {
    instanceType: string;
    name: string;
    status: string;
    started: Date;
  }) {
    return {
      'list-group-item-success': server.status === 'stable',
      'list-group-item-warning': server.status === 'offline',
      'list-group-item-danger': server.status === 'critical ',
    };
  }









  onAddServer() {
        this.servers.push(
          {
            instanceType: 'small',
            name: 'New Server',
            status: 'stable',
            started: new Date(15, 2, 2014)
          }
        )
  }
}
