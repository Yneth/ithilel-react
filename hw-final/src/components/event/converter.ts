import {
  BooleanOutcomeType,
  CreateEventRequest,
  EventResponse,
  getBooleanOutcome,
  OutcomeResponse,
  UpdateEventRequest,
} from "../../api/events/events.types";
import { EventFields } from "./UpsertEventForm";
import { generateRandomId } from "../../util";

function createMockOutcome(
  name: string,
  type: BooleanOutcomeType,
): OutcomeResponse {
  const odds = Math.random() * 10;
  return {
    name,
    odds: type === "yes" ? odds : 1 / odds,
    type,
  };
}

export function mapToCreateRequest(fields: EventFields): CreateEventRequest {
  return {
    ...fields,
    id: generateRandomId(),
    createdAt: Date.now(),
    type: "boolean",
    completionTime: Date.now(),
    backgroundUrl: fields.backgroundUrl
      ? fields.backgroundUrl
      : `https://cataas.com/c?q=${fields.name}`,
    outcomes: [
      createMockOutcome(fields.yesOutcomeName, "yes"),
      createMockOutcome(fields.noOutcomeName, "no"),
    ],
  };
}

export function mapToUpdateRequest(
  eventId: string,
  fields: EventFields,
): UpdateEventRequest {
  return {
    ...mapToCreateRequest(fields),
    id: eventId,
  };
}

export function mapToFormFields(event?: EventResponse): Partial<EventFields> {
  if (!event) {
    return {};
  }
  return {
    name: event.name,
    category: event.category,
    yesOutcomeName: getBooleanOutcome(event, "yes").name,
    noOutcomeName: getBooleanOutcome(event, "no").name,
    description: event.description,
    backgroundUrl: event.backgroundUrl,
  };
}
