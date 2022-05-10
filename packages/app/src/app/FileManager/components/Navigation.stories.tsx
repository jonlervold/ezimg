import { ComponentMeta, ComponentStory } from '@storybook/react';
import Navigation from './Navigation';

export default {
  component: Navigation,
  title: 'actions/Navigation',
  argTypes: {
    onSave: { action: 'on save request' },
  },
} as ComponentMeta<typeof Navigation>;

const Template: ComponentStory<typeof Navigation> = (args) => {
  return <Navigation {...args} />;
};

export const Base = Template.bind({});
Base.args = {
  perPage: 5,
  itemTotal: 17,
  startIndex: 0,
};
