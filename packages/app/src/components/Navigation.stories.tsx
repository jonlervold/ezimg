import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import Navigation from './Navigation';

export default {
  component: Navigation,
  title: 'actions/Navigation',
  argTypes: { onChange: { action: 'onInputChange' } },
} as ComponentMeta<typeof Navigation>;

const Template: ComponentStory<typeof Navigation> = (args) => {
  return (
    <Navigation
      perPage={args.perPage}
      setPerPage={args.setPerPage}
      itemTotal={args.itemTotal}
      firstImage={args.firstImage}
      setFirstImage={args.setFirstImage}
    />
  );
};

export const Base = Template.bind({});
Base.args = {
  perPage: 5,
  itemTotal: 16,
  firstImage: 5,
};

// how to make this stateful again?
