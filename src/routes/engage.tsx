import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/engage")({
  beforeLoad: () => {
    throw redirect({ to: "/contact" });
  },
});
