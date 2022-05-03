import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import FileDisplay from './FileDisplay';

export default {
  component: FileDisplay,
  title: 'actions/FileDisplay',
  argTypes: { onChange: { action: 'onInputChange' } },
} as ComponentMeta<typeof FileDisplay>;

const Template: ComponentStory<typeof FileDisplay> = (args) => {
  return (
    <FileDisplay
      serverUrl={args.serverUrl}
      database={args.database}
      setChange={args.setChange}
    />
  );
};

export const Base = Template.bind({});
Base.args = {
  serverUrl: 'http://localhost:3333',
  database: {
    experiencedthings: {
      fileName: 'experiencedthings',
      extension: 'jpg',
      description: 'text saying you have just experienced things',
      dateAdded: '04/11/2022 @ 17:10:08',
      msAdded: 1651511617591,
    },
    literalspongebob: {
      fileName: 'literalspongebob',
      extension: 'jpg',
      description: 'really bad spongebob costume made of actual sponges',
      dateAdded: '04/11/2022 @ 18:13:39',
      msAdded: 1651511617592,
    },
  },
};
