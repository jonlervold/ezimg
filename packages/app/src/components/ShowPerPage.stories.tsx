import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import ShowPerPage from './ShowPerPage';

export default {
  component: ShowPerPage,
  title: 'actions/ShowPerPage',
  argTypes: { onChange: { action: 'onInputChange' } },
} as ComponentMeta<typeof ShowPerPage>;

const Template: ComponentStory<typeof ShowPerPage> = (args) => {
  return <ShowPerPage perPage={args.perPage} setPerPage={args.setPerPage} />;
};

export const Base = Template.bind({});
Base.args = {
  perPage: 5,
};

// how to make this stateful again?
