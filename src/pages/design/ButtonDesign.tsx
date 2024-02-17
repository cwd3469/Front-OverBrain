import OButton from '@/components/common/button/OButton';
import { DesignComponent, ODesignCard, OVDesignPageWrapper } from '@/components/common/layout/ODesignCard';
import { PaletteKey } from '@/styles/palette';

const palettes: PaletteKey[] = ['primary', 'secondary', 'error', 'warning', 'info', 'success', 'gray'];

const ButtonDesign = () => {
  const designComponent: DesignComponent[] = [
    {
      id: '1',
      title: 'Buttons-Contained',
      ui: [
        {
          size: 'large',
          component: palettes.map((el) => {
            return (
              <OButton size="lg" palette={el} key={el}>
                Label
              </OButton>
            );
          }),
        },
        {
          size: 'Medium',
          component: palettes.map((el) => {
            return (
              <OButton size="md" palette={el} key={el}>
                Label
              </OButton>
            );
          }),
        },
        {
          size: 'Small',
          component: palettes.map((el) => {
            return (
              <OButton size="sm" palette={el} key={el}>
                Label
              </OButton>
            );
          }),
        },
      ],
    },
    {
      id: '2',
      title: 'Buttons-Outlined',
      ui: [
        {
          size: 'large',
          component: palettes.map((el) => {
            return (
              <OButton size="lg" palette={el} key={el} variant="outlined">
                Label
              </OButton>
            );
          }),
        },
        {
          size: 'Medium',
          component: palettes.map((el) => {
            return (
              <OButton size="md" palette={el} key={el} variant="outlined">
                Label
              </OButton>
            );
          }),
        },
        {
          size: 'Small',
          component: palettes.map((el) => {
            return (
              <OButton size="sm" palette={el} key={el} variant="outlined">
                Label
              </OButton>
            );
          }),
        },
      ],
    },
    {
      id: '3',
      title: 'Buttons-Text ',
      ui: [
        {
          size: 'large',
          component: palettes.map((el) => {
            return (
              <OButton size="lg" palette={el} key={el} variant="text">
                Label
              </OButton>
            );
          }),
        },
        {
          size: 'Medium',
          component: palettes.map((el) => {
            return (
              <OButton size="md" palette={el} key={el} variant="text">
                Label
              </OButton>
            );
          }),
        },
        {
          size: 'Small',
          component: palettes.map((el) => {
            return (
              <OButton size="sm" palette={el} key={el} variant="text">
                Label
              </OButton>
            );
          }),
        },
      ],
    },
  ];

  return (
    <OVDesignPageWrapper>
      <ODesignCard components={designComponent} />
    </OVDesignPageWrapper>
  );
};

export default ButtonDesign;
