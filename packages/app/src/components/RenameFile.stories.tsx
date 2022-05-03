import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import RenameFile from './RenameFile';

export default {
  component: RenameFile,
  title: 'actions/RenameFile',
  argTypes: { onChange: { action: 'onInputChange' } },
} as ComponentMeta<typeof RenameFile>;

const Template: ComponentStory<typeof RenameFile> = (args) => {
  return (
    <RenameFile
      filename={args.filename}
      extension={args.extension}
      setChange={args.setChange}
    />
  );
};

export const Base = Template.bind({});
Base.args = {
  filename: '',
  extension: '',
};
