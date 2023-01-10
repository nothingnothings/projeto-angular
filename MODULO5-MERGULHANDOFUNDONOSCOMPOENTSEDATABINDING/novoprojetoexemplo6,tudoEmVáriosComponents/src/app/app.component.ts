import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  serverElements: any[] = [{type: 'server', name: 'TestServer', content: 'Just a test!'}, {type: 'blueprint', name: 'BlueprintServer', content: 'Just a test!'}]
  newServerName = '';
  newServerContent = '';

  // onAddServer(event: Event) {
    onServerAdded(serverData: {serverName: string, serverContent: string}) {
    this.serverElements.push({
      type: 'server',
      name: serverData.serverName,
      content: serverData.serverContent
    });
  }

  onBlueprintAdded(blueprintData: {blueprintName: string, blueprintContent: string}) {
    this.serverElements.push(
      {
        type: 'blueprint',
        name: blueprintData.blueprintName,
        content: blueprintData.blueprintContent
      }
    )
  }


  constructor() {
    console.log('app.ts constructor called')
  }


  onChangeFirst() {
    this.serverElements[0].name = 'Changed!';
  }


  onServerRemoved(index: number) {
    this.serverElements.splice(index, 1)
  }

}
