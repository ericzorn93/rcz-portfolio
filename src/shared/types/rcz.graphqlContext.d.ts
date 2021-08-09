import { Request, Response } from 'express';

export interface IRCZGraphQLContext {
	req: Request;
	res: Response;
	appName: string;
}
