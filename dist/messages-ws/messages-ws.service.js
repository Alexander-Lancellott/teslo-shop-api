"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesWsService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../auth/entities/user.entity");
const typeorm_2 = require("@nestjs/typeorm");
let MessagesWsService = class MessagesWsService {
    constructor(jwtService, userRepository) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.connectedClients = {};
        this.clientsUpdated = 'clients-updated';
    }
    async registerClient(client, wss) {
        const token = client.handshake.headers.authorization;
        let payload;
        try {
            payload = this.jwtService.verify(token);
            const user = await this.userRepository.findOneBy({ id: payload.id });
            this.checkUserConnection(user);
            if (!user)
                throw new Error('User not found');
            if (!user.isActive)
                throw new Error('User not active');
            this.connectedClients[client.id] = { socket: client, user };
            this.client = client;
            wss.emit(this.clientsUpdated, this.getConnectedClients());
        }
        catch (error) {
            client.disconnect();
            return;
        }
    }
    removeClient(clientId, wss) {
        delete this.connectedClients[clientId];
        wss.emit(this.clientsUpdated, this.getConnectedClients());
    }
    getConnectedClients() {
        return Object.keys(this.connectedClients);
    }
    getUserFullName(clientId) {
        return this.connectedClients[clientId].user.fullName;
    }
    onMessage(client, payload, wss) {
        wss.emit('message-from-server', {
            fullName: this.getUserFullName(client.id),
            message: payload.message || 'no-message!!',
        });
    }
    checkUserConnection(user) {
        for (const client of Object.values(this.connectedClients)) {
            const connectedClient = client;
            if (connectedClient.user.id === user.id) {
                connectedClient.socket.disconnect();
                break;
            }
        }
    }
};
MessagesWsService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        typeorm_1.Repository])
], MessagesWsService);
exports.MessagesWsService = MessagesWsService;
//# sourceMappingURL=messages-ws.service.js.map