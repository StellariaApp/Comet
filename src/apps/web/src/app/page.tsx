'use client';
import { Accordion, Toast, Button, Wrapper, css } from '@stellaria/comet';
import ShowButton from '../components/show-button';
import ToggleTheme from '../components/ToggleTheme';
import ToastWithTime from '../components/ToastWithTimer';

const Page = () => {
  return (
    <Wrapper
      css={() => css`
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
      `}
    >
      <ToggleTheme />
      <ShowButton />
      <Button variant="flat">Flat</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="none">None</Button>
      <Button disabled>Disable</Button>

      <Accordion
        autoHide
        rotateIcon={false}
        items={[
          {
            id: '1',
            open: true,
            title:
              'Is it possible to use the same component for the accordion and the accordion item?',
            content:
              'Yes, it is possible to use the same component for the accordion and the accordion item.',
            icon: 'plus'
          },
          {
            id: '2',
            title:
              "What's the difference between a controlled and an uncontrolled component?",
            content:
              'A controlled component has its state controlled by React. An uncontrolled component has its state controlled by the DOM.',
            icon: 'plus'
          },
          {
            id: '3',
            title:
              'What is the difference between a fragment and a document fragment?',
            content:
              'A fragment is a component that does not render a DOM element. A document fragment is a DOM node that is not part of the main DOM tree.',
            icon: 'plus'
          }
        ]}
      />
      <Accordion.Container>
        <Accordion.Item open>
          <Accordion.Trigger>
            Is it possible to use the same component for the accordion and the
            accordion item?
          </Accordion.Trigger>
          <Accordion.Content>
            Yes, it is possible to use the same component for the accordion and
            the accordion item.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Trigger>
            Whats the difference between a controlled and an uncontrolled
            component?
          </Accordion.Trigger>
          <Accordion.Content>
            A controlled component has its state controlled by React. An
            uncontrolled component has its state controlled by the DOM.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Container>

      <Toast />
      <ToastWithTime />
    </Wrapper>
  );
};

export default Page;
