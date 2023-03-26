import { Injectable } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { NewMessageDto } from './dto/new-message.dto';
import { JwtPayload } from '../auth/interfaces';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

interface ConnectedClient {
  [id: string]: {
    socket: Socket;
    user: User;
  };
}

@Injectable()
export class MessagesWsService {
  private connectedClients: ConnectedClient = {};

  private clientsUpdated = 'clients-updated';
  private client: Socket;

  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async registerClient(client: Socket, wss: Server) {
    const token = client.handshake.headers.authorization;
    let payload: JwtPayload;
    try {
      payload = this.jwtService.verify(token);
      const user = await this.userRepository.findOneBy({ id: payload.id });
      this.checkUserConnection(user);

      if (!user) throw new Error('User not found');
      if (!user.isActive) throw new Error('User not active');
      this.connectedClients[client.id] = { socket: client, user };
      this.client = client;
      wss.emit(this.clientsUpdated, this.getConnectedClients());
    } catch (error) {
      client.disconnect();
      return;
    }
  }

  removeClient(clientId: string, wss: Server) {
    delete this.connectedClients[clientId];
    wss.emit(this.clientsUpdated, this.getConnectedClients());
  }

  getConnectedClients(): string[] {
    return Object.keys(this.connectedClients);
  }

  getUserFullName(clientId: string) {
    return this.connectedClients[clientId].user.fullName;
  }

  onMessage(client: Socket, payload: NewMessageDto, wss: Server) {
    //! Emite unicamente al cliente.
    // client.emit('message-from-server', {
    //   fullName: 'sd',
    //   message: payload.message || 'no-message!!',
    // });
    //! Emite a todos MENOS, al cliente.
    // client.broadcast.emit('message-from-server', {
    //   fullName: 'sd',
    //   message: payload.message || 'no-message!!',
    // });

    wss.emit('message-from-server', {
      fullName: this.getUserFullName(client.id),
      message: payload.message || 'no-message!!',
    });
  }

  private checkUserConnection(user: User) {
    for (const client of Object.values(this.connectedClients)) {
      const connectedClient = client;

      if (connectedClient.user.id === user.id) {
        connectedClient.socket.disconnect();
        break;
      }
    }
  }
}
