import { Button } from "./Button";

export function ActionRow() {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <Button variant="solid">Confirm</Button>
      <Button variant="outline">Cancel</Button>
    </div>
  );
}
