const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code?: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const body = (await response.json()) as
    | ApiResponse<T>
    | { success: false; error?: { message?: string; code?: string } };

  if (!response.ok || !body.success) {
    const errorBody = body as {
      error?: { message?: string; code?: string };
    };

    throw new ApiError(
      errorBody.error?.message ?? "Une erreur est survenue.",
      response.status,
      errorBody.error?.code,
    );
  }

  return (body as ApiResponse<T>).data;
}
