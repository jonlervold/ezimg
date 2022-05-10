import { ComponentMeta, ComponentStory } from '@storybook/react';
import Uploader from './Uploader';

export default {
  component: Uploader,
  title: 'actions/Uploader',
  argTypes: {
    onSave: { action: 'on save request' },
  },
} as ComponentMeta<typeof Uploader>;

const Template: ComponentStory<typeof Uploader> = (args) => {
  return <Uploader {...args} />;
};

export const Base = Template.bind({});
// Base.args = {
//   perPage: 5,
//   itemTotal: 17,
//   startIndex: 0,
// };
