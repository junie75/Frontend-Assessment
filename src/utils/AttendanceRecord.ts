//Hook for storing check ins and check outs in local storage

import { useEffect, useState } from "react";

//holds the check in and check out values for each operator and the specific shift
type AttendanceRecord = {
  opId: string;
  userId: number;
  checkInAt: string;
  checkOutAt: string | null;
  status: CheckInStatus;
};

type CheckInStatus = "not_started" | "checked_in" | "checked_out"; //stores currently checked in status for the operator (used for check in/out/shift completed buttons)

const STORAGE_KEY = "attendanceRecord";

//get the record from local storage and parse the data
const getAttendanceRecord = (): AttendanceRecord[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];

  try {
    return JSON.parse(data) as AttendanceRecord[];
  } catch {
    return [];
  }
};

//save record to local storage
const saveAttendanceRecord = (records: AttendanceRecord[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
};

//hook to manage attendance record state and provide functions for check in, check out, and getting status
export const useAttendanceRecord = () => {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);

  //on component mount, get the attendance record from local storage and set it to state
  useEffect(() => {
    setRecords(getAttendanceRecord());
  }, []);

  //function to refresh the state from local storage (used after check in and check out to update the state with the latest data)
  const refresh = () => {
    setRecords(getAttendanceRecord());
  };

  //function to handle check in
  const checkIn = (userId: number, opId: string) => {
    const current = getAttendanceRecord();

    //if user id already exists in the storage, do not create a new record
    const hasActiveRecord = current.some(
      (record) => record.userId === userId && record.opId === opId,
    );

    if (hasActiveRecord) {
      alert("User has already checked in.");
      return;
    }

    //create new record if user id does not exist in storage
    const newRecord: AttendanceRecord = {
      opId: opId,
      userId: userId,
      checkInAt: new Date().toISOString(),
      checkOutAt: null,
      status: "checked_in",
    };

    //save the new record to local storage and refresh the state
    saveAttendanceRecord([...current, newRecord]);
    refresh();
  };

  //function to handle check out
  const checkOut = (userId: number, opId: string) => {
    const current = getAttendanceRecord();

    // get the current record for the user
    const activeRecord = current.find(
      (record) =>
        record.userId === userId &&
        record.opId === opId &&
        record.checkOutAt === null,
    );

    //if the user does not exist or has already been checked out, do not checkout and alert the user
    if (!activeRecord) {
      alert("User is not currently checked in.");
      return;
    }

    // update the record with the user's check out time and status
    const updatedRecord: AttendanceRecord[] = current.map((record) =>
      record === activeRecord
        ? {
            ...record,
            checkOutAt: new Date().toISOString(),
            status: "checked_out",
          }
        : record,
    );

    //save updated record and refresh state
    saveAttendanceRecord(updatedRecord);
    refresh();
  };

  //function to get the current status of the user (used to determine which buttons to show for check in, check out, and completed shift)
  const getStatus = (userId: number) => {
    const foundRecord = records.find((record) => record.userId === userId); //find the record for the user, if it exists

    const status = foundRecord?.status ?? "not_started"; //if the record exists, return the status, if not return "not_started"

    return status;
  };

  return {
    records,
    activeCheckIns: records.filter((record) => record.status === "checked_in"),
    checkIn,
    checkOut,
    getStatus,
  };
};
