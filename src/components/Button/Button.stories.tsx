import React from 'react';
import { ComponentStory } from '@storybook/react';

import { Button } from './Button';

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    onclick: { action: 'Button Component was clicked!' },
  },
};

// create a template for button component
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const ButtonComponent = Template.bind({});

ButtonComponent.args = {
  children: <span>Processing</span>,
};
