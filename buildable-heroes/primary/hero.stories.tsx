import type { Meta, StoryObj } from '@storybook/react';

import { PrimaryHero } from '.';
import { heroPropsWithImage, heroPropsWithoutImage } from './story-props';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof PrimaryHero> = {
  title: 'Buildable Hero Sections/Primary Hero',
  component: PrimaryHero,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PrimaryHero>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: heroPropsWithImage,
};

export const WithoutImage: Story = {
  args: heroPropsWithoutImage,
};
