/**
 * KANSOTEX AUTONOMOUS MULTI-AGENT SYSTEM (AI COMMUNICATION AGENCY)
 * Core Type Definitions, Hierarchy Constraints & Protocol Contracts
 */

// =============================================================================
// 1. AGENT HIERARCHY & ROLES
// =============================================================================

export type AgentTier = "TIER_1_EXECUTIVE" | "TIER_2_DIRECTOR" | "TIER_3_PM" | "TIER_4_PERSONNEL";

export type AgentRole =
  // Tier 1: Ultimate Decision-Maker
  | "THE_BOSS"
  // Tier 2: Operational Orchestrator
  | "THE_DIRECTOR"
  // Tier 3: Mid-Level Leadership (Project Managers)
  | "CREATIVE_PM"
  | "MARKETING_PM"
  | "CODE_PM"
  // Tier 4: Creative Personnel
  | "WEB_DESIGNER"
  | "UI_UX_EXPERT"
  // Tier 4: Marketing Personnel
  | "SEO_EXPERT"
  | "STRATEGY_ANALYST"
  | "CONTENT_WRITER"
  | "ADS_EXPERT"
  // Tier 4: Code Personnel
  | "FRONTEND_DEV"
  | "BACKEND_DEV"
  | "DEVOPS_ENG"
  | "AI_DEV";

export type TeamDepartment = "EXECUTIVE" | "DIRECTORATE" | "CREATIVE" | "MARKETING" | "CODE";

export interface AgentDescriptor {
  role: AgentRole;
  tier: AgentTier;
  department: TeamDepartment;
  reportsTo: AgentRole | null;
  directReports: AgentRole[];
  canFallbackExecute: boolean;
  maxTokensPerTask: number;
}

// Canonical Hierarchy Graph Definition
export const AGENT_REGISTRY: Record<AgentRole, AgentDescriptor> = {
  THE_BOSS: {
    role: "THE_BOSS",
    tier: "TIER_1_EXECUTIVE",
    department: "EXECUTIVE",
    reportsTo: null,
    directReports: ["THE_DIRECTOR"],
    canFallbackExecute: false,
    maxTokensPerTask: 1500,
  },
  THE_DIRECTOR: {
    role: "THE_DIRECTOR",
    tier: "TIER_2_DIRECTOR",
    department: "DIRECTORATE",
    reportsTo: "THE_BOSS",
    directReports: ["CREATIVE_PM", "MARKETING_PM", "CODE_PM"],
    canFallbackExecute: true,
    maxTokensPerTask: 4000,
  },
  CREATIVE_PM: {
    role: "CREATIVE_PM",
    tier: "TIER_3_PM",
    department: "CREATIVE",
    reportsTo: "THE_DIRECTOR",
    directReports: ["WEB_DESIGNER", "UI_UX_EXPERT"],
    canFallbackExecute: true,
    maxTokensPerTask: 3500,
  },
  MARKETING_PM: {
    role: "MARKETING_PM",
    tier: "TIER_3_PM",
    department: "MARKETING",
    reportsTo: "THE_DIRECTOR",
    directReports: ["SEO_EXPERT", "STRATEGY_ANALYST", "CONTENT_WRITER", "ADS_EXPERT"],
    canFallbackExecute: true,
    maxTokensPerTask: 3500,
  },
  CODE_PM: {
    role: "CODE_PM",
    tier: "TIER_3_PM",
    department: "CODE",
    reportsTo: "THE_DIRECTOR",
    directReports: ["FRONTEND_DEV", "BACKEND_DEV", "DEVOPS_ENG", "AI_DEV"],
    canFallbackExecute: true,
    maxTokensPerTask: 4000,
  },
  WEB_DESIGNER: {
    role: "WEB_DESIGNER",
    tier: "TIER_4_PERSONNEL",
    department: "CREATIVE",
    reportsTo: "CREATIVE_PM",
    directReports: [],
    canFallbackExecute: false,
    maxTokensPerTask: 2500,
  },
  UI_UX_EXPERT: {
    role: "UI_UX_EXPERT",
    tier: "TIER_4_PERSONNEL",
    department: "CREATIVE",
    reportsTo: "CREATIVE_PM",
    directReports: [],
    canFallbackExecute: false,
    maxTokensPerTask: 2500,
  },
  SEO_EXPERT: {
    role: "SEO_EXPERT",
    tier: "TIER_4_PERSONNEL",
    department: "MARKETING",
    reportsTo: "MARKETING_PM",
    directReports: [],
    canFallbackExecute: false,
    maxTokensPerTask: 2500,
  },
  STRATEGY_ANALYST: {
    role: "STRATEGY_ANALYST",
    tier: "TIER_4_PERSONNEL",
    department: "MARKETING",
    reportsTo: "MARKETING_PM",
    directReports: [],
    canFallbackExecute: false,
    maxTokensPerTask: 3000,
  },
  CONTENT_WRITER: {
    role: "CONTENT_WRITER",
    tier: "TIER_4_PERSONNEL",
    department: "MARKETING",
    reportsTo: "MARKETING_PM",
    directReports: [],
    canFallbackExecute: false,
    maxTokensPerTask: 3500,
  },
  ADS_EXPERT: {
    role: "ADS_EXPERT",
    tier: "TIER_4_PERSONNEL",
    department: "MARKETING",
    reportsTo: "MARKETING_PM",
    directReports: [],
    canFallbackExecute: false,
    maxTokensPerTask: 3000,
  },
  FRONTEND_DEV: {
    role: "FRONTEND_DEV",
    tier: "TIER_4_PERSONNEL",
    department: "CODE",
    reportsTo: "CODE_PM",
    directReports: [],
    canFallbackExecute: false,
    maxTokensPerTask: 4000,
  },
  BACKEND_DEV: {
    role: "BACKEND_DEV",
    tier: "TIER_4_PERSONNEL",
    department: "CODE",
    reportsTo: "CODE_PM",
    directReports: [],
    canFallbackExecute: false,
    maxTokensPerTask: 4000,
  },
  DEVOPS_ENG: {
    role: "DEVOPS_ENG",
    tier: "TIER_4_PERSONNEL",
    department: "CODE",
    reportsTo: "CODE_PM",
    directReports: [],
    canFallbackExecute: false,
    maxTokensPerTask: 3000,
  },
  AI_DEV: {
    role: "AI_DEV",
    tier: "TIER_4_PERSONNEL",
    department: "CODE",
    reportsTo: "CODE_PM",
    directReports: [],
    canFallbackExecute: false,
    maxTokensPerTask: 3500,
  },
};

