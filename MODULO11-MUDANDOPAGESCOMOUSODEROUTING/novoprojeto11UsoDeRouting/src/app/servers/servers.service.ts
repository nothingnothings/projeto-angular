export class ServersService {
  private servers = [
    {
      id: 1,
      name: 'ProdServer',
      status: 'online',
    },
    {
      id: 2,
      name: 'TestServer',
      status: 'offline',
    },
    {
      id: 3,
      name: 'DevServer',
      status: 'offline',
    },
  ];

  getServers() {
    return this.servers;
  }

  getServer(id: number) {
    const server = this.servers.find((server) => {
      return server.id === id;
    })

    return server;
  }

  updateServer(id: number, serverInfo: { name: string; status: string }) {
    const server = this.servers.find((server) => {
      return server.id === id;
    });

    if (server) {
      server.name = serverInfo.name;
      server.status = serverInfo.status;
    }
  }
}
