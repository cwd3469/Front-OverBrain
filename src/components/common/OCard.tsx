type Props = {
  children?: React.ReactNode;
};
const OCard = ({ children }: Props) => {
  return <div className="flex flex-col p-4 bg-white shadow-lg bg-TG000 rounded-xl">{children}</div>;
};

export default OCard;