// =============================================================================
// 2. BOSS CONSTRAINTS & DECISION CONTRACTS
// =============================================================================

export type BossAction = "[OK]" | "[NO]";

export interface BossDecision {
  action: BossAction;
  justification: string;
  projectedRoiMultiplier?: number;
  maxApprovedBudgetMad?: number;
  maxApprovedTokens?: number;
  riskAssessment: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  timestamp: string;
}

// =============================================================================
// 3. COMMUNICATION PROTOCOL & MESSAGE SCHEMA
// =============================================================================

export type ChannelType =
  | "EXECUTIVE_ISOLATED"     // Director <-> Boss ONLY
  | "DIRECTORATE_DESK"      // Director <-> PMs ONLY
  | "TEAM_DISPATCH"         // PM <-> Their Personnel ONLY
  | "SYSTEM_TELEMETRY";     // Read-only metrics broadcast

export interface AgentMessage {
  id: string;
  sender: AgentRole;
  recipient: AgentRole;
  channel: ChannelType;
  timestamp: string;
  subject: string;
  payload: Record<string, unknown>;
  tokenCostEstimate?: number;
  correlationId: string;
}

export interface CommunicationBoundaryViolation {
  blocked: boolean;
  reason: string;
  sender: AgentRole;
  recipient: AgentRole;
  attemptedChannel: ChannelType;
}

// =============================================================================
// 4. WORKFLOW GRAPH & EXECUTION STATE
// =============================================================================

export type WorkflowStatus =
  | "INITIALIZING"
  | "DIRECTOR_DRAFTING"
  | "PENDING_BOSS_APPROVAL"
  | "DISPATCHED_TO_PM"
  | "PERSONNEL_EXECUTING"
  | "PM_SYNTHESIS"
  | "DIRECTOR_FINAL_REVIEW"
  | "PENDING_BOSS_SIGN_OFF"
  | "COMPLETED"
  | "REJECTED_BY_BOSS"
  | "BLOCKED_BOTTLENECK";

export interface TaskAssignment {
  taskId: string;
  assignedTo: AgentRole;
  brief: string;
  deliverableType: "COPY" | "ADS_CAMPAIGN" | "CODE_DIFF" | "UI_SPEC" | "SEO_AUDIT";
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "FALLBACK_TRIGGERED";
  result?: Record<string, unknown>;
  tokensConsumed: number;
  durationMs: number;
}

export interface WorkflowState {
  workflowId: string;
  originalRequest: string;
  initiatedAt: string;
  status: WorkflowStatus;
  currentStep: string;
  bossPreliminaryDecision?: BossDecision;
  bossFinalDecision?: BossDecision;
  directorRoadmap?: {
    summary: string;
    targetAudience: string;
    kpis: Record<string, string | number>;
    assignedPM: AgentRole;
    estimatedCostTokens: number;
  };
  pmSubTasks: TaskAssignment[];
  deliverables: Record<string, unknown>;
  auditTrail: AgentMessage[];
  totalTokensConsumed: number;
  feedbackIterations: number;
}

// =============================================================================
// 5. TELEMETRY & SELF-IMPROVEMENT EVOLUTION
// =============================================================================

export interface RealWorldWebsiteMetrics {
  conversionRatePercent: number;       // e.g. 2.85%
  averageOrderValueMad: number;        // e.g. 4200 MAD
  bounceRatePercent: number;           // e.g. 34.2%
  pageSpeedLcpSeconds: number;         // e.g. 1.4s
  seoKeywordTop3Count: number;         // e.g. 42 keywords in top 3
  pinterestCtrPercent: number;         // e.g. 3.4% CTR
  metaAdsRoas: number;                 // e.g. 4.8x ROAS
  cartAbandonmentPercent: number;      // e.g. 58.1%
  timestamp: string;
}

export interface PromptEvolutionPatch {
  agentRole: AgentRole;
  version: number;
  triggerMetric: string;
  insightDescription: string;
  promptAddendum: string;
  evolvedAt: string;
  status: "ACTIVE" | "ARCHIVED";
}
