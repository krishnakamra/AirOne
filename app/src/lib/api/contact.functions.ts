import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { bindings } from "../bindings.server";

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const TravelRequestInput = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().max(200).regex(EMAIL),
  phone: z.string().trim().max(60).default(""),
  travelers: z.string().trim().max(20).default("1"),
  window: z.string().trim().max(200).default(""),
  destination: z.string().trim().max(200).default(""),
  reference: z.string().trim().max(60).default(""),
  message: z.string().trim().min(4).max(4000),
});

/**
 * Takes a travel request from the contact page and writes it to the desk's D1
 * table. Server only: the binding is read per request inside the handler and
 * never reaches the browser.
 */
export const submitTravelRequest = createServerFn({ method: "POST" })
  .inputValidator(TravelRequestInput)
  .handler(async ({ data }) => {
    const { DB } = bindings();
    if (!DB) {
      throw new Error("The request desk is unavailable. Please call instead.");
    }

    const id = `req_${crypto.randomUUID()}`;
    await DB.prepare(
      `INSERT INTO travel_requests
         (id, name, email, phone, travelers, travel_window, destination, reference, message, created_at)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10)`,
    )
      .bind(
        id,
        data.name,
        data.email,
        data.phone,
        data.travelers,
        data.window,
        data.destination,
        data.reference,
        data.message,
        new Date().toISOString(),
      )
      .run();

    return { id };
  });
