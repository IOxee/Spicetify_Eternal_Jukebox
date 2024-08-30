import type { Session } from "libs/shared/platform/session";
import { waitForPlatformApi } from "libs/shared/utils/spicetify-utils";

export async function get<T>(url: string): Promise<T> {
  const session = await waitForPlatformApi<Session>("Session");

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  return await response.json();
}
