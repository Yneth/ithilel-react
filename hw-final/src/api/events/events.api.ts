import {
  CreateEventRequest,
  EventListResponse,
  EventResponse,
  UpdateEventRequest,
} from "./events.types";
import client from "../client";

const API_PREFIX = "/events";

class Events {
  public create = async (
    request: CreateEventRequest,
  ): Promise<EventResponse> => {
    const { data } = await client.post<EventResponse>(`${API_PREFIX}`, request);
    return data;
  };

  public getAll = async (): Promise<EventListResponse> => {
    const { data } = await client.get<EventListResponse>(`${API_PREFIX}`);
    return data;
  };

  public update = async (
    request: UpdateEventRequest,
  ): Promise<EventResponse> => {
    const { data } = await client.put<EventResponse>(
      `${API_PREFIX}/${request.id}`,
      request,
    );
    return data;
  };

  public findById = async (id: string): Promise<EventResponse> => {
    const { data } = await client.get<EventResponse>(`${API_PREFIX}/${id}`);
    return data;
  };

  public remove = async (id: string): Promise<void> => {
    await client.delete(`${API_PREFIX}/${id}`);
  };
}

const events = new Events();
export default events;
