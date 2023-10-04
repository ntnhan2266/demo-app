export interface IMockResponse {
  success: boolean;
  data?: {
    message: string;
    repoId: number;
  };
  error?: {
    message: string;
  };
}
