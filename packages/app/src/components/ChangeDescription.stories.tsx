import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import ChangeDescription from './ChangeDescription';

export default {
  component: ChangeDescription,
  title: 'actions/ChangeDescription',
  argTypes: { onChange: { action: 'onInputChange' } },
} as ComponentMeta<typeof ChangeDescription>;

const Template: ComponentStory<typeof ChangeDescription> = (args) => {
  return (
    <ChangeDescription filename={args.filename} extension={args.extension} />
  );
};

export const Base = Template.bind({});
Base.args = {
  filename: '',
  extension: '',
};
