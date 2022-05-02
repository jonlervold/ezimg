import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import AddFile from './AddFile';

export default {
  component: AddFile,
  title: 'actions/AddFile',
  argTypes: { onChange: { action: 'onInputChange' } },
} as ComponentMeta<typeof AddFile>;

const Template: ComponentStory<typeof AddFile> = (args) => {
  const [value, setValue] = useState(args.value);
  return (
    <AddFile
      {...args}
      value={value}
      onChange={(value) => {
        setValue(value);
        args.onChange(value);
      }}
    />
  );
};

export const Base = Template.bind({});
Base.args = {
  value: { title: '', description: '', extension: '' },
};
