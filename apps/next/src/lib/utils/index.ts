import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      const { data } = error.response;
      if (typeof data === "string") {
        return data;
      } else if (
        (data && typeof data.message === "string") ||
        typeof data.error === "string"
      ) {
        return data.message || data.error;
      } else {
        return `HTTP ${error.response.status}: ${error.response.statusText}`;
      }
    } else if (error.request) {
      return "No response received from server. Please check your network connection.";
    } else {
      return error.message || "An error occurred while setting up the request.";
    }
  } else if (error instanceof Error) {
    return error.message;
  } else {
    return "An unknown error occurred";
  }
}

export function truncateString(str: string, maxLength: number): string {
  return str.length > maxLength ? str.substring(0, maxLength) + "..." : str;
}
