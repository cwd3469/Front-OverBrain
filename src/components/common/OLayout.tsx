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
    <div className="h-screen">
      <div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8 ">
        <div className="container p-3 bg-slate-200">{children}</div>
      </div>
    </div>
  );
};

export default OLayout;
