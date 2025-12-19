import { Company, Metric, ShareValue } from "@/generated/prisma/client";
import { create } from "zustand";

type CompanyWithRelations = Company & {
  metrics: Metric[];
  shareValues: ShareValue[];
};

type CompanyStore = {
  company: CompanyWithRelations;
  setCompany: (company: CompanyWithRelations) => void;
};

const useCompany = create<CompanyStore>((set) => ({
  company: {
    name: "",
    ticker: "",
    id: 0,
    ipoDate: new Date(),
    metrics: [],
    shareValues: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  setCompany: (company: CompanyWithRelations) => set({ company }),
}));

export default useCompany;
