export type MenuInfo = {
  name: string;
  link: string;
  icons: React.ReactNode;
};

type Props = {
  children?: React.ReactNode;
};

const OLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen ">
      <div className="container absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <div className="p-3 bg-slate-200">{children}</div>
      </div>
    </div>
  );
};

export default OLayout;
