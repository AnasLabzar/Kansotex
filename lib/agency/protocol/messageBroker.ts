/**
 * KANSOTEX AUTONOMOUS MULTI-AGENT SYSTEM (AI COMMUNICATION AGENCY)
 * Message Broker & Strict Hierarchical Communication Boundary Enforcement
 */

import {
  AgentRole,
  AgentMessage,
  ChannelType,
  AGENT_REGISTRY,
  CommunicationBoundaryViolation,
} from "../types";

export class MessageBroker {
  private auditLog: AgentMessage[] = [];
  private violationsLog: CommunicationBoundaryViolation[] = [];

  /**
   * Validates if a proposed communication adheres strictly to the agency's
   * hierarchical command chain.
   *
   * STRICT BOUNDARY RULES:
   * 1. Personnel (Tier 4) can NEVER communicate with The Boss (Tier 1) or Director (Tier 2).
   * 2. Personnel can ONLY communicate directly with their assigned Project Manager.
   * 3. Cross-Personnel communication must be routed via their PM.
   * 4. PMs can NEVER communicate with The Boss directly. They report exclusively to The Director.
   * 5. The Director is the SOLE entity permitted to communicate with The Boss.
   * 6. The Boss communicates exclusively with The Director.
   */
  public validateBoundary(
    sender: AgentRole,
    recipient: AgentRole,
    channel: ChannelType
  ): { allowed: boolean; violation?: CommunicationBoundaryViolation } {
    const senderDesc = AGENT_REGISTRY[sender];
    const recipientDesc = AGENT_REGISTRY[recipient];

    // Rule 1 & 4: Only The Director can talk to The Boss
    if (recipient === "THE_BOSS") {
      if (sender !== "THE_DIRECTOR") {
        const violation: CommunicationBoundaryViolation = {
          blocked: true,
          reason: `SECURITY_BREACH: ${sender} (${senderDesc.tier}) attempted direct communication with THE_BOSS. Only THE_DIRECTOR has access to the Executive Isolated Channel.`,
          sender,
          recipient,
          attemptedChannel: channel,
        };
        this.violationsLog.push(violation);
        return { allowed: false, violation };
      }
      if (channel !== "EXECUTIVE_ISOLATED") {
        const violation: CommunicationBoundaryViolation = {
          blocked: true,
          reason: `PROTOCOL_VIOLATION: Communication with THE_BOSS must utilize the EXECUTIVE_ISOLATED channel.`,
          sender,
          recipient,
          attemptedChannel: channel,
        };
        this.violationsLog.push(violation);
        return { allowed: false, violation };
      }
    }

    // Rule 6: The Boss can ONLY talk to The Director
    if (sender === "THE_BOSS") {
      if (recipient !== "THE_DIRECTOR") {
        const violation: CommunicationBoundaryViolation = {
          blocked: true,
          reason: `CONSTITUTIONAL_ERROR: THE_BOSS can only issue directives to THE_DIRECTOR. Micro-management of lower tiers is prohibited.`,
          sender,
          recipient,
          attemptedChannel: channel,
        };
        this.violationsLog.push(violation);
        return { allowed: false, violation };
      }
    }

    // Rule 1: Personnel cannot talk to Director
    if (senderDesc.tier === "TIER_4_PERSONNEL" && recipient === "THE_DIRECTOR") {
      const violation: CommunicationBoundaryViolation = {
        blocked: true,
        reason: `HIERARCHY_VIOLATION: Personnel member ${sender} attempted to bypass their Project Manager to reach THE_DIRECTOR.`,
        sender,
        recipient,
        attemptedChannel: channel,
      };
      this.violationsLog.push(violation);
      return { allowed: false, violation };
    }

    // Rule 2: Personnel can only talk to their own assigned PM
    if (senderDesc.tier === "TIER_4_PERSONNEL") {
      if (recipient !== senderDesc.reportsTo) {
        const violation: CommunicationBoundaryViolation = {
          blocked: true,
          reason: `HIERARCHY_VIOLATION: Personnel ${sender} reports to ${senderDesc.reportsTo}, but attempted to send a message to ${recipient}.`,
          sender,
          recipient,
          attemptedChannel: channel,
        };
        this.violationsLog.push(violation);
        return { allowed: false, violation };
      }
    }

    // Rule 3: PM to Personnel (must be direct report)
    if (senderDesc.tier === "TIER_3_PM" && recipientDesc.tier === "TIER_4_PERSONNEL") {
      if (!senderDesc.directReports.includes(recipient)) {
        const violation: CommunicationBoundaryViolation = {
          blocked: true,
          reason: `INTER_DEPARTMENTAL_BREACH: ${sender} cannot assign tasks or message ${recipient} outside their department. Coordinate via THE_DIRECTOR.`,
          sender,
          recipient,
          attemptedChannel: channel,
        };
        this.violationsLog.push(violation);
        return { allowed: false, violation };
      }
    }

    // Rule 5: Director to PMs
    if (sender === "THE_DIRECTOR") {
      if (recipientDesc.tier !== "TIER_3_PM" && recipient !== "THE_BOSS") {
        const violation: CommunicationBoundaryViolation = {
          blocked: true,
          reason: `PROTOCOL_VIOLATION: THE_DIRECTOR only interfaces directly with PMs or THE_BOSS. Cannot micro-dispatch to Personnel ${recipient}.`,
          sender,
          recipient,
          attemptedChannel: channel,
        };
        this.violationsLog.push(violation);
        return { allowed: false, violation };
      }
    }

    return { allowed: true };
  }

  /**
   * Dispatches an agent message through the broker.
   * Throws an error if any hierarchical boundary is violated.
   */
  public dispatch(message: Omit<AgentMessage, "id" | "timestamp">): AgentMessage {
    const check = this.validateBoundary(message.sender, message.recipient, message.channel);

    if (!check.allowed || check.violation) {
      throw new Error(`[AGENCY_BROKER_BLOCK] ${check.violation?.reason}`);
    }

    const finalMessage: AgentMessage = {
      id: `MSG-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      timestamp: new Date().toISOString(),
      ...message,
    };

    this.auditLog.push(finalMessage);
    return finalMessage;
  }

  public getAuditLog(): AgentMessage[] {
    return [...this.auditLog];
  }

  public getViolationsLog(): CommunicationBoundaryViolation[] {
    return [...this.violationsLog];
  }

  public clear(): void {
    this.auditLog = [];
    this.violationsLog = [];
  }
}
