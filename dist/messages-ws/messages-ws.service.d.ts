import { Socket, Server } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { NewMessageDto } from './dto/new-message.dto';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
export declare class MessagesWsService {
    private readonly jwtService;
    private readonly userRepository;
    private connectedClients;
    private clientsUpdated;
    private client;
    constructor(jwtService: JwtService, userRepository: Repository<User>);
    registerClient(client: Socket, wss: Server): Promise<void>;
    removeClient(clientId: string, wss: Server): void;
    getConnectedClients(): string[];
    getUserFullName(clientId: string): string;
    onMessage(client: Socket, payload: NewMessageDto, wss: Server): void;
    private checkUserConnection;
}
