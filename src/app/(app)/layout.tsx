import { ReactNode } from "react";

// This layout wraps all authenticated routes
// Add auth checks here later

export default function AppLayout({ children }: { children: ReactNode }) {
  // TODO: Check auth, redirect to login if not authenticated
  return <>{children}</>;
}
