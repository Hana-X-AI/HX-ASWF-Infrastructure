// Shared contract types for the control plane.

/** A stage of governance. */
export interface Stage {
  readonly id: number;
  readonly name: string;
  readonly gate: string;
}

/** A task tier, mapped to a stage. */
export interface Tier {
  readonly id: number;
  readonly name: string;
  readonly shape: string;
  readonly stage: number;
}

/** A roster entry: a technology expert or a cross-cutting role. */
export interface RosterEntry {
  readonly name: string;
  readonly role?: string;
  readonly technology?: string;
  readonly library?: string;
  readonly pending?: boolean;
  readonly roadmap?: boolean;
}
