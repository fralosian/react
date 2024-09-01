import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  customClass?: string;
}

function Container({ children, customClass }: ContainerProps) {
  return (
    <div className={`w-full max-w-6xl mx-auto px-4 ${customClass}`}>
      {children}
    </div>
  );
}

export default Container;
