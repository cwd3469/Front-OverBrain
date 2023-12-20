type Props = {
  children?: React.ReactNode;
};
const OCard = ({ children }: Props) => {
  return <div className="flex flex-col bg-TG000 rounded-xl	shadow-lg p-4">{children}</div>;
};

export default OCard;
