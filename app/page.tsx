import { redirect } from "next/navigation";

/**
 * Root page — redirects to the main dashboard.
 * In future phases this will be a marketing landing page.
 */
export default function RootPage() {
  redirect("/dashboard");
}
