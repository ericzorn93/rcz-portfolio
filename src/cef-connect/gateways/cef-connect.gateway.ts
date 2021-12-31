import {
	ConnectedSocket,
	OnGatewayConnection,
	SubscribeMessage,
	WebSocketGateway,
	WsResponse,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({ namespace: 'cef-connect' })
export class CefConnectGateway implements OnGatewayConnection {
	public handleConnection(client: Socket): void {
		console.log(client.id);
	}

	@SubscribeMessage('hello')
	public getMessage(@ConnectedSocket() _client: Socket): WsResponse<string> {
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
