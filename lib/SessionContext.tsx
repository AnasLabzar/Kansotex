"use client";

import React, { createContext, useContext, ReactNode } from "react";
import type { SessionData } from "./session";

type SessionContextType = {
  session: SessionData | null;
};

const SessionContext = createContext<SessionContextType>({ session: null });

export function SessionProvider({ session, children }: { session: SessionData | null, children: ReactNode }) {
  return (
    <SessionContext.Provider value={{ session }}>
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => useContext(SessionContext);
