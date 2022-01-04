import {
	ConnectedSocket,
	OnGatewayConnection,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
	WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: 'cef-connect' })
export class CefConnectGateway implements OnGatewayConnection {
	@WebSocketServer()
	private readonly server: Server;

	public handleConnection(client: Socket): void {
		console.log(client.id, this.server);
	}

	@SubscribeMessage('hello')
	public getMessage(
		@ConnectedSocket() _client: Socket,
		_data: any,
	): WsResponse<string> {
		const test: WsResponse<string> = {
			event: 'hello',
			data: 'hello',
		};

		return test;
	}

	@SubscribeMessage('another')
	public anotherOne(): WsResponse<string> {
		return {
			event: 'another',
			data: 'another',
		};
	}
}
