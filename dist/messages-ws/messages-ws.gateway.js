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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesWsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const messages_ws_service_1 = require("./messages-ws.service");
const socket_io_1 = require("socket.io");
const new_message_dto_1 = require("./dto/new-message.dto");
let MessagesWsGateway = class MessagesWsGateway {
    constructor(messagesWsService) {
        this.messagesWsService = messagesWsService;
    }
    async handleConnection(client) {
        await this.messagesWsService.registerClient(client, this.wss);
    }
    handleDisconnect(client) {
        this.messagesWsService.removeClient(client.id, this.wss);
    }
    onMessageFromClient(client, payload) {
        this.messagesWsService.onMessage(client, payload, this.wss);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], MessagesWsGateway.prototype, "wss", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('message-from-client'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, new_message_dto_1.NewMessageDto]),
    __metadata("design:returntype", void 0)
], MessagesWsGateway.prototype, "onMessageFromClient", null);
MessagesWsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true }),
    __metadata("design:paramtypes", [messages_ws_service_1.MessagesWsService])
], MessagesWsGateway);
exports.MessagesWsGateway = MessagesWsGateway;
//# sourceMappingURL=messages-ws.gateway.js.map