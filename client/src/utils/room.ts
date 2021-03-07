import peer from "./peer";

export interface Connection {
    room: string,
    peers: Name[]
}

export interface Name {
    name: string,
    id: string,
    color: string
}

export interface ApiConnections {
    connections: Connection[],
}

export const getConnections = (): Promise<ApiConnections> => {
    return new Promise(async ( resolve, reject ) => {
        try {
            const response: Response = await fetch("/api/rooms");
            const data: ApiConnections = await response.json();
            resolve(data);
        } catch (error) {
            reject(error);
            console.log(error);
        }
    })
}

export const getUserRoom = (): Promise<Connection | undefined> => {
    return new Promise(async ( resolve, reject ) => {
        const { connections } = await getConnections();
        const userConnection: Connection | undefined = 
            connections.find(( connection: Connection ) => connection.peers.find(( peerClient: Name ) => peerClient.id === peer.id));
        
        if(userConnection){
            resolve(userConnection);
            return;
        }

        resolve(undefined);
    })
}