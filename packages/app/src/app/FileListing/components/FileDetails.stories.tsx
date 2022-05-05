import { ComponentMeta, ComponentStory } from '@storybook/react';
import FileDetails from './FileDetails';

export default {
  component: FileDetails,
  title: 'actions/FileDetails',
  argTypes: {
    onSave: { action: 'on save request' },
  },
} as ComponentMeta<typeof FileDetails>;

const Template: ComponentStory<typeof FileDetails> = (args) => {
  return <FileDetails {...args} />;
};

export const Base = Template.bind({});
Base.args = {
  details: {
    fileName: 'name',
    extension: 'jpg',
    description: 'description',
    msAdded: 0,
  },
};
