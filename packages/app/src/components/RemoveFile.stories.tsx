import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import RemoveFile from './RemoveFile';

export default {
  component: RemoveFile,
  title: 'actions/RemoveFile',
  argTypes: { onChange: { action: 'onInputChange' } },
} as ComponentMeta<typeof RemoveFile>;

const Template: ComponentStory<typeof RemoveFile> = (args) => {
  return (
    <RemoveFile
      filename={args.filename}
      extension={args.extension}
      setChange={args.setChange}
    />
  );
};

export const Base = Template.bind({});
Base.args = {
  filename: 'filename',
  extension: 'extension',
};
