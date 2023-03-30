import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';
import { Socket, Server } from 'socket.io';
import { NewMessageDto } from './dto/new-message.dto';
export declare class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly messagesWsService;
    wss: Server;
    constructor(messagesWsService: MessagesWsService);
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): void;
    onMessageFromClient(client: Socket, payload: NewMessageDto): void;
}
