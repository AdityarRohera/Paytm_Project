
import type { ReactNode } from 'react';

interface WarnType {
  warn: ReactNode;
}

function UserWarning({ warn }: WarnType) {
  return <div>{warn}</div>;
}

export default UserWarning;
