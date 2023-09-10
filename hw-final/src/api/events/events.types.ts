export type BetEventType = "boolean" | "multi";

export type BooleanOutcomeType = "yes" | "no";

export interface OutcomeResponse {
    name: string;
    odds: number;
    type: BooleanOutcomeType;
}

export interface EventResponse {
    type: BetEventType;
    id: string;
    createdAt: number;
    name: string;
    description: string;
    backgroundUrl: string;
    category: string;
    completionTime: number;
    outcomes: OutcomeResponse[];
}

export function getBooleanOutcome(event: EventResponse, outcomeType: BooleanOutcomeType): OutcomeResponse {
    if (event.type !== 'boolean') {
        throw new Error('invalid type of event');
    }
    return event.outcomes.filter(outcome => outcome.type === outcomeType)[0];
}

export type UpdateEventRequest = EventResponse;

export type CreateEventRequest = EventResponse;

export type EventListResponse = EventResponse[];