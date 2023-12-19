import OButton from '@components/common/OButton';
import OLayout from '@components/common/OLayout';

const MainPage = () => {
  return (
    <OLayout>
      <div className="flex flex-row items-center gap-3">
        <OButton size="large">label</OButton>
        <OButton size="medium">label</OButton>
        <OButton size="small">label</OButton>
      </div>
    </OLayout>
  );
};

export default MainPage;
