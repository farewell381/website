export type DecisionLabProgress = {
  solvedToolIds: string[];
  totalXp: number;
  introSeen: boolean;
};

const STORAGE_KEY = 'mindframe-decision-lab-progress';

export const defaultDecisionLabProgress: DecisionLabProgress = {
  solvedToolIds: [],
  totalXp: 0,
  introSeen: false,
};

export function loadDecisionLabProgress(): DecisionLabProgress {
  if (typeof window === 'undefined') return defaultDecisionLabProgress;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultDecisionLabProgress;
    return JSON.parse(raw) as DecisionLabProgress;
  } catch {
    return defaultDecisionLabProgress;
  }
}

export function saveDecisionLabProgress(progress: DecisionLabProgress) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function markSolved(
  progress: DecisionLabProgress,
  toolId: string,
  xp: number
): DecisionLabProgress {
  if (progress.solvedToolIds.includes(toolId)) return progress;

  const nextProgress = {
    solvedToolIds: [...progress.solvedToolIds, toolId],
    totalXp: progress.totalXp + xp,
    introSeen: progress.introSeen,
  };

  saveDecisionLabProgress(nextProgress);
  return nextProgress;
}

export function markIntroSeen(progress: DecisionLabProgress): DecisionLabProgress {
  if (progress.introSeen) return progress;

  const nextProgress = { ...progress, introSeen: true };
  saveDecisionLabProgress(nextProgress);
  return nextProgress;
}

export function resetDecisionLabProgress(): DecisionLabProgress {
  saveDecisionLabProgress(defaultDecisionLabProgress);
  return defaultDecisionLabProgress;
}
