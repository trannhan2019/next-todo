export type todoType = {
  id: string;
  title?: string | null;
  isCompleted: boolean;
  updatedAt?: Date | null;
  createdAt?: Date;
};

export type todoPaginationParamsType = {
  page?: number;
  limit?: number;
};
