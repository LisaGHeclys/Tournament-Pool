export function firestoreTimestampToDate(
  timestamp: { _seconds: number; _nanoseconds: number } | Date,
): Date {
  if (timestamp instanceof Date) {
    return timestamp;
  }
  return new Date(
    timestamp._seconds * 1000 + timestamp._nanoseconds / 1_000_000,
  );
}
