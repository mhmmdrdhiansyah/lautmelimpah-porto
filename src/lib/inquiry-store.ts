import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type InquiryItem = {
  productId: number;
  name: string;
  requestedForm?: string;
  requestedSize?: string;
  estimatedQuantity: string;
};

type InquiryState = {
  items: InquiryItem[];
  // Set true after the client hydrates so persisted items are not rendered on
  // the server pass (avoids hydration mismatch); never persisted.
  itemsMounted: boolean;
  add: (productId: number, name: string, form?: string, size?: string) => void;
  remove: (productId: number) => void;
  setQuantity: (productId: number, q: string) => void;
  clear: () => void;
};

export const useInquiryStore = create<InquiryState>()(
  persist(
    (set) => ({
      items: [],
      itemsMounted: false,
      add: (productId, name, form, size) =>
        set((state) =>
          state.items.some((i) => i.productId === productId)
            ? state
            : {
                items: [
                  ...state.items,
                  {
                    productId,
                    name,
                    requestedForm: form,
                    requestedSize: size,
                    estimatedQuantity: "",
                  },
                ],
              },
        ),
      remove: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        })),
      setQuantity: (productId, q) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId ? { ...i, estimatedQuantity: q } : i,
          ),
        })),
      clear: () => set({ items: [] }),
    }),
    {
      name: "lautmelimpah-inquiry",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
