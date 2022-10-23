import React from 'react';
import { ComponentStory } from '@storybook/react';

import { Close } from './Close';

export default {
  title: 'Close',
  component: Close,
  argTypes: {
    onclick: { action: 'Button Component was clicked!' },
  },
};

// create a template for button component
const Template: ComponentStory<typeof Close> = args => <Close {...args} />;

export const CloseComponent = Template.bind({});

CloseComponent.args = {};
