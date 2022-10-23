import React from 'react';
import { ComponentStory } from '@storybook/react';

import { Modal } from './Modal';
import { Button } from '../Button';

export default {
  title: 'Modal',
  component: Modal,
  argTypes: {
    onclick: { action: 'Button Component was clicked!' }
  }
};

// create a template for button component
const Template: ComponentStory<typeof Modal> = args => <Modal {...args} />;

export const ModalComponent = Template.bind({});

ModalComponent.args = {
  children: (
    <>
      <Modal.Header withCloseBtn>
        <Modal.Title>
          <h3>Lorem, ipsum dolor</h3>
          <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur</p>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body scrollable>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam unde quod alias fuga temporibus est impedit
          non, nulla labore fugiat quidem voluptatum similique aut neque ex aspernatur. Praesentium porro minima quis
          rerum commodi reiciendis dolor possimus adipisci, nemo voluptatum illum saepe. Totam, suscipit! At fugiat
          facilis, hic nobis consectetur nihil architecto tempore inventore et accusamus minima ipsum maiores. Ipsam ad
          cumque veritatis reprehenderit tenetur dolore aliquid commodi quasi! Corrupti perferendis voluptatibus
          corporis, debitis porro assumenda vel, mollitia exercitationem laudantium fuga excepturi nemo ducimus. Iusto
          iure debitis maxime a nihil repellendus expedita culpa voluptates fugit aliquam. Tenetur pariatur dolorem a
          earum.
        </p>
      </Modal.Body>
      <Modal.Footer alignEnd>
        <Button variant="white">Cancel</Button>
        <Button>Confirm</Button>
      </Modal.Footer>
    </>
  )
};
