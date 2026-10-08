import "server-only";

type FormKind = "newsletter" | "contact" | "schedule";

export async function sendCrmLead(
  form: FormKind,
  fields: Record<string, unknown>
): Promise<boolean> {
  const baseUrl = process.env.CRM_BASE_URL;
  const apiKey = process.env.CRM_SITE_API_KEY;
  if (!baseUrl || !apiKey || !/^[a-f0-9]{64}$/.test(apiKey)) {
    console.error("CRM delivery skipped: server environment is not configured.");
    return false;
  }

  try {
    const response = await fetch(
      new URL("/api/custom-lead", baseUrl),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-crm-api-key": apiKey,
        },
        body: JSON.stringify({
          type: "form",
          source: `nextjs-${form}-form`,
          data: { form_type: form, ...fields },
        }),
        cache: "no-store",
        signal: AbortSignal.timeout(10000),
      }
    );
    if (!response.ok) {
      console.error("CRM lead delivery failed:", form, response.status);
      return false;
    }
    const result = await response.json();
    if (result.success !== true || typeof result.lead_id !== "string") {
      console.error("CRM returned an unexpected response:", form);
      return false;
    }
    return true;
  } catch {
    console.error("CRM lead delivery failed:", form, "network or response error");
    return false;
  }
}