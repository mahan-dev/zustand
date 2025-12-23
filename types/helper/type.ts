interface ItemDetails {
  id?: number;
  userId?: number;
  title?: string;
  body?: string;
}
interface FormState {
  data?: ItemDetails | null;
  error: string | null;
}

type FormStatus = FormState | null;

export type { ItemDetails, FormState, FormStatus };
