import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface API {
  id: string;
  name: string;
  status: "online" | "offline" | "maintenance";
  responseTime: number;
  uptime: number;
}

interface AppState {
  // App state
  isLoading: boolean;
  error: string | null;
  theme: "dark" | "light";

  // API state
  apis: API[];
  selectedAPI: string | null;

  // Actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setTheme: (theme: "dark" | "light") => void;
  setApis: (apis: API[]) => void;
  setSelectedAPI: (apiId: string | null) => void;
  updateAPIStatus: (apiId: string, status: API["status"]) => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        isLoading: false,
        error: null,
        theme: "dark",
        apis: [],
        selectedAPI: null,

        // Actions
        setLoading: (loading) => set({ isLoading: loading }),

        setError: (error) => set({ error }),

        setTheme: (theme) => set({ theme }),

        setApis: (apis) => set({ apis }),

        setSelectedAPI: (apiId) => set({ selectedAPI: apiId }),

        updateAPIStatus: (apiId, status) => {
          const apis = get().apis.map((api) =>
            api.id === apiId ? { ...api, status } : api
          );
          set({ apis });
        },
      }),
      {
        name: "app-storage",
        partialize: (state) => ({
          theme: state.theme,
          selectedAPI: state.selectedAPI,
        }),
      }
    ),
    { name: "app-store" }
  )
);
