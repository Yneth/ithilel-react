import {BetListResponse, BetResponse, CanMakeBetResponse, CreateBetRequest} from "./bets.types";
import client from "../client";

const API_PREFIX = '/bets';

class Bets {
    public getAll = async (): Promise<BetListResponse> => {
        const {data} = await client.get<BetListResponse>(`${API_PREFIX}`);
        return data;
    }

    public findByEventId = async (eventId: string): Promise<BetListResponse> => {
        const bets = await this.getAll();
        return bets.filter(bet => bet.eventId === eventId);
    }

    public remove = async (id: string): Promise<void> => {
        await client.delete(`${API_PREFIX}/${id}`);
    }

    public validateBet = async (eventId: string, userId: string): Promise<CanMakeBetResponse> => {
        const bets = await this.getAll();
        const valid = bets.filter(bet => {
            return bet.eventId === eventId && bet.userId === userId;
        }).length === 0;
        return {valid};
    }

    public create = async (request: CreateBetRequest): Promise<BetResponse> => {
        const {data} = await client.post<BetResponse>(`${API_PREFIX}`, request);
        return data;
    }
}

const bets = new Bets();
export default bets;