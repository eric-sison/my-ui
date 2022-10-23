import React from 'react';
import { ComponentStory } from '@storybook/react';

import { TextField } from './TextField';

export default {
  title: 'Input',
  component: TextField,
};

// create a template for button component
const Template: ComponentStory<typeof TextField> = args => <TextField {...args} />;

export const Text = Template.bind({});

Text.args = {};
