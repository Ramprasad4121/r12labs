import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/bench")({
  beforeLoad: () => {
    throw redirect({ to: "/research" });
  },
});
