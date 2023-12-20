export type MenuInfo = {
  name: string;
  link: string;
  icons: React.ReactNode;
};

type Props = {
  children?: React.ReactNode;
  menuInfoList?: MenuInfo[];
};

const OLayout = ({ children, menuInfoList }: Props) => {
  return (
    <div className="flex flex-row">
      <div className="flex flex-col">
        {menuInfoList &&
          menuInfoList.map((el, index) => {
            return (
              <div key={index + el.name}>
                <div className=""></div>
              </div>
            );
          })}
      </div>
      {children}
    </div>
  );
};

export default OLayout;
