import { useEffect, useState } from "react";

type OperatorStatus = {
  recordId: string;
  userId: string;
  name: string;
  checkInAt: string;
  checkOutAt: string | null;
};

const STORAGE_KEY = "operatorStatus";

const getOperatorStatus = (): OperatorStatus[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];

  try {
    return JSON.parse(data) as OperatorStatus[];
  } catch {
    return [];
  }
};

const saveOperatorStatus = (records: OperatorStatus[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
};

export const useOperatorStatus = () => {
  const [records, setRecords] = useState<OperatorStatus[]>([]);

  useEffect(() => {
    setRecords(getOperatorStatus());
  }, []);

  const refresh = () => {
    setRecords(getOperatorStatus());
  };

  const checkIn = (user: { userId: string; name: string }) => {
    const current = getOperatorStatus();

    const hasActiveRecord = current.some(
      (record) => record.userId === user.userId && record.checkOutAt === null,
    );

    if (hasActiveRecord) {
      throw new Error("User is already checked in.");
    }

    const newRecord: OperatorStatus = {
      recordId: crypto.randomUUID(),
      userId: user.userId,
      name: user.name,
      checkInAt: new Date().toISOString(),
      checkOutAt: null,
    };

    saveOperatorStatus([...current, newRecord]);
    refresh();
  };

  const checkOut = (userId: string) => {
    const current = getOperatorStatus();

    const updated = current.map((record) =>
      record.userId === userId && record.checkOutAt === null
        ? { ...record, checkOutAt: new Date().toISOString() }
        : record,
    );

    saveOperatorStatus(updated);
    refresh();
  };

  return {
    records,
    activeCheckIns: records.filter((record) => record.checkOutAt === null),
    checkIn,
    checkOut,
  };
};
