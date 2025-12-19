
export enum DifficultyLevel {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced',
  EXPERT = 'Expert'
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  difficulty: DifficultyLevel;
  skillArea: string;
}

export interface SkillGap {
  skill: string;
  currentLevel: number;
  targetLevel: number;
  marketDemand: number; // 0-100
  futureGrowth: number; // 3-5 years prediction
}

export interface TrainingModule {
  title: string;
  description: string;
  duration: string;
  link: string;
  level: DifficultyLevel;
}

export interface AssessmentResult {
  score: number;
  level: DifficultyLevel;
  skillGaps: SkillGap[];
  recommendations: TrainingModule[];
}

export interface DashboardStats {
  digitalReadiness: number;
  gapSize: number;
  topSkillsNeeded: string[];
  employeeProgress: number;
}
