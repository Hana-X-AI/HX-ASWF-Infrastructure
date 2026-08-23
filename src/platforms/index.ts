// PlatformAdapter contract. One adapter per platform turns a rendered prompt
// into that platform's output shape (rules file, hooks, scope guard).

export interface PlatformAdapter {
  /** The platform name, e.g. "deepseek-harness", "claude-code", "codex". */
  readonly id: string;

  /** Render the rules file content for this platform. */
  renderRules(rendered: string): string;

  /** Return the hook/guard files this platform expects, if any. */
  artifacts(): string[];
}

// Adapters are added when the control plane is built (M3). The primary adapter
// is deepseek-harness (KDD-015). Claude Code, Codex, and Kiro follow.
