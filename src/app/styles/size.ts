type Breakpoint = 'xsm' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export type BreakpointValueKey = {
  [key in Breakpoint]: string;
};

const gap: BreakpointValueKey = {
  xsm: '2px',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  xxl: '20px',
};

const radius: BreakpointValueKey = {
  xsm: '2px',
  sm: '4px',
  md: '6px',
  lg: '8px',
  xl: '16px',
  xxl: '24px',
};

const screens: BreakpointValueKey = {
  xsm: '480px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  xxl: '1536px',
};

const size = {
  gap,
  radius,
  screens,
};
export default size;
